"""
Genera archivos TypeScript (.ts) para cada equipo desde los datos de league_data.py.
Ejecutar: python analytics/generate_team_data.py

Logos de equipos (imágenes subidas por usuarios en ESPN, mystique-api) se descargan
y guardan en public/team-logos/ para no depender de la API de ESPN en el frontend.
Opcional: ESPN_COOKIES en el entorno para poder descargar si ESPN exige sesión.
"""

import os
import json
import re
import sys
from pathlib import Path
from typing import Dict, Optional
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError


def _progress_bar(current: int, total: int, prefix: str = "", suffix: str = "", width: int = 30) -> None:
    """Print a simple terminal progress bar. No external deps."""
    if total <= 0:
        return
    pct = min(1.0, current / total)
    filled = int(width * pct)
    bar = ("=" * filled + ">" + " " * (width - filled - 1)) if filled < width else "=" * width
    line = f"\r{prefix}[{bar}] {pct*100:.0f}% ({current}/{total}) {suffix}"
    print(line, end="", flush=True)

# Agregar el directorio analytics al path para importar league_data
_SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(_SCRIPT_DIR))

import league_data as nv

# Raíz de datos del frontend (src/data)
DATA_ROOT = Path(__file__).parent.parent / "src" / "data"

# Logos de equipos (imágenes subidas por usuarios) guardados en el proyecto
PROJECT_ROOT = Path(__file__).parent.parent
LOGOS_DIR = PROJECT_ROOT / "public" / "team-logos"
MYSTIQUE_HOST = "mystique-api.fantasy.espn.com"

# Colores de tema por defecto (se pueden personalizar)
THEME_COLORS = [
    {"background": "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", "accent": "#f59e0b"},
    {"background": "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)", "accent": "#a78bfa"},
    {"background": "linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #7c2d12 100%)", "accent": "#fb923c"},
    {"background": "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%)", "accent": "#34d399"},
    {"background": "linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)", "accent": "#60a5fa"},
    {"background": "linear-gradient(135deg, #581c87 0%, #6b21a8 50%, #581c87 100%)", "accent": "#c084fc"},
    {"background": "linear-gradient(135deg, #831843 0%, #9f1239 50%, #831843 100%)", "accent": "#f87171"},
    {"background": "linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0c4a6e 100%)", "accent": "#38bdf8"},
    {"background": "linear-gradient(135deg, #78350f 0%, #92400e 50%, #78350f 100%)", "accent": "#fbbf24"},
    {"background": "linear-gradient(135deg, #422006 0%, #713f12 50%, #422006 100%)", "accent": "#facc15"},
]


def escape_for_ts(s: str) -> str:
    """Escape single quotes for use inside a TS string literal."""
    return s.replace("'", "\\'")

def sanitize_id(name: str) -> str:
    """Convierte nombre de equipo a ID válido para TypeScript (sin espacios, caracteres especiales)."""
    # Reemplazar espacios y caracteres especiales con guiones
    s = re.sub(r'[^\w\s-]', '', name.lower())
    s = re.sub(r'[-\s]+', '-', s)
    return s.strip('-')


# Slug ASCII para equipos con nombre en caracteres no latinos (ej. chino).
# Evita fallos en rutas URL, imports dinámicos y nombres de archivo.
TEAM_SLUG_OVERRIDES: Dict[str, str] = {
    "北京首钢霹雳鸭": "beijing-ducks",
}

# Slug -> path for logos with different filename (e.g. lububumatcha -> labubu-matcha-logo.png)
TEAM_LOGO_OVERRIDES: Dict[str, str] = {
    "lububumatcha": "/team-logos/labubu-matcha-logo.png",
}


def get_team_slug(team) -> str:
    """
    ID/slug del equipo: solo ASCII, para archivos .ts, URL y dynamic import.
    Si el nombre tiene caracteres no ASCII (ej. chino), usa TEAM_SLUG_OVERRIDES
    o fallback team-{team_id}. displayName sigue siendo el nombre original.
    """
    name = getattr(team, "team_name", "") or ""
    if name in TEAM_SLUG_OVERRIDES:
        return TEAM_SLUG_OVERRIDES[name]
    tid = sanitize_id(name)
    if not tid or any(ord(c) > 127 for c in tid):
        return f"team-{getattr(team, 'team_id', 0)}"
    return tid


def format_value(val) -> str:
    """Formatea valores numéricos para TypeScript."""
    if isinstance(val, float):
        if val.is_integer():
            return str(int(val))
        return f"{val:.1f}"
    return str(val)


def _is_mystique_logo_url(url: str) -> bool:
    """True si la URL es de imagen subida por usuario en ESPN (mystique-api)."""
    if not url or not isinstance(url, str):
        return False
    return MYSTIQUE_HOST in url


def get_local_logo_path(team_slug: str) -> Optional[str]:
    """
    Si ya existe un logo en public/team-logos/ para este equipo, devuelve la ruta pública.
    Busca {slug}.png, {slug}-logo.png, {slug}.jpg, etc.
    """
    if not team_slug:
        return None
    safe_slug = re.sub(r"[^\w\-]", "", team_slug) or "logo"
    for ext in ("png", "jpg", "jpeg", "gif", "webp"):
        for name in (f"{safe_slug}.{ext}", f"{safe_slug}-logo.{ext}"):
            if (LOGOS_DIR / name).exists():
                return f"/team-logos/{name}"
    return None


def download_team_logo(logo_url: str, team_slug: str) -> Optional[str]:
    """
    Descarga la imagen del logo (URL mystique-api) y la guarda en public/team-logos/.
    Devuelve la ruta pública para usar en el rewind, ej. /team-logos/novigrad-21ers.png,
    o None si falla la descarga (p. ej. ESPN exige sesión).
    """
    if not _is_mystique_logo_url(logo_url):
        return None
    LOGOS_DIR.mkdir(parents=True, exist_ok=True)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "image/*,*/*",
    }
    cookies = os.environ.get("ESPN_COOKIES")
    if cookies:
        headers["Cookie"] = cookies
    try:
        req = Request(logo_url, headers=headers)
        with urlopen(req, timeout=15) as resp:
            if resp.status != 200:
                return None
            data = resp.read()
            content_type = resp.headers.get("Content-Type", "").split(";")[0].strip().lower()
            if "png" in content_type:
                ext = "png"
            elif "jpeg" in content_type or "jpg" in content_type:
                ext = "jpg"
            elif "gif" in content_type:
                ext = "gif"
            elif "webp" in content_type:
                ext = "webp"
            else:
                ext = "png"
            safe_slug = re.sub(r"[^\w\-]", "", team_slug) or "logo"
            filename = f"{safe_slug}.{ext}"
            out_path = LOGOS_DIR / filename
            out_path.write_bytes(data)
            return f"/team-logos/{filename}"
    except (URLError, HTTPError, OSError) as e:
        print(f"  [logo] No se pudo descargar logo para {team_slug}: {e}", file=sys.stderr)
        return None


