"""Players Lab: métricas por jugador (FA, waivers y universo) + etiquetas de tendencia.

Una sola consulta `kona_player_info` trae los ~400 jugadores con más % de propiedad
(libres, en waivers o en algún equipo de la liga) con sus ventanas de estadísticas.
La métrica principal es FPTS por partido (scoring real de la liga).

    python analytics/players_lab.py --season 2027
"""
import argparse
import json
import math
import os
from datetime import datetime, timezone
from pathlib import Path

METHOD_VERSION = 'players-lab-v1'
PROJECT_ROOT = Path(__file__).resolve().parent.parent
POOL_SIZE = 400

# Umbrales de las etiquetas (FPTS = puntos de fantasy por partido).
ROSTER_SLOTS_PER_TEAM = 10       # nivel de reemplazo = jugador con roster #(equipos × 10)
RECENT_MIN_GAMES = 4             # partidos mínimos en los últimos 15 días
STREAMER_MIN_GAMES = 2           # partidos mínimos en los últimos 7 días
SLEEPER_MAX_OWNED = 30.0         # % de propiedad máximo en ESPN
SLEEPER_GAIN = 1.15              # últimos 15 ≥ base × 1.15
SLEEPER_MIN_MINUTES_GAIN = 3.0   # y al menos +3 minutos por partido
BUST_MIN_GAMES = 8
BUST_PROJECTED_TOP = 150         # proyectado dentro del top 150
BUST_RATIO = 0.80                # temporada ≤ proyección × 0.80
FLUKE_GAIN = 1.25                # últimos 15 ≥ base × 1.25 ...
FLUKE_MAX_MINUTES_GAIN = 2.0     # ... sin más minutos ...
FLUKE_FG_JUMP = 0.05             # ... y FG% +5 pts (con ≥ 5 FGA) ...
FLUKE_3P_JUMP = 0.08             # ... o 3PT% +8 pts (con ≥ 3 3PA)
SLUMP_DROP = 0.75                # últimos 15 ≤ base × 0.75
SLUMP_MAX_MINUTES_DROP = 3.0     # con minutos estables (pierde < 3)

UNAVAILABLE_INJURIES = {'OUT', 'INJURY_RESERVE', 'SUSPENSION'}
WINDOW_KEYS = {'season': 'total', 'last7': 'last_7', 'last15': 'last_15', 'last30': 'last_30', 'projected': 'projected'}
STATUS_MAP = {'FREEAGENT': 'FA', 'WAIVERS': 'WAIVERS', 'ONTEAM': 'TEAM'}


def number(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)


def rounded(value, digits=1):
    return round(value, digits) if number(value) else None


def ratio(made, attempts):
    return made / attempts if number(made) and number(attempts) and attempts > 0 else None


def usage_proxy(fga, fta, turnovers, minutes):
    """Uso aproximado: posesiones que terminan en sus manos por cada 36 minutos."""
    if not all(number(v) for v in (fga, fta, turnovers, minutes)) or minutes <= 0:
        return None
    return (fga + 0.44 * fta + turnovers) / minutes * 36


def build_window(split):
    """Convierte un split de espn_api (`{'applied_avg', 'avg', 'total'}`) en promedios por partido."""
    if not split:
        return None
    avg = split.get('avg') or {}
    total = split.get('total') or {}
    games = total.get('GP')
    if not number(games) or games <= 0 or not avg:
        return None
    get = lambda key: avg.get(key) if number(avg.get(key)) else None
    stl, blk = get('STL'), get('BLK')
    fgm, fga, ftm, fta, tpm, tpa = get('FGM'), get('FGA'), get('FTM'), get('FTA'), get('3PM'), get('3PA')
    minutes = get('MIN')
    return {
        'gp': int(games),
        'min': rounded(minutes),
        'fpts': rounded(split.get('applied_avg')),
        'pts': rounded(get('PTS')),
        'reb': rounded(get('REB')),
        'ast': rounded(get('AST')),
        'stl': rounded(stl),
        'blk': rounded(blk),
        'stocks': rounded(stl + blk) if stl is not None and blk is not None else None,
        'tpm': rounded(tpm),
        'to': rounded(get('TO')),
        'fgm': rounded(fgm), 'fga': rounded(fga), 'fgPct': rounded(ratio(fgm, fga), 3),
        'ftm': rounded(ftm), 'fta': rounded(fta), 'ftPct': rounded(ratio(ftm, fta), 3),
        'tpa': rounded(tpa), 'tpPct': rounded(ratio(tpm, tpa), 3),
        'usage': rounded(usage_proxy(fga, fta, get('TO'), minutes)),
    }


def player_windows(stats, season):
    windows = {}
    for key, suffix in WINDOW_KEYS.items():
        window = build_window(stats.get(f'{season}_{suffix}'))
        if window:
            windows[key] = window
    return windows


def value_at(values, position):
    ordered = sorted((v for v in values if number(v)), reverse=True)
    if not ordered:
        return None
    return ordered[min(position, len(ordered)) - 1]


