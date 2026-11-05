import type { ProfileRosterPlayer } from './types'

export type SeasonTeamRoster = {
  id: string
  currentRoster: ProfileRosterPlayer[]
  draftedRoster: ProfileRosterPlayer[]
  draftPicks: Array<{ playerId: number; round: number; pick: number }>
}

export type SeasonRosters = {
  seasonId: string
  generatedAt: string
  teams: SeasonTeamRoster[]
}