def generate_team_ts(team, team_data: dict, season: str = "2026") -> str:
    """Genera el contenido TypeScript para un equipo usando los nuevos tipos de slides."""
    tid = get_team_slug(team)
    theme = THEME_COLORS[team.team_id % len(THEME_COLORS)]
    
    slides = []
    summary = team_data.get("summary", {})
    
    # Slide 1: Hero (con logo del equipo si está disponible)
    logo_url = nv.get_team_logo_url(team)
    hero_slide = {
        "type": "hero",
        "title": f"Your {season} Rewind",
        "subtitle": team.team_name,
        "footer": "Fantasy Rewind",
    }
    if logo_url:
        # Override explícito para logos con nombre distinto al slug
        if tid in TEAM_LOGO_OVERRIDES:
            hero_slide["image"] = TEAM_LOGO_OVERRIDES[tid]
        # Imágenes subidas por usuario (mystique-api): usar ruta local si ya existe en public/team-logos/
        elif _is_mystique_logo_url(logo_url):
            local_path = get_local_logo_path(tid)
            if not local_path:
                local_path = download_team_logo(logo_url, tid)
            hero_slide["image"] = local_path if local_path else logo_url
        else:
            hero_slide["image"] = logo_url
    slides.append(hero_slide)
    
    # --- ORDEN ESTÁNDAR REWIND ---
    # 1. Resumen General: Season Record, Standings, Longest Streaks, PF vs PA
    # 2. Contra otros: Consistency, Consistency Chart, Highest Week, Ceiling rank, Close Games, Closest, Rival, Nemesis
    # 3. Roster: Roster Evolution, Season MVPs
    # 4. Premios: Category Dominance, Archetype, MOTY/Titles
    # 5. Final Hero
    
    team_slugs = team_data.get("_team_slugs", {})
    
    # Season Record
    if summary:
        w, l, t = summary.get("wins", 0), summary.get("losses", 0), summary.get("ties", 0)
        standing = summary.get("standing") or summary.get("final_standing")
        slides.append({
            "type": "stat",
            "title": "Season Record",
            "value": f"{w}-{l}-{t}",
            "label": "W-L-T",
            "compareTo": {
                "label": "Standing",
                "value": f"#{standing}" if standing else "N/A"
            },
        })
    
    # Season Standings
    standings_list = team_data.get("_standings_list", [])
    if standings_list:
        rows = []
        for rank, t in enumerate(standings_list, 1):
            s = nv.team_season_summary(t) if hasattr(nv, "team_season_summary") else {}
            w, l = s.get("wins", 0), s.get("losses", 0)
            rows.append({
                "id": get_team_slug(t),
                "name": t.team_name,
                "value": f"{w}-{l}",
                "rank": rank,
            })
        if rows:
            slides.append({
                "type": "rank",
                "title": "Season Standings",
                "subtitle": "Final league table",
                "metricLabel": "W-L",
                "rows": rows,
                "highlightTeamId": tid,
                "footer": "Your position highlighted",
            })
    
    # Longest Streaks
    streaks = team_data.get("streaks", {})
    if streaks:
        max_win = streaks.get("max_win_streak", 0)
        max_lose = streaks.get("max_lose_streak", 0)
        if max_win > 0 or max_lose > 0:
            slides.append({
                "type": "stat",
                "title": "Longest Streaks",
                "value": f"{max_win}W / {max_lose}L",
                "label": "Win / Loss",
                "description": "Maximum consecutive",
                "footer": "Momentum swings",
            })
    # Win Streaks: #1 ve award Unstoppable; resto ve rank slide con highlight
    win_streak_ranking = team_data.get("_win_streak_ranking", [])
    win_streak_rank = team_data.get("win_streak_rank")
    if win_streak_ranking:
        if team_data.get("is_unstoppable"):
            streak_val = team_data.get("unstoppable_streak", 0)
            slides.append({
                "type": "award",
                "title": "Unstoppable",
                "badgeName": "Longest win streak in the league",
                "description": f"You had the longest win streak with {streak_val} consecutive wins.",
                "footer": "Peak momentum",
            })
        elif team_data.get("is_streak_ender"):
            victim = team_data.get("streak_ender_victim_name", "?")
            streak_val = team_data.get("streak_ender_victim_streak", 0)
            week_val = team_data.get("streak_ender_week", "?")
            slides.append({
                "type": "award",
                "title": "The Kingslayer",
                "badgeName": "Kingslayer",
                "description": f"You ended {victim}'s {int(streak_val)}-game win streak in week {week_val}.",
                "footer": "Jaime Lannister would be proud of you",
            })
        else:
            rows = []
            for rank, (t_id, t_name, streak_val) in enumerate(win_streak_ranking, 1):
                row_id = team_slugs.get(t_id, sanitize_id(t_name))
                rows.append({
                    "id": row_id,
                    "name": t_name[:30] if len(t_name) > 30 else t_name,
                    "value": str(int(streak_val)),
                    "rank": rank,
                })
            if rows:
                slides.append({
                    "type": "rank",
                    "title": "Win Streaks",
                    "subtitle": "Longest win streak per team",
                    "metricLabel": "Wins",
                    "rows": rows,
                    "highlightTeamId": tid,
                    "footer": "Unstoppable goes to #1",
                })
    # Lose Streaks: #1 ve award Free Fall; resto ve rank slide con highlight
    lose_streak_ranking = team_data.get("_lose_streak_ranking", [])
    if lose_streak_ranking:
        if team_data.get("is_free_fall"):
            streak_val = team_data.get("free_fall_streak", 0)
            slides.append({
                "type": "award",
                "title": "Free Fall",
                "badgeName": "Longest losing streak in the league",
                "description": f"Longest losing streak: {streak_val} consecutive losses.",
                "footer": "Rough patch",
                "awardTier": "standoff",
            })
        else:
            rows = []
            for rank, (t_id, t_name, streak_val) in enumerate(lose_streak_ranking, 1):
                row_id = team_slugs.get(t_id, sanitize_id(t_name))
                rows.append({
                    "id": row_id,
                    "name": t_name[:30] if len(t_name) > 30 else t_name,
                    "value": str(int(streak_val)),
                    "rank": rank,
                })
            if rows:
                slides.append({
                    "type": "rank",
                    "title": "Lose Streaks",
                    "subtitle": "Longest losing streak per team",
                    "metricLabel": "Losses",
                    "rows": rows,
                    "highlightTeamId": tid,
                    "footer": "Free Fall goes to #1",
                })
    
    # PF vs PA Chart
    if summary:
        pf = summary.get("points_for", 0)
        pa = summary.get("points_against", 0)
        slides.append({
            "type": "chart",
            "title": "Points For vs Points Against",
            "subtitle": "Season totals",
            "chart": {
                "kind": "bar",
                "xLabel": "Category",
                "yLabel": "Points",
                "series": [
                    {"name": "Points For", "data": [{"x": "Points For", "y": pf}], "color": "#22c55e"},
                    {"name": "Points Against", "data": [{"x": "Points Against", "y": pa}], "color": "#ef4444"},
                ],
            },
            "footer": "Your offensive vs defensive performance",
        })
    
    # Consistency (stat + chart)
    consistency_rank = team_data.get("consistency_rank")
    consistency_std = team_data.get("consistency", {}).get("std", 0)
    consistency_ranking_full = team_data.get("_consistency_ranking", [])
    if consistency_rank and consistency_ranking_full:
        tag = nv.CONSISTENCY_RANK_NAMES.get(consistency_rank, "")
        slides.append({
            "type": "stat",
            "title": "Consistency",
            "value": f"#{consistency_rank}",
            "label": tag,
            "description": f"Std dev: {format_value(consistency_std)}",
            "footer": "Lower is more consistent",
        })
        if len(consistency_ranking_full) > 0:
            chart_data = []
            for t_id, t_name, std_val, avg_val in consistency_ranking_full[:10]:
                chart_data.append({
                    "x": t_name[:20] if len(t_name) > 20 else t_name,
                    "y": std_val
                })
            if chart_data:
                slides.append({
                    "type": "chart",
                    "title": "League Consistency",
                    "subtitle": "Standard deviation (lower = more consistent)",
                    "chart": {
                        "kind": "bar",
                        "xLabel": "Team",
                        "yLabel": "Std Dev",
                        "series": [{"name": "Consistency", "data": chart_data}]
                    },
                    "highlight": {"label": team.team_name, "value": f"#{consistency_rank}"},
                    "footer": "Your position in the league",
                })
    
    # Highest Scoring Week (matchup)
    bw = team_data.get("best_worst_week", {})
    weekly_opp = team_data.get("weekly_opponent_names", {})
    weekly_results = team_data.get("weekly_results", {})
    weekly_points = team_data.get("weekly_points", {})
    if bw.get("best_week"):
        best_week = bw.get("best_week")
        opp_name = weekly_opp.get(best_week, "?")
        my_pts = int(bw.get("best_points", 0))
        opp_pts_list = weekly_points.get("opp_points", []) if weekly_points else []
        weeks_list = weekly_points.get("weeks", []) if weekly_points else []
        opp_pts_val = 0
        if best_week in weeks_list:
            idx = weeks_list.index(best_week)
            if idx < len(opp_pts_list):
                opp_pts_val = int(opp_pts_list[idx])
        result = weekly_results.get(best_week, "W") if weekly_results else "W"
        slides.append({
            "type": "matchup",
            "title": "Highest Scoring Week",
            "week": best_week,
            "result": result,
            "me": {"name": team.team_name, "score": my_pts},
            "opp": {"name": opp_name, "score": opp_pts_val},
            "margin": abs(my_pts - opp_pts_val),
            "note": f"vs {opp_name}",
            "footer": f"Worst week: {format_value(bw.get('worst_points', 0))} (Week {bw.get('worst_week')})",
        })
    
    # Highest Scoring Week per team (Ceiling rank)
    ceiling_ranking = team_data.get("_ceiling_ranking", [])
    ceiling_rank = team_data.get("ceiling_rank")
    if ceiling_ranking:
        rows = []
        for rank, (t_id, t_name, best_pts) in enumerate(ceiling_ranking, 1):
            row_id = team_slugs.get(t_id, sanitize_id(t_name))
            rows.append({
                "id": row_id,
                "name": t_name[:30] if len(t_name) > 30 else t_name,
                "value": format_value(best_pts),
                "rank": rank,
            })
        if rows:
            if ceiling_rank == 1:
                slides.append({
                    "type": "award",
                    "title": "Ceiling Check",
                    "badgeName": "Highest scoring week in the league",
                    "description": f"You had the single highest scoring week with {format_value(ceiling_ranking[0][2])} points.",
                    "footer": "Peak performance",
                })
            slides.append({
                "type": "rank",
                "title": "Highest Scoring Week (per team)",
                "subtitle": "Ceiling Check goes to #1",
                "metricLabel": "Points",
                "rows": rows,
                "highlightTeamId": tid,
                "footer": "Your ceiling rank",
            })
    
    # Close Games (stat + timeline)
    close_record = team_data.get("close_record", {})
    close_games_list = team_data.get("close_games", [])
    if close_record.get("wins", 0) + close_record.get("losses", 0) > 0:
        slides.append({
            "type": "stat",
            "title": "Close Games",
            "value": f"{close_record.get('wins', 0)}-{close_record.get('losses', 0)}",
            "label": "Record in games ≤100 pts",
            "description": f"{len(close_games_list)} total close games",
            "footer": "Margin ≤100 points",
        })
        if close_games_list:
            close_events = []
            for g in close_games_list[:10]:
                res = g.get("result", "T")
                close_events.append({
                    "label": f"Week {g.get('week', '?')}",
                    "title": f"vs {g.get('opponent_name', '?')}",
                    "detail": f"{int(g.get('my_pts', 0))}–{int(g.get('opp_pts', 0))} ({int(g.get('margin', 0))} pts)",
                    "kind": "win" if res == "W" else "loss",
                })
            slides.append({
                "type": "timeline",
                "title": "Close Games",
                "subtitle": "Every close game (≤100 pts margin)",
                "events": close_events,
                "footer": "Green = win, Red = loss",
            })
        if team_data.get("is_closer") and team_data.get("closer_games"):
            closer_games = team_data.get("closer_games", [])
            events = [{"label": f"Week {g.get('week', '?')}", "title": f"Beat {g.get('opponent_name', '?')}", "detail": f"{int(g.get('my_pts', 0))}–{int(g.get('opp_pts', 0))} ({int(g.get('margin', 0))} pts)", "kind": "win"} for g in closer_games[:5]]
            slides.append({"type": "award", "title": "The Closer", "badgeName": "Most Close Wins", "description": f"Won {len(closer_games)} close games (≤100 pts margin)", "footer": "Clutch performer"})
            if events:
                slides.append({"type": "timeline", "title": "Close Wins", "subtitle": "The Closer moments", "events": events, "footer": "Every point counted"})
        if team_data.get("is_choke") and team_data.get("choke_games"):
            choke_games = team_data.get("choke_games", [])
            events = [{"label": f"Week {g.get('week', '?')}", "title": f"Lost to {g.get('opponent_name', '?')}", "detail": f"{int(g.get('my_pts', 0))}–{int(g.get('opp_pts', 0))} ({int(g.get('margin', 0))} pts)", "kind": "loss"} for g in choke_games[:5]]
            slides.append({"type": "award", "title": "The Choke", "badgeName": "Most Close Losses", "description": f"Lost {len(choke_games)} close games (≤100 pts margin)", "footer": "So close...", "awardTier": "no-award"})
            if events:
                slides.append({"type": "timeline", "title": "Close Losses", "subtitle": "The Choke moments", "events": events, "footer": "Heartbreak"})
    
    # Closest Game
    closest = team_data.get("closest_matchup")
    if closest:
        result = closest.get("result", "T")
        slides.append({
            "type": "matchup",
            "title": "Closest Game",
            "week": closest.get("week", 0),
            "result": result,
            "me": {"name": team.team_name, "score": int(closest.get("my_pts", 0))},
            "opp": {"name": closest.get("opponent_name", "?"), "score": int(closest.get("opp_pts", 0))},
            "margin": int(closest.get("margin", 0)),
            "note": f"{closest.get('margin', 0)}-point {'thriller' if result == 'W' else 'heartbreak'}",
            "footer": "Every point mattered",
        })
    
    # Rival (stat + timeline)
    rival = team_data.get("rival")
    rival_games = team_data.get("rival_games", [])
    if rival:
        slides.append({
            "type": "stat",
            "title": "Rival",
            "value": rival.get("opponent_name", "?"),
            "label": f"{rival.get('games', 0)} games",
            "description": f"{format_value(rival.get('combined_points', 0))} combined points",
            "footer": "Most competitive matchup",
        })
        if rival_games:
            rival_events = []
            for g in rival_games:
                res = g.get("result", "T")
                rival_events.append({
                    "label": f"Week {g.get('week', '?')}",
                    "title": f"vs {g.get('opponent_name', '?')}",
                    "detail": f"{int(g.get('my_pts', 0))}–{int(g.get('opp_pts', 0))} ({res})",
                    "kind": "win" if res == "W" else "loss",
                })
            slides.append({
                "type": "timeline",
                "title": "Games vs Rival",
                "subtitle": rival.get("opponent_name", "?"),
                "events": rival_events,
                "footer": "Green = win, Red = loss",
            })
    
    # Nemesis
    nemesis = team_data.get("nemesis")
    if nemesis:
        slides.append({
            "type": "matchup",
            "title": "Nemesis",
            "week": nemesis.get("week", 0),
            "result": "L",
            "me": {"name": team.team_name, "score": int(nemesis.get("my_points", 0))},
            "opp": {"name": nemesis.get("opponent_name", "?"), "score": int(nemesis.get("opp_points", 0))},
            "margin": int(nemesis.get("margin", 0)),
            "note": "Biggest loss",
            "footer": "They got you good",
        })
    
    # Public Enemy No. 1 (antes de Roster Evolution)
    if team_data.get("is_public_enemy_no1"):
        count = team_data.get("public_enemy_no1_rivals_count", 0)
        rival_names = team_data.get("public_enemy_no1_rival_names", [])
        desc = f"{count} teams had you as their main rival"
        if rival_names:
            names_str = ", ".join(rival_names[:5])
            if len(rival_names) > 5:
                names_str += f" +{len(rival_names) - 5} more"
            desc += f" — {names_str}"
        slides.append({"type": "award", "title": "Public Enemy No. 1", "badgeName": "Most #1 Rivals", "description": desc, "footer": "Everyone had you on their radar"})
    
    # Roster Evolution
    roster_evol = team_data.get("roster_evolution", {})
    if roster_evol:
        drafted = roster_evol.get("drafted", [])
        current = roster_evol.get("current", [])
        drafted_names = {p.get("name", "") for p in drafted}
        current_names = {p.get("name", "") for p in current}
        kept = [p.get("name", "") for p in current if p.get("name", "") in drafted_names]
        lost = [p.get("name", "") for p in drafted if p.get("name", "") not in current_names]
        added = [p.get("name", "") for p in current if p.get("name", "") not in drafted_names]
        slides.append({
            "type": "rosterDiff",
            "title": "Roster Evolution",
            "draftedCount": len(drafted),
            "currentCount": len(current),
            "kept": kept,
            "lost": lost,
            "added": added,
            "footer": f"You kept {len(kept)}/{len(drafted)} from draft",
        })
    
    # Season MVPs
    mvps = team_data.get("mvps", [])
    if mvps:
        items = []
        for idx, mvp in enumerate(mvps[:3], 1):
            if isinstance(mvp, tuple):
                name, pts = mvp
            else:
                name = str(mvp)
                pts = 0
            items.append({
                "primary": name,
                "secondary": f"{format_value(pts)} fantasy points",
                "meta": f"#{idx}"
            })
        if items:
            slides.append({
                "type": "list",
                "title": "Season MVPs",
                "subtitle": "Top 3 performers",
                "items": items,
                "footer": "Your fantasy stars",
            })
    
    # Category Dominance
    dom = team_data.get("dominance", {})
    ranks = dom.get("ranks", {})
    dominates = dom.get("dominates", [])
    if dominates:
        items = []
        for cat_info in dominates[:5]:
            if isinstance(cat_info, str):
                parts = cat_info.split()
                cat = parts[0] if parts else cat_info
                rank_str = parts[-1] if len(parts) > 1 else None
                rank_num = int(rank_str.replace("#", "")) if rank_str and rank_str.replace("#", "").isdigit() else int(ranks.get(cat, 0)) if ranks.get(cat) is not None else 0
            else:
                cat = str(cat_info)
                rank_num = int(ranks.get(cat, 0)) if ranks.get(cat) is not None else 0
            items.append({"primary": cat, "secondary": f"Rank #{rank_num}", "meta": f"#{rank_num}"})
        if items:
            slides.append({
                "type": "list",
                "title": "Category Dominance",
                "subtitle": "Top 3 rankings in 9CAT",
                "items": items,
                "footer": "Your strongest categories",
            })
    
    # Archetype (1 por equipo; award/standoff/no-award según arquetipo)
    # no-award: The Ever Builder, The Role Player; standoff: The Vibes Manager, The Survivor
    arch = team_data.get("archetype", {})
    main_arch = arch.get("main", "")
    tier = arch.get("tier", "C")
    if main_arch:
        if main_arch in ("The Ever Builder", "The Role Player"):
            award_tier = "no-award"
        elif main_arch in ("The Vibes Manager", "The Survivor"):
            award_tier = "standoff"
        elif tier in ("A", "B"):
            award_tier = "award"
        else:
            award_tier = "standoff"
        slides.append({
            "type": "award",
            "title": "Your Archetype",
            "badgeName": main_arch,
            "description": team_data.get("archetype_desc", ""),
            "footer": "Season identity",
            "awardTier": award_tier,
        })
    
    # MOTY / Category Titles
    titles = team_data.get("titles", [])
    if titles:
        moty_title_name = nv.MOTY_TITLE[0]  # "MOTY (Manager Of The Year)"
        has_moty = any(
            (t[0] == moty_title_name if isinstance(t, tuple) else str(t) == moty_title_name)
            for t in titles
        )
        if has_moty:
            # Build MOTY breakdown if available
            breakdown = team_data.get("moty_breakdown")
            moty_slide = {
                "type": "award",
                "title": "Manager Of The Year",
                "badgeName": "MOTY ",
                "description": nv.MOTY_TITLE[1],
                "footer": "25% Stats, 15% Standings, 25% Champion, 35% MVA",
            }
            if breakdown:
                # Add weighted contributions for transparency
                moty_slide["motyBreakdown"] = {
                    "stats": round(nv.MOTY_WEIGHT_STATS * breakdown.get("stats_norm", 0), 1),
                    "standings": round(nv.MOTY_WEIGHT_STANDINGS * breakdown.get("standings_norm", 0), 1),
                    "champion": round(nv.MOTY_WEIGHT_LEAGUE_WINNER * breakdown.get("league_winner_norm", 0), 1),
                    "mva": round(nv.MOTY_WEIGHT_MVA * breakdown.get("mva_norm", 0), 1),
                }
            slides.append(moty_slide)
        # Category titles (excluir MOTY para la lista; MOTY winners no tienen títulos de categoría adicionales)
        cat_titles = [t for t in titles if (t[0] if isinstance(t, tuple) else str(t)) != moty_title_name]
        if cat_titles:
            items = []
            for t in cat_titles[:5]:
                if isinstance(t, tuple):
                    name, label = t
                else:
                    name = str(t)
                    label = ""
                items.append({"primary": name, "secondary": label})
            slides.append({
                "type": "list",
                "title": "Category Titles",
                "subtitle": "First place honors",
                "items": items,
                "footer": "Your dominance",
            })
    
    # Final Hero
    slides.append({
        "type": "hero",
        "title": "See you next season",
        "subtitle": team.team_name,
        "footer": "Fantasy Rewind",
    })
    
    # Generar TypeScript (formato literal, no JSON) - soporta estructuras anidadas
    def value_to_ts(v, indent="      "):
        """Convierte un valor Python a TypeScript literal."""
        if v is None:
            return "null"
        elif isinstance(v, bool):
            return "true" if v else "false"
        elif isinstance(v, (int, float)):
            return str(v)
        elif isinstance(v, str):
            v_escaped = v.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")
            return f"'{v_escaped}'"
        elif isinstance(v, dict):
            items = []
            for k2, v2 in v.items():
                if v2 is None:
                    continue
                items.append(f"{indent}  {k2}: {value_to_ts(v2, indent + '  ')}")
            return "{\n" + ",\n".join(items) + f"\n{indent}}}"
        elif isinstance(v, list):
            items = [value_to_ts(item, indent + "  ") for item in v]
            return "[\n" + ",\n".join([f"{indent}  {item}" for item in items]) + f"\n{indent}]"
        else:
            return f"'{str(v)}'"
    
    def slide_to_ts(slide):
        parts = []
        for k, v in slide.items():
            if v is None:
                continue
            parts.append(f"      {k}: {value_to_ts(v)}")
        return "{\n" + ",\n".join(parts) + "\n    }"
    
    slides_str = ",\n    ".join([slide_to_ts(s) for s in slides])
    
    team_name_escaped = team.team_name.replace("'", "\\'").replace('"', '\\"')
    
    return f'''/**
 * Team rewind data – {team.team_name}
 * Generated from ESPN Fantasy Basketball analytics
 */

import type {{ TeamRewindData }} from '../rewind-types'

const data: TeamRewindData = {{
  id: '{tid}',
  displayName: '{team_name_escaped}',
  theme: {{
    background: '{theme["background"]}',
    accent: '{theme["accent"]}',
  }},
  slides: [
    {slides_str}
  ],
}}

export default data
'''


