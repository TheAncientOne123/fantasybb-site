# Analytics – league_data

Scripts para obtener información esencial de la API de ESPN Fantasy Basketball.

## Requisitos

- Python 3.9+
- `espn_api`: `pip install espn_api`
- Opcional: `python-dotenv` para cargar `.env`

## Configuración

Crea un `.env` **dentro de la carpeta `analytics/`** (junto a `league_data.py`). El script carga ese archivo aunque ejecutes desde la raíz del proyecto.

```env
LEAGUE_ID=896259475
YEAR=2026
SWID={3E123A0D-1697-4981-BFE5-6F689012E7D8}
ESPN_S2=tu_cookie_espn_s2
```

Sin comillas en los valores (o con comillas si SWID ya las trae). Si algo falla, revisa que el `.env` esté en `analytics/.env` y que las variables tengan nombre exacto: `LEAGUE_ID`, `YEAR`, `SWID`, `ESPN_S2`.

Para ligas públicas a veces basta con `LEAGUE_ID` y `YEAR`. Para ligas privadas necesitas `SWID` y `ESPN_S2` (cookies del navegador al estar logueado en ESPN).

## Semanas / matchup periods

La API de ESPN no expone de forma fiable “cuántas semanas hay”. Por eso las semanas se **descubren** así:

- Se llama a `league.scoreboard(matchup_period=m)` para `m = 1, 2, …` hasta un máximo (p. ej. 25).
- Cada periodo que devuelve datos se considera una semana válida.
- Esa lista es la que usan el resto de funciones (puntos por semana, mejor/peor semana, consistencia, etc.).

Función única para esto: **`get_available_weeks(league, max_periods=25)`**.

## Ejecutar

```bash
cd analytics
python league_data.py
```

O desde la raíz:

```bash
python analytics/league_data.py
```

## Funciones principales

| Función | Descripción |
|--------|-------------|
| `get_league()` | Crea `League` desde env |
| `get_available_weeks(league, max_periods=25)` | Lista de matchup periods con datos |
| `team_season_summary(team)` | Resumen temporada (W-L, PF, PA, standing) |
| `weekly_points_for_team(league, team_id, weeks)` | Puntos por semana (y rival, resultado) |
| `best_and_worst_week(league, team_id, weeks)` | Mejor/peor semana y promedio |
| `consistency_metrics(league, team_id, weeks)` | Promedio, std, min, max semanal |
| `league_consistency_ranking(league, weeks)` | Ranking por consistencia (std) |
| `close_games(league, team_id, weeks, margin=10)` | Partidos con diferencia ≤ margin |
| `close_record(close_list)` | W-L-T en partidos cerrados |
| `rival_by_points_combined(...)` | Rival con más puntos combinados |
| `nemesis_by_biggest_loss(...)` | Rival que nos ganó por más margen |
| `upset_vs_final_1(league, team_id, weeks)` | Victorias vs el campeón |
| `count_activity_by_team(activities)` | Conteo de actividad por equipo |
| `summarize_trade_activity(trade_acts)` | Trades por equipo y muestras |

Todas las que usan “semanas” reciben la lista devuelta por `get_available_weeks(league)`.
