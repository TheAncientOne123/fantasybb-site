import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { StatsRoomData } from '../src/data/stats-room-types'
import { SEASONS } from '../src/data/seasons'
import { getStaticStatsRoomData } from '../src/data/getStatsRoomData'

export type StatsRoomDataset = {
  seasonId: string
  data: StatsRoomData
}

export function readSeasonArgument(argv = process.argv.slice(2)): string | undefined {
  const index = argv.indexOf('--season')
  if (index === -1) return undefined
  const seasonId = argv[index + 1]
  if (!seasonId || !/^\d{4}$/.test(seasonId)) {
    throw new Error('El argumento --season debe ser un año de cuatro dígitos, por ejemplo 2027.')
  }
  return seasonId
}

async function loadGeneratedSeason(seasonId: string): Promise<StatsRoomDataset> {
  const filePath = resolve(process.cwd(), 'src', 'data', 'seasons', seasonId, 'stats-room.ts')
  if (!existsSync(filePath)) {
    throw new Error(`No existe el archivo generado src/data/seasons/${seasonId}/stats-room.ts.`)
  }

  const imported = await import(pathToFileURL(filePath).href)
  const data = (imported.default?.default ?? imported.default) as StatsRoomData | undefined
  if (!data || data.seasonId !== seasonId) {
    throw new Error(`El dataset generado no corresponde a la temporada ${seasonId}.`)
  }
  return { seasonId, data }
}

export async function loadStatsRoomDatasets(seasonId?: string): Promise<StatsRoomDataset[]> {
  if (seasonId) return [await loadGeneratedSeason(seasonId)]

  const datasets = await Promise.all(
    SEASONS.map(async (season) => ({
      seasonId: season.id,
      data: await getStaticStatsRoomData(season.id),
    }))
  )

  return datasets.filter((entry): entry is StatsRoomDataset => entry.data != null)
}