def collect_team_data(league, weeks, team_by_id, team_ranks, dominance_report, activity_list, 
                     consistency_ranking, archetypes, first_place_titles, season: str = "2026",
                     standings_list=None, ceiling_ranking=None,
                     unstoppable_team=None, unstoppable_streak=0,
                     streak_ender_team=None, streak_ender_week=None,
                     streak_ender_victim_name=None, streak_ender_victim_streak=0,
                     free_fall_team=None, free_fall_streak=0,
                     win_streak_ranking=None, lose_streak_ranking=None, moty_breakdown=None):
    """Recopila todos los datos de un equipo."""
    all_data = {}
    standings_list = standings_list or []
    ceiling_ranking = ceiling_ranking or []
    win_streak_ranking = win_streak_ranking or []
    lose_streak_ranking = lose_streak_ranking or []
    moty_breakdown = moty_breakdown or {}
    streak_ender_victim_name = streak_ender_victim_name or ""
    streak_ender_victim_streak = streak_ender_victim_streak or 0
    team_slugs = {t.team_id: get_team_slug(t) for t in league.teams}
    
    # Calcular streaks para todos los equipos
    streaks_by_team = nv.win_and_lose_streaks_by_team(league, weeks)
    
    # Calcular closer/choke para todos los equipos
    closer_team, closer_wins, choke_team, choke_losses = nv.closer_and_choke(league, weeks, team_by_id)
    
    # Premio Public Enemy No. 1 (equipo con más rivales; solo si tiene 2+ rivales)
    public_enemy_team, public_enemy_count, public_enemy_rival_names = nv.public_enemy_no1(league, weeks, team_by_id)
    
    teams_list = list(league.teams)
    n_teams = len(teams_list)
    for i, team in enumerate(teams_list):
        _progress_bar(i, n_teams, "  Collect ", (team.team_name or "?")[:20])
        tid = team.team_id
        data = {
            "team_id": tid,
            "team_name": team.team_name,
            "season": season,
        }
        
        # Summary
        data["summary"] = nv.team_season_summary(team)
        
        # Best/worst week
        data["best_worst_week"] = nv.best_and_worst_week(league, tid, weeks)
        
        # Dominance
        dom = dominance_report.get(tid) or {}
        data["dominance"] = {
            "dominates": dom.get("dominates", []),
            "loses": dom.get("loses", []),
            "ranks": team_ranks.get(tid) or {},
        }
        
        # MVPs
        data["mvps"] = nv.team_mvps(team, n=3)
        
        # Archetype
        arch = archetypes.get(tid, {})
        data["archetype"] = arch
        data["archetype_desc"] = nv.ARCHETYPES_DESCRIPTIONS.get(arch.get("main", ""), "")
        
        # Titles
        data["titles"] = first_place_titles.get(tid, [])
        
        # MOTY breakdown (for transparency in rewind slide)
        data["moty_breakdown"] = moty_breakdown.get(tid)
        
        # Rival
        rival = nv.rival_by_points_combined(league, tid, weeks, team_by_id)
        data["rival"] = rival if rival else None
        
        # Nemesis
        nem = nv.nemesis_by_biggest_loss(league, tid, weeks, team_by_id)
        data["nemesis"] = nem if nem else None
        
        # Closest matchup
        closest = nv.closest_matchup(league, tid, weeks, team_by_id)
        data["closest_matchup"] = closest if closest else None
        
        # Close games
        close_games_list = nv.close_games_with_opponent(league, tid, weeks, team_by_id)
        data["close_games"] = close_games_list
        close_w, close_l, close_t = nv.close_record(nv.close_games(league, tid, weeks))
        data["close_record"] = {"wins": close_w, "losses": close_l, "ties": close_t}
        
        # Streaks
        streaks = streaks_by_team.get(tid, {})
        data["streaks"] = streaks
        
        # Consistency
        consistency_metrics_data = nv.consistency_metrics(league, tid, weeks)
        data["consistency"] = consistency_metrics_data
        
        # Consistency rank (posición en el ranking)
        consistency_rank = None
        for idx, (t_id, _, _, _) in enumerate(consistency_ranking, 1):
            if t_id == tid:
                consistency_rank = idx
                break
        data["consistency_rank"] = consistency_rank
        
        # Roster evolution
        roster_evol = nv.roster_evolution(league, team)
        data["roster_evolution"] = roster_evol
        
        # Weekly points y nombres de rivales por semana
        pts, opp_pts, opp_ids, results = nv.weekly_points_for_team(league, tid, weeks)
        opp_names = {}
        for w, oid in opp_ids.items():
            if oid and oid in team_by_id:
                opp_names[w] = team_by_id[oid].team_name
            else:
                opp_names[w] = "?"
        data["weekly_points"] = {
            "weeks": sorted(pts.keys()),
            "my_points": [pts[w] for w in sorted(pts.keys())],
            "opp_points": [opp_pts.get(w, 0) for w in sorted(pts.keys())],
        }
        data["weekly_opponent_names"] = opp_names
        data["weekly_results"] = results
        
        # Juegos vs rival (para slide Rival)
        rival_games = []
        if rival:
            for w in pts:
                if opp_ids.get(w) == rival.get("opponent_id"):
                    rival_games.append({
                        "week": w,
                        "opponent_name": rival.get("opponent_name", "?"),
                        "my_pts": pts[w],
                        "opp_pts": opp_pts.get(w, 0),
                        "result": results.get(w, "T"),
                    })
        data["rival_games"] = rival_games
        
        # The Closer / The Choke awards
        data["is_closer"] = closer_team and closer_team.team_id == tid
        data["closer_games"] = closer_wins if data["is_closer"] else []
        data["is_choke"] = choke_team and choke_team.team_id == tid
        data["choke_games"] = choke_losses if data["is_choke"] else []
        
        # Public Enemy No. 1 (más rivales; solo si hay ganador con 2+ rivales)
        data["is_public_enemy_no1"] = public_enemy_team and public_enemy_team.team_id == tid
        if data["is_public_enemy_no1"]:
            data["public_enemy_no1_rivals_count"] = public_enemy_count
            data["public_enemy_no1_rival_names"] = public_enemy_rival_names or []
        
        # Unstoppable (#1 racha de victorias) y Free Fall (#1 racha de derrotas)
        data["is_unstoppable"] = unstoppable_team and unstoppable_team.team_id == tid
        data["unstoppable_streak"] = unstoppable_streak if data["is_unstoppable"] else 0
        data["is_streak_ender"] = streak_ender_team and streak_ender_team.team_id == tid
        if data["is_streak_ender"]:
            data["streak_ender_week"] = streak_ender_week
            data["streak_ender_victim_name"] = streak_ender_victim_name
            data["streak_ender_victim_streak"] = streak_ender_victim_streak
        data["is_free_fall"] = free_fall_team and free_fall_team.team_id == tid
        data["free_fall_streak"] = free_fall_streak if data["is_free_fall"] else 0
        
        # League y rankings compartidos
        data["_league"] = league
        data["_consistency_ranking"] = consistency_ranking
        data["_standings_list"] = standings_list
        data["_ceiling_ranking"] = ceiling_ranking
        data["_win_streak_ranking"] = win_streak_ranking
        data["_lose_streak_ranking"] = lose_streak_ranking
        data["_team_slugs"] = team_slugs
        
        # Win streak rank y lose streak rank (posición en ranking de rachas)
        win_streak_rank = None
        for idx, (t_id, _, _) in enumerate(win_streak_ranking, 1):
            if t_id == tid:
                win_streak_rank = idx
                break
        data["win_streak_rank"] = win_streak_rank
        lose_streak_rank = None
        for idx, (t_id, _, _) in enumerate(lose_streak_ranking, 1):
            if t_id == tid:
                lose_streak_rank = idx
                break
        data["lose_streak_rank"] = lose_streak_rank
        
        # Ceiling rank (posición en ranking de best week)
        ceiling_rank = None
        for idx, (t_id, _, _) in enumerate(ceiling_ranking, 1):
            if t_id == tid:
                ceiling_rank = idx
                break
        data["ceiling_rank"] = ceiling_rank
        
        all_data[tid] = data
    
    _progress_bar(n_teams, n_teams, "  Collect ", "done")
    print()
    return all_data