def replacement_level(players, team_count):
    """FPTS/G del jugador con roster número (equipos × ROSTER_SLOTS_PER_TEAM)."""
    rostered = [p for p in players if p['status'] == 'TEAM']
    position = max(1, team_count * ROSTER_SLOTS_PER_TEAM)
    for key in ('season', 'projected'):
        values = [p['windows'][key]['fpts'] for p in rostered if key in p['windows'] and p['windows'][key]['gp'] >= 3]
        if len(values) >= position // 2:
            return value_at(values, position)
    return None


def fmt(value, digits=1):
    return f'{value:.{digits}f}'


def pct(value):
    return f'{value * 100:.1f}%'


def signed(value, digits=1):
    return f'{"+" if value >= 0 else "−"}{abs(value):.{digits}f}'


def classify(player, replacement, projected_top):
    """Etiquetas de tendencia con su motivo. Funciones puras para poder probarlas."""
    w = player['windows']
    season, last7, last15, projected = (w.get(k) for k in ('season', 'last7', 'last15', 'projected'))
    base = projected or season
    available = player['status'] in ('FA', 'WAIVERS')
    healthy = player['injuryStatus'] not in UNAVAILABLE_INJURIES
    labels = []

    def minutes_delta(recent):
        return recent['min'] - base['min'] if base and number(base.get('min')) and number(recent.get('min')) else None

    # Streamer: libre, sano, rindiendo a nivel de reemplazo esta última semana.
    if available and healthy and last7 and last7['gp'] >= STREAMER_MIN_GAMES and number(last7['fpts']) \
            and replacement is not None and last7['fpts'] >= replacement:
        games = player.get('gamesNext7')
        reason = f'{fmt(last7["fpts"])} FPTS/G en 7 días'
        if games is not None:
            reason += f' · {games} partidos en los próximos 7 días'
        labels.append({'kind': 'streamer', 'reason': reason,
                       'score': round(last7['fpts'] * (games if games is not None else 3), 2)})

    # Bust: proyectado como titular de fantasy y muy por debajo en la temporada.
    is_bust = False
    if season and projected and season['gp'] >= BUST_MIN_GAMES and number(season['fpts']) and number(projected['fpts']) \
            and projected_top is not None and projected['fpts'] >= projected_top \
            and season['fpts'] <= projected['fpts'] * BUST_RATIO:
        drop = 1 - season['fpts'] / projected['fpts']
        is_bust = True
        labels.append({'kind': 'bust', 'score': round(projected['fpts'] - season['fpts'], 2),
                       'reason': f'{fmt(season["fpts"])} FPTS/G vs. {fmt(projected["fpts"])} proyectados (−{drop * 100:.0f}%)'})

    if last15 and last15['gp'] >= RECENT_MIN_GAMES and base and number(last15['fpts']) and number(base['fpts']) and base['fpts'] > 0:
        gain = last15['fpts'] / base['fpts']
        dmin = minutes_delta(last15)

        # Sleeper: poco rosterizado, mejor producción Y más minutos (cambio de rol real).
        if player['percentOwned'] is not None and player['percentOwned'] < SLEEPER_MAX_OWNED and gain >= SLEEPER_GAIN \
                and dmin is not None and dmin >= SLEEPER_MIN_MINUTES_GAIN \
                and (replacement is None or last15['fpts'] >= replacement * 0.8):
            labels.append({'kind': 'sleeper', 'score': round(last15['fpts'] - base['fpts'], 2),
                           'reason': f'{signed(last15["fpts"] - base["fpts"])} FPTS/G en 15 días · {signed(dmin)} min'})

        # Fluke: sube sin más minutos y con tiro muy por encima de lo habitual → regresión a la media.
        if gain >= FLUKE_GAIN and (dmin is None or dmin < FLUKE_MAX_MINUTES_GAIN):
            jump = None
            if number(last15['fgPct']) and number(base.get('fgPct')) and (last15['fga'] or 0) >= 5 \
                    and last15['fgPct'] - base['fgPct'] >= FLUKE_FG_JUMP:
                jump = f'FG% {pct(last15["fgPct"])} vs. {pct(base["fgPct"])} habitual'
            elif number(last15['tpPct']) and number(base.get('tpPct')) and (last15['tpa'] or 0) >= 3 \
                    and last15['tpPct'] - base['tpPct'] >= FLUKE_3P_JUMP:
                jump = f'3PT% {pct(last15["tpPct"])} vs. {pct(base["tpPct"])} habitual'
            if jump:
                labels.append({'kind': 'fluke', 'score': round(gain, 3),
                               'reason': f'{jump} · minutos sin cambio'})

        # Slump: jugador relevante que baja con minutos estables → probable rebote.
        # Si toda la temporada va mal ya es Bust, no un bache de corto plazo.
        if not is_bust and gain <= SLUMP_DROP and player['injuryStatus'] == 'ACTIVE' and (dmin is None or dmin > -SLUMP_MAX_MINUTES_DROP) \
                and (replacement is None or base['fpts'] >= replacement):
            labels.append({'kind': 'slump', 'score': round(base['fpts'] - last15['fpts'], 2),
                           'reason': f'{fmt(last15["fpts"])} FPTS/G en 15 días vs. {fmt(base["fpts"])} habitual'})

    return labels


