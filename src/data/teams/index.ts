/**
 * Team index barrel – aggregates teams by season for landing and rewind.
 * Auto-generated (scanned from seasons/).
 */

import type { TeamIndexEntry } from '../rewind-types'
import * as season2026 from '../seasons/2026/teams'

const seasonModules: Record<string, typeof season2026> = {
  '2026': season2026,
}

export function getTeamsForSeason(seasonId: string): TeamIndexEntry[] {
  const m = seasonModules[seasonId]
  return m ? m.teamsIndex : []
}

export function getTeamById(seasonId: string, id: string): TeamIndexEntry | undefined {
  const m = seasonModules[seasonId]
  return m ? m.getTeamById(id) : undefined
}

export function searchTeams(seasonId: string, query: string): TeamIndexEntry[] {
  const m = seasonModules[seasonId]
  return m ? m.searchTeams(query) : []
}

export function findBestMatch(seasonId: string, query: string): TeamIndexEntry | null {
  const m = seasonModules[seasonId]
  return m ? m.findBestMatch(query) : null
}