def _scan_seasons_and_teams():
    """
    Escanea src/data/seasons/ y devuelve un dict season_id -> list[team_id]
    (solo carpetas numéricas y archivos .ts de equipos, excluyendo index.ts).
    """
    seasons_dir = DATA_ROOT / "seasons"
    if not seasons_dir.exists():
        return {}
    result = {}
    for season_path in seasons_dir.iterdir():
        if not season_path.is_dir() or not season_path.name.isdigit():
            continue
        sid = season_path.name
        teams_dir = season_path / "teams"
        if not teams_dir.exists():
            continue
        team_ids = []
        for f in teams_dir.glob("*.ts"):
            if f.name != "index.ts":
                team_ids.append(f.stem)
        result[sid] = sorted(team_ids)
    return result


def _generate_rewind_loader_and_teams_barrel():
    """Genera getTeamRewind.ts (por temporada) y teams/index.ts barrel escaneando seasons/."""
    season_teams = _scan_seasons_and_teams()
    if not season_teams:
        print("No season data found under src/data/seasons/; skipping rewind loader and teams barrel.")
        return

    # getTeamRewind.ts: teamLoaders[seasonId][teamId] = () => import('./seasons/2026/teams/team-id')
    loader_lines = []
    for sid in sorted(season_teams.keys()):
        loader_lines.append(f"  '{sid}': {{")
        for tid in season_teams[sid]:
            loader_lines.append(f"    '{tid}': () => import('./seasons/{sid}/teams/{tid}'),")
        loader_lines.append("  },")
    rewind_content = f'''/**
 * Resolve team rewind data by season and team id.
 * Auto-generated team loaders (scanned from seasons/).
 */

import type {{ TeamRewindData }} from './rewind-types'

const teamLoaders: Record<string, Record<string, () => Promise<{{ default: TeamRewindData }}>>> = {{
{chr(10).join(loader_lines)}
}}

export async function getTeamRewindData(seasonId: string, teamId: string): Promise<TeamRewindData | null> {{
  const seasonLoaders = teamLoaders[seasonId]
  if (!seasonLoaders) return null
  const loader = seasonLoaders[teamId]
  if (!loader) return null
  try {{
    const mod = await loader()
    return mod.default ?? null
  }} catch {{
    return null
  }}
}}

export function teamExists(seasonId: string, teamId: string): boolean {{
  const seasonLoaders = teamLoaders[seasonId]
  return Boolean(seasonLoaders && teamId in seasonLoaders)
}}
'''
    rewind_file = DATA_ROOT / "getTeamRewind.ts"
    rewind_file.write_text(rewind_content, encoding="utf-8")
    print(f"Generated: {rewind_file}")

    # teams/index.ts barrel: import each season and export getTeamsForSeason, getTeamById(seasonId, id), etc.
    first_sid = sorted(season_teams.keys())[0]
    import_lines = []
    map_entries = []
    for sid in sorted(season_teams.keys()):
        var_name = f"season{sid}"
        import_lines.append(f"import * as {var_name} from '../seasons/{sid}/teams'")
        map_entries.append(f"  '{sid}': {var_name},")
    barrel_content = f'''/**
 * Team index barrel – aggregates teams by season for landing and rewind.
 * Auto-generated (scanned from seasons/).
 */

import type {{ TeamIndexEntry }} from '../rewind-types'
{chr(10).join(import_lines)}

const seasonModules: Record<string, typeof season{first_sid}> = {{
{chr(10).join(map_entries)}
}}

export function getTeamsForSeason(seasonId: string): TeamIndexEntry[] {{
  const m = seasonModules[seasonId]
  return m ? m.teamsIndex : []
}}

export function getTeamById(seasonId: string, id: string): TeamIndexEntry | undefined {{
  const m = seasonModules[seasonId]
  return m ? m.getTeamById(id) : undefined
}}

export function searchTeams(seasonId: string, query: string): TeamIndexEntry[] {{
  const m = seasonModules[seasonId]
  return m ? m.searchTeams(query) : []
}}

export function findBestMatch(seasonId: string, query: string): TeamIndexEntry | null {{
  const m = seasonModules[seasonId]
  return m ? m.findBestMatch(query) : null
}}
'''
    barrel_file = DATA_ROOT / "teams" / "index.ts"
    barrel_file.parent.mkdir(parents=True, exist_ok=True)
    barrel_file.write_text(barrel_content, encoding="utf-8")
    print(f"Generated: {barrel_file}")


