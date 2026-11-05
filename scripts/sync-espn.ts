/**
 * Sincronización diaria ESPN → Neon (sin interfaz).
 *
 *   npm run sync:espn                  # temporada activa en Neon
 *   npm run sync:espn -- --season 2027 # temporada explícita
 *
 * Pensado para n8n (nodo Execute Command): escribe el registro en stdout y en
 * `.logs/espn-sync/AAAA-MM-DD.log`, sale con código ≠ 0 si algo falla y siempre
 * termina con una línea `ESPN_SYNC_RESULT {json}` fácil de parsear.
 */
import { closeSync, mkdirSync, openSync, statSync, unlinkSync, writeSync, appendFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { loadEnvConfig } from '@next/env'
import postgres from 'postgres'
import { isSeasonId, runStatsAction } from '../src/lib/stats-pipeline'

const cwd = process.cwd()
loadEnvConfig(cwd)

const LOCK_PATH = join(tmpdir(), 'fantasybb-espn-sync.lock')
/** Un lock más antiguo que esto se considera huérfano (proceso muerto). */
const STALE_LOCK_MS = 3 * 60 * 60 * 1000

type SyncResult = {
  ok: boolean
  seasonId: string | null
  statsPublished: boolean
  startedAt: string
  finishedAt: string
  durationMs: number
  logFile: string
  error?: string
}

function acquireLock(): boolean {
  try {
    const fd = openSync(LOCK_PATH, 'wx')
    writeSync(fd, String(process.pid))
    closeSync(fd)
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
    if (Date.now() - statSync(LOCK_PATH).mtimeMs < STALE_LOCK_MS) return false
    unlinkSync(LOCK_PATH)
    return acquireLock()
  }
}

function releaseLock() {
  try {
    unlinkSync(LOCK_PATH)
  } catch {
    // Ya no existe; nada que liberar.
  }
}

function readSeasonArgument(argv = process.argv.slice(2)): string | undefined {
  const index = argv.indexOf('--season')
  if (index === -1) return undefined
  const seasonId = argv[index + 1]
  if (!isSeasonId(seasonId)) throw new Error('--season debe ser un año de cuatro dígitos, por ejemplo 2027.')
  return seasonId
}

async function getActiveSeasonId(): Promise<string> {
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (!databaseUrl) throw new Error('Falta DATABASE_URL en .env.local, .env o en el entorno.')

  const sql = postgres(databaseUrl, { max: 1, connect_timeout: 10 })
  try {
    const rows = await sql<Array<{ id: string }>>`select id from seasons where is_active limit 1`
    if (!rows[0]) throw new Error('No hay ninguna temporada marcada como activa en Neon.')
    return rows[0].id
  } finally {
    await sql.end({ timeout: 5 })
  }
}

async function main(): Promise<number> {
  const startedAt = new Date()
  const logDir = resolve(cwd, '.logs', 'espn-sync')
  mkdirSync(logDir, { recursive: true })
  const logFile = join(logDir, `${startedAt.toISOString().slice(0, 10)}.log`)

  const write = (message: string) => {
    process.stdout.write(message)
    appendFileSync(logFile, message)
  }

  const result: SyncResult = {
    ok: false,
    seasonId: null,
    statsPublished: false,
    startedAt: startedAt.toISOString(),
    finishedAt: '',
    durationMs: 0,
    logFile,
  }

  write(`\n===== ESPN sync ${startedAt.toISOString()} =====\n`)

  if (!acquireLock()) {
    result.error = `Ya hay una sincronización en curso (lock: ${LOCK_PATH}).`
  } else {
    try {
      result.seasonId = readSeasonArgument() ?? (await getActiveSeasonId())
      const { statsPublished } = await runStatsAction('daily', result.seasonId, write, cwd)
      result.statsPublished = statsPublished
      result.ok = true
    } catch (error) {
      result.error = error instanceof Error ? error.message : String(error)
      write(`\n[ERROR] ${result.error}\n`)
    } finally {
      releaseLock()
    }
  }

  const finishedAt = new Date()
  result.finishedAt = finishedAt.toISOString()
  result.durationMs = finishedAt.getTime() - startedAt.getTime()
  write(`\nESPN_SYNC_RESULT ${JSON.stringify(result)}\n`)
  return result.ok ? 0 : 1
}

main().then(
  (code) => process.exit(code),
  (error) => {
    console.error(error)
    process.exit(1)
  }
)
