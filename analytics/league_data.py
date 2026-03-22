"""
league_data – Analytics para liga ESPN Fantasy Basketball.

Obtiene información esencial de la API por equipo:
- Resumen de temporada, puntos por semana, mejor/peor semana
- Consistencia, partidos cerrados, rival más jugado, némesis, upsets
- Actividad (trades, waivers) por equipo
- Dominio 9CAT H2H (team.stats), MVPs (top 3 por equipo), evolución roster (drafted vs actual)
- Arquetipos: Trade Merchant, Away From Keyboard, Bulldozer, Big Men Cartel, Surgeon, etc.

Las semanas/matchup periods se descubren iterando scoreboard(1..N)
hasta que no haya datos (no depende de una API de "total de semanas").
"""

import os
import time
from collections import defaultdict
from statistics import mean, median, pstdev

# Cargar .env desde la carpeta del script (analytics/) para que funcione
# tanto al ejecutar desde la raíz como desde analytics/
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_ENV_PATH = os.path.join(_SCRIPT_DIR, ".env")
try:
    from dotenv import load_dotenv
    load_dotenv(_ENV_PATH)
except ImportError:
    pass

from espn_api.basketball import League

# ---------------------------------------------------------------------------
# Configuración (env o defaults para desarrollo)
# ---------------------------------------------------------------------------

def get_league():
    """Crea la instancia de League desde variables de entorno."""
    league_id = int(os.getenv("LEAGUE_ID", "0"))
    year = int(os.getenv("YEAR", "0"))
    swid = os.getenv("SWID", "").strip().strip('"')
    espn_s2 = os.getenv("ESPN_S2", "").strip()
    if not league_id or not year:
        raise ValueError(
            "Configura LEAGUE_ID y YEAR. "
            "Usa un .env en la carpeta analytics/ (o variables de entorno). "
            f"Actualmente LEAGUE_ID={league_id!r} YEAR={year!r}"
        )
    return League(
        league_id=league_id,
        year=year,
        swid=swid if swid else None,
        espn_s2=espn_s2 if espn_s2 else None,
    )


# ---------------------------------------------------------------------------
# Semanas / matchup periods (una sola fuente de verdad)
# ---------------------------------------------------------------------------

# Retries for transient ESPN API connection errors (RemoteDisconnected, ConnectionError)
_SCOREBOARD_MAX_RETRIES = 3
_SCOREBOARD_RETRY_DELAY = 5  # seconds between retries


def _scoreboard(league, period):
    """Llama a scoreboard para un periodo. espn_api basketball usa matchupPeriod (camelCase)."""
    return league.scoreboard(matchupPeriod=period)


def _scoreboard_with_retry(league, period):
    """
    Scoreboard con reintentos ante ConnectionError / RemoteDisconnected.
    La API de ESPN a veces cierra conexiones sin respuesta; reintentar suele funcionar.
    """
    last_err = None
    for attempt in range(_SCOREBOARD_MAX_RETRIES):
        try:
            return _scoreboard(league, period)
        except Exception as e:
            last_err = e
            err_str = str(type(e).__name__)
            if "Connection" in err_str or "RemoteDisconnected" in err_str or "Remote end closed" in str(e):
                if attempt < _SCOREBOARD_MAX_RETRIES - 1:
                    delay = _SCOREBOARD_RETRY_DELAY * (2 ** attempt)
                    print(f"[scoreboard retry] matchup_period={period} attempt={attempt + 1}/{_SCOREBOARD_MAX_RETRIES} in {delay}s...")
                    time.sleep(delay)
                else:
                    raise
            else:
                raise
    raise last_err


def get_available_weeks(league, max_periods=25):
    """
    Obtiene los números de matchup period que existen en la liga.
    1) Prueba scoreboard(matchupPeriod=m) para m = 1..max_periods.
    2) Si no hay ninguno, usa league.matchup_ids (periodos del schedule) si existe.
    """
    available = []
    for m in range(1, max_periods + 1):
        try:
            sb = _scoreboard_with_retry(league, m)
            if sb and len(sb) > 0:
                available.append(m)
        except Exception:
            continue
    if not available and hasattr(league, "matchup_ids") and league.matchup_ids:
        available = sorted(league.matchup_ids.keys())
    return available


# ---------------------------------------------------------------------------
# Resumen de equipo y puntos por semana
# ---------------------------------------------------------------------------

def team_season_summary(team):
    """Resumen de temporada de un equipo (wins, losses, PF, PA, standing, etc.)."""
    return {
        "team": team.team_name,
        "team_id": team.team_id,
        "wins": team.wins,
        "losses": team.losses,
        "ties": getattr(team, "ties", 0),
        "points_for": team.points_for,
        "points_against": team.points_against,
        "standing": getattr(team, "standing", None),
        "final_standing": getattr(team, "final_standing", None),
        "logo_url": getattr(team, "logo_url", None),
    }


def get_team_logo_url(team):
    """
    Obtiene la URL del logo de un equipo.
    Según la documentación del objeto Team: logo_url es un str.
    Returns:
        str: URL del logo, o None si no está disponible.
    """
    url = getattr(team, "logo_url", None)
    return url if url and isinstance(url, str) and url.strip() else None


def get_league_team_logos(league):
    """
    Obtiene los logos de todos los equipos de la liga.
    Returns:
        dict: team_id -> logo_url (str o None por equipo).
    """
    result = {}
    for team in getattr(league, "teams", []) or []:
        tid = getattr(team, "team_id", None)
        if tid is not None:
            result[tid] = get_team_logo_url(team)
    return result


def _score_from_matchup(m, team_id):
    """Extrae (my_score, opp_score, opp_team_id) del matchup para team_id. None si no aplica."""
    home_id = getattr(m.home_team, "team_id", None)
    away_id = getattr(m.away_team, "team_id", None)
    if team_id not in (home_id, away_id):
        return None
    home_score = getattr(m, "home_final_score", None) or getattr(m, "home_team_live_score", None)
    away_score = getattr(m, "away_final_score", None) or getattr(m, "away_team_live_score", None)
    if home_score is None or away_score is None:
        return None
    if team_id == home_id:
        return (float(home_score), float(away_score), away_id)
    return (float(away_score), float(home_score), home_id)


def weekly_points_for_team(league, team_id, weeks):
    """
    Puntos por semana para un equipo.
    weeks: lista de números de matchup period (de get_available_weeks).

    Returns:
        pts: dict week -> puntos del equipo
        opp: dict week -> puntos del rival
        opp_id: dict week -> team_id del rival
        result: dict week -> 'W'|'L'|'T'
    """
    if not weeks:
        return {}, {}, {}, {}

    pts, opp, opp_id, result = {}, {}, {}, {}

    for w in weeks:
        try:
            sb = _scoreboard_with_retry(league, w)
        except Exception as e:
            print(f"[scoreboard error] matchup_period={w} -> {type(e).__name__}: {e}")
            continue
        if not sb:
            continue
        for m in sb:
            row = _score_from_matchup(m, team_id)
            if row is None:
                continue
            my_score, their_score, oid = row
            pts[w] = my_score
            opp[w] = their_score
            opp_id[w] = oid
            result[w] = "W" if my_score > their_score else ("L" if my_score < their_score else "T")
            break  # un matchup por equipo por semana

    if not pts:
        print(f"[warning] No matchups para team_id={team_id} en weeks={weeks[:5]}... total={len(weeks)}")
    return pts, opp, opp_id, result


# ---------------------------------------------------------------------------
# Mejor/peor semana y consistencia
# ---------------------------------------------------------------------------

def best_and_worst_week(league, team_id, weeks):
    """Mejor y peor semana por puntos; promedio semanal."""
    pts, _, _, _ = weekly_points_for_team(league, team_id, weeks)
    if not pts:
        return {"best_week": None, "best_points": 0, "worst_week": None, "worst_points": 0, "avg_weekly": 0}
    best_w = max(pts, key=lambda k: pts[k])
    worst_w = min(pts, key=lambda k: pts[k])
    return {
        "best_week": best_w,
        "best_points": pts[best_w],
        "worst_week": worst_w,
        "worst_points": pts[worst_w],
        "avg_weekly": mean(pts.values()),
    }


def consistency_metrics(league, team_id, weeks):
    """Promedio, desviación estándar, min y max de puntos semanales."""
    pts, _, _, _ = weekly_points_for_team(league, team_id, weeks)
    values = list(pts.values())
    if len(values) < 2:
        return {"avg": values[0] if values else 0, "std": 0, "min": values[0] if values else 0, "max": values[0] if values else 0}
    return {
        "avg": mean(values),
        "std": pstdev(values),
        "min": min(values),
        "max": max(values),
    }


def league_consistency_ranking(league, weeks):
    """Ranking de equipos por consistencia (menor std = más consistente)."""
    rows = []
    for t in league.teams:
        m = consistency_metrics(league, t.team_id, weeks)
        rows.append((t.team_id, t.team_name, m["std"], m["avg"]))
    rows.sort(key=lambda x: x[2])
    return rows


# Nombres por puesto en el ranking de consistencia (#1 más consistente, #10 más volátil)
CONSISTENCY_RANK_NAMES = {
    1: "I am consistent",
    2: "Rock Solid",
    3: "Steady Hands",
    4: "Mostly Reliable",
    5: "Up and down",
    6: "Roller Coaster",
    7: "Unpredictable",
    8: "Boom or bust",
    9: "Living on the edge",
    10: "Hit-or-Miss",
}


def plot_consistency_ranking(ranking, output_path=None):
    """
    Gráfica de barras del std por equipo (verde = menor std, rojo = mayor std).
    ranking: lista de (team_id, team_name, std, avg) ordenada por std asc.
    output_path: ruta del PNG; si None, usa analytics/consistency_ranking.png
    """
    try:
        import matplotlib.pyplot as plt
        import matplotlib.colors as mcolors
        import numpy as np
    except ImportError:
        return False
    if not ranking:
        return False
    output_path = output_path or os.path.join(_SCRIPT_DIR, "consistency_ranking.png")
    names = [r[1][:25] for r in ranking]
    stds = [r[2] for r in ranking]
    n = len(stds)
    # Color: verde (min std) -> rojo (max std)
    norm = mcolors.Normalize(vmin=min(stds), vmax=max(stds))
    try:
        cmap = plt.colormaps["RdYlGn_r"]
    except (AttributeError, KeyError):
        cmap = plt.cm.get_cmap("RdYlGn_r")
    colors = [cmap(norm(s)) for s in stds]
    fig, ax = plt.subplots(figsize=(10, max(4, n * 0.45)))
    y_pos = np.arange(n)
    ax.barh(y_pos, stds, color=colors, edgecolor="gray", linewidth=0.5)
    ax.set_yticks(y_pos)
    ax.set_yticklabels(names, fontsize=9)
    ax.invert_yaxis()
    ax.set_xlabel("Desviación estándar (puntos semanales)")
    ax.set_title("League consistency ranking (menor std = más consistente)")
    ax.set_xlim(0, max(stds) * 1.05)
    plt.tight_layout()
    plt.savefig(output_path, dpi=120, bbox_inches="tight")
    plt.close()
    return output_path


# ---------------------------------------------------------------------------
# Rachas de victorias y derrotas
# ---------------------------------------------------------------------------

def _streak_lengths(ordered_results, outcome):
    """
    Dada una lista ordenada por semana de resultados ('W'|'L'|'T'),
    devuelve las longitudes de rachas consecutivas del outcome dado.
    Ej: ['W','W','W','L','W'] con outcome='W' -> [3, 1].
    """
    lengths = []
    current = 0
    for r in ordered_results:
        if r == outcome:
            current += 1
        else:
            if current > 0:
                lengths.append(current)
            current = 0
    if current > 0:
        lengths.append(current)
    return lengths


def _longest_streak_span(ordered_results, outcome):
    """
    Devuelve (start_index, length) de la primera racha más larga del outcome dado.
    Si no hay racha, devuelve (0, 0).
    """
    best_start, best_len = 0, 0
    i = 0
    while i < len(ordered_results):
        if ordered_results[i] != outcome:
            i += 1
            continue
        start = i
        while i < len(ordered_results) and ordered_results[i] == outcome:
            i += 1
        length = i - start
        if length > best_len:
            best_len = length
            best_start = start
    return (best_start, best_len)