def games_next_7(pro_schedule, pro_team_id, scoring_period):
    if not pro_schedule or not pro_team_id or pro_team_id not in pro_schedule:
        return None
    days = {int(day) for day in pro_schedule[pro_team_id] if str(day).isdigit()}
    return sum(1 for day in days if scoring_period <= day < scoring_period + 7)


def fetch_pool(league):
    filters = {'players': {
        'filterStatus': {'value': ['FREEAGENT', 'WAIVERS', 'ONTEAM']},
        'limit': POOL_SIZE,
        'sortPercOwned': {'sortPriority': 1, 'sortAsc': False},
    }}
    data = league.espn_request.league_get(
        params={'view': 'kona_player_info', 'scoringPeriodId': league.scoringPeriodId},
        headers={'x-fantasy-filter': json.dumps(filters)},
    )
    return data.get('players', [])


def build_players_lab(league, season, catalog_teams, generated_at):
    from espn_api.basketball.player import Player
    from league_data import espn_headshot_url, format_pro_team_abbrev, roster_player_position_labels

    team_by_espn = {t['espnTeamId']: t['id'] for t in catalog_teams if t.get('espnTeamId') is not None}
    pro_schedule = getattr(league, 'pro_schedule', None)
    scoring_period = int(getattr(league, 'scoringPeriodId', 0) or 0)

    players = []
    for entry in fetch_pool(league):
        raw = entry.get('player') or {}
        try:
            parsed = Player(entry, int(season))
        except Exception as error:  # un jugador mal formado no debe tumbar todo el lote
            print(f'Players Lab: se omitió {raw.get("fullName", entry.get("id"))}: {error}')
            continue
        ownership = raw.get('ownership') or {}
        status = STATUS_MAP.get(entry.get('status'), 'FA')
        waiver_ms = entry.get('waiverProcessDate')
        players.append({
            'id': parsed.playerId,
            'name': parsed.name,
            'headshotUrl': espn_headshot_url(parsed.playerId) or None,
            'proTeam': format_pro_team_abbrev(parsed.proTeam),
            'positions': roster_player_position_labels(parsed),
            'injuryStatus': raw.get('injuryStatus') or 'ACTIVE',
            'status': status,
            'fantasyTeamId': team_by_espn.get(entry.get('onTeamId')) if status == 'TEAM' else None,
            'waiverClearsAt': (datetime.fromtimestamp(waiver_ms / 1000, timezone.utc).isoformat().replace('+00:00', 'Z')
                               if status == 'WAIVERS' and number(waiver_ms) and waiver_ms > 0 else None),
            'percentOwned': rounded(ownership.get('percentOwned')),
            'percentChange': rounded(ownership.get('percentChange'), 2),
            'gamesNext7': games_next_7(pro_schedule, raw.get('proTeamId'), scoring_period) if scoring_period else None,
            'windows': player_windows(parsed.stats, season),
            'labels': [],
        })

    replacement = replacement_level(players, len(catalog_teams))
    projected_top = value_at([p['windows']['projected']['fpts'] for p in players if 'projected' in p['windows']],
                             BUST_PROJECTED_TOP)
    for player in players:
        player['labels'] = classify(player, replacement, projected_top)

    return {
        'seasonId': str(season),
        'methodVersion': METHOD_VERSION,
        'source': 'ESPN',
        'generatedAt': generated_at,
        'scoringPeriodId': scoring_period or None,
        'replacementLevel': rounded(replacement),
        'players': players,
    }


def export_players_lab(league, season, catalog_teams=None, output_path=None):
    season = str(season)
    if catalog_teams is None:
        catalog_path = PROJECT_ROOT / 'src/data/seasons' / season / 'teams-catalog.json'
        catalog_teams = json.loads(catalog_path.read_text(encoding='utf-8'))['teams']
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z')
    payload = build_players_lab(league, season, catalog_teams, now)
    path = output_path or PROJECT_ROOT / 'src/data/seasons' / season / 'players-lab.json'
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix('.json.tmp')
    temporary.write_text(json.dumps(payload, ensure_ascii=False, separators=(',', ':'), allow_nan=False) + '\n', encoding='utf-8')
    temporary.replace(path)
    counts = {}
    for player in payload['players']:
        for label in player['labels']:
            counts[label['kind']] = counts.get(label['kind'], 0) + 1
    print(f'Players Lab: {path}; {len(payload["players"])} jugadores; etiquetas={counts}.')
    return payload


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--season', required=True)
    args = parser.parse_args()
    if not args.season.isdigit() or len(args.season) != 4:
        parser.error('Temporada inválida')
    os.environ['YEAR'] = args.season
    from league_data import get_league
    export_players_lab(get_league(), args.season)
