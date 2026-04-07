"""
Catálogo estático NBA (src/data/seasons/2026/nba-players/players.json).
Para jugadores presentes en el JSON: headshot, equipo (abbr, logo, nombre opcional)
y posición son exactamente los del archivo (sin mapear a PG/SG/SF/PF/C).
"""

import json
import re
import unicodedata
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parent.parent
_CATALOG_PATH = _REPO_ROOT / "src" / "data" / "seasons" / "2026" / "nba-players" / "players.json"


def _normalize_name(name):
    if name is None:
        return ""
    s = str(name).strip().lower()
    if not s:
        return ""
    s = unicodedata.normalize("NFKD", s)
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    s = re.sub(r"[^a-z0-9]+", " ", s).strip()
    return s


def load_nba_players_index():
    """Construye índices del catálogo: by_id y by_name (normalizado)."""
    if not _CATALOG_PATH.is_file():
        return {"by_id": {}, "by_name": {}}
    with open(_CATALOG_PATH, encoding="utf-8") as f:
        rows = json.load(f)
    if not isinstance(rows, list):
        return {"by_id": {}, "by_name": {}}
    by_id = {}
    by_name = {}
    for row in rows:
        if not isinstance(row, dict):
            continue
        nm = _normalize_name(row.get("fullName"))
        if nm:
            by_name.setdefault(nm, row)
        sid = row.get("id")
        if sid is None:
            continue
        try:
            pid = int(sid)
        except (TypeError, ValueError):
            continue
        by_id[pid] = row
    return {"by_id": by_id, "by_name": by_name}


def load_nba_players_by_id():
    """Compat: playerId (int) -> fila del JSON."""
    return load_nba_players_index().get("by_id", {})


def find_catalog_row(nba_catalog_index, player_id=None, name=None):
    """Busca primero por id y luego por nombre normalizado."""
    if not isinstance(nba_catalog_index, dict):
        return None
    by_id = nba_catalog_index.get("by_id") or {}
    by_name = nba_catalog_index.get("by_name") or {}
    if player_id is not None:
        try:
            ipid = int(player_id)
        except (TypeError, ValueError):
            ipid = None
        if ipid is not None and ipid in by_id:
            return by_id[ipid]
    nm = _normalize_name(name)
    if nm and nm in by_name:
        return by_name[nm]
    return None


def apply_nba_catalog_to_roster_row(row, catalog_row):
    """
    Si catalog_row existe, la fila pasa a depender solo del JSON para:
    headshotUrl, teamLogoUrl, proTeamAbbrev, positions (texto literal), proTeamName (opcional).
    Marca proTeamFromNbaCatalog para que la UI no use fallbacks ESPN en logo.
    """
    if not catalog_row or not isinstance(catalog_row, dict):
        row.pop("proTeamFromNbaCatalog", None)
        row.pop("proTeamName", None)
        return
    row["proTeamFromNbaCatalog"] = True
    hu = catalog_row.get("headshotUrl")
    row["headshotUrl"] = str(hu).strip() if hu is not None and str(hu).strip() else ""
    tlu = catalog_row.get("teamLogoUrl")
    row["teamLogoUrl"] = str(tlu).strip() if tlu is not None and str(tlu).strip() else ""
    team = (catalog_row.get("team") or "").strip().upper()
    row["proTeamAbbrev"] = team if team else "FA"
    pos = catalog_row.get("position")
    if pos is not None and str(pos).strip():
        row["positions"] = [str(pos).strip()]
    else:
        row["positions"] = []
    tname = catalog_row.get("teamName")
    if tname is not None and str(tname).strip():
        row["proTeamName"] = str(tname).strip()
    else:
        row.pop("proTeamName", None)