def win_and_lose_streaks_by_team(league, weeks):
    """
    Por equipo: rachas de victorias y rachas de derrotas (orden cronológico por semana).
    Devuelve dict team_id -> {
        "win_streaks": [3, 2, ...],   # listas de longitudes de rachas W
        "lose_streaks": [2, 1, ...],
        "max_win_streak": int,
        "max_lose_streak": int,
    }
    """
    result = {}
    for t in league.teams:
        _, _, _, res_dict = weekly_points_for_team(league, t.team_id, weeks)
        if not res_dict:
            result[t.team_id] = {
                "win_streaks": [],
                "lose_streaks": [],
                "max_win_streak": 0,
                "max_lose_streak": 0,
            }
            continue
        ordered_weeks = sorted(res_dict.keys())
        ordered_results = [res_dict[w] for w in ordered_weeks]
        win_streaks = _streak_lengths(ordered_results, "W")
        lose_streaks = _streak_lengths(ordered_results, "L")
        result[t.team_id] = {
            "win_streaks": win_streaks,
            "lose_streaks": lose_streaks,
            "max_win_streak": max(win_streaks) if win_streaks else 0,
            "max_lose_streak": max(lose_streaks) if lose_streaks else 0,
        }
    return result


def win_lose_streak_details_by_team(league, weeks):
    """
    Por equipo: detalles de la racha de victorias más larga y de la racha de derrotas más larga
    para desempate (avg PF, avg diferencial, primera semana de la racha).
    Devuelve dict team_id -> {
        "max_win_streak": int,
        "max_win_weeks": [week, ...],
        "max_win_avg_pf": float,
        "max_win_avg_diff": float,
        "max_win_first_week": int | None,
        "max_lose_streak": int,
        "max_lose_weeks": [week, ...],
        "max_lose_avg_pf": float,
        "max_lose_avg_diff": float,
        "max_lose_first_week": int | None,
    }
    """
    result = {}
    for t in league.teams:
        tid = t.team_id
        pts, opp, _, res = weekly_points_for_team(league, tid, weeks)
        if not res:
            result[tid] = {
                "max_win_streak": 0,
                "max_win_weeks": [],
                "max_win_avg_pf": 0.0,
                "max_win_avg_diff": 0.0,
                "max_win_first_week": None,
                "max_lose_streak": 0,
                "max_lose_weeks": [],
                "max_lose_avg_pf": 0.0,
                "max_lose_avg_diff": 0.0,
                "max_lose_first_week": None,
            }
            continue
        ordered_weeks = sorted(res.keys())
        ordered_results = [res[w] for w in ordered_weeks]

        def streak_stats(start_idx, length, outcome):
            if length == 0:
                return [], 0.0, 0.0, None
            weeks_in = ordered_weeks[start_idx : start_idx + length]
            pf_list = [pts[w] for w in weeks_in if w in pts]
            pa_list = [opp[w] for w in weeks_in if w in opp]
            avg_pf = mean(pf_list) if pf_list else 0.0
            diffs = [(pts.get(w, 0) - opp.get(w, 0)) for w in weeks_in]
            avg_diff = mean(diffs) if diffs else 0.0
            first_week = weeks_in[0] if weeks_in else None
            return weeks_in, avg_pf, avg_diff, first_week

        w_start, w_len = _longest_streak_span(ordered_results, "W")
        l_start, l_len = _longest_streak_span(ordered_results, "L")

        max_win_weeks, max_win_avg_pf, max_win_avg_diff, max_win_first = streak_stats(w_start, w_len, "W")
        max_lose_weeks, max_lose_avg_pf, max_lose_avg_diff, max_lose_first = streak_stats(l_start, l_len, "L")

        result[tid] = {
            "max_win_streak": w_len,
            "max_win_weeks": max_win_weeks,
            "max_win_avg_pf": max_win_avg_pf,
            "max_win_avg_diff": max_win_avg_diff,
            "max_win_first_week": max_win_first,
            "max_lose_streak": l_len,
            "max_lose_weeks": max_lose_weeks,
            "max_lose_avg_pf": max_lose_avg_pf,
            "max_lose_avg_diff": max_lose_avg_diff,
            "max_lose_first_week": max_lose_first,
        }
    return result


def unstoppable_winner(league, weeks):
    """
    Premio "Unstoppable": el #1 en racha de victorias.
    Desempate: (1) mayor avg PF durante la racha, (2) mayor avg diferencial (PF−PA),
    (3) el que logró la racha antes en la temporada (menor primera semana).
    Devuelve (team, streak_length) o (None, 0) si nadie tiene racha.
    """
    details = win_lose_streak_details_by_team(league, weeks)
    candidates = [
        t for t in league.teams
        if details.get(t.team_id, {}).get("max_win_streak", 0) > 0
    ]
    if not candidates:
        return None, 0
    def key(t):
        d = details.get(t.team_id, {})
        streak = d.get("max_win_streak", 0)
        avg_pf = d.get("max_win_avg_pf", 0.0)
        avg_diff = d.get("max_win_avg_diff", 0.0)
        first_week = d.get("max_win_first_week") or 999
        return (streak, avg_pf, avg_diff, -first_week)  # -first_week: antes = menor número = mejor
    best = max(candidates, key=key)
    streak = details.get(best.team_id, {}).get("max_win_streak", 0)
    return best, streak


def streak_ender_winner(league, weeks, unstoppable_team, unstoppable_streak=0):
    """
    Premio "Kingslayer" / "Streak Ender": el equipo que venció al Unstoppable y acabó con su racha.
    El oponente en la primera derrota tras la racha de victorias es el Streak Ender.
    Devuelve (streak_ender_team, week, unstoppable_name) o (None, None, None).
    Si la racha terminó la temporada (sin derrota después) o acabó en empate, no hay Streak Ender.
    """
    if unstoppable_team is None or unstoppable_streak <= 0:
        return None, None, None
    tid = unstoppable_team.team_id
    pts, opp, opp_id, res = weekly_points_for_team(league, tid, weeks)
    if not res:
        return None, None, None
    ordered_weeks = sorted(res.keys())
    ordered_results = [res[w] for w in ordered_weeks]
    w_start, w_len = _longest_streak_span(ordered_results, "W")
    loss_idx = w_start + w_len
    if loss_idx >= len(ordered_weeks):
        return None, None, None
    if ordered_results[loss_idx] != "L":
        return None, None, None
    loss_week = ordered_weeks[loss_idx]
    opp_tid = opp_id.get(loss_week)
    if opp_tid is None:
        return None, None, None
    streak_ender = next((t for t in league.teams if t.team_id == opp_tid), None)
    unstoppable_name = getattr(unstoppable_team, "team_name", "?")
    return streak_ender, loss_week, unstoppable_name


def free_fall_winner(league, weeks, standings_list=None):
    """
    Premio "Free Fall": el #1 en racha de derrotas (el más “castigado”).
    Desempate: (1) menor avg PF durante la racha, (2) peor avg diferencial,
    (3) el que terminó último en standings (mayor final_standing = último lugar).
    standings_list: lista de equipos ordenada por puesto final (1º, 2º, ...); si None, se usa league.teams ordenado por final_standing.
    Devuelve (team, streak_length) o (None, 0) si nadie tiene racha.
    """
    if standings_list is None:
        def _standing_key(team):
            s = getattr(team, "final_standing", None) or getattr(team, "standing", None)
            return (s is None or s == 0) and 0 or int(s)
        standings_list = sorted(league.teams, key=_standing_key)
    standing_by_tid = {t.team_id: idx for idx, t in enumerate(standings_list, 1)}  # 1-based rank
    details = win_lose_streak_details_by_team(league, weeks)
    candidates = [
        t for t in league.teams
        if details.get(t.team_id, {}).get("max_lose_streak", 0) > 0
    ]
    if not candidates:
        return None, 0
    def key(t):
        d = details.get(t.team_id, {})
        streak = d.get("max_lose_streak", 0)
        avg_pf = d.get("max_lose_avg_pf", 0.0)
        avg_diff = d.get("max_lose_avg_diff", 0.0)
        final_standing = standing_by_tid.get(t.team_id, 0)
        return (streak, -avg_pf, -avg_diff, final_standing)  # menor PF y peor diff = más negativo; último = mayor standing
    best = max(candidates, key=key)
    streak = details.get(best.team_id, {}).get("max_lose_streak", 0)
    return best, streak


def win_streak_ranking(league, weeks):
    """
    Ranking completo de rachas de victorias: lista de (team_id, team_name, streak_value)
    ordenada por el mismo criterio que unstoppable_winner (streak desc, avg_pf desc, avg_diff desc, first_week asc).
    """
    details = win_lose_streak_details_by_team(league, weeks)
    candidates = [
        t for t in league.teams
        if details.get(t.team_id, {}).get("max_win_streak", 0) > 0
    ]
    if not candidates:
        return []
    def key(t):
        d = details.get(t.team_id, {})
        streak = d.get("max_win_streak", 0)
        avg_pf = d.get("max_win_avg_pf", 0.0)
        avg_diff = d.get("max_win_avg_diff", 0.0)
        first_week = d.get("max_win_first_week") or 999
        return (streak, avg_pf, avg_diff, -first_week)
    candidates.sort(key=key, reverse=True)
    return [(t.team_id, t.team_name, details.get(t.team_id, {}).get("max_win_streak", 0)) for t in candidates]


def lose_streak_ranking(league, weeks, standings_list=None):
    """
    Ranking completo de rachas de derrotas: lista de (team_id, team_name, streak_value)
    ordenada por el mismo criterio que free_fall_winner (streak desc, -avg_pf, -avg_diff, final_standing desc).
    """
    if standings_list is None:
        def _standing_key(team):
            s = getattr(team, "final_standing", None) or getattr(team, "standing", None)
            return (s is None or s == 0) and 0 or int(s)
        standings_list = sorted(league.teams, key=_standing_key)
    standing_by_tid = {t.team_id: idx for idx, t in enumerate(standings_list, 1)}
    details = win_lose_streak_details_by_team(league, weeks)
    candidates = [
        t for t in league.teams
        if details.get(t.team_id, {}).get("max_lose_streak", 0) > 0
    ]
    if not candidates:
        return []
    def key(t):
        d = details.get(t.team_id, {})
        streak = d.get("max_lose_streak", 0)
        avg_pf = d.get("max_lose_avg_pf", 0.0)
        avg_diff = d.get("max_lose_avg_diff", 0.0)
        final_standing = standing_by_tid.get(t.team_id, 0)
        return (streak, -avg_pf, -avg_diff, final_standing)
    candidates.sort(key=key, reverse=True)
    return [(t.team_id, t.team_name, details.get(t.team_id, {}).get("max_lose_streak", 0)) for t in candidates]


# ---------------------------------------------------------------------------
# Partidos cerrados
# ---------------------------------------------------------------------------

def close_games(league, team_id, weeks, margin=100):
    """Matchups con diferencia <= margin puntos. Lista de (week, diff, result, my_pts, opp_pts)."""
    pts, opp, _, res = weekly_points_for_team(league, team_id, weeks)
    out = []
    for w in pts:
        diff = abs(pts[w] - opp[w])
        if diff <= margin:
            out.append((w, diff, res[w], pts[w], opp[w]))
    return out


def close_games_with_opponent(league, team_id, weeks, team_by_id, margin=100):
    """Partidos cerrados con rival y puntaje. Lista de dict: week, margin, result, my_pts, opp_pts, opponent_id, opponent_name."""
    pts, opp, opp_id, res = weekly_points_for_team(league, team_id, weeks)
    out = []
    for w in pts:
        diff = abs(pts[w] - opp[w])
        if diff <= margin:
            oid = opp_id.get(w)
            oname = team_by_id.get(oid, type("T", (), {"team_name": "?"})()).team_name if oid is not None else "?"
            out.append({
                "week": w,
                "margin": diff,
                "result": res[w],
                "my_pts": pts[w],
                "opp_pts": opp[w],
                "opponent_id": oid,
                "opponent_name": oname,
            })
    return out


