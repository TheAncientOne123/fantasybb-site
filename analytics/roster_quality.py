"""Season-scoped roster quality. Never reconstruct a preseason forecast after games start."""
import argparse
import json
import math
import os
from datetime import datetime, timezone
from pathlib import Path

METHOD_VERSION = 'fantasy-roster-v1'
PROJECT_ROOT = Path(__file__).resolve().parent.parent


def number(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)


def player_values(player, season, projected=False):
    stats = (getattr(player, 'stats', {}) or {}).get(f'{season}_{"projected" if projected else "total"}', {})
    games = (stats.get('total') or {}).get('GP')
    average = stats.get('applied_avg')
    if not number(games) or games < 0 or not number(average):
        return None
    return {'pointsPerGame': average, 'games': games}


def measure(ids, players, window_games):
    # Keep unidentified slots as missing coverage rather than silently shrinking a roster.
    ids = list(dict.fromkeys(pid for pid in ids if pid is not None)) + [None] * ids.count(None)
    known = [players.get(str(pid)) for pid in ids]
    covered = [value for value in known if value is not None]
    complete = bool(ids) and len(covered) == len(ids) and window_games > 0
    raw = sum(value['pointsPerGame'] * min(1, value['games'] / window_games) for value in covered) / len(ids) if complete else None
    return {'playerIds': ids, 'knownPlayers': len(covered), 'totalPlayers': len(ids),
            'rawValue': round(raw, 4) if raw is not None else None, 'score': None, 'rank': None}


def rate(measurements, reference):
    """Same empirical percentile scale for drafted and final rosters, including ties."""
    for row in measurements:
        raw = row['rawValue']
        if raw is None or len(reference) < 2:
            continue
        less = sum(value < raw for value in reference)
        equal = sum(value == raw for value in reference)
        row['score'] = round(100 * (less + (equal - 1) / 2) / (len(reference) - 1), 1)
    valid = [row['rawValue'] for row in measurements if row['rawValue'] is not None]
    for row in measurements:
        if row['rawValue'] is not None and row['score'] is not None:
            row['rank'] = 1 + sum(value > row['rawValue'] for value in valid)


def build_quality(season, rosters, players, captured_at, previous=None, is_final=False, allow_projection=True, scoring_settings=None):
    previous = previous or {}
    if previous and (previous.get('seasonId') != str(season) or previous.get('methodVersion') != METHOD_VERSION):
        raise ValueError('La captura anterior no corresponde a esta temporada o metodología.')
    actual_players = {str(pid): player_values(player, season) for pid, player in players.items()}
    started = any(value and value['games'] > 0 for value in actual_players.values())
    projection = previous.get('projection')
    if projection is None and not started and allow_projection:
        projected_players = {str(pid): player_values(player, season, projected=True) for pid, player in players.items()}
        rows = [{'teamId': team['id'], **measure([p['playerId'] for p in team['draftedRoster']], projected_players, 82)} for team in rosters]
        reference = [row['rawValue'] for row in rows if row['rawValue'] is not None]
        if reference and any(value > 0 for value in reference):
            rate(rows, reference)
            projection = {'capturedAt': captured_at, 'windowGames': 82, 'referenceSize': len(reference),
                          'teams': rows, 'players': projected_players, 'scoringSettings': scoring_settings}

    previous_performance = previous.get('performance') or {}
    performance = previous_performance if previous_performance.get('isFinal') else None
    if started and performance is None:
        window_games = max(value['games'] for value in actual_players.values() if value)
        rows = [{'teamId': team['id'],
                 'drafted': measure([p['playerId'] for p in team['draftedRoster']], actual_players, window_games),
                 'final': measure([p['playerId'] for p in team['currentRoster']], actual_players, window_games)} for team in rosters]
        reference = [row[kind]['rawValue'] for row in rows for kind in ('drafted', 'final') if row[kind]['rawValue'] is not None]
        # Normalize both lists together; rank each roster against its own cohort.
        rate([row['drafted'] for row in rows], reference)
        rate([row['final'] for row in rows], reference)
        for row in rows:
            a, b = row['drafted']['score'], row['final']['score']
            row['improvement'] = round(b - a, 1) if a is not None and b is not None else None
        performance = {'capturedAt': captured_at, 'isFinal': is_final, 'windowGames': window_games,
                       'referenceSize': len(reference), 'teams': rows, 'players': actual_players, 'scoringSettings': scoring_settings}
    return {'seasonId': str(season), 'methodVersion': METHOD_VERSION, 'source': 'ESPN',
            'generatedAt': captured_at, 'projection': projection, 'performance': performance,
            'projectionStatus': 'captured' if projection else 'not-captured' if started or not allow_projection else 'unavailable'}


def export_quality(league, season, rosters, output_path=None):
    path = output_path or PROJECT_ROOT / 'src/data/seasons' / str(season) / 'roster-quality.json'
    previous = json.loads(path.read_text(encoding='utf-8')) if path.exists() else None
    players = {p.playerId: p for team in league.teams for p in team.roster}
    required = {p['playerId'] for team in rosters for kind in ('currentRoster', 'draftedRoster') for p in team[kind]
                if isinstance(p.get('playerId'), int) and not isinstance(p['playerId'], bool) and p['playerId'] > 0}
    missing = sorted(required - players.keys())
    for offset in range(0, len(missing), 50):
        fetched = league.player_info(playerId=missing[offset:offset + 50])
        for player in fetched if isinstance(fetched, list) else [fetched]:
            if player is not None:
                players[player.playerId] = player
    now_utc = datetime.now(timezone.utc)
    now = now_utc.replace(microsecond=0).isoformat().replace('+00:00', 'Z')
    final_period = getattr(league, 'finalScoringPeriod', 0) or 0
    is_final = final_period > 0 and (getattr(league, 'scoringPeriodId', 0) or 0) >= final_period
    allow_projection = ((int(season) > now_utc.year or (int(season) == now_utc.year and now_utc.month < 7))
                        and (getattr(league, 'scoringPeriodId', 1) or 1) <= 1)
    scoring_settings = getattr(getattr(league, 'settings', None), '_raw_scoring_settings', None)
    payload = build_quality(season, rosters, players, now, previous, is_final, allow_projection, scoring_settings)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix('.json.tmp')
    temporary.write_text(json.dumps(payload, ensure_ascii=False, indent=2, allow_nan=False) + '\n', encoding='utf-8')
    temporary.replace(path)
    print(f'Calidad de roster: {path}; proyección={payload["projectionStatus"]}; desempeño={"disponible" if payload["performance"] else "pendiente"}.')
    return payload


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--season', required=True)
    parser.add_argument('--rosters-file', required=True)
    args = parser.parse_args()
    if not args.season.isdigit() or len(args.season) != 4:
        parser.error('Temporada inválida')
    os.environ['YEAR'] = args.season
    from league_data import get_league
    data = json.loads(Path(args.rosters_file).read_text(encoding='utf-8'))
    if data['seasonId'] != args.season:
        parser.error('Los rosters no corresponden a la temporada')
    export_quality(get_league(), args.season, data['teams'])
