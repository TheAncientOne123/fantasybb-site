/** Datos del Players Lab generados por `analytics/players_lab.py`. */

export const PLAYERS_LAB_METHOD_VERSION = 'players-lab-v1'

export type PlayersLabWindowKey = 'season' | 'last7' | 'last15' | 'last30' | 'projected'

export const PLAYERS_LAB_WINDOWS: ReadonlyArray<{ key: PlayersLabWindowKey; label: string }> = [
  { key: 'season', label: 'Temporada' },
  { key: 'last7', label: 'Últimos 7' },
  { key: 'last15', label: 'Últimos 15' },
  { key: 'last30', label: 'Últimos 30' },
  { key: 'projected', label: 'Proyección' },
]

/** Promedios por partido en una ventana de tiempo. Los porcentajes van de 0 a 1. */
export type PlayersLabWindow = {
  gp: number
  min: number | null
  fpts: number | null
  pts: number | null
  reb: number | null
  ast: number | null
  stl: number | null
  blk: number | null
  stocks: number | null
  tpm: number | null
  to: number | null
  fgm: number | null
  fga: number | null
  fgPct: number | null
  ftm: number | null
  fta: number | null
  ftPct: number | null
  tpa: number | null
  tpPct: number | null
  /** (FGA + 0.44·FTA + TO) por 36 minutos: aproximación al Usage Rate. */
  usage: number | null
}

export type PlayersLabLabelKind = 'streamer' | 'sleeper' | 'bust' | 'fluke' | 'slump'

export type PlayersLabLabel = {
  kind: PlayersLabLabelKind
  reason: string
  /** Mayor = más fuerte; sirve para ordenar dentro de cada etiqueta. */
  score: number
}

/** FA = agente libre, WAIVERS = en periodo de reclamación, TEAM = en un equipo de la liga. */
export type PlayersLabStatus = 'FA' | 'WAIVERS' | 'TEAM'

export type PlayersLabPlayer = {
  id: number
  name: string
  headshotUrl: string | null
  proTeam: string
  positions: string[]
  /** ACTIVE, DAY_TO_DAY, OUT, INJURY_RESERVE, SUSPENSION… (valores de ESPN). */
  injuryStatus: string
  status: PlayersLabStatus
  fantasyTeamId: string | null
  waiverClearsAt: string | null
  percentOwned: number | null
  percentChange: number | null
  gamesNext7: number | null
  windows: Partial<Record<PlayersLabWindowKey, PlayersLabWindow>>
  labels: PlayersLabLabel[]
}

export type PlayersLabData = {
  seasonId: string
  methodVersion: string
  source: 'ESPN'
  generatedAt: string
  scoringPeriodId: number | null
  /** FPTS/G del jugador con roster #(equipos × 10): referencia para Streamers. */
  replacementLevel: number | null
  players: PlayersLabPlayer[]
}

export function isPlayersLabData(value: unknown, seasonId?: string): value is PlayersLabData {
  if (!value || typeof value !== 'object') return false
  const data = value as Partial<PlayersLabData>
  return (
    typeof data.seasonId === 'string' &&
    (seasonId === undefined || data.seasonId === seasonId) &&
    data.methodVersion === PLAYERS_LAB_METHOD_VERSION &&
    typeof data.generatedAt === 'string' &&
    Number.isFinite(Date.parse(data.generatedAt)) &&
    Array.isArray(data.players)
  )
}