def close_record(close_list):
    """W-L-T a partir de la lista de close_games (tuplas)."""
    w = sum(1 for _, _, r, _, _ in close_list if r == "W")
    l = sum(1 for _, _, r, _, _ in close_list if r == "L")
    t = sum(1 for _, _, r, _, _ in close_list if r == "T")
    return w, l, t


def closer_and_choke(league, weeks, team_by_id, margin=100):
    """
    The Closer: equipo que más partidos cerrados ganó.
    The Choke: equipo que más partidos cerrados perdió.
    Devuelve (closer_team, closer_wins_list, choke_team, choke_losses_list).
    closer_wins_list / choke_losses_list: lista de dict con week, opponent_name, my_pts, opp_pts, result.
    """
    by_team = {}
    for t in league.teams:
        games = close_games_with_opponent(league, t.team_id, weeks, team_by_id, margin=margin)
        wins = [g for g in games if g["result"] == "W"]
        losses = [g for g in games if g["result"] == "L"]
        by_team[t.team_id] = {"team": t, "wins": wins, "losses": losses, "n_wins": len(wins), "n_losses": len(losses)}

    closer_tid = max(by_team.keys(), key=lambda tid: by_team[tid]["n_wins"]) if by_team else None
    choke_tid = max(by_team.keys(), key=lambda tid: by_team[tid]["n_losses"]) if by_team else None

    closer_team = by_team[closer_tid]["team"] if closer_tid else None
    closer_wins = by_team[closer_tid]["wins"] if closer_tid else []
    choke_team = by_team[choke_tid]["team"] if choke_tid else None
    choke_losses = by_team[choke_tid]["losses"] if choke_tid else []

    return closer_team, closer_wins, choke_team, choke_losses


def closest_matchup(league, team_id, weeks, team_by_id):
    """
    El matchup más cerrado del equipo (menor margen de puntos).
    Devuelve dict con week, margin, result, my_pts, opp_pts, opponent_id, opponent_name,
    o None si no hay datos.
    """
    pts, opp, opp_id, res = weekly_points_for_team(league, team_id, weeks)
    if not pts:
        return None
    best_w = min(pts, key=lambda w: abs(pts[w] - opp[w]))
    margin = abs(pts[best_w] - opp[best_w])
    oid = opp_id.get(best_w)
    oname = team_by_id.get(oid, type("T", (), {"team_name": "?"})()).team_name if oid is not None else "?"
    return {
        "week": best_w,
        "margin": margin,
        "result": res[best_w],
        "my_pts": pts[best_w],
        "opp_pts": opp[best_w],
        "opponent_id": oid,
        "opponent_name": oname,
    }


# ---------------------------------------------------------------------------
# Rivales y némesis
# ---------------------------------------------------------------------------

def rival_by_points_combined(league, team_id, weeks, team_by_id):
    """Rival con más puntos combinados (nuestros + suyos) en los enfrentamientos."""
    pts, opp, opp_id, _ = weekly_points_for_team(league, team_id, weeks)
    if not pts:
        return None
    combined = defaultdict(float)
    count = defaultdict(int)
    for w in pts:
        oid = opp_id[w]
        combined[oid] += pts[w] + opp[w]
        count[oid] += 1
    best_oid = max(combined, key=lambda k: combined[k])
    return {
        "opponent_id": best_oid,
        "opponent_name": team_by_id.get(best_oid, type("T", (), {"team_name": "?"})()).team_name,
        "games": count[best_oid],
        "combined_points": combined[best_oid],
    }


def nemesis_by_biggest_loss(league, team_id, weeks, team_by_id):
    """Némesis: rival que nos ganó por mayor margen."""
    pts, opp, opp_id, res = weekly_points_for_team(league, team_id, weeks)
    losses = [(w, opp[w] - pts[w], opp_id[w]) for w in pts if res[w] == "L"]
    if not losses:
        return None
    w, margin, oid = max(losses, key=lambda x: x[1])
    return {
        "week": w,
        "opponent_id": oid,
        "opponent_name": team_by_id.get(oid, type("T", (), {"team_name": "?"})()).team_name,
        "margin": margin,
        "my_points": pts[w],
        "opp_points": opp[w],
    }


def pair_rivalries(league, weeks, min_games=2):
    """
    Estadísticas por par de equipos (par único, no direccional).
    Devuelve:
      pair_stats: dict[(min_id, max_id)] -> {"games": g, "combined_points": x}
      combined_list: lista de combined_points de todos los pares con g >= min_games
    """
    combined = defaultdict(float)
    games = defaultdict(int)

    for t in league.teams:
        pts, opp, opp_id, _ = weekly_points_for_team(league, t.team_id, weeks)
        for w, my_pts in pts.items():
            oid = opp_id.get(w)
            if oid is None:
                continue
            a, b = sorted([t.team_id, oid])
            # Solo suma cuando t.team_id es el menor id del par (evita duplicar A-B y B-A).
            if t.team_id != a:
                continue
            combined[(a, b)] += my_pts + opp[w]
            games[(a, b)] += 1

    pair_stats = {}
    combined_list = []
    for k in combined.keys():
        g = games[k]
        if g >= min_games:
            pair_stats[k] = {"games": g, "combined_points": combined[k]}
            combined_list.append(combined[k])
    return pair_stats, combined_list


def rivals_count_per_team_by_pairs(league, weeks, team_by_id, min_games=2, threshold_fn=median):
    """
    Cuenta rivales por equipo usando pares únicos (A,B). Rivalidad fuerte entre A y B
    si jugaron >= min_games y sus puntos combinados están por encima del umbral.
    La rivalidad es mutua: si (A,B) supera el umbral, tanto A como B se cuentan como rivales.
    Devuelve dict team_id -> {"count": N, "rival_names": [...], "rival_ids": [...]}.
    """
    pair_stats, combined_list = pair_rivalries(league, weeks, min_games=min_games)
    if not combined_list:
        return {t.team_id: {"count": 0, "rival_names": [], "rival_ids": []} for t in league.teams}

    threshold = threshold_fn(combined_list)
    rivals = {t.team_id: set() for t in league.teams}
    for (a, b), s in pair_stats.items():
        if s["combined_points"] >= threshold:
            rivals[a].add(b)
            rivals[b].add(a)

    result = {}
    for tid, opp_ids in rivals.items():
        sorted_ids = sorted(opp_ids)
        result[tid] = {
            "count": len(opp_ids),
            "rival_ids": sorted_ids,
            "rival_names": [
                team_by_id.get(oid, type("T", (), {"team_name": "?"})()).team_name
                for oid in sorted_ids
            ],
        }
    return result


def rivals_count_per_team(league, weeks, team_by_id):
    """
    Para cada equipo, cuenta cuántos "rivales" tiene (pares únicos, rivalidad mutua).
    Delega en rivals_count_per_team_by_pairs con min_games=2 y umbral mediana.
    Devuelve dict team_id -> {"count": N, "rival_names": [...], "rival_ids": [...]}.
    """
    return rivals_count_per_team_by_pairs(
        league, weeks, team_by_id, min_games=2, threshold_fn=median
    )


def rival_no1_counts(league, weeks, team_by_id):
    """
    Para cada equipo B: cuántos equipos tienen a B como su rival #1 (por puntos combinados).
    Mide "cuántas veces fuiste el rival principal de otros".
    Devuelve dict team_id -> {"count": N, "pointed_by_ids": [...], "pointed_by_names": [...]}.
    """
    pointed_by = defaultdict(list)  # team_id -> list of team_ids that have them as rival #1
    for t in league.teams:
        rival = rival_by_points_combined(league, t.team_id, weeks, team_by_id)
        if rival is not None:
            oid = rival["opponent_id"]
            pointed_by[oid].append(t.team_id)
    result = {}
    for tid in pointed_by:
        ids = pointed_by[tid]
        result[tid] = {
            "count": len(ids),
            "pointed_by_ids": ids,
            "pointed_by_names": [
                team_by_id.get(i, type("T", (), {"team_name": "?"})()).team_name for i in ids
            ],
        }
    for t in league.teams:
        if t.team_id not in result:
            result[t.team_id] = {"count": 0, "pointed_by_ids": [], "pointed_by_names": []}
    return result


def public_enemy_no1(league, weeks, team_by_id, min_rivals=2):
    """
    Premio "Public Enemy No. 1": el equipo que más veces aparece como rival #1 de los demás.
    = cuántos equipos lo señalan como su rival con más puntos combinados.
    Solo se otorga si ese equipo tiene min_rivals o más; si no, nadie lo gana.
    Devuelve (team, count, pointed_by_names) — count y nombres de quienes te tienen como rival #1.
    """
    counts = rival_no1_counts(league, weeks, team_by_id)
    if not counts:
        return None, 0, []
    best_tid = max(counts.keys(), key=lambda tid: counts[tid]["count"])
    if counts[best_tid]["count"] < min_rivals:
        return None, 0, []
    team = next((t for t in league.teams if t.team_id == best_tid), None)
    return team, counts[best_tid]["count"], counts[best_tid]["pointed_by_names"]


def rival_by_points_combined_from_pairs(team_id, pair_stats, team_by_id):
    """
    Archirrival de un equipo (oponente con más puntos combinados) a partir de pair_stats.
    Útil para consistencia cuando ya se tiene pair_stats (p. ej. de pair_rivalries).
    """
    best_oid, best = None, None
    for (a, b), s in pair_stats.items():
        if team_id not in (a, b):
            continue
        oid = b if team_id == a else a
        if best is None or s["combined_points"] > best["combined_points"]:
            best = s
            best_oid = oid
    if best is None:
        return None
    return {
        "opponent_id": best_oid,
        "opponent_name": (
            team_by_id[best_oid].team_name if best_oid in team_by_id else "?"
        ),
        "games": best["games"],
        "combined_points": best["combined_points"],
    }


def upset_vs_final_1(league, team_id, weeks):
    """Victorias contra el equipo que terminó en 1er lugar (campeón)."""
    teams_list = league.teams
    if not teams_list:
        return []
    final1 = min(teams_list, key=lambda t: getattr(t, "final_standing", 99) or 99)
    target_id = final1.team_id
    pts, opp, opp_id, res = weekly_points_for_team(league, team_id, weeks)
    return [(w, pts[w], opp[w]) for w in pts if opp_id[w] == target_id and res[w] == "W"]


# ---------------------------------------------------------------------------
# Actividad (trades, waivers)
# ---------------------------------------------------------------------------

def _normalize_action_tuple(tup):
    team = tup[0] if len(tup) > 0 else None
    action = tup[1] if len(tup) > 1 else None
    player = tup[2] if len(tup) > 2 else None
    extra = tup[3:] if len(tup) > 3 else ()
    return team, action, player, extra


def _player_label(player):
    if player is None:
        return ""
    return getattr(player, "name", None) or getattr(player, "full_name", None) or str(player)


def count_activity_by_team(activities):
    """Cuenta actividades por team_id (cualquier tipo de actividad)."""
    counts = defaultdict(int)
    for act in activities:
        for tup in getattr(act, "actions", []):
            team, _, _, _ = _normalize_action_tuple(tup)
            if team:
                counts[getattr(team, "team_id", team)] += 1
    return dict(counts)


