# Sincronización diaria ESPN → Neon con n8n

El flujo `espn-daily-sync.json` ejecuta todos los días a las **3:00 AM (America/Mexico_City)** la misma
secuencia que el administrador local de `/admin/stats`, pero sin interfaz:

1. `generate_team_data.py` consulta ESPN y escribe catálogo, rosters, calidad de roster y el borrador de Stats Room.
2. `import-season-teams.ts` actualiza equipos, draft y rosters en Neon.
3. Si ya hay partidos con puntuación: `import-stats-room.ts`, `import-roster-quality.ts` y `verify-stats-room-import.ts`.

Las páginas usan `revalidate = 300`, así que el sitio en producción muestra los datos nuevos en ≤ 5 minutos.

```
Diario 3:00 AM → ¿Dentro de la temporada? → Ejecutar sync ESPN → Leer resultado → ¿Éxito? ─┬─ Sitio actualizado
                                                                                          └─ Marcar fallo
```

## Probar el script a mano

```bash
npm run sync:espn                   # temporada activa en Neon
npm run sync:espn -- --season 2027  # temporada explícita
```

- Registro: consola y `.logs/espn-sync/AAAA-MM-DD.log` (ignorado por git).
- Última línea: `ESPN_SYNC_RESULT {"ok":true,...}`; código de salida `0` si todo salió bien, `1` si no.
- Un lock en la carpeta temporal del sistema evita dos ejecuciones simultáneas (se libera solo tras 3 h si el proceso murió).
- Usa las mismas credenciales que el admin: `analytics/.env` (`LEAGUE_ID`, `SWID`, `ESPN_S2`) y `DATABASE_URL` en el `.env` raíz.

## Instalar el flujo

Requisito: n8n corriendo **en esta misma PC** (el nodo *Execute Command* ejecuta el script en el equipo donde vive n8n, que necesita Node, Python y este repositorio).

1. Si tu versión de n8n oculta el nodo *Execute Command* (las versiones 2.x lo desactivan por defecto), arráncalo habilitándolo:
   ```powershell
   $env:NODES_EXCLUDE = "[]"; npx n8n start
   ```
2. En n8n: **Workflows → Import from file** → `automation/n8n/espn-daily-sync.json`.
3. Revisa en el nodo **Ejecutar sync ESPN** que la ruta del repositorio sea la correcta.
4. Pulsa **Execute workflow** una vez para probarlo (fuera de la ventana de fechas el flujo se detiene en el segundo nodo; cambia temporalmente `START` para probar).
5. Activa el flujo (**Active**).

## Ventana de 5 meses

El nodo **¿Dentro de la temporada?** sólo deja pasar fechas entre `START = 2026-11-06` y `END = 2027-04-05`.
Fuera de ese rango no hace nada. Para la próxima temporada, edita esas dos constantes.

## Avisos de fallo

Cuando el script falla, **Marcar fallo** marca la ejecución como error en n8n con el mensaje del script.
Para recibir un aviso, crea un flujo con *Error Trigger* + tu canal (correo, Telegram, Discord…) y
selecciónalo en **Workflow settings → Error workflow**. El nodo **Leer resultado** incluye `tail`
(las últimas 40 líneas del registro) para adjuntarlo al aviso.

## Consideraciones

- **La PC debe estar encendida (y no suspendida) a las 3:00 AM.** Revisa la configuración de energía de Windows.
- El script modifica archivos generados del repo (`src/data/seasons/<año>/…`, logos en `public/team-logos/<año>/`),
  igual que el botón del admin. No hace commit ni push: la fuente de verdad del sitio es Neon.
- Los logos nuevos se descargan en `public/` local. Si un equipo cambia de foto, haz push de esa carpeta para que
  la versión desplegada también la tenga.
