/**
 * Stats Room — league-wide data (standings, 9CAT, RS matchups, playoff bracket).
 * Populated by `python analytics/generate_team_data.py` into `seasons/{id}/stats-room.ts`.
 */

export type PlayoffBracketFormat = '6_team_top2_bye'

export type BracketR1Slot =
  | { type: 'bye'; seed: number; teamId: string }
  | {
      type: 'matchup'
      seeds: [number, number]
      teamIds: [string, string]
      scores: [number, number] | null
    }

/** R1 matchup slots only (excludes byes); order: 5v4, then 6v3. */
export type BracketR1MatchupIndex = 0 | 1

export type BracketR2Slot = {
  type: 'matchup'
  slotIndex: 0 | 1
  /** [high seed, low seed] e.g. [1, 5] = #1 vs winner of 5v4 */
  seedsInvolved: [number, number]
  teamIds: [string | null, string | null]
  scores: [number | null, number | null] | null
  /** Which R1 matchup (0 = 5v4, 1 = 6v3) feeds the non-bye side */
  feedsFromR1: BracketR1MatchupIndex
}

export type BracketFinal = {
  type: 'matchup'
  teamIds: [string | null, string | null]
  scores: [number | null, number | null] | null
}

export type PlayoffBracket = {
  format: PlayoffBracketFormat
  roundLabels?: string[]
  round1: BracketR1Slot[]
  round2: BracketR2Slot[]
  championship: BracketFinal
  /** ESPN / generator: league champion when season finished */
  championTeamId?: string | null
  notes?: string
}

export type StatsStandingRow = {
  teamId: string
  displayName: string
  wins: number
  losses: number
  ties: number
  /** Regular-season rank, 1 = best */
  rank: number
}

export type RegularSeasonMatchupRow = {
  week: number
  teamAId: string
  teamBId: string
  scoreA: number
  scoreB: number
}

export type NineCatCategoryRow = {
  category: string
  rank: number
  valueDisplay: string
}

export type NineCatTeamBlock = {
  teamId: string
  rows: NineCatCategoryRow[]
}

/** Totales de temporada por equipo (tabla tipo ESPN: filas = equipos). */
export type SeasonStatsLeagueRow = {
  teamId: string
  /** Claves FGM, FGA, FTM, FTA, 3PM, REB, AST, STL, BLK, TO, PTS → texto mostrable */
  stats: Record<string, string>
}

/** Orden de columnas bajo el grupo “totales” (misma idea que Season Stats de ESPN). */
export const SEASON_STATS_VOLUME_KEYS = [
  'FGM',
  'FGA',
  'FTM',
  'FTA',
  '3PM',
  'REB',
  'AST',
  'STL',
  'BLK',
  'TO',
  'PTS',
] as const

export type StatsRoomData = {
  seasonId: string
  generatedAt?: string
  standings: StatsStandingRow[]
  regularSeasonMatchups: RegularSeasonMatchupRow[]
  nineCatLeague: NineCatTeamBlock[]
  /** Si existe (generador actualizado), alimenta la tabla ancha tipo ESPN. */
  seasonStatsLeague?: SeasonStatsLeagueRow[]
  playoffBracket: PlayoffBracket
}