def _parse_one_trade(act, team_by_id):
    """
    Parsea una actividad de trade en el intercambio completo.
    espn_api basketball: cada action es (team, action, player, position).
    Para TRADED (msg_id 244) el team es msg['from'] = equipo que ENVÍA a ese jugador.
    No hay RECEIVED explícito; lo inferimos: lo que A envió lo recibió B y viceversa.
    """
    actions = getattr(act, "actions", [])
    if not actions:
        return None

    # Por equipo: jugadores que ENVIÓ (en espn_api basketball "TRADED" = enviado por ese team)
    by_team = defaultdict(list)  # team_id -> list of player names sent
    for tup in actions:
        team, action, player, _ = _normalize_action_tuple(tup)
        if not team:
            continue
        action_str = (action or "").upper()
        # TRADED = ese equipo envió a ese jugador (espn_api usa msg['from'] para 244)
        if "TRADE" in action_str or action_str in ("TRADE", "SENT", "TRADED"):
            tid = getattr(team, "team_id", team)
            name = _player_label(player)
            if name:
                by_team[tid].append(name)
        # Si en el futuro hay RECEIVED explícito, se puede añadir aquí

    team_ids = list(by_team.keys())
    if len(team_ids) < 2:
        return None  # trade típico es entre 2 equipos (o más en 3-way)

    # Recibidos = lo que envió el otro equipo
    sent_a = by_team.get(team_ids[0], [])
    sent_b = by_team.get(team_ids[1], [])
    tid_a, tid_b = team_ids[0], team_ids[1]
    if len(team_ids) > 2:
        # 3-way trade: recibidos de A = todo lo enviado por B y por el tercero, etc.
        received_a = []
        received_b = []
        for tid in team_ids:
            if tid != tid_a:
                received_a.extend(by_team.get(tid, []))
            if tid != tid_b:
                received_b.extend(by_team.get(tid, []))
    else:
        received_a = list(sent_b)
        received_b = list(sent_a)

    name_a = team_by_id.get(tid_a, type("T", (), {"team_name": "?"})()).team_name
    name_b = team_by_id.get(tid_b, type("T", (), {"team_name": "?"})()).team_name
    d = getattr(act, "date", None)
    d_str = d.date() if d and hasattr(d, "date") else d

    return {
        "date": d_str,
        "team_a_id": tid_a,
        "team_a_name": name_a,
        "team_a_sent": sent_a,
        "team_a_received": received_a,
        "team_b_id": tid_b,
        "team_b_name": name_b,
        "team_b_sent": sent_b,
        "team_b_received": received_b,
    }


def _group_trade_activities_by_date(trade_acts):
    """
    ESPN a veces devuelve un topic por movimiento (un jugador), no un topic por trade.
    Agrupa actividades por fecha y devuelve una lista de "actividades" combinadas
    (cada una con actions de todos los topics de esa fecha).
    """
    by_date = defaultdict(list)  # date_key -> list of actions
    for act in trade_acts:
        date_val = getattr(act, "date", None)
        date_key = date_val.date() if date_val and hasattr(date_val, "date") else date_val
        if date_key is None:
            date_key = "unknown"
        for tup in getattr(act, "actions", []):
            by_date[date_key].append(tup)

    # Objetos con .actions y .date para _parse_one_trade
    class SimpleAct:
        def __init__(self, actions, date):
            self.actions = actions
            self.date = date

    return [SimpleAct(actions=actions, date=dt) for dt, actions in sorted(by_date.items(), key=lambda x: str(x[0]))]


def summarize_trade_activity(trade_acts, team_by_id, max_samples=10):
    """
    Por equipo: conteo de trades y hasta max_samples intercambios completos.
    Cada muestra incluye: fecha, el otro equipo, jugadores que envió y jugadores que recibió.
    Si cada topic de la API tiene un solo movimiento, se agrupan por fecha para formar el trade completo.
    """
    per_team = defaultdict(int)
    samples = defaultdict(list)  # team_id -> list of full trade dicts

    # Primero intentar tal cual; si no sale nada, agrupar por fecha
    parsed_any = False
    for act in trade_acts:
        trade = _parse_one_trade(act, team_by_id)
        if trade:
            parsed_any = True
            tid_a, tid_b = trade["team_a_id"], trade["team_b_id"]
            per_team[tid_a] += 1
            per_team[tid_b] += 1
            if len(samples[tid_a]) < max_samples:
                samples[tid_a].append(trade)
            if len(samples[tid_b]) < max_samples:
                samples[tid_b].append(trade)

    if not parsed_any and trade_acts:
        # Agrupar por fecha (un topic por jugador movido)
        merged = _group_trade_activities_by_date(trade_acts)
        for act in merged:
            trade = _parse_one_trade(act, team_by_id)
            if not trade:
                continue
            tid_a, tid_b = trade["team_a_id"], trade["team_b_id"]
            per_team[tid_a] += 1
            per_team[tid_b] += 1
            if len(samples[tid_a]) < max_samples:
                samples[tid_a].append(trade)
            if len(samples[tid_b]) < max_samples:
                samples[tid_b].append(trade)

    return dict(per_team), dict(samples)


def format_trade_for_team(trade, team_id):
    """Texto legible del trade desde la perspectiva de un equipo."""
    if trade["team_a_id"] == team_id:
        my_name = trade["team_a_name"]
        my_sent = trade["team_a_sent"]
        my_received = trade["team_a_received"]
        other_name = trade["team_b_name"]
    else:
        my_name = trade["team_b_name"]
        my_sent = trade["team_b_sent"]
        my_received = trade["team_b_received"]
        other_name = trade["team_a_name"]
    sent_str = ", ".join(my_sent) if my_sent else "—"
    recv_str = ", ".join(my_received) if my_received else "—"
    return f"  {trade['date']}: {my_name} envió [{sent_str}] y recibió [{recv_str}] (con {other_name})"


# ---------------------------------------------------------------------------
# 9CAT H2H – dominio por categorías (team.stats)
# ---------------------------------------------------------------------------

# Categorías 9CAT: para ranking. TO (turnovers) son malos: el que tiene MENOS es el mejor (rank 1).
NINECAT_KEYS = ["PTS", "REB", "AST", "STL", "BLK", "3PM", "FG%", "FT%", "TO"]
LOWER_IS_BETTER = {"TO"}  # menor valor = mejor → orden ascendente, rank 1 = menos TO


def get_team_9cat_stats(team):
    """
    Extrae estadísticas 9CAT de team.stats (espn_api: valuesByStat mapeado por STATS_MAP).
    Incluye FGM/FGA, FTM/FTA para FG% y FT%; TO para turnovers.
    """
    raw = getattr(team, "stats", None) or {}
    # Aceptar claves string o numéricas (STATS_MAP devuelve PTS, REB, etc.)
    def get(*keys):
        for k in keys:
            v = raw.get(k)
            if v is None and isinstance(k, str) and k.isdigit():
                v = raw.get(int(k))
            if v is None and isinstance(k, int):
                v = raw.get(str(k))
            if v is not None:
                try:
                    return float(v)
                except (TypeError, ValueError):
                    pass
        return None

    fgm, fga = get("FGM", "13"), get("FGA", "14")
    ftm, fta = get("FTM", "15"), get("FTA", "16")
    pts = get("PTS", "0")
    reb = get("REB", "6")
    ast = get("AST", "3")
    stl = get("STL", "2")
    blk = get("BLK", "1")
    threes = get("3PM", "17")
    to = get("TO", "11")

    out = {
        "PTS": pts,
        "REB": reb,
        "AST": ast,
        "STL": stl,
        "BLK": blk,
        "3PM": threes,
        "TO": to,
        "FGM": fgm,
        "FGA": fga,
        "FTM": ftm,
        "FTA": fta,
    }
    if fga and fga > 0 and fgm is not None:
        out["FG%"] = round(fgm / fga, 4)
    else:
        out["FG%"] = None
    if fta and fta > 0 and ftm is not None:
        out["FT%"] = round(ftm / fta, 4)
    else:
        out["FT%"] = None
    return out


def league_9cat_rankings(teams):
    """
    Para cada categoría 9CAT, rankea equipos (1 = mejor).
    TO: menor es mejor. Devuelve (team_ranks, raw_values).
    team_ranks: dict team_id -> { cat: rank }
    raw_values: dict team_id -> { cat: value } (para reportes)
    """
    all_stats = {}
    for t in teams:
        all_stats[t.team_id] = get_team_9cat_stats(t)

    cats_used = [c for c in NINECAT_KEYS if any(all_stats[tid].get(c) is not None for tid in all_stats)]
    team_ranks = {tid: {} for tid in all_stats}
    raw_values = {tid: dict(all_stats[tid]) for tid in all_stats}

    for cat in cats_used:
        values = [(tid, all_stats[tid].get(cat)) for tid in all_stats if all_stats[tid].get(cat) is not None]
        if not values:
            continue
        # TO: menor valor = mejor (rank 1 = menos turnovers). Resto: mayor = mejor.
        lower_is_better = cat in LOWER_IS_BETTER
        # Orden ascendente para TO (menor primero); descendente para el resto (mayor primero).
        reverse = not lower_is_better
        # None: peor rango posible (al final en ascendente = 1e9; al final en descendente = 0)
        values.sort(
            key=lambda x: (x[1] if x[1] is not None else (1e9 if lower_is_better else 0)),
            reverse=reverse,
        )
        for rank, (tid, _) in enumerate(values, start=1):
            team_ranks[tid][cat] = rank

    return team_ranks, raw_values


def category_dominance_report(teams, team_ranks, top_n=3):
    """Por equipo: categorías en las que está en top_n (domina)."""
    n_teams = len(teams)
    if n_teams == 0:
        return {}
    report = {}
    for t in teams:
        tid = t.team_id
        dominates = [c for c, r in (team_ranks.get(tid) or {}).items() if r is not None and r <= top_n]
        loses = [c for c, r in (team_ranks.get(tid) or {}).items() if r is not None and r > n_teams - top_n]
        report[tid] = {"dominates": dominates, "loses": loses, "ranks": team_ranks.get(tid) or {}}
    return report


# ---------------------------------------------------------------------------
# MVPs de la temporada (top N jugadores por equipo)
# ---------------------------------------------------------------------------

def team_mvps(team, n=3):
    """
    Top N jugadores del equipo por puntos de fantasy (total_points).
    team.roster son Player con .total_points y .name.
    """
    roster = getattr(team, "roster", []) or []
    with_pts = [(p, getattr(p, "total_points", None) or 0) for p in roster]
    with_pts.sort(key=lambda x: (x[1] or 0), reverse=True)
    return [(getattr(p, "name", None) or str(p), pts) for p, pts in with_pts[:n]]


# ---------------------------------------------------------------------------
# Evolución del roster (drafted vs actual)
# ---------------------------------------------------------------------------

def get_drafted_roster_by_team(league):
    """league.draft son BasePick con .team (Team), .playerId, .playerName (o similar)."""
    by_team = defaultdict(list)
    draft = getattr(league, "draft", None) or []
    for pick in draft:
        t = getattr(pick, "team", None)
        if t is None:
            continue
        tid = getattr(t, "team_id", None)
        if tid is None:
            continue
        pid = getattr(pick, "playerId", None) or getattr(pick, "player_id", None)
        pname = getattr(pick, "playerName", None) or getattr(pick, "player_name", None)
        if pid is None and pname is None:
            continue
        by_team[tid].append({"playerId": pid, "name": pname or str(pid)})
    return dict(by_team)


def _player_info_map_from_rosters(league):
    """Mapa playerId -> (position, pro_team) desde todos los rosters actuales (para enriquecer draft)."""
    info = {}
    for t in league.teams:
        for p in getattr(t, "roster", []) or []:
            pid = getattr(p, "playerId", None) or getattr(p, "player_id", None)
            if pid is None:
                continue
            pos = getattr(p, "position", None) or getattr(p, "defaultPositionId", "") or "—"
            pro = getattr(p, "proTeam", None) or getattr(p, "pro_team", "") or "—"
            info[pid] = (pos, pro)
    return info


def roster_evolution(league, team):
    """
    Drafted vs actual: listas con nombre, posición y equipo profesional.
    drafted: lista de dict con name, position, pro_team (position/pro_team "—" si no está en roster actual).
    current: lista de dict con name, position, pro_team desde team.roster.
    """
    drafted = get_drafted_roster_by_team(league)
    tid = team.team_id
    draft_list = drafted.get(tid, [])
    player_info = _player_info_map_from_rosters(league)

    drafted_enriched = []
    for p in draft_list:
        pid = p.get("playerId")
        name = p.get("name") or str(pid or "")
        pos, pro = player_info.get(pid, ("—", "—"))
        drafted_enriched.append({"name": name, "position": pos, "pro_team": pro})

    current = getattr(team, "roster", []) or []
    current_enriched = []
    for p in current:
        name = getattr(p, "name", None) or str(getattr(p, "playerId", ""))
        pos = getattr(p, "position", None) or getattr(p, "defaultPositionId", "") or "—"
        pro = getattr(p, "proTeam", None) or getattr(p, "pro_team", "") or "—"
        current_enriched.append({"name": name, "position": pos, "pro_team": pro})

    return {"drafted": drafted_enriched, "current": current_enriched}


