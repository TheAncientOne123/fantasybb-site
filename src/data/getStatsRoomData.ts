/**
 * Load Stats Room payload per season (generated `stats-room.ts`).
 */

import type { StatsRoomData } from './stats-room-types'

const statsRoomLoaders: Record<string, () => Promise<{ default: StatsRoomData }>> = {
  '2026': () => import('./seasons/2026/stats-room'),
}

export async function getStaticStatsRoomData(seasonId: string): Promise<StatsRoomData | null> {
  const load = statsRoomLoaders[seasonId]
  if (!load) return null
  try {
    const mod = await load()
    return mod.default ?? null
  } catch {
    return null
  }
}

/** @deprecated Prefer the database-aware Stats Room repository. */
export const getStatsRoomData = getStaticStatsRoomData
