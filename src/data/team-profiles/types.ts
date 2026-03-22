/**
 * Team profile view model — built from `TeamRewindData` (same files as rewind) via `buildTeamProfile`.
 */

export type ProfileAchievement = {
  name: string
  label?: string
  image?: string
}

/** End-of-season roster row; per-player 9CAT totals can be added when exported from analytics. */
export type ProfileRosterPlayer = {
  name: string
  /** ESPN fantasy points for the season (shown when available, e.g. team top 3). */
  fantasyPoints?: string
  /** Future: PTS, REB, … season totals per player from league export */
  stats9cat?: Partial<Record<string, string | number>>
}

export type NineCatFullRow = {
  category: string
  rank: number
  valueDisplay: string
}

export type TeamProfileSeason = {
  seasonId: string
  seasonLabel: string
  record: string
  regularSeasonRank: number
  madePlayoffs: boolean
  wonFinals: boolean
  /** Short Spanish label for playoff run */
  playoffDepthLabel: string
  achievements: ProfileAchievement[]
  finalRoster: ProfileRosterPlayer[]
  /**
   * Team’s standing in each 9CAT category (H2H season totals).
   * Key = category (PTS, REB, …); value = rank string e.g. "1" or "#1".
   */
  categoryRanks9cat: Record<string, string>
  /** All 9 categories with rank + formatted value when `profileStats` exists on rewind. */
  nineCatFull?: NineCatFullRow[]
  /** e.g. "8W / 3L" from rewind stat slide */
  longestStreaks?: string
  /** Best single-week fantasy points (ceiling) when derivable from slides */
  highestScoringWeek?: string
  /** Amount paid toward league debt for this season */
  debtPaid: string
}

export type TeamProfile = {
  id: string
  displayName: string
  owner?: string
  description?: string
  /** Seasons in reverse chronological order (newest first) */
  seasons: TeamProfileSeason[]
}