# ---------------------------------------------------------------------------
# Actividad por equipo (trades, adds, drops) y percentiles
# ---------------------------------------------------------------------------

def get_activity_per_team(league):
    """trades, acquisitions, drops por equipo desde team.transactionCounter."""
    out = []
    for t in league.teams:
        trades = getattr(t, "trades", None) or 0
        acquisitions = getattr(t, "acquisitions", None) or 0
        drops = getattr(t, "drops", None) or 0
        total = trades + acquisitions + drops
        out.append({
            "team_id": t.team_id,
            "team_name": t.team_name,
            "trades": trades,
            "acquisitions": acquisitions,
            "drops": drops,
            "total_activity": total,
        })
    return out


def _percentile_rank(values, x):
    """Percentil (0-100) de x en la lista values. x es uno de los valores."""
    if not values:
        return 50
    sorted_v = sorted(values)
    n = len(sorted_v)
    pos = sorted_v.index(x) if x in sorted_v else sum(1 for v in sorted_v if v < x)
    return round(100 * pos / (n - 1), 1) if n > 1 else 50


def _normalize_to_100(values_dict, higher_is_better=True):
    """
    Normalize a dict team_id -> value to 0-100 scale (min=0, max=100).
    higher_is_better: if True, max value gets 100; if False, min value gets 100.
    """
    if not values_dict:
        return {}
    vals = list(values_dict.values())
    lo, hi = min(vals), max(vals)
    if lo == hi:
        return {tid: 100.0 for tid in values_dict}
    out = {}
    for tid, v in values_dict.items():
        if higher_is_better:
            out[tid] = 100.0 * (v - lo) / (hi - lo)
        else:
            out[tid] = 100.0 * (hi - v) / (hi - lo)
    return out


# ---------------------------------------------------------------------------
# Playoff outcome (how far the team went)
# ---------------------------------------------------------------------------

# Playoff bracket: 6 teams make playoffs, 4 eliminated from contention.
# Round 1: #1, #2 BYE; #3 vs #6, #4 vs #5 → losers get standing 5, 6
# Round 2: winners face #1, #2 → losers get standing 3, 4
# Finals: winner = 1, runner-up = 2
PLAYOFF_OUTCOMES = {
    "champion": ("Champion", "You won the league"),
    "lost_finals": ("Lost in Finals", "You reached the championship and fell short"),
    "lost_round2": ("Lost in Round 2", "You made the playoffs and lost in the second round"),
    "lost_round1": ("Lost in Round 1", "You made the playoffs and lost in the first round"),
    "eliminated": ("Eliminated from playoff contention", "You didn't make the top 6 and missed the playoffs"),
    "made_playoffs": ("In the playoff bracket", "You made the top 6 — playoffs are still in progress"),
    "in_progress": ("Season in progress", "The season hasn't ended yet"),
}


def _standing_int_positive(val):
    """Parse standing; 0 / empty / invalid → None (ESPN often uses 0 before finals are set)."""
    if val is None or val == "":
        return None
    try:
        i = int(val)
        return i if i >= 1 else None
    except (TypeError, ValueError):
        return None


def _regular_season_rank_for_playoffs(team, league):
    """
    1-based regular-season rank for playoff eligibility when final_standing isn't set yet.
    Prefers team.standing; falls back to final_standing; then PF tiebreak among stragglers.
    """
    teams = getattr(league, "teams", []) or []
    if not teams:
        return None

    def sort_key(t):
        s = _standing_int_positive(getattr(t, "standing", None))
        if s is not None:
            return (0, s)
        s2 = _standing_int_positive(getattr(t, "final_standing", None))
        if s2 is not None:
            return (0, s2)
        pf = float(getattr(t, "points_for", 0) or 0)
        return (1, -pf)

    ordered = sorted(teams, key=sort_key)
    tid = getattr(team, "team_id", None)
    for i, t in enumerate(ordered, 1):
        if getattr(t, "team_id", None) == tid:
            return i
    return None


def playoff_outcome(team, n_teams=10, playoff_team_count=6, league=None):
    """
    Returns how far the team went in the league (playoffs).
    Bracket: 6 teams make playoffs; ranks 7+ eliminated from contention.
    Uses final_standing: 1=champion, 2=lost finals, 3-4=lost round 2, 5-6=lost round 1, 7+=eliminated.
    When final_standing is missing or 0 (in progress / ESPN placeholder), uses regular-season rank
    vs playoff_team_count: made_playoffs vs eliminated. Never returns standing=0 for display.
    Returns: dict with keys: outcome (str), title (str), description (str), standing (int|None)
    """
    fs = getattr(team, "final_standing", None)
    standing = _standing_int_positive(fs)

    if standing is None:
        reg = _standing_int_positive(getattr(team, "standing", None))
        if reg is None and league is not None:
            reg = _regular_season_rank_for_playoffs(team, league)
        if reg is None or reg < 1:
            return {
                "outcome": "in_progress",
                "title": PLAYOFF_OUTCOMES["in_progress"][0],
                "description": PLAYOFF_OUTCOMES["in_progress"][1],
                "standing": None,
            }
        if reg <= playoff_team_count:
            title, desc = PLAYOFF_OUTCOMES["made_playoffs"][:2]
            desc = (
                f"You finished the regular season #{reg} and made the top {playoff_team_count}. "
                "Playoff results will show here when the bracket is complete."
            )
            return {
                "outcome": "made_playoffs",
                "title": title,
                "description": desc,
                "standing": reg,
            }
        title, desc = PLAYOFF_OUTCOMES["eliminated"][:2]
        desc = (
            f"You didn't make the top {playoff_team_count} and missed the playoffs "
            f"(regular season #{reg})."
        )
        return {"outcome": "eliminated", "title": title, "description": desc, "standing": reg}

    if standing == 1:
        oc = "champion"
    elif standing == 2:
        oc = "lost_finals"
    elif standing in (3, 4):
        oc = "lost_round2"
    elif standing in (5, 6):
        oc = "lost_round1"
    else:
        oc = "eliminated"
    title, desc = PLAYOFF_OUTCOMES[oc][:2]
    if oc == "eliminated":
        desc = (
            f"You didn't make the top {playoff_team_count} and missed the playoffs "
            f"(regular season #{standing})."
        )
    return {"outcome": oc, "title": title, "description": desc, "standing": standing}


# ---------------------------------------------------------------------------
# MOTY / MVA helpers (standings before playoffs, roster efficiency, transaction impact)
# ---------------------------------------------------------------------------

def standings_before_playoffs(league):
    """
    Regular-season rank (1-based) per team for MOTY.
    Uses team.standing when present (ESPN regular season); else final_standing.
    Returns: (rank_by_team, normalized_score_0_100) where best rank = 100.
    """
    teams = getattr(league, "teams", []) or []
    if not teams:
        return {}, {}
    # standing = regular season; final_standing = after playoffs
    def rank_key(t):
        s = getattr(t, "standing", None)
        if s is None:
            s = getattr(t, "final_standing", None)
        return (s is None or s == 0) and 99 or int(s)
    sorted_teams = sorted(teams, key=rank_key)
    rank_by_team = {t.team_id: idx for idx, t in enumerate(sorted_teams, 1)}
    # Normalize: best rank (1) = 100, worst = 0
    n = len(rank_by_team)
    normalized = {}
    for tid, rank in rank_by_team.items():
        if n <= 1:
            normalized[tid] = 100.0
        else:
            normalized[tid] = 100.0 * (n - rank) / (n - 1)
    return rank_by_team, normalized


def roster_efficiency_differentials(league, weeks, num_starters=10):
    """
    Average points per active slot (starter) and differential vs league average.
    num_starters: from league settings if available; default 10 (typical fantasy basketball).
    Returns: (differential_by_team, normalized_score_0_100) where higher diff = higher score.
    """
    teams = getattr(league, "teams", []) or []
    n_weeks = len(weeks) if weeks else 1
    if not teams or n_weeks == 0:
        return {}, {}
    total_pf = 0.0
    avg_per_slot = {}
    for t in teams:
        pf = float(getattr(t, "points_for", 0) or 0)
        total_pf += pf
        team_avg = (pf / n_weeks) / num_starters if num_starters else 0
        avg_per_slot[t.team_id] = team_avg
    league_avg_per_slot = (total_pf / len(teams)) / n_weeks / num_starters if num_starters else 0
    differential = {tid: avg_per_slot[tid] - league_avg_per_slot for tid in avg_per_slot}
    normalized = _normalize_to_100(differential, higher_is_better=True)
    return differential, normalized


def _build_player_points_by_week(league, weeks):
    """
    Build player points by week from box scores.
    Returns: dict (team_id, player_id) -> dict week -> points
    """
    from datetime import datetime
    
    player_points = {}  # (team_id, player_id) -> {week: points}
    
    for week in weeks:
        try:
            box_scores = league.box_scores(matchup_period=week)
        except Exception as e:
            print(f"[box_scores unavailable] week={week}: {e}")
            continue
        
        for box in box_scores:
            # Home team lineup
            home_tid = getattr(box.home_team, "team_id", None) if hasattr(box.home_team, "team_id") else box.home_team
            if home_tid and hasattr(box, "home_lineup"):
                for player in box.home_lineup:
                    pid = getattr(player, "playerId", None) or getattr(player, "player_id", None)
                    if pid is None:
                        continue
                    pts = getattr(player, "points", 0) or 0
                    key = (home_tid, pid)
                    if key not in player_points:
                        player_points[key] = {}
                    player_points[key][week] = float(pts)
            
            # Away team lineup
            away_tid = getattr(box.away_team, "team_id", None) if hasattr(box.away_team, "team_id") else box.away_team
            if away_tid and hasattr(box, "away_lineup"):
                for player in box.away_lineup:
                    pid = getattr(player, "playerId", None) or getattr(player, "player_id", None)
                    if pid is None:
                        continue
                    pts = getattr(player, "points", 0) or 0
                    key = (away_tid, pid)
                    if key not in player_points:
                        player_points[key] = {}
                    player_points[key][week] = float(pts)
    
    return player_points


def _build_activity_timeline(league, weeks):
    """
    Build activity timeline: per-team stints (player_id, add_week, drop_week).
    Returns: dict team_id -> list of (player_id, add_week, drop_week or None)
    """
    from datetime import datetime
    
    # Get all activities
    try:
        activities = league.recent_activity(size=500, msg_type=None)
    except Exception as e:
        print(f"[recent_activity unavailable]: {e}")
        return {}
    
    # Map dates to weeks (matchup periods)
    # Use league.matchup_ids or schedule to map date -> week
    # For simplicity, we'll use a heuristic: sort activities by date and assign to nearest week
    # Better: use league schedule to get date ranges per week
    week_dates = {}  # week -> (start_date, end_date) if available
    # Fallback: just use activity dates and assign to closest week by index
    
    # Build timeline: per team, per player, track add/drop events
    # (team_id, player_id) -> list of (action, date, week)
    events = {}  # (team_id, player_id) -> [(action, date, week), ...]
    
    for act in activities:
        date = getattr(act, "date", None)
        if date is None:
            continue
        
        # Map date to week (simple heuristic: use first week for now; improve with schedule)
        # For now, we'll assign to the first week in weeks (fallback)
        week = weeks[0] if weeks else 1
        # TODO: improve date->week mapping using league.matchup_ids or schedule
        
        for tup in getattr(act, "actions", []):
            team, action, player, _ = _normalize_action_tuple(tup)
            if not team or not player:
                continue
            tid = getattr(team, "team_id", None)
            if tid is None:
                continue
            pid = getattr(player, "playerId", None) or getattr(player, "player_id", None)
            if pid is None:
                # Try name as fallback
                pid = getattr(player, "name", None) or getattr(player, "full_name", None)
            if not pid:
                continue
            
            action_str = (action or "").upper()
            key = (tid, pid)
            if key not in events:
                events[key] = []
            events[key].append((action_str, date, week))
    
    # Build stints from events: ADD -> DROP or end of season
    stints_by_team = {}  # team_id -> [(player_id, add_week, drop_week), ...]
    
    for (tid, pid), event_list in events.items():
        # Sort by date
        event_list.sort(key=lambda x: x[1] if x[1] else datetime.min)
        
        if tid not in stints_by_team:
            stints_by_team[tid] = []
        
        current_add_week = None
        for action, date, week in event_list:
            if action in ("ADDED", "WAIVER", "CLAIM", "FA ADDED"):
                # Start of a stint
                if current_add_week is None:
                    current_add_week = week
            elif action in ("DROPPED", "DROP"):
                # End of a stint
                if current_add_week is not None:
                    stints_by_team[tid].append((pid, current_add_week, week))
                    current_add_week = None
            elif "TRADE" in action or action == "TRADED":
                # Received via trade: start of a stint (if not already in a stint)
                if current_add_week is None:
                    current_add_week = week
        
        # If still in a stint at end of season, close it with last week
        if current_add_week is not None:
            stints_by_team[tid].append((pid, current_add_week, weeks[-1] if weeks else current_add_week))
    
    return stints_by_team


