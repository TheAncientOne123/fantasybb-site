import 'server-only'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getDatabase, getFantasyDataSource, isDatabaseConfigured } from '@/lib/database'
import { isPlayersLabData, type PlayersLabData } from './types'

/** Archivo local generado por analytics (sólo existe donde corrió la sincronización). */
async function getStaticPlayersLab(seasonId: string): Promise<PlayersLabData | null> {
  if (!/^\d{4}$/.test(seasonId)) return null
  try {
    const text = await readFile(join(process.cwd(), 'src', 'data', 'seasons', seasonId, 'players-lab.json'), 'utf8')
    const data: unknown = JSON.parse(text)
    return isPlayersLabData(data, seasonId) ? data : null
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw error
  }
}

async function getDatabasePlayersLab(seasonId: string): Promise<PlayersLabData | null> {
  const sql = getDatabase()
  const rows = await sql<Array<{ data: unknown }>>`
    select data from players_lab_snapshots where season_id = ${seasonId}
  `.catch((error: { code?: string }) => {
    // 42P01 = la tabla aún no existe (el sitio se publicó antes de la primera sincronización).
    if (error?.code === '42P01') return []
    throw error
  })
  const data = rows[0]?.data
  return isPlayersLabData(data, seasonId) ? data : null
}

export async function getPlayersLab(seasonId: string): Promise<PlayersLabData | null> {
  const source = getFantasyDataSource()
  if (source === 'static') return getStaticPlayersLab(seasonId)

  if (!isDatabaseConfigured()) {
    if (source === 'database') throw new Error('FANTASY_DATA_SOURCE=database requiere DATABASE_URL.')
    return getStaticPlayersLab(seasonId)
  }

  try {
    const data = await getDatabasePlayersLab(seasonId)
    if (data) return data
    if (source === 'database') return null
  } catch (error) {
    if (source === 'database') throw error
    console.warn(`[data] No se pudo leer Players Lab ${seasonId} de PostgreSQL; se usará el archivo local.`, error)
  }

  return getStaticPlayersLab(seasonId)
}
