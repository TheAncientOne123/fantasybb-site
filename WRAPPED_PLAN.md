# Fantasy League Wrapped – Plan e implementación

## Limpieza y enfoque actual

- **Wrapped = cascarón**: el contenido (imágenes, textos, estadísticas) lo crea el **admin a mano**, no se calcula desde ESPN ni métricas automáticas.
- **Control de temporadas**: cada año una temporada (tabla `seasons`).
- **Control de equipos**: equipos por liga (tabla `teams`); se pueden añadir o quitar.
- **Sistema de rewinds**: el admin crea/edita un rewind por temporada y equipo: sube imágenes, escribe textos y estadísticas (JSON). El frontend solo muestra ese contenido.

Ver `backend/database/schema_wrapped.sql` y `backend/README.md` para esquema y API.

---

## Idea (referencia)

En lugar de una página compleja de métricas avanzadas, el producto se centra en un **Season Wrapped** (estilo Spotify Wrapped / YouTube Rewind) que resume toda la temporada de la liga con información personalizada por equipo. Incluye estadísticas y awards como **"Highway Robbed"** (trade que prácticamente le robó al otro equipo), todo dentro de la dinámica de Wrapped.

## Enfoque técnico

### ¿Se puede hacer con Python y “tablas”?

Sí. Todo el Wrapped se construye en **Python** con:

1. **Funciones que arman “tablas” en memoria**  
   No hace falta SQL para el Wrapped. Se usan listas de diccionarios (equivalentes a filas) construidas desde `LeagueService` (ESPN):

   - **Tabla de scores semanales**: `build_weekly_scores_table(league_service, team_id)`  
     Cada fila: `week`, `pf`, `pa`, `opponent_id`, `opponent_name`, `win`.
   - **Tabla de trades con verdict**: `build_trades_table_with_verdict(league_service, team_id)`  
     Cada fila: `week`, `our_received`, `our_sent`, `other_team_name`, `verdict` (`great` | `good` | `neutral` | `bad` | `blunder`).
   - **Tabla de waivers**: `build_waivers_table(league_service, team_id)`  
     Cada fila: `week`, `player_added`, `player_dropped`, etc.

2. **Métricas derivadas de esas tablas**  
   A partir de las “tablas” anteriores se calculan en Python:

   - Expected wins, luck index, best/worst week, consistencia, etc.  
     (`compute_season_metrics(team_stats, weekly_table)`).
   - Awards, incluyendo **Highway Robbed** cuando hay un trade con `verdict == 'great'`  
     (`compute_awards(...)`).

3. **Slides y share card**  
   Las mismas funciones en Python generan la lista de slides y el objeto de la share card que consume el frontend. No se generan gráficas en el backend; el backend solo entrega **datos** (números y estructuras). Las gráficas se hacen en el frontend (p. ej. con Chart.js, Recharts, etc.) usando esos datos.

### Flujo de datos

```
ESPN (LeagueService) → rewind_service (Python)
  → tablas en memoria (weekly_scores, trades, waivers)
  → compute_season_metrics / compute_awards
  → build_slides / build_share_card
  → API GET /rewind/{season}/{team_id}?league_id=...
  → Frontend (Next.js) → UI Wrapped + gráficas
```

### Dónde está implementado

- **Backend**
  - `backend/api/services/rewind_service.py`: construcción de tablas, métricas, awards (incl. Highway Robbed) y generación de slides/share card.
  - `backend/api/routes/rewind.py`: endpoint que usa `get_full_rewind()` y devuelve `RewindResponse` (slides + share_card).

- **Frontend**
  - `src/app/awards/[season]/rewind/team/[teamId]/page.tsx`: página del Rewind por equipo (actualmente con datos estáticos; se puede conectar al endpoint anterior para pintar slides y gráficas con los datos del Wrapped).

### Award "Highway Robbed"

- **Qué es**: Se le da al equipo que hizo un trade que “le robó” al otro (ganó claramente el trade).
- **Cálculo (heurística actual)**:  
  En `build_trades_table_with_verdict` se asigna un `verdict` por trade para nuestro equipo:
  - `great`: recibimos al menos 2 jugadores más de los que enviamos → **Highway Robbed**.
  - `blunder`: enviamos al menos 2 más de los que recibimos.
  - `good` / `bad` / `neutral` según diferencia de cantidad.
- **Datos**: Se usa solo lo que devuelve ESPN (jugadores enviados/recibidos por equipo). Si más adelante tienes TNV o valores por jugador, se puede reemplazar la heurística por un cálculo basado en valor.

### Gráficas

- Los **datos** para las gráficas salen de las mismas tablas y métricas (p. ej. `weekly_table` para tendencia PF por semana, `metrics` para best/worst week, luck, etc.).
- El **dibujo** de las gráficas se hace en el frontend: el backend solo expone JSON (slides con números y listas); el frontend puede usar esa misma estructura para alimentar librerías de charts.

## Resumen

- **Sí es posible** hacer todo el Wrapped con **queries/funciones en Python**: tablas en memoria, métricas y slides desde `LeagueService`, sin depender de tablas SQL para el flujo del Wrapped.
- **Highway Robbed** y el resto de awards se calculan en Python a partir de esas tablas y del verdict de trades.
- Las **gráficas** se generan en el frontend a partir de los datos que devuelve la API de rewind.