def transaction_impact_by_team(league, weeks=None):
    """
    Total fantasy points from acquired players (waivers/trades), measured while on roster.
    Uses box scores and activity timeline to compute points contributed per stint.
    Fallback: if box_scores or recent_activity unavailable, uses current roster proxy.
    Returns: dict team_id -> total_points from acquired players.
    """
    weeks = weeks or []
    
    # Try new implementation: stints + box scores
    try:
        player_points = _build_player_points_by_week(league, weeks)
        stints_by_team = _build_activity_timeline(league, weeks)
        
        if not player_points or not stints_by_team:
            raise Exception("Box scores or activity timeline unavailable; using fallback")
        
        out = {}
        for tid, stints in stints_by_team.items():
            total = 0.0
            for pid, add_week, drop_week in stints:
                # Sum points for this player while on this team
                for week in weeks:
                    if week < add_week:
                        continue
                    if drop_week is not None and week > drop_week:
                        continue
                    pts = player_points.get((tid, pid), {}).get(week, 0)
                    total += pts
            out[tid] = total
        
        # Fill in teams with no stints (all drafted players)
        for t in getattr(league, "teams", []) or []:
            if t.team_id not in out:
                out[t.team_id] = 0.0
        
        print("[transaction_impact] Using box scores + activity timeline (points while on roster)")
        return out
    
    except Exception as e:
        print(f"[transaction_impact fallback] {e}")
        print("[transaction_impact] Using activity volume proxy (trades + acquisitions + drops)")
        
        # Fallback: activity volume proxy (managerial effort)
        activity_list = get_activity_per_team(league)
        out = {a["team_id"]: a["total_activity"] for a in activity_list}
        return out


def compute_mva_scores(league, weeks, num_starters=10, roster_weight=0.5, transaction_weight=0.5):
    """
    MVA = Managerial Value Added: roster efficiency + transaction impact.
    Combines roster efficiency (differential vs league avg per slot) and transaction impact
    (points from acquired players while on roster), each normalized 0-100, then weighted.
    Returns: dict team_id -> mva_score (0-100).
    """
    _, roster_norm = roster_efficiency_differentials(league, weeks, num_starters=num_starters)
    tx_raw = transaction_impact_by_team(league, weeks=weeks)
    tx_norm = _normalize_to_100(tx_raw, higher_is_better=True)
    out = {}
    all_tids = set(roster_norm) | set(tx_norm)
    for tid in all_tids:
        r = roster_norm.get(tid, 0)
        tx = tx_norm.get(tid, 0)
        out[tid] = roster_weight * r + transaction_weight * tx
    return out


# ---------------------------------------------------------------------------
# Títulos de primer lugar por categoría (#1 en una cat = un título)
# ---------------------------------------------------------------------------

FIRST_PLACE_TITLES = {
    "PTS": ("The Scoring King", "#1 en PTS"),
    "FG%": ("The Sharpshooter", "#1 en FG%"),
    "FT%": ("The Cold Blooded", "#1 en FT%"),
    "REB": ("The Worm", "#1 en REB"),
    "AST": ("The Point God", "#1 en AST"),
    "3PM": ("The Splash Father", "#1 en 3PM"),
    "STL": ("The Grand Theft Alvarado", "#1 en STL"),
    "BLK": ("The Rim Guardian", "#1 en BLK"),
    "TO": ("The Caretaker", "#1 en TO (menos turnovers)"),
}
MOTY_TITLE = ("MOTY (Manager Of The Year)", "25% Stats, 15% Standings before playoffs, 25% League champion, 35% MVA (Roster efficiency + Transaction impact).")
# MOTY weights (new formula)
MOTY_WEIGHT_STATS = 0.25
MOTY_WEIGHT_STANDINGS = 0.15
MOTY_WEIGHT_LEAGUE_WINNER = 0.25
MOTY_WEIGHT_MVA = 0.35
# Stats: top 3 per category (3-2-1 podium)
STATS_RANK_POINTS = {1: 3, 2: 2, 3: 1}
# MVA sub-weights (within the 35% MVA share)
MVA_WEIGHT_ROSTER_EFF = 0.5
MVA_WEIGHT_TRANSACTION = 0.5
# Default number of active (starter) slots per week if not from league settings
DEFAULT_NUM_STARTERS = 10

# Descripciones de cada título (para imprimir debajo del nombre/etiqueta)
TITLE_DESCRIPTIONS = {
    "The Scoring King": "El equipo que más puntos anotó en la temporada.",
    "The Sharpshooter": "Mejor porcentaje de tiros de campo (FG%).",
    "The Cold Blooded": "Mejor porcentaje de tiros libres (FT%).",
    "The Worm": "El equipo con más rebotes.",
    "The Point God": "El equipo con más asistencias.",
    "The Splash Father": "El equipo con más triples anotados (3PM).",
    "The Grand Theft Alvarado": "El equipo con más robos (STL).",
    "The Rim Guardian": "El equipo con más bloqueos (BLK).",
    "The Caretaker": "El equipo con menos pérdidas de balón (TO).",
    "MOTY (Manager Of The Year)": "25% Stats, 15% Standings before playoffs, 25% League champion, 35% MVA (Roster efficiency + Transaction impact).",
    "The Closer": "Premio al equipo que más partidos cerrados (diferencia ≤100 pts) ganó.",
    "The Choke": "Premio al equipo que más partidos cerrados perdió.",
    "The Kingslayer": "Premio al equipo que derrotó al Unstoppable y terminó con su racha de victorias.",
}

# Mapeo título -> ruta de imagen en public/badges/ (para rewind)
BADGE_IMAGES = {
    "The Scoring King": "/badges/the-scoring-king-badge.png",
    "The Sharpshooter": "/badges/the-sharpshooter-badge.png",
    "The Cold Blooded": "/badges/the-coldblooded-badge.png",
    "The Worm": "/badges/the-worm-badge.png",
    "The Point God": "/badges/the-poing-god-badge.png",
    "The Splash Father": "/badges/the-splash-father-badge.png",
    "The Grand Theft Alvarado": "/badges/grand-theft-alvarado.png",
    "The Rim Guardian": "/badges/the-rim-guardian-badge.png",
    "The Caretaker": "/badges/the-caretaker-badge.png",
    "The Closer": "/badges/the-closer-badge.png",
    "The Choke": "/badges/the-choke.png",
    "The Kingslayer": "/badges/kingslayer.png",
    "Unstoppable": "/badges/the-unstoppable-badge.png",
    "Free Fall": "/badges/free-fall.png",
    "Ceiling Check": "/badges/ceiling-check.png",
    "Public Enemy No. 1": "/badges/public-enemy-no1.png",
    "Manager Of The Year": "/badges/manager-of-the-year.png",
}

# Descripciones de cada sección (header) del reporte
SECTION_DESCRIPTIONS = {
    "team_season_summary": "Resumen de temporada por equipo: victorias, derrotas, empates, puntos a favor/en contra, posición y puesto final.",
    "best_worst_week": "Mejor y peor semana de cada equipo por puntos anotados, y promedio semanal.",
    "close_games": "Partidos con diferencia ≤100 puntos por equipo y récord (W-L-T) en esos partidos.",
    "the_closer": "Premio al equipo que más victorias tuvo en partidos cerrados (≤100 pts de margen).",
    "the_choke": "Premio al equipo que más derrotas tuvo en partidos cerrados.",
    "closest_matchup": "El partido con menor margen de puntos de cada equipo en la temporada.",
    "rival": "El rival con quien cada equipo sumó más puntos combinados (nuestros + suyos) en sus enfrentamientos.",
    "nemesis": "El rival que le ganó a cada equipo por mayor margen en un solo partido.",
    "win_streaks": "Rachas consecutivas de victorias por equipo; se destaca la mayor racha de la liga.",
    "lose_streaks": "Rachas consecutivas de derrotas por equipo; se destaca la mayor racha de la liga.",
    "consistency_ranking": "Ranking de consistencia: menor desviación estándar (std) = más consistente. Incluye etiquetas y gráfica de barras.",
    "trade_activity": "Actividad de trades por equipo con detalle de intercambios (jugadores enviados/recibidos).",
    "dominio_9cat": "Dominancia 9CAT H2H: en qué categorías cada equipo está en top 3 y su puesto (#1, #2, #3).",
    "mvps": "Los 3 jugadores con más puntos de fantasy de la temporada por equipo.",
    "roster_evolution": "Jugadores del draft vs roster actual: nombre, posición y equipo profesional (NBA) de cada uno.",
    "first_place_titles": "Títulos por ser #1 en una categoría (o #2 si el #1 es MOTY). MOTY no compite por títulos de categoría.",
}


# Descripciones de cada arquetipo (sección propia)
ARCHETYPES_DESCRIPTIONS = {
    # Tier A
    "The Big Man": "Dominancia en REB, BLK y FG%. El cartel de los grandes.",
    "The Surgeon": "Dominancia en FG%, FT% y TO (menos pérdidas). Precisión quirúrgica.",
    "The Bulldozer": "Dominancia en PTS, REB y BLK. Aplasta por volumen y tapones.",
    "The Lockdown": "Dominancia en STL y BLK. Defensa total.",
    "The Chess Player": "Dominancia en AST, STL y TO. Control y asistencias.",
    "Live by the Three": "Dominancia en 3PM y PTS. Vive del triple.",
    "The Optimizer": "Bueno sin ser dominante: no top 1, no bottom 3, récord y diferencial positivos pero no extremos. Maximizó resultados con recursos limitados.",
    # Tier B
    "The Efficiency Merchant": "Dominancia en FG% y FT% (aunque pierda TO). Eficiencia pura.",
    "The Chaos Engine": "Dominancia en PTS y 3PM pero pierde en FG% o TO. Caos productivo.",
    "The Swiss Army Knife": "Top 3 en 4 categorías. Versatilidad.",
    "Trade Merchant": "Trades ≥ percentil 75 o ≥10. El que más movió el mercado.",
    # Tier C
    "The Vibes Manager": "No domina nada en top 3 pero no está en los dos últimos en todo.",
    "Away From Keyboard": "Actividad (trades + adds + drops) en percentil bajo. Roster estable.",
    "The Ever Builder": "Muchos movimientos sin dominar ninguna categoría.",
    "The Survivor": "Récord positivo sin dominar ninguna categoría.",
    "The Role Player": "No fuiste la estrella, pero estuviste ahí.",
}

# Tier por arquetipo: A/B = award (confetti), C = standoff (sin confetti)
ARCHETYPE_TIER = {
    "The Big Man": "A", "The Surgeon": "A", "The Bulldozer": "A", "The Lockdown": "A",
    "The Chess Player": "A", "Live by the Three": "A", "Trade Merchant": "A",
    "The Efficiency Merchant": "B", "The Chaos Engine": "B", "The Swiss Army Knife": "B",
    "The Optimizer": "B",
    "The Vibes Manager": "C", "Away From Keyboard": "C", "The Ever Builder": "C",
    "The Survivor": "C", "The Role Player": "C",
}