def generate_all_teams(season: str = "2026"):
    """Genera archivos TypeScript para todos los equipos."""
    print(f"Generating team data for season {season}...")
    
    league = nv.get_league()
    teams = league.teams
    team_by_id = {t.team_id: t for t in teams}
    
    weeks = nv.get_available_weeks(league)
    if not weeks:
        print("No weeks found. Check LEAGUE_ID, YEAR and ESPN credentials.")
        return
    
    # Calcular todos los datos necesarios
    print("Computing team statistics...")
    team_ranks, raw_9cat = nv.league_9cat_rankings(teams)
    dominance_report = nv.category_dominance_report(teams, team_ranks, top_n=3)
    activity_list = nv.get_activity_per_team(league)
    consistency_ranking = nv.league_consistency_ranking(league, weeks)
    archetypes = nv.compute_archetypes(
        league, team_ranks, dominance_report, activity_list,
        consistency_ranking=consistency_ranking,
        trade_75_pct=75, min_trades_abs=10,
    )
    moty_team_id, moty_score, moty_breakdown = nv.compute_moty_winner(league, weeks, team_ranks)
    moty_winners = {moty_team_id} if moty_team_id is not None else set()
    first_place_titles = nv.compute_first_place_titles(team_ranks, moty_winners=moty_winners)

    # Standings: equipos ordenados por puesto final
    def _standing_key(t):
        s = getattr(t, "final_standing", None) or getattr(t, "standing", None)
        return (s is None or s == 0) and 99 or int(s)
    standings_list = sorted(teams, key=_standing_key)
    
    # Ceiling: ranking por mejor semana (best_points)
    print("\nComputing ceiling ranking...")
    ceiling_ranking = []
    n_teams = len(teams)
    for i, t in enumerate(teams):
        _progress_bar(i, n_teams, "  Ceiling ", t.team_name[:20])
        bw = nv.best_and_worst_week(league, t.team_id, weeks)
        ceiling_ranking.append((t.team_id, t.team_name, bw.get("best_points", 0) or 0))
    _progress_bar(n_teams, n_teams, "  Ceiling ", "done")
    print()
    ceiling_ranking.sort(key=lambda x: x[2], reverse=True)
    
    # Unstoppable (#1 racha victorias) y Free Fall (#1 racha derrotas)
    unstoppable_team, unstoppable_streak = nv.unstoppable_winner(league, weeks)
    streak_ender_team, streak_ender_week, streak_ender_victim_name = nv.streak_ender_winner(
        league, weeks, unstoppable_team, unstoppable_streak
    )
    free_fall_team, free_fall_streak = nv.free_fall_winner(league, weeks, standings_list)
    
    # Rankings de rachas (para slides Win Streaks / Lose Streaks)
    win_streak_ranking = nv.win_streak_ranking(league, weeks)
    lose_streak_ranking = nv.lose_streak_ranking(league, weeks, standings_list)
    
    # Recopilar datos por equipo
    print("\nCollecting data per team...")
    all_team_data = collect_team_data(
        league, weeks, team_by_id, team_ranks, dominance_report,
        activity_list, consistency_ranking, archetypes, first_place_titles, season,
        standings_list=standings_list, ceiling_ranking=ceiling_ranking,
        unstoppable_team=unstoppable_team, unstoppable_streak=unstoppable_streak,
        streak_ender_team=streak_ender_team, streak_ender_week=streak_ender_week,
        streak_ender_victim_name=streak_ender_victim_name, streak_ender_victim_streak=unstoppable_streak,
        free_fall_team=free_fall_team, free_fall_streak=free_fall_streak,
        win_streak_ranking=win_streak_ranking, lose_streak_ranking=lose_streak_ranking,
        moty_breakdown=moty_breakdown
    )
    
    # Directorio de salida para esta temporada
    output_dir = DATA_ROOT / "seasons" / season / "teams"
    output_dir.mkdir(parents=True, exist_ok=True)

    # Generar archivos TypeScript (slug ASCII para evitar fallos con nombres en chino, etc.)
    print("\nGenerating team files...")
    team_index_entries = []
    generated_ids = set()
    n_teams = len(teams)
    for i, team in enumerate(teams):
        tid = get_team_slug(team)
        _progress_bar(i, n_teams, "  Teams   ", tid)
        data = all_team_data[team.team_id]
        ts_content = generate_team_ts(team, data, season)
        
        output_file = output_dir / f"{tid}.ts"
        output_file.write_text(ts_content, encoding="utf-8")
        generated_ids.add(tid)
        team_index_entries.append({
            "id": tid,
            "displayName": team.team_name,
        })
    _progress_bar(n_teams, n_teams, "  Teams   ", "done")
    print()
    
    # Eliminar archivos .ts de equipos que ya no usan ese id (solo en esta temporada)
    for f in output_dir.glob("*.ts"):
        if f.name == "index.ts":
            continue
        base = f.stem
        if base not in generated_ids:
            try:
                f.unlink()
                print(f"Removed stale: {f}")
            except OSError as e:
                print(f"Could not remove {f}: {e}", file=sys.stderr)
    
    # Generar index.ts dentro de esta temporada (seasons/2026/teams/index.ts)
    entries_str = ",\n  ".join([
        f"{{ id: '{e['id']}', displayName: '{escape_for_ts(e['displayName'])}' }}"
        for e in team_index_entries
    ])
    index_content = f'''/**
 * Team index – list of all teams for this season (landing autocomplete).
 * Auto-generated from ESPN Fantasy Basketball data.
 */

import type {{ TeamIndexEntry }} from '../../rewind-types'

export const teamsIndex: TeamIndexEntry[] = [
  {entries_str}
]

export function getTeamIds(): string[] {{
  return teamsIndex.map((t) => t.id)
}}

export function getTeamById(id: string): TeamIndexEntry | undefined {{
  return teamsIndex.find((t) => t.id === id)
}}

export function searchTeams(query: string): TeamIndexEntry[] {{
  const q = query.trim().toLowerCase()
  if (!q) return teamsIndex
  return teamsIndex.filter(
    (t) =>
      t.id.toLowerCase().includes(q) ||
      t.displayName.toLowerCase().includes(q)
  )
}}

export function findBestMatch(query: string): TeamIndexEntry | null {{
  const q = query.trim().toLowerCase()
  if (!q) return null
  const exact = teamsIndex.find(
    (t) => t.id === q || t.displayName.toLowerCase() === q
  )
  if (exact) return exact
  const startsWith = teamsIndex.find(
    (t) =>
      t.displayName.toLowerCase().startsWith(q) || t.id.toLowerCase().startsWith(q)
  )
  if (startsWith) return startsWith
  const includes = teamsIndex.find(
    (t) =>
      t.displayName.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
  )
  return includes ?? null
}}
'''
    index_file = output_dir / "index.ts"
    index_file.write_text(index_content, encoding="utf-8")
    print(f"\nGenerated: {index_file}")

    # Regenerar getTeamRewind.ts y teams barrel escaneando todas las temporadas en seasons/
    _generate_rewind_loader_and_teams_barrel()
    
    print(f"\n✅ Generated {len(team_index_entries)} team files for season {season}")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Generate TypeScript team data files from ESPN Fantasy Basketball")
    parser.add_argument("--season", default="2026", help="Season year (default: 2026)")
    args = parser.parse_args()
    
    generate_all_teams(season=args.season)
