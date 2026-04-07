# LACMSI League – Sitio web (Fantasy Basketball)

Aplicación web para la liga de Fantasy NBA **LACMSI** (Look At Curry Man So Inspirational): landing pública, **Rewind** estilo Wrapped, **Stats Room**, premios y reglas. Los datos del Rewind y del Stats Room se generan con scripts Python contra la API de ESPN y viven como TypeScript estático en el repo.

## Tabla de contenidos

- [Stack y scripts](#stack-y-scripts)
- [Rutas de la app](#rutas-de-la-app)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Contenido del sitio y reglas](#contenido-del-sitio-y-reglas)
- [Landing page](#landing-page)
- [Fantasy Rewind (datos y rutas)](#fantasy-rewind-datos-y-rutas)
- [Analytics (Python)](#analytics-python)
- [Plan Wrapped / visión de producto](#plan-wrapped--visión-de-producto-no-implementado-en-esta-repo)
- [Wireframes y estructura de páginas (referencia)](#wireframes-y-estructura-de-páginas-referencia)
- [Licencia](#licencia)

## Stack y scripts

| Área | Tecnología |
|------|------------|
| Framework | Next.js 14 (App Router), TypeScript |
| Estilos | Tailwind CSS |
| Gráficas | Recharts |
| Animación | Framer Motion |
| Iconos | Lucide React |
| Markdown en UI | react-markdown, remark-gfm |
| Export / share | html-to-image, canvas-confetti |

```bash
npm install
npm run dev          # desarrollo
npm run build        # producción
npm start            # servir build
npm run lint         # ESLint (Next)
npm run type-check   # tsc --noEmit
```

**Python (analytics):** ver sección [Analytics (Python)](#analytics-python).

## Rutas de la app

| Ruta | Descripción |
|------|-------------|
| `/` | Landing de la liga (hero, nav, equipos, reglas, acceso rápido, campeones) |
| `/rewind` | Selector / hub hacia rewinds por temporada |
| `/rewind/[seasonId]/[teamId]` | Experiencia fullscreen de slides por equipo |
| `/stats` | Stats Room (datos agregados por temporada) |
| `/awards` | Hall of Fame / premios y badges |
| `/rules` | Reglas de la liga (lee `src/content/rules/league-rules.md`) |
| `/team/[teamId]` | Páginas estáticas por equipo (SSG) |
| `/admin/rewinds`, `/admin/rewinds/[seasonId]`, `/admin/rewinds/[seasonId]/[teamId]` | Flujo admin de rewinds (cliente + API opcional) |
| `/wrapped`, `/wrapped/[seasonId]`, `/wrapped/[seasonId]/team/[teamId]` | Flujo “Wrapped” alterno (admin) |
| `/api/proxy-image` | Proxy de imágenes |

## Estructura del repositorio

```
fantasybb-site/
├── analytics/                 # Python: ESPN + generación de TS
│   ├── league_data.py
│   ├── generate_team_data.py
│   └── .env                   # (local) credenciales liga — no versionar
├── public/                    # Assets estáticos, badges, team-logos
├── src/
│   ├── app/                   # App Router (páginas y layouts)
│   ├── components/            # landing, layout, rewind, stats, ui, …
│   ├── content/rules/         # league-rules.md (fuente de /rules)
│   ├── data/                  # rewind-types, getTeamRewind, seasons/{year}/…
│   ├── hooks/
│   └── lib/                   # utils, api client, auth helpers, rewind-image
├── README.md
└── package.json
```

## Contenido del sitio y reglas

Las **reglas completas** de la liga están en **`src/content/rules/league-rules.md`**. La página **`/rules`** lee ese archivo en el servidor (`readFile`) y lo renderiza con React Markdown.

> No elimines ni muevas ese archivo sin actualizar `src/app/rules/page.tsx`.

## Landing page

La landing presenta la liga y enlaces rápidos a Rewind, premios y estadísticas.

### Secciones (orden)

1. **LeagueHero** – Nombre de la liga, tagline, gradientes y animaciones de entrada.
2. **LeagueNav** – Tarjetas hacia Rewind, Hall of Fame (`/awards`), Stats Room (`/stats`), etc.
3. **LeagueIntro** – Qué es la liga y su filosofía.
4. **LeagueMembers** – Grid de equipos de la temporada; enlace al Rewind de cada uno.
5. **LeagueRules** – CTA hacia `/rules`.
6. **QuickAccess** – Buscador de equipos, selector de temporada, acceso directo al Rewind.
7. **SeasonChampions** – Campeones por temporada con enlaces al Rewind del campeón.
8. **Footer** – Copyright / tagline.

### Componentes (`src/components/landing/`)

`LeagueHero.tsx`, `LeagueNav.tsx`, `LeagueIntro.tsx`, `LeagueMembers.tsx`, `LeagueRules.tsx`, `QuickAccess.tsx`, `SeasonChampions.tsx`.

### Personalización rápida

- **Campeones:** array `champions` en `SeasonChampions.tsx` (`seasonId`, `seasonLabel`, `teamName`, `teamId`, `record`).
- **Logos:** mapa en `LeagueMembers.tsx` y archivos en `public/team-logos/`.
- **Menú:** array `navItems` en `LeagueNav.tsx`.

### Estilo

Fondo `slate-950`, acentos `amber-400/500`, gradientes purple/blue; tipografía **Bebas Neue** (headings) + **Inter** (body); bordes translúcidos y blur.

## Fantasy Rewind (datos y rutas)

Experiencia tipo **Spotify Wrapped**: historias a pantalla completa con slides, navegación y exportación de la diapositiva actual (PNG). Los datos son **estáticos** en el frontend (TypeScript generado), sin base de datos en este repo.

### Cómo ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Desde la landing o `/rewind`, elige temporada y equipo; la URL del Rewind es **`/rewind/[seasonId]/[teamId]`** (por ejemplo `/rewind/2026/beijing-ducks`).

### Modelo de datos

- Listado de equipos y temporadas: ver `src/data/getTeamRewind.ts`, `src/data/teams/index.ts` y archivos bajo `src/data/seasons/{seasonId}/teams/*.ts`.
- Cada equipo exporta **`TeamRewindData`** (`src/data/rewind-types.ts`): `id`, `displayName`, `theme` opcional, `slides` (unión de tipos: hero, stat, list, chart, award, image, quote, etc., según el proyecto).

### Añadir o regenerar equipos

Lo habitual es ejecutar **`python analytics/generate_team_data.py`** (ver sección Analytics), que escribe los `.ts` por equipo y actualiza loaders. Para un equipo a mano: añade el archivo en `src/data/seasons/{season}/teams/`, regístralo en el barrel / `getTeamRewind` según el patrón existente.

### Assets

Imágenes en `public/` (p. ej. `public/assets/`, `public/badges/`, `public/team-logos/`) y rutas absolutas tipo `/assets/...` en los slides.

### Componentes principales (`src/components/rewind/`)

Incluye `SlideRenderer.tsx` y slides por tipo (hero, stat, list, gráficas, etc.).

## Analytics (Python)

Scripts para **ESPN Fantasy Basketball** (`espn_api`) y para **generar** los archivos TypeScript del Rewind y del Stats Room.

### Requisitos

- Python 3.9+ (3.7+ mínimo para el generador)
- `pip install espn_api`
- Opcional: `python-dotenv` para cargar `.env`

### Configuración (`.env` en `analytics/`)

Crea **`analytics/.env`** junto a `league_data.py`:

```env
LEAGUE_ID=123456789
YEAR=2026
SWID={tu-swid}
ESPN_S2=tu_cookie_espn_s2
```

Nombres exactos: `LEAGUE_ID`, `YEAR`, `SWID`, `ESPN_S2`. En ligas públicas a veces bastan `LEAGUE_ID` y `YEAR`; en privadas suelen hacer falta cookies de sesión.

### Semanas (matchup periods)

La API no siempre expone el número de semanas de forma fiable. Se descubren con `league.scoreboard(matchup_period=m)` para `m = 1…` hasta un máximo (p. ej. 25). Función central: **`get_available_weeks(league, max_periods=25)`**. El resto de funciones que usan “semanas” deben recibir esa lista.

### Ejecutar `league_data.py`

```bash
cd analytics
python league_data.py
```

o desde la raíz:

```bash
python analytics/league_data.py
```

### Funciones principales (`league_data.py`)

| Función | Descripción |
|--------|-------------|
| `get_league()` | Construye `League` desde variables de entorno |
| `get_available_weeks(league, max_periods=25)` | Periodos con datos |
| `team_season_summary(team)` | Resumen W-L-T, PF, PA, standing |
| `weekly_points_for_team(league, team_id, weeks)` | PF por semana, rival, resultado |
| `best_and_worst_week(...)` | Mejor / peor semana |
| `consistency_metrics(...)` | Media, desv., min, max semanal |
| `league_consistency_ranking(...)` | Ranking por consistencia |
| `close_games(...)` | Partidos con margen ≤ umbral |
| `close_record(close_list)` | Record en partidos cerrados |
| `rival_by_points_combined(...)` | Rival con más puntos combinados |
| `nemesis_by_biggest_loss(...)` | Rival con la derrota más grande |
| `upset_vs_final_1(...)` | Victorias vs el campeón |
| `count_activity_by_team(activities)` | Actividad por equipo |
| `summarize_trade_activity(trade_acts)` | Resumen de trades |

### Generar datos de equipos (`generate_team_data.py`)

```bash
python analytics/generate_team_data.py
python analytics/generate_team_data.py --season 2026
```

**Qué hace:**

1. Conecta a ESPN vía `league_data.py`.
2. Calcula métricas por equipo (resumen, mejor/peor semana, 9CAT, MVPs, arquetipos, títulos, MOTY, rivales, rachas, partidos cerrados, etc.).
3. Escribe TypeScript bajo **`src/data/seasons/{season}/`**:
   - Un archivo por equipo en `teams/`.
   - **`stats-room.ts`** para la página **`/stats`** (standings, matchups RS, tabla de temporada, 9CAT, bracket playoff cuando haya datos).
   - En **`stats-room.ts`** también se escriben **`consolationBrackets`** (ladder seeds 7–10 y *winner’s consolation* a partir del scoreboard de playoffs) y **`nextDraftOrder`**: orden de draft de la siguiente liga (picks **1–4** consolación 7–10, **5–8** winner’s consolation, **9** subcampeón, **10** campeón). Pick más bajo = mejor posición; dentro de cada bloque de cuatro, peor récord en esos partidos = mejor pick del bloque. Si la temporada está en curso o faltan scores, verás **TBD** en la UI hasta volver a generar.
   - Actualiza el barrel de equipos y **`getTeamRewind.ts`** con imports dinámicos.

**Orden típico de slides** (documentación del generador): hero intro → bloques de temporada / standings / rachas / PF vs PA → consistencia y charts → semana alta, rival, némesis → roster / MVPs → dominancia de categorías, arquetipo, MOTY / títulos → hero cierre.

**MOTY (Manager Of The Year):** fórmula ponderada (stats 25%, standings pre-playoffs 15%, ganar liga 25%, MVA 35% con eficiencia de roster e impacto de transacciones o proxy de volumen de actividad). Si el #1 de una categoría es MOTY, el título puede ceder al #2.

**Logos:** prioriza `public/team-logos/`; el script puede intentar descargar desde ESPN. Para cookies de descarga: `ESPN_COOKIES="swid=...; espn_s2=..."`.

**Slugs ASCII:** IDs de equipo solo ASCII (`TEAM_SLUG_OVERRIDES` en el script, o `team-{id}` si el nombre tiene caracteres no latinos). `displayName` conserva el nombre original.

## Plan Wrapped / visión de producto (no implementado en esta repo)

Documento histórico de diseño: **Wrapped administrado** (contenido cargado por admin), temporadas y equipos en tablas, flujo **ESPN → Python → tablas en memoria → métricas, awards (p. ej. “Highway Robbed”) → slides JSON → API → frontend**.

En **esta** monorepo **no** existe la carpeta `backend/` ni el esquema SQL citado en planes antiguos. El flujo real de datos del sitio público es **Python → archivos `.ts` estáticos → Next.js**. Las rutas tipo `backend/api/...` del plan son **referencia futura**, no el estado actual del código.

---

## Wireframes y estructura de páginas (referencia)

> **Nota:** Estos wireframes describen la visión de producto. Algunas rutas (p. ej. `/me`, `/moves`) **no** están implementadas en esta repo. El **Rewind** implementado vive en **`/rewind/[seasonId]/[teamId]`** (no en `/awards/.../rewind/...`). Las pantallas **`/stats`** y **`/awards`** sí existen; compáralas con estos bocetos como guía, no como spec exacta.

Este documento describe la estructura visual y de contenido de cada página.

---

## 🏠 HOME (/me) - Matchup Hub

### Above the Fold (Desktop)
```
┌─────────────────────────────────────────────────────────────────────┐
│  [Sidebar]  [TopBar: Season | Week | Search | Avatar]              │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  MATCHUP SEMANAL - Semana 12                                  │ │
│  │                                                                │ │
│  │  ┌──────────────┐        vs        ┌──────────────┐         │ │
│  │  │ Mi Equipo     │                  │ Rival        │         │ │
│  │  │ Los Curry...  │                  │ LeBron Army  │         │ │
│  │  │               │                  │              │         │ │
│  │  │ 1,234.5 PF   │                  │ 1,198.3 PF   │         │ │
│  │  │ Proy: 1,250   │                  │ Proy: 1,200  │         │ │
│  │  └──────────────┘                  └──────────────┘         │ │
│  │                                                                │ │
│  │  Win Probability: 78% 🟢 [Barra visual]                        │ │
│  │  Status: Ganando                                               │ │
│  │                                                                │ │
│  │  ⚠️ Alerts:                                                    │ │
│  │  • Jugador lesionado (High)                                   │ │
│  │  • Riesgo de DNP (Medium)                                     │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  Key Players                                                        │
│  ┌──────────────┐  ┌──────────────┐                               │
│  │ Stephen Curry│  │ LeBron James │                               │
│  │ +45.3 🟢     │  │ -12.5 🔴     │                               │
│  └──────────────┘  └──────────────┘                               │
│                                                                     │
│  Análisis del Matchup                                               │
│  ┌──────────────┐  ┌──────────────┐                               │
│  │ PF vs PA     │  │ Proy vs Real│                               │
│  │ [Line Chart] │  │ [Scatter]   │                               │
│  └──────────────┘  └──────────────┘                               │
│                                                                     │
│  [Deep Dive Matchup Button]                                         │
└─────────────────────────────────────────────────────────────────────┘
```

### Mobile
- Top bar colapsado (solo season/week + avatar)
- Matchup hero card full width
- Key players en lista vertical
- Charts apilados verticalmente
- Bottom nav visible

---

## 👤 MY TEAM (/team)

### Header Section
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo/Emoji]  "Los Curry Lovers"                           │
│  @username                                                   │
│                                                              │
│  Título 2024: "Son Of LeBron" [✏️ Editar]                   │
│                                                              │
│  🏆 Badges: [Badge1] [Badge2] [Badge3] [Badge4] [Badge5]   │
│  +12 más                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Tabs Navigation
```
[Roster] [Season] [Identity] [Favorites]
```

### Roster Tab
```
┌─────────────────────────────────────────────────────────────┐
│  Plantilla                                                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ PG  Stephen Curry    GSW  [Healthy]  [Start]        │   │
│  │     45.3 PF esta semana                             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ SF  LeBron James     LAL  [Questionable] [Sit]      │   │
│  │     -12.5 PF esta semana                            │   │
│  └──────────────────────────────────────────────────────┘   │
│  ... (más jugadores)                                        │
└─────────────────────────────────────────────────────────────┘
```

### Season Tab
```
┌─────────────────────────────────────────────────────────────┐
│  Totales                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ PF       │  │ PA       │  │ Net      │                  │
│  │ 15,234   │  │ 14,567   │  │ +667     │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                              │
│  Expected Wins (xW)                                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ xW: 10.5  |  Real: 12  |  Luck: +1.5                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Trends                                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ [Line Chart: PF por semana]                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Identity Tab
```
┌─────────────────────────────────────────────────────────────┐
│  Estilo de Juego                                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         [Radar Chart]                                  │   │
│  │                                                         │   │
│  │  Efficiency: ████████░░ 80%                          │   │
│  │  Consistency: ██████░░░░ 60%                          │   │
│  │  Clutch: ██████████ 100%                              │   │
│  │  Depth: ████░░░░░░ 40%                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Strengths: Efficiency, Clutch                               │
│  Weaknesses: Depth                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 STATS LAB (/stats)

### Structure
```
┌─────────────────────────────────────────────────────────────┐
│  Stats Lab                                                   │
│  Analítica avanzada y métricas de rendimiento                │
│                                                              │
│  [Efficiency] [Consistency] [Clutch] [Luck] [Draft] [Rank]  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ PPV          │  │ Net Fantasy  │  │ Defensive    │      │
│  │ 2.34         │  │ Rating       │  │ Efficiency   │      │
│  │ 85th %ile    │  │ 145.6        │  │ 0.78         │      │
│  │ "Eficiente"  │  │ 72nd %ile    │  │ 68th %ile    │      │
│  │ [ℹ️]         │  │ "Rating..."  │  │ "Consist..." │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ... (más métricas en grid)                                 │
│                                                              │
│  League Rankings                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ [Leaderboard table]                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 MOVES (/moves)

### Tabs
```
[Waivers] [Trades] [Streamers]
```

### Waivers Tab
```
┌─────────────────────────────────────────────────────────────┐
│  Waivers                                                     │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ IWW      │  │ WIA      │  │ WER      │                 │
│  │ 2.3      │  │ +45.2    │  │ 0.78     │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                              │
│  Historial                                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Semana 8: Added Stephen Curry                        │   │
│  │ WIA: +45.2  |  WER: 0.85  |  IWW: 2.1               │   │
│  └──────────────────────────────────────────────────────┘   │
│  ... (más waivers)                                          │
└─────────────────────────────────────────────────────────────┘
```

### Trades Tab
```
┌─────────────────────────────────────────────────────────────┐
│  Trades                                                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Semana 8                                             │   │
│  │                                                       │   │
│  │ Enviado: LeBron James                                │   │
│  │ Recibido: Luka Dončić + Pick                          │   │
│  │                                                       │   │
│  │ TNV: +45.3 🟢  |  Verdict: "Great Move"             │   │
│  │ Context Score: 0.85  |  OCI: 0.12                    │   │
│  │                                                       │   │
│  │ [Ver detalles]                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│  ... (más trades)                                            │
└─────────────────────────────────────────────────────────────┘
```

### Streamers Tab
```
┌─────────────────────────────────────────────────────────────┐
│  Streamers                                                   │
│                                                              │
│  Recommended Pickups                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Player Name          Score: 8.5/10                   │   │
│  │ Pos: PG/SG  |  Team: GSW                            │   │
│  │                                                       │   │
│  │ Por qué:                                             │   │
│  │ • Matchup favorable esta semana                      │   │
│  │ • Minutes trending up                               │   │
│  │ • Low ownership                                      │   │
│  │                                                       │   │
│  │ [Add Player]                                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Start/Sit                                                   │
│  [Lista de recomendaciones]                                  │
│                                                              │
│  Drop Candidates                                              │
│  [Lista de jugadores a considerar dropear]                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏆 AWARDS (/awards)

### Structure
```
┌─────────────────────────────────────────────────────────────┐
│  Awards                                                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Season Rewind 2024-25                                │   │
│  │ Revive tu temporada con un resumen completo          │   │
│  │                                    [Ver Rewind]      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  This Season                                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                   │
│  │ 🏆   │  │ 🏆   │  │ 🏆   │  │ 🏆   │                   │
│  │ Badge│  │ Badge│  │ Badge│  │ Badge│                   │
│  │ Name │  │ Name │  │ Name │  │ Name │                   │
│  │ Wk 8 │  │ Wk 5 │  │ Wk 3 │  │ Wk 1 │                   │
│  └──────┘  └──────┘  └──────┘  └──────┘                   │
│  ... (grid de badges)                                       │
│                                                              │
│  All-Time                                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Historial de títulos y badges acumulativos           │   │
│  │                                                       │   │
│  │ 2024-25: "Son Of LeBron"                             │   │
│  │ 2023-24: "Doncic Enjoyer"                            │   │
│  │ ...                                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎬 REWIND (/awards/[season]/rewind/team/[teamId])

### Slide Structure (Scroll Vertical)
```
┌─────────────────────────────────────────────────────────────┐
│  [Hero Slide - Full Viewport]                               │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                       │   │
│  │            Los Curry Lovers                           │   │
│  │                  🏀                                   │   │
│  │                                                       │   │
│  │                 12-5                                  │   │
│  │              3er lugar                                 │   │
│  │                                                       │   │
│  │            "Son Of LeBron"                            │   │
│  │                                                       │   │
│  │         Power Score: 1,234                            │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  [Scroll Down Indicator]                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  [Expectations vs Reality Slide]                             │
│  ┌──────────────┐        ┌──────────────┐                  │
│  │ Wins Proy    │        │ Wins Reales  │                  │
│  │     10       │        │     12       │                  │
│  └──────────────┘        └──────────────┘                  │
│  [Chart: Comparativa]                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  [Identity Radar Slide]                                      │
│  [Radar Chart grande centrado]                                │
└─────────────────────────────────────────────────────────────┘

... (más slides: Waivers, Trades, Best/Worst Week, Luck, Awards, GM Score)

┌─────────────────────────────────────────────────────────────┐
│  [Share Card Slide - Final]                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  [Share Card Visual - 1200x630px]                     │   │
│  │                                                       │   │
│  │  Los Curry Lovers                                   │   │
│  │  12-5 • 3er lugar                                     │   │
│  │  Power Score: 1,234                                   │   │
│  │  [Top Badges]                                         │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│  [Exportar Share Card Button]                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 Mobile Adaptations

### General Rules
- **Sidebar → Bottom Nav:** 5 items principales
- **Top Bar:** Colapsa a solo season/week + avatar
- **Cards:** Full width, apilados verticalmente
- **Charts:** Full width, altura reducida
- **Tabs:** Scroll horizontal si necesario
- **Grids:** 1 columna en mobile, 2 en tablet

### Specific Mobile Layouts

**Home Mobile:**
- Matchup hero: full width, stack scores verticalmente
- Key players: lista vertical
- Charts: apilados, full width

**Stats Lab Mobile:**
- Metrics: 1 columna
- Tabs: scroll horizontal
- Leaderboards: tabla scrollable

---

## 🎨 Estados Visuales

### Loading States
- Skeleton loaders con shimmer
- Spinner para métricas
- Progress bar para Rewind

### Empty States
- Icono grande
- Mensaje descriptivo
- CTA si aplica

### Error States
- Mensaje claro
- Retry button
- Fallback a datos cached

---

## 📐 Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1023px
- **Desktop:** ≥ 1024px

Sidebar visible solo en desktop (≥1024px).

## Licencia

Privado – uso interno de la liga.

