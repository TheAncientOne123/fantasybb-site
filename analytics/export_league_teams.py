"""Exporta el catálogo actual de equipos de ESPN sin consultar matchups."""

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
sys.path.insert(0, str(SCRIPT_DIR))

import league_data as league_data
from roster_quality import export_quality
from generate_team_data import (
    _is_mystique_logo_url,
    download_team_logo,
    get_local_logo_path,
    get_team_slug,
    build_profile_stats,
)


def export_teams(season: str, refresh_logos: bool = False, league=None) -> Path:
    os.environ['YEAR'] = season
    league = league or league_data.get_league()
    teams = []
    rosters = []
    for team in league.teams:
        team_id = get_team_slug(team)
        logo_url = league_data.get_team_logo_url(team)
        if logo_url and _is_mystique_logo_url(logo_url):
            refreshed_logo = download_team_logo(logo_url, team_id) if refresh_logos else None
            logo_url = refreshed_logo or get_local_logo_path(team_id) or download_team_logo(logo_url, team_id) or logo_url
        teams.append(
            {
                "id": team_id,
                "espnTeamId": int(team.team_id),
                "displayName": team.team_name,
                "logoUrl": logo_url,
            }
        )
        profile = build_profile_stats(
            team, {}, {}, roster_evol=league_data.roster_evolution(league, team)
        )
        current = profile.get('rosterFinal', [])
        for player in current:
            player.pop('fantasyPoints', None)
        picks = []
        for pick in getattr(league, 'draft', []) or []:
            if getattr(getattr(pick, 'team', None), 'team_id', None) != team.team_id:
                continue
            picks.append({
                'playerId': getattr(pick, 'playerId', None),
                'round': getattr(pick, 'round_num', None),
                'pick': getattr(pick, 'round_pick', None),
            })
        rosters.append({
            'id': team_id,
            'currentRoster': current,
            'draftedRoster': profile.get('rosterDrafted', []),
            'draftPicks': picks,
        })

    payload = {
        "seasonId": season,
        "generatedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "teams": sorted(teams, key=lambda item: item["displayName"].casefold()),
    }
    output = PROJECT_ROOT / "src" / "data" / "seasons" / season / "teams-catalog.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    roster_path = output.with_name('team-rosters.json')
    roster_path.write_text(json.dumps({
        'seasonId': season,
        'generatedAt': payload['generatedAt'],
        'teams': rosters,
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    export_quality(league, season, rosters, output.with_name('roster-quality.json'))
    print(f"Catálogo generado: {output}")
    print(f"Equipos encontrados: {len(teams)}")
    print(f"Rosters: {sum(len(team['currentRoster']) for team in rosters)} jugadores; draft: {sum(len(team['draftedRoster']) for team in rosters)} selecciones.")
    for team in payload["teams"]:
        print(f"  - {team['displayName']} ({team['id']})")
    return output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Exporta equipos de ESPN sin consultar semanas.")
    parser.add_argument("--season", required=True, help="Año de la temporada, por ejemplo 2027")
    parser.add_argument("--refresh-logos", action="store_true", help="Vuelve a descargar los logos de ESPN aunque exista una copia local.")
    args = parser.parse_args()
    if not args.season.isdigit() or len(args.season) != 4:
        parser.error("--season debe ser un año de cuatro dígitos")
    export_teams(args.season, refresh_logos=args.refresh_logos)
