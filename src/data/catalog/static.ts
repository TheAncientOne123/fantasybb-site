import season2026 from '@/data/seasons/2026/teams-catalog.json'
import season2027 from '@/data/seasons/2027/teams-catalog.json'
import rosters2027 from '@/data/seasons/2027/team-rosters.json'
import type { SeasonRosters } from '@/data/team-profiles/season-rosters'

export type SeasonTeamIdentity = {
  id: string
  espnTeamId?: number
  displayName: string
  logoUrl?: string
  owner?: string
  description?: string
}

export const STATIC_TEAM_CATALOGS: Record<string, { teams: SeasonTeamIdentity[] }> = {
  '2026': season2026,
  '2027': season2027,
}

export const STATIC_ROSTERS: Record<string, SeasonRosters> = { '2027': rosters2027 }

export function getSeasonTeamIdentity(seasonId: string, teamId: string) {
  return STATIC_TEAM_CATALOGS[seasonId]?.teams.find((team) => team.id === teamId)
}
