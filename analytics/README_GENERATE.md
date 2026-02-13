# Generar datos de equipos para Fantasy Rewind

Este script genera archivos TypeScript para cada equipo de la liga desde los datos de ESPN Fantasy Basketball.

## Uso

```bash
# Desde la raíz del proyecto
python analytics/generate_team_data.py

# Con season específico
python analytics/generate_team_data.py --season 2026
```

## Requisitos

- Python 3.7+
- Variables de entorno configuradas en `analytics/.env`:
  - `LEAGUE_ID`
  - `YEAR`
  - `ESPN_S2` (opcional, para datos privados)
  - `SWID` (opcional, para datos privados)

## Qué hace

1. **Conecta a ESPN API** usando `league_data.py`
2. **Calcula todas las métricas** para cada equipo:
   - Resumen de temporada (W-L-T, PF, PA, standing)
   - Mejor/peor semana
   - Dominancia 9CAT
   - MVPs (top 3 jugadores)
   - Arquetipos
   - Títulos (#1 en categorías) y **MOTY (Manager Of The Year)** por fórmula ponderada
   - Rival y némesis
   - Rachas de victorias/derrotas
   - Partidos cerrados
3. **Genera archivos TypeScript** en `src/data/teams/`:
   - Un archivo `.ts` por equipo con su `TeamRewindData`
   - Actualiza `src/data/teams/index.ts` con todos los equipos
   - Actualiza `src/data/getTeamRewind.ts` con los loaders dinámicos

## Estructura generada (orden estándar de slides)

Cada archivo `src/data/teams/[team-id].ts` contiene:
- `id`: ID del equipo (slug ASCII)
- `displayName`: Nombre completo del equipo
- `theme`: Colores de fondo y acento
- `slides`: Array en este orden:
  1. **Hero** – Your 2026 Rewind (intro)
  2. **Resumen general:** Season Record, Season Standings, Longest Streaks, PF vs PA
  3. **Contra otros equipos:** Consistency (stat), League Consistency (chart), Highest Scoring Week (matchup), Highest Scoring Week per team (rank), Close Games (stat + timeline), Closest Game, Rival (stat + timeline), Nemesis
  4. **Roster:** Roster Evolution, Season MVPs
  5. **Premios:** Category Dominance, Archetype, MOTY / Category Titles
  6. **Hero** – See you next season (outro)

## MOTY (Manager Of The Year) y MVA

MOTY se asigna por una **fórmula ponderada** (no por “#1 en 4 categorías”):

- **25% Stats:** Cantidad de categorías 9CAT en las que el equipo quedó #1.
- **15% Standings before playoffs:** Posición en la tabla antes de playoffs (mejor puesto = más puntos).
- **25% League winner:** 100 si el equipo ganó la liga (campeón), 0 si no.
- **35% MVA (Managerial Value Added):**
  - **Roster efficiency:** Puntos promedio por slot activo (starter) vs promedio de la liga (diferencial).
  - **Transaction impact:** Puntos totales aportados por jugadores adquiridos por waivers o trades, medidos solo mientras estaban en el roster (usando box scores y actividad). Si box scores o la línea temporal de actividad no están disponibles, se usa el **activity volume proxy**: trades + acquisitions + drops, como proxy de esfuerzo gerencial.

El equipo con mayor puntuación compuesta gana MOTY. Los títulos de categoría (#1 en PTS, etc.) se asignan como antes; si el #1 en una categoría es MOTY, el título pasa al #2 (cedido por MOTY).

- **Número de starters:** Por defecto 10; se puede leer de la configuración de la liga si la API lo expone.
- **Standings before playoffs:** Se usa `team.standing` (regular season) si existe; si no, `final_standing`.

## Logos de equipos (imágenes subidas por usuarios)

Las imágenes de equipo que los usuarios suben en ESPN (mystique-api) no cargan bien desde el frontend. El script usa **siempre la ruta local** cuando el equipo tiene imagen personalizada:

1. **Si ya existe un logo en `public/team-logos/`** para ese equipo (p. ej. `beijing-ducks-logo.png`, `novigrad-21ers.png`), se usa esa ruta (`/team-logos/...`) y no la API de ESPN.
2. Si no existe, el script **intenta descargar** la imagen de ESPN y guardarla en `public/team-logos/`.
3. Si la descarga falla (p. ej. ESPN exige sesión), puedes subir el logo a mano en `public/team-logos/` con nombre `{slug}.png` o `{slug}-logo.png` y volver a generar; entonces se usará la ruta local.

- Para que la descarga funcione cuando no hay archivo local, puedes pasar cookies de ESPN: `export ESPN_COOKIES="swid=...; espn_s2=..."` (desde Application → Cookies → fantasy.espn.com).
- Los logos por defecto de ESPN (g.espncdn.com, .svg) no se tocan; se sigue usando la URL porque sí carga en el navegador.

## Nombres de equipo en caracteres no latinos (ej. chino)

Para evitar fallos en URL, imports dinámicos y nombres de archivo, el **id del equipo** es siempre **solo ASCII**:

- Si el nombre está en `TEAM_SLUG_OVERRIDES` (en `generate_team_data.py`), se usa ese slug, ej. `北京首钢霹雳鸭` → `beijing-ducks`.
- Si no, y el nombre tiene caracteres no ASCII, se usa `team-{team_id}` (ej. `team-7`).
- El **displayName** sigue siendo el nombre original (chino, etc.) en la lista y en el rewind.

Así la URL del rewind es `/rewind/2026/beijing-ducks` y el archivo es `beijing-ducks.ts`, sin problemas de encoding.

## Notas

- Los IDs de equipo se generan sanitizando el nombre (espacios → guiones, solo ASCII)
- Si un equipo no tiene datos en alguna métrica, ese slide se omite
- Los temas (colores) se asignan rotativamente según el `team_id`
