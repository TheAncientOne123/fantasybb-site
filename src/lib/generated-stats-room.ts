import 'server-only'
import type { StatsRoomData } from '@/data/stats-room-types'
import { readGeneratedStatsRoom } from '@/lib/stats-pipeline'

export { readGeneratedStatsRoom }

export type GeneratedStatsRoomPreview = {
  seasonId: string
  generatedAt?: string
  teamCount: number
  matchupCount: number
  nineCatRowCount: number
  seasonTotalsCount: number
  standings: StatsRoomData['standings']
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
