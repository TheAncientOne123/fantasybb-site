/**
 * ESPN → archivos locales → Neon.
 *
 * Módulo compartido por el administrador local (`/api/admin/stats/run`) y la
 * sincronización automática (`scripts/sync-espn.ts`, llamada por n8n). No usa
 * `server-only` ni alias `@/` para poder ejecutarse también con tsx.
 */
import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { StatsRoomData } from '../data/stats-room-types'

export type StatsAction = 'sync-teams' | 'generate' | 'publish' | 'daily'
export type Writer = (message: string) => void

export const STATS_ACTIONS: readonly StatsAction[] = ['sync-teams', 'generate', 'publish', 'daily']

export function isStatsAction(value: unknown): value is StatsAction {
  return typeof value === 'string' && (STATS_ACTIONS as readonly string[]).includes(value)
}

export function isSeasonId(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}$/.test(value)
}

/** Lee el borrador `src/data/seasons/<id>/stats-room.ts` generado por Python. */
export async function readGeneratedStatsRoom(
  seasonId: string,
  cwd = process.cwd()
): Promise<StatsRoomData | null> {
  if (!isSeasonId(seasonId)) return null
  const filePath = resolve(cwd, 'src', 'data', 'seasons', seasonId, 'stats-room.ts')

  try {
    const source = await readFile(filePath, 'utf8')
    const assignment = 'const statsRoomData: StatsRoomData = '
    const start = source.indexOf(assignment)
    const end = source.lastIndexOf('export default statsRoomData')
    if (start === -1 || end === -1) return null

    const data = JSON.parse(source.slice(start + assignment.length, end).trim()) as StatsRoomData
    return data.seasonId === seasonId ? data : null
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw error
  }
}

function runCommand(
  command: string,
  args: string[],
  options: { cwd: string; env: NodeJS.ProcessEnv; write: Writer }
): Promise<void> {
  return new Promise((resolveCommand, rejectCommand) => {
    options.write(`\n> ${command} ${args.join(' ')}\n`)
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env,
      shell: false,
      windowsHide: true,
    })

    child.stdout.on('data', (chunk) => options.write(String(chunk)))
    child.stderr.on('data', (chunk) => options.write(String(chunk)))
    child.on('error', rejectCommand)
    child.on('close', (code) => {
      if (code === 0) resolveCommand()
      else rejectCommand(new Error(`${command} terminó con código ${code ?? 'desconocido'}.`))
    })
  })
}

export type StatsActionResult = {
  /** true cuando ya hay partidos con puntuación y el Stats Room se publicó. */
  statsPublished: boolean
}

/**
 * Ejecuta una acción del pipeline. Lanza un error si cualquier paso falla.
 *
 * - `sync-teams`: catálogo, logos, draft y rosters → Neon (sin estadísticas).
 * - `generate`: consulta ESPN y escribe sólo archivos locales (borrador).
 * - `publish`: importa el borrador existente en Neon y lo verifica.
 * - `daily`: generate + sincronizar equipos/rosters + publish (si hay partidos).
 */
export async function runStatsAction(
  action: StatsAction,
  seasonId: string,
  write: Writer,
  cwd = process.cwd()
): Promise<StatsActionResult> {
  if (!isSeasonId(seasonId)) throw new Error(`Temporada inválida: ${seasonId}`)

  const env: NodeJS.ProcessEnv = {
    ...process.env,
    YEAR: seasonId,
    PYTHONUNBUFFERED: '1',
    PYTHONUTF8: '1',
    PYTHONIOENCODING: 'utf-8',
  }
  const options = { cwd, env, write }
  const tsxRunner = resolve(cwd, 'scripts', 'run-tsx.cjs')

  const python = async (script: string, args: string[]) => {
    const scriptPath = resolve(cwd, 'analytics', script)
    try {
      await runCommand('python', [scriptPath, ...args], options)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
      write('No se encontró python; intentando con el launcher py de Windows.\n')
      await runCommand('py', ['-3', scriptPath, ...args], options)
    }
  }
  const tsx = (script: string) =>
    runCommand(process.execPath, [tsxRunner, `scripts/${script}`, '--season', seasonId], options)

  const syncTeams = async (refreshFromEspn: boolean) => {
    if (refreshFromEspn) {
      write('Leyendo el catálogo de ESPN sin consultar matchups...\n')
      await python('export_league_teams.py', ['--season', seasonId, '--refresh-logos'])
    }
    write('\nActualizando equipos, draft y rosters en Neon...\n')
    await tsx('import-season-teams.ts')
  }

  const generate = async () => {
    write('Consultando ESPN y generando archivos locales...\n')
    await python('generate_team_data.py', ['--season', seasonId])
    return (await readGeneratedStatsRoom(seasonId, cwd)) !== null
  }

  const publish = async () => {
    write('Importando el borrador generado en Neon...\n')
    await tsx('import-stats-room.ts')
    await tsx('import-roster-quality.ts')
    write('\nVerificando la importación...\n')
    await tsx('verify-stats-room-import.ts')
  }

  switch (action) {
    case 'sync-teams':
      write(`Sincronizando equipos de la temporada ${seasonId}.\n`)
      await syncTeams(true)
      write('\n[DONE] Equipos, fotos, draft y rosters sincronizados sin generar estadísticas.\n')
      return { statsPublished: false }

    case 'generate': {
      write(`Generando borrador local de Stats Room ${seasonId}.\n`)
      const hasStats = await generate()
      write(
        hasStats
          ? '\n[DONE] Borrador generado. Revísalo antes de publicarlo.\n'
          : '\n[DONE] Catálogo, draft y rosters generados localmente. Todavía no hay partidos con puntuación para generar estadísticas.\n'
      )
      return { statsPublished: false }
    }

    case 'publish':
      if (!(await readGeneratedStatsRoom(seasonId, cwd))) {
        throw new Error('Primero genera y revisa el borrador local de esta temporada.')
      }
      write(`Publicando Stats Room ${seasonId} en Neon.\n`)
      await publish()
      write('\n[DONE] Estadísticas publicadas y verificadas correctamente.\n')
      return { statsPublished: true }

    case 'daily': {
      write(`Sincronización diaria de la temporada ${seasonId}.\n`)
      write('\nPaso 1/3: ESPN → archivos locales\n')
      // generate_team_data.py ya exporta catálogo, logos, rosters y calidad de roster.
      const hasStats = await generate()
      write('\nPaso 2/3: equipos y rosters → Neon\n')
      await syncTeams(false)
      if (!hasStats) {
        write('\nPaso 3/3: omitido, todavía no hay partidos con puntuación.\n')
        write('\n[DONE] Rosters actualizados; sin estadísticas que publicar.\n')
        return { statsPublished: false }
      }
      write('\nPaso 3/3: Stats Room → Neon\n')
      await publish()
      write('\n[DONE] Sincronización diaria completada y verificada.\n')
      return { statsPublished: true }
    }
  }
}
