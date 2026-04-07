/**
 * Team profile view model — built from `TeamRewindData` (same files as rewind) via `buildTeamProfile`.
 */

export type ProfileAchievement = {
  name: string
  label?: string
  image?: string
}

/** Roster row on team profile (final, drafted, longevity). */
export type ProfileRosterPlayer = {
  name: string
  /** ESPN / NBA Stats player id (headshots CDN). */
  playerId?: number
  positions?: string[]
  headshotUrl?: string
  /** Abreviatura equipo NBA (ej. LAL) para logo y tinte en tarjeta. */
  proTeamAbbrev?: string
  /** Logo NBA CDN (SVG/PNG) desde catálogo nba-players; si existe, se muestra junto al nombre. */
  teamLogoUrl?: string
  /** Catálogo nba-players: no usar logo ESPN derivado de la abreviatura. */
  proTeamFromNbaCatalog?: boolean
  /** Nombre de equipo desde el JSON (teamName) cuando exista. */
  proTeamName?: string
  /** Semanas con aparición en alineación del matchup (box score). */
  lineupWeeks?: number
  /** Semanas como top 10 en puntaje fantasy del equipo (solo si pts > 0). */
  keyPieceWeeks?: number
  /** ESPN fantasy points for the season when available. */
  fantasyPoints?: string
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
  /** Draft inicial del equipo (misma temporada). */
  draftedRoster?: ProfileRosterPlayer[]
  /** Jugadores con más semanas en alineación H2H (box score). */
  longevityRoster?: ProfileRosterPlayer[]
  /** Núcleo del equipo: hasta 14 con keyPieceWeeks > 5 (ordenados por mayor permanencia). */
  coreTeamRoster?: ProfileRosterPlayer[]
  /** Resto de jugadores de permanencia fuera del Core Team. */
  waiverRoster?: ProfileRosterPlayer[]
  /** Composición de equipos NBA por jugadores únicos usados en la temporada. */
  nbaTeamComposition?: Array<{ teamAbbrev: string; count: number; pct: number }>
  /** Promedio de semanas “pieza clave” en el listado de permanencia. */
  longevityKeyWeeksTeamAvg?: number
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
