/**
 * Hall of Fame — view model built from rewind + stats-room (server-only).
 */

export type HofTrophyKind = 'champion' | 'moty' | 'nine_cat_sweep'

/** Logro con imagen/nombre para la vitrina (desde slides generados). */
export type HofAchievement = {
  name: string
  label?: string
  image?: string
  source: 'summary' | 'categoryTitles' | 'award' | 'trophy'
}

/** #1 en categoría según reglas del salón (MOTY conserva títulos), alineado con generate_team_data. */
export type HofNineCatFirst = {
  category: string
  achievementName: string
  valueDisplay?: string
  image?: string
}

export type HofSeasonShowcase = {
  seasonId: string
  seasonLabel: string
  archetypeName?: string
  trophies: HofTrophyKind[]
  /** Legacy full list (kept for compatibility). */
  achievements: HofAchievement[]
  /** Badges/logros positivos. */
  achievementsPositive: HofAchievement[]
  /** Badges/fracasos explícitos (ej. The Choke, Free Fall). */
  achievementsNegative: HofAchievement[]
  nineCatFirsts: HofNineCatFirst[]
}

export type HofTeamShowcase = {
  teamId: string
  displayName: string
  seasons: HofSeasonShowcase[]
}

export type HofLeagueRecordKind = 'ceiling_check' | 'win_streak' | 'lose_streak'

export type HofLeagueRecord = {
  kind: HofLeagueRecordKind
  seasonId: string
  seasonLabel: string
  leaderTeamId: string
  leaderDisplayName: string
  value: string
}

export type HofMotySeasonRow = {
  teamId: string
  displayName: string
  score: number
  statsPointsRaw: number
  statsContribution: number
  standings: number
  mva: number
}

export type HofMotySeasonRanking = {
  seasonId: string
  seasonLabel: string
  rows: HofMotySeasonRow[]
}

export type HofMotyAllTimeRow = {
  teamId: string
  displayName: string
  motyTitles: number
  seasons: string[]
}

export type HofLarryRow = {
  teamId: string
  displayName: string
  seasonsWon: string[]
}

export type HallOfFameData = {
  teams: HofTeamShowcase[]
  leagueRecords: HofLeagueRecord[]
  motyCurrentSeason: HofMotySeasonRanking | null
  motyAllTime: HofMotyAllTimeRow[]
  larryTable: HofLarryRow[]
}
