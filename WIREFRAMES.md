# Wireframes y Estructura de Páginas

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

## 📅 TIMELINE (/timeline)

### Structure
```
┌─────────────────────────────────────────────────────────────┐
│  Timeline                    [My Timeline] [League Timeline]│
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 🔄  Semana 8 | Trade                                 │   │
│  │                                                       │   │
│  │ Enviado: LeBron James                                │   │
│  │ Recibido: Luka Dončić + Pick                         │   │
│  │                                                       │   │
│  │ TNV: +45.3 🟢  |  Verdict: "Great Move"             │   │
│  │                                                       │   │
│  │ "Mejoraste significativamente tu roster con este     │   │
│  │  trade. Luka aporta más valor a largo plazo."        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ➕  Semana 7 | Waiver                                │   │
│  │                                                       │   │
│  │ Added: Stephen Curry                                 │   │
│  │ WIA: +45.2  |  WER: 0.85                            │   │
│  │                                                       │   │
│  │ Verdict: "Excellent Pickup"                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ... (más eventos)                                           │
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

**Timeline Mobile:**
- Events: cards full width
- View toggle: botones apilados

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