def compute_moty_winner(league, weeks, team_ranks, num_starters=None):
    """
    MOTY = weighted score: 25% stats (top 1s), 15% standings before playoffs,
    25% league winner, 35% MVA (roster efficiency + transaction impact).
    Returns: (moty_team_id, moty_score, breakdown_by_team).
    breakdown_by_team: dict team_id -> {stats_norm, standings_norm, league_winner_norm, mva_norm, moty_score}.
    """
    num_starters = num_starters if num_starters is not None else DEFAULT_NUM_STARTERS
    teams = getattr(league, "teams", []) or []
    if not teams:
        return None, 0.0, {}

    # Stats: top 3 per category, weighted (3-2-1), normalized 0-100
    stats_raw = {}
    for tid, ranks in team_ranks.items():
        total = 0
        for cat in FIRST_PLACE_TITLES:
            r = ranks.get(cat)
            if r is not None and r in STATS_RANK_POINTS:
                total += STATS_RANK_POINTS[r]
        stats_raw[tid] = total
    stats_norm = _normalize_to_100(stats_raw, higher_is_better=True)

    # Standings before playoffs, normalized 0-100 (best=100)
    _, standings_norm = standings_before_playoffs(league)

    # League winner: 100 if final_standing == 1 else 0
    league_winner_norm = {}
    for t in teams:
        tid = t.team_id
        final_standing = getattr(t, "final_standing", None) or getattr(t, "standing", None)
        league_winner_norm[tid] = 100.0 if (final_standing is not None and int(final_standing) == 1) else 0.0

    # MVA: 0-100 composite
    mva_scores = compute_mva_scores(
        league, weeks, num_starters=num_starters,
        roster_weight=MVA_WEIGHT_ROSTER_EFF, transaction_weight=MVA_WEIGHT_TRANSACTION,
    )

    # Composite MOTY score
    breakdown_by_team = {}
    for t in teams:
        tid = t.team_id
        s = stats_norm.get(tid, 0)
        st = standings_norm.get(tid, 0)
        lw = league_winner_norm.get(tid, 0)
        mva = mva_scores.get(tid, 0)
        moty_score = (
            MOTY_WEIGHT_STATS * s
            + MOTY_WEIGHT_STANDINGS * st
            + MOTY_WEIGHT_LEAGUE_WINNER * lw
            + MOTY_WEIGHT_MVA * mva
        )
        breakdown_by_team[tid] = {
            "stats_norm": s,
            "standings_norm": st,
            "league_winner_norm": lw,
            "mva_norm": mva,
            "moty_score": moty_score,
        }

    # Winner = highest moty_score; tie-break: lower team_id
    if not breakdown_by_team:
        return None, 0.0, {}
    best_tid = max(breakdown_by_team.keys(), key=lambda tid: (breakdown_by_team[tid]["moty_score"], -tid))
    best_score = breakdown_by_team[best_tid]["moty_score"]
    return best_tid, best_score, breakdown_by_team


def compute_first_place_titles(team_ranks, moty_winners=None):
    """
    Por equipo: lista de títulos por ser #1 en una categoría (o #2 si el #1 es MOTY).
    moty_winners: set of team_id that won MOTY (from compute_moty_winner). If None, no MOTY is assigned.
    Devuelve dict team_id -> [ (title_name, label), ... ]
    """
    all_tids = list(team_ranks.keys())
    result = {tid: [] for tid in all_tids}

    moty_winners = moty_winners if moty_winners is not None else set()

    # Por categoría: quién es #1 y quién es #2
    def get_team_at_rank(cat, rank_want):
        for tid, ranks in team_ranks.items():
            if ranks.get(cat) == rank_want:
                return tid
        return None

    # MOTY: solo el título MOTY (no los de categoría que lideran)
    for tid in moty_winners:
        result[tid].append(MOTY_TITLE)

    # Por cada categoría: el título va al #1, salvo si el #1 es MOTY → va al #2 (se muestra como #1)
    for cat in FIRST_PLACE_TITLES:
        tid1 = get_team_at_rank(cat, 1)
        tid2 = get_team_at_rank(cat, 2)
        title_name, _ = FIRST_PLACE_TITLES[cat]
        if tid1 is None:
            continue
        if tid1 in moty_winners:
            # El #1 es MOTY: el título pasa al #2; se muestra como #1 (cedido por MOTY)
            if tid2 is not None:
                result[tid2].append(FIRST_PLACE_TITLES[cat])
        else:
            result[tid1].append(FIRST_PLACE_TITLES[cat])

    return result


# ---------------------------------------------------------------------------
# Arquetipos: exactamente 1 por equipo. Tier A/B = award (confetti), Tier C = standoff (sin confetti).
# ---------------------------------------------------------------------------

