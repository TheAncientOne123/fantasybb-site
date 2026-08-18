import 'server-only'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { StatsRoomData } from '@/data/stats-room-types'

export type GeneratedStatsRoomPreview = {
  seasonId: string
  generatedAt?: string
  teamCount: number
  matchupCount: number
  nineCatRowCount: number
  seasonTotalsCount: number
  standings: StatsRoomData['standings']
}

export async function readGeneratedStatsRoom(seasonId: string): Promise<StatsRoomData | null> {
  if (!/^\d{4}$/.test(seasonId)) return null
  const filePath = resolve(process.cwd(), 'src', 'data', 'seasons', seasonId, 'stats-room.ts')

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

export async function getGeneratedStatsRoomPreview(
  seasonId: string
): Promise<GeneratedStatsRoomPreview | null> {
  const data = await readGeneratedStatsRoom(seasonId)
  if (!data) return null

  return {
    seasonId: data.seasonId,
    generatedAt: data.generatedAt,
    teamCount: data.standings.length,
    matchupCount: data.regularSeasonMatchups.length,
    nineCatRowCount: data.nineCatLeague.reduce((total, block) => total + block.rows.length, 0),
    seasonTotalsCount: data.seasonStatsLeague?.length ?? 0,
    standings: data.standings,
  }
}