def compute_archetypes(league, team_ranks, dominance_report, activity_list, consistency_ranking=None,
                      trade_75_pct=75, min_trades_abs=10):
    """
    Asigna exactamente 1 arquetipo por equipo (primera coincidencia en orden A -> B -> C).
    Devuelve dict team_id -> {"main": str, "tier": "A"|"B"|"C"}.
    """
    n_teams = len(league.teams)
    if n_teams == 0:
        return {}

    trade_values = [a["trades"] for a in activity_list]
    total_act_values = [a["total_activity"] for a in activity_list]
    p75_trades = sorted(trade_values)[min(int((len(trade_values) - 1) * 0.75), len(trade_values) - 1)] if len(trade_values) > 1 else 0

    by_team = {a["team_id"]: a for a in activity_list}

    # Trade Merchant: solo el equipo con más trades en toda la temporada (desempate: menor team_id)
    max_trades = max(a["trades"] for a in activity_list) if activity_list else 0
    trade_merchant_tid = None
    if activity_list and max_trades > 0:
        candidates = [a["team_id"] for a in activity_list if a["trades"] == max_trades]
        trade_merchant_tid = min(candidates) if candidates else None

    # Ranking por diferencial de puntos (PF - PA) para The Optimizer: "no extremo" = no top 3
    team_diffs = [
        (t.team_id, (getattr(t, "points_for", 0) or 0) - (getattr(t, "points_against", 0) or 0))
        for t in league.teams
    ]
    team_diffs.sort(key=lambda x: x[1], reverse=True)
    diff_ranking = {tid: rank for rank, (tid, _) in enumerate(team_diffs, 1)}

    result = {}
    for t in league.teams:
        tid = t.team_id
        ranks = team_ranks.get(tid) or {}
        dom = dominance_report.get(tid) or {}
        dominates = set(dom.get("dominates", []))
        loses = set(dom.get("loses", []))

        act = by_team.get(tid) or {}
        trades = act.get("trades", 0)
        total_act = act.get("total_activity", 0)
        pct_activity = _percentile_rank(total_act_values, total_act) if total_act_values else 50
        wins = getattr(t, "wins", 0) or 0
        losses = getattr(t, "losses", 0) or 0
        positive_record = wins > losses

        main_arch = None

        # ---- Tier A: arquetipos fuertes (primera coincidencia gana)
        if dominates >= {"REB", "BLK", "FG%"}:
            main_arch = "The Big Man"
        elif dominates >= {"FG%", "FT%", "TO"}:
            main_arch = "The Surgeon"
        elif dominates >= {"PTS", "REB", "BLK"}:
            main_arch = "The Bulldozer"
        elif dominates >= {"STL", "BLK"}:
            main_arch = "The Lockdown"
        elif dominates >= {"AST", "STL", "TO"}:
            main_arch = "The Chess Player"
        elif dominates >= {"3PM", "PTS"}:
            main_arch = "Live by the Three"
        elif trade_merchant_tid is not None and tid == trade_merchant_tid:
            main_arch = "Trade Merchant"

        # ---- Tier B: si no hay Tier A
        if main_arch is None:
            if dominates >= {"FG%", "FT%"}:
                main_arch = "The Efficiency Merchant"
            elif dominates >= {"PTS", "3PM"} and (loses & {"FG%", "TO"}):
                main_arch = "The Chaos Engine"
            elif len(dominates) >= 4:
                main_arch = "The Swiss Army Knife"
            else:
                # The Optimizer: bueno sin dominante, competitivo sin flashy, constante sin caótico
                standing = getattr(t, "final_standing", None) or getattr(t, "standing", None)
                standing = int(standing) if standing is not None else None
                pf = getattr(t, "points_for", 0) or 0
                pa = getattr(t, "points_against", 0) or 0
                diff = pf - pa
                rank_diff = diff_ranking.get(tid, 99)
                not_top1 = standing is not None and standing > 1
                not_bottom3 = standing is not None and n_teams >= 4 and standing <= n_teams - 3
                positive_diff = diff > 0
                not_extreme_diff = rank_diff > 3  # no top 3 en diferencial
                if not_top1 and not_bottom3 and positive_record and positive_diff and not_extreme_diff:
                    main_arch = "The Optimizer"

        # ---- Tier C: standoff (sin premio ni castigo)
        if main_arch is None:
            n_cats = len(ranks)
            in_bottom2_count = sum(1 for r in ranks.values() if r is not None and r > n_teams - 2)
            no_dominance = len(dominates) == 0
            not_last_in_everything = n_cats > 0 and in_bottom2_count < n_cats

            if pct_activity < 25:
                main_arch = "Away From Keyboard"
            elif pct_activity >= 75:
                main_arch = "The Ever Builder"
            elif positive_record:
                main_arch = "The Survivor"
            elif no_dominance and not_last_in_everything:
                main_arch = "The Vibes Manager"
            else:
                main_arch = "The Role Player"

        tier = ARCHETYPE_TIER.get(main_arch, "C")
        result[tid] = {"main": main_arch, "tier": tier}
    return result


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    league = get_league()
    teams = league.teams
    team_by_id = {t.team_id: t for t in teams}

    weeks = get_available_weeks(league)
    print("Available matchup periods (weeks):", weeks[:15], f"... total={len(weeks)}")
    if not weeks:
        print("No weeks found. Check LEAGUE_ID, YEAR and ESPN credentials.")
        return

    # Un equipo de ejemplo (primero de la liga)
    if not teams:
        print("No teams in league.")
        return
    example_team = teams[0]
    tid = example_team.team_id

    # Prueba: logos de equipos (get_team_logo_url / get_league_team_logos)
    print("\n--- Logos de equipos (get_team_logo_url / get_league_team_logos) ---")
    logos = get_league_team_logos(league)
    for t in teams:
        url = get_team_logo_url(t)
        status = url if url and len(url) > 60 else (url or "(ninguno)")
        print(f"  {t.team_name} (id={t.team_id}): {status}")
    print(f"  Total: {sum(1 for u in logos.values() if u)}/{len(logos)} equipos con logo")

    print("\n--- Team season summary — por equipo ---")
    print(f"  {SECTION_DESCRIPTIONS['team_season_summary']}")
    for t in teams:
        summary = team_season_summary(t)
        print(f"  {t.team_name}: W-L-T {summary['wins']}-{summary['losses']}-{summary['ties']}, PF={summary['points_for']:.0f}, PA={summary['points_against']:.0f}, standing={summary['standing']}, final_standing={summary['final_standing']}")

    print("\n--- Best / worst week — por equipo ---")
    print(f"  {SECTION_DESCRIPTIONS['best_worst_week']}")
    for t in teams:
        bw = best_and_worst_week(league, t.team_id, weeks)
        if bw.get("best_week") is not None:
            print(f"  {t.team_name}: mejor semana {bw['best_week']} ({bw['best_points']:.0f} pts), peor semana {bw['worst_week']} ({bw['worst_points']:.0f} pts), promedio semanal={bw['avg_weekly']:.1f}")
        else:
            print(f"  {t.team_name}: (sin datos)")

    print("\n--- Close games (margin ≤ 100) — por equipo ---")
    print(f"  {SECTION_DESCRIPTIONS['close_games']}")
    for t in teams:
        cg = close_games(league, t.team_id, weeks, margin=100)
        w, l, t_rec = close_record(cg)
        print(f"  {t.team_name}: partidos cerrados (≤100 pts) = {len(cg)}, récord en esos = {w}-{l}-{t_rec}")

    closer_team, closer_wins, choke_team, choke_losses = closer_and_choke(league, weeks, team_by_id, margin=100)
    print("\n--- The Closer (más partidos cerrados ganados) ---")
    if closer_team and closer_wins:
        print(f"  {closer_team.team_name} — {TITLE_DESCRIPTIONS.get('The Closer', '')}")
        print(f"  {len(closer_wins)} victorias cerradas:")
        for g in closer_wins:
            print(f"    Semana {g['week']}: vs {g['opponent_name']} — {g['my_pts']:.0f}-{g['opp_pts']:.0f} (margen {g['margin']:.0f})")
    else:
        print("  (ninguno)")
    print("\n--- The Choke (más partidos cerrados perdidos) ---")
    print(f"  {SECTION_DESCRIPTIONS['the_choke']}")
    if choke_team and choke_losses:
        print(f"  {choke_team.team_name} — {TITLE_DESCRIPTIONS.get('The Choke', '')}")
        print(f"  {len(choke_losses)} derrotas cerradas:")
        for g in choke_losses:
            print(f"    Semana {g['week']}: vs {g['opponent_name']} — {g['my_pts']:.0f}-{g['opp_pts']:.0f} (margen {g['margin']:.0f})")
    else:
        print("  (ninguno)")

    pen_team, pen_count, pen_rival_names = public_enemy_no1(league, weeks, team_by_id)
    print("\n--- Public Enemy No. 1 (más veces rival #1 de otros, ≥2) ---")
    if pen_team and pen_count >= 2:
        print(f"  {pen_team.team_name} — {pen_count} equipos lo tienen como rival #1")
        print("  Lo señalan como rival #1:", ", ".join(pen_rival_names))
    else:
        print("  (ninguno — se requiere 2+ rivales)")

    print("\n--- Matchup más cerrado de cada equipo ---")
    for t in teams:
        closest = closest_matchup(league, t.team_id, weeks, team_by_id)
        if closest:
            print(f"  {t.team_name}: semana {closest['week']} vs {closest['opponent_name']}, margen {closest['margin']:.0f} pts ({closest['my_pts']:.0f}-{closest['opp_pts']:.0f}) → {closest['result']}")
        else:
            print(f"  {t.team_name}: (sin datos)")

    print("\n--- Rival (most combined points) — por equipo ---")
    print(f"  {SECTION_DESCRIPTIONS['rival']}")
    for t in teams:
        rival = rival_by_points_combined(league, t.team_id, weeks, team_by_id)
        if rival:
            print(f"  {t.team_name}: rival → {rival['opponent_name']} (id={rival['opponent_id']}), partidos={rival['games']}, pts combinados={rival['combined_points']:.0f}")
        else:
            print(f"  {t.team_name}: (sin rival)")

    print("\n--- Nemesis (biggest loss) — por equipo ---")
    print(f"  {SECTION_DESCRIPTIONS['nemesis']}")
    for t in teams:
        nem = nemesis_by_biggest_loss(league, t.team_id, weeks, team_by_id)
        if nem:
            print(f"  {t.team_name}: némesis → {nem['opponent_name']} (id={nem['opponent_id']}), semana {nem['week']}, margen {nem['margin']:.0f} ({nem['my_points']:.0f}-{nem['opp_points']:.0f})")
        else:
            print(f"  {t.team_name}: (sin némesis)")

    # Rachas de victorias y derrotas
    streaks_by_team = win_and_lose_streaks_by_team(league, weeks)
    unstoppable_team, unstoppable_streak = unstoppable_winner(league, weeks)
    standings_for_free = sorted(teams, key=lambda t: getattr(t, "final_standing", None) or getattr(t, "standing", 99) or 99)
    free_fall_team, free_fall_streak = free_fall_winner(league, weeks, standings_for_free)

    print("\n--- Unstoppable (#1 racha de victorias) ---")
    if unstoppable_team and unstoppable_streak > 0:
        print(f"  {unstoppable_team.team_name} — {unstoppable_streak} victorias consecutivas")
    else:
        print("  (ninguno)")
    print("\n--- Free Fall (#1 racha de derrotas) ---")
    if free_fall_team and free_fall_streak > 0:
        print(f"  {free_fall_team.team_name} — {free_fall_streak} derrotas consecutivas")
    else:
        print("  (ninguno)")

    print("\n--- Rachas de victorias — por equipo ---")
    best_win_val = unstoppable_streak if unstoppable_team else 0
    best_win_tid = unstoppable_team
    if not best_win_tid:
        best_win_tid = max(teams, key=lambda t: streaks_by_team.get(t.team_id, {}).get("max_win_streak", 0))
        best_win_val = streaks_by_team.get(best_win_tid.team_id, {}).get("max_win_streak", 0)
    print(f"  Mayor racha de victorias de la liga: {best_win_val} por {best_win_tid.team_name if best_win_tid else '—'}")
    for t in teams:
        s = streaks_by_team.get(t.team_id, {})
        win_streaks = s.get("win_streaks", [])
        max_w = s.get("max_win_streak", 0)
        win_str = ", ".join(str(x) for x in win_streaks) if win_streaks else "0"
        print(f"  {t.team_name}: rachas W = [{win_str}], máximo = {max_w}")

    print("\n--- Rachas de derrotas — por equipo ---")
    print(f"  {SECTION_DESCRIPTIONS['lose_streaks']}")
    best_lose_val = free_fall_streak if free_fall_team else 0
    best_lose_tid = free_fall_team
    if not best_lose_tid:
        best_lose_tid = max(teams, key=lambda t: streaks_by_team.get(t.team_id, {}).get("max_lose_streak", 0))
        best_lose_val = streaks_by_team.get(best_lose_tid.team_id, {}).get("max_lose_streak", 0)
    print(f"  Mayor racha de derrotas de la liga: {best_lose_val} por {best_lose_tid.team_name if best_lose_tid else '—'}")
    for t in teams:
        s = streaks_by_team.get(t.team_id, {})
        lose_streaks = s.get("lose_streaks", [])
        max_l = s.get("max_lose_streak", 0)
        lose_str = ", ".join(str(x) for x in lose_streaks) if lose_streaks else "0"
        print(f"  {t.team_name}: rachas L = [{lose_str}], máximo = {max_l}")

    print("\n--- League consistency ranking ---")
    print(f"  {SECTION_DESCRIPTIONS['consistency_ranking']}")
    ranking = league_consistency_ranking(league, weeks)
    for rank, (team_id, team_name, std, avg) in enumerate(ranking, start=1):
        label = CONSISTENCY_RANK_NAMES.get(rank, f"#{rank}")
        print(f"  {rank}. {team_name} (id={team_id}) std={std:.2f} avg={avg:.2f} — {label}")
    chart_path = plot_consistency_ranking(ranking)
    if chart_path:
        print(f"  Gráfica guardada: {chart_path}")
    else:
        print("  (Gráfica no generada: instala matplotlib para ver el chart)")

    # Actividad reciente (requiere auth)
    try:
        trade_acts = league.recent_activity(size=200, msg_type="TRADED")
        activities = league.recent_activity(size=200, msg_type=None)
    except Exception as e:
        print(f"\n[recent_activity not available] {e}")
        trade_acts = []
        activities = []

    print("\n--- Trade activity by team (intercambio completo) ---")
    print(f"  {SECTION_DESCRIPTIONS['trade_activity']}")
    if not trade_acts:
        print("  No hay actividades de tipo TRADED en la API (liga sin trades o sin auth).")
    else:
        trade_counts, trade_samples = summarize_trade_activity(trade_acts, team_by_id)
        if not trade_counts:
            print("  La API devolvió", len(trade_acts), "topic(s) TRADED pero no se pudo armar ningún intercambio (¿un topic por jugador?).")
        else:
            for team_id, count in sorted(trade_counts.items(), key=lambda x: -x[1]):
                name = team_by_id.get(team_id, type("T", (), {"team_name": "?"})()).team_name
                print(f"  {name}: participó en {count} trade(s)")
                for trade in trade_samples.get(team_id, []):
                    print(format_trade_for_team(trade, team_id))
                if trade_samples.get(team_id):
                    print()

    # -------------------------------------------------------------------------
    # Dominio 9CAT, MVPs, evolución roster, arquetipos
    # -------------------------------------------------------------------------
    team_ranks, raw_9cat = league_9cat_rankings(teams)
    dominance_report = category_dominance_report(teams, team_ranks, top_n=3)

    print("\n--- Dominio por categorías (9CAT H2H) ---")
    print(f"  {SECTION_DESCRIPTIONS['dominio_9cat']}")
    for t in teams:
        tid = t.team_id
        ranks = team_ranks.get(tid) or {}
        dom = dominance_report.get(tid) or {}
        if not ranks:
            print(f"  {t.team_name}: sin stats 9CAT en team.stats")
            continue
        # En categorías dominadas (top 3), mostrar el puesto específico (#1, #2, #3)
        dominates = dom.get("dominates", [])
        dom_with_rank = ", ".join(f"{c} #{ranks.get(c, '?')}" for c in sorted(dominates)) if dominates else "—"
        rank_str = ", ".join(f"{c}={r}" for c, r in sorted(ranks.items()))
        print(f"  {t.team_name}: dominancia (top 3) → [{dom_with_rank}]")
        print(f"    Ranks: {rank_str}")

    print("\n--- MVPs de la temporada (top 3 por equipo) ---")
    print(f"  {SECTION_DESCRIPTIONS['mvps']}")
    for t in teams:
        mvps = team_mvps(t, n=3)
        if not mvps:
            print(f"  {t.team_name}: sin roster o sin total_points")
            continue
        print(f"  {t.team_name}:")
        for name, pts in mvps:
            print(f"    - {name}: {pts:.0f} pts")

    print("\n--- Evolución del roster (drafted vs actual) ---")
    for t in teams:
        evo = roster_evolution(league, t)
        draft_list = evo["drafted"]
        current_list = evo["current"]
        print(f"  {t.team_name}: drafted={len(draft_list)}, actual={len(current_list)}")
        print("    Draft (nombre, posición, equipo profesional):")
        for p in draft_list:
            print(f"      - {p['name']} · {p['position']} · {p['pro_team']}")
        print("    Roster actual (nombre, posición, equipo profesional):")
        for p in current_list:
            print(f"      - {p['name']} · {p['position']} · {p['pro_team']}")

    activity_list = get_activity_per_team(league)
    consistency_ranking = league_consistency_ranking(league, weeks)
    archetypes = compute_archetypes(
        league, team_ranks, dominance_report, activity_list,
        consistency_ranking=consistency_ranking,
        trade_75_pct=75, min_trades_abs=10,
    )
    moty_team_id, moty_score, moty_breakdown = compute_moty_winner(league, weeks, team_ranks)
    moty_winners = {moty_team_id} if moty_team_id is not None else set()
    first_place_titles = compute_first_place_titles(team_ranks, moty_winners=moty_winners)

    if moty_team_id is not None:
        moty_team_name = team_by_id.get(moty_team_id, type("T", (), {"team_name": "?"})()).team_name
        print(f"\n--- MOTY (Manager Of The Year) ---")
        print(f"  Winner: {moty_team_name} (score={moty_score:.1f})")

    print("\n--- Títulos de primer lugar por categoría ---")
    print(f"  {SECTION_DESCRIPTIONS['first_place_titles']}")
    for t in teams:
        titles = first_place_titles.get(t.team_id, [])
        if not titles:
            print(f"  {t.team_name}: (ninguno)")
            continue
        lines = []
        for name, label in titles:
            desc = TITLE_DESCRIPTIONS.get(name, "")
            lines.append(f"{name} ({label})" + (f" — {desc}" if desc else ""))
        print(f"  {t.team_name}:")
        for line in lines:
            print(f"    · {line}")

    print("\n--- Arquetipos por equipo (1 por equipo, Tier A/B/C) ---")
    for t in teams:
        arch = archetypes.get(t.team_id, {})
        main_arch = arch.get("main", "—")
        tier = arch.get("tier", "C")
        act = next((a for a in activity_list if a["team_id"] == t.team_id), {})
        trades = act.get("trades", 0)
        total_act = act.get("total_activity", 0)
        main_desc = ARCHETYPES_DESCRIPTIONS.get(main_arch, "")
        line = f"  {t.team_name}: {main_arch} [Tier {tier}]"
        line += f"  (trades={trades}, movimientos={total_act})"
        print(line)
        if main_desc:
            print(f"    → {main_desc}")


if __name__ == "__main__":
    main()