import { getStaticStatsRoomData } from '@/data/getStatsRoomData'
import type {
  ConsolationLadder,
  PlayoffBracket,
  StatsRoomData,
} from '@/data/stats-room-types'
import {
  getDatabase,
  getFantasyDataSource,
  isDatabaseConfigured,
} from '@/lib/database'

type SnapshotRow = {
  season_id: string
  generated_at: Date | string | null
  playoff_bracket: unknown
  consolation_brackets: unknown
}

type StandingRow = {
  team_id: string
  display_name: string
  wins: number
  losses: number
  ties: number
  rank: number
}

type MatchupRow = {
  week: number
  team_a_id: string
  team_b_id: string
  score_a: number
  score_b: number
}

type NineCatRow = {
  team_id: string
  category: string
  rank: number
  value_display: string
}

type TotalsRow = {
  team_id: string
  stats: unknown
}

type DraftRow = {
  pick: number
  team_id: string | null
  label: string
  locked: boolean
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function stringRecord(value: unknown): Record<string, string> {
  if (!isObject(value)) return {}
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, typeof item === 'string' ? item : String(item)])
  )
}

function playoffBracket(value: unknown): PlayoffBracket {
  if (!isObject(value) || value.format !== '6_team_top2_bye') {
    throw new Error('El playoff bracket guardado en PostgreSQL no tiene un formato válido.')
  }
  return value as PlayoffBracket
}

function consolationBrackets(value: unknown): StatsRoomData['consolationBrackets'] {
  if (!isObject(value)) return undefined
  if (!isObject(value.bottomFour) || !isObject(value.winnersConsolation)) return undefined
  return {
    bottomFour: value.bottomFour as ConsolationLadder,
    winnersConsolation: value.winnersConsolation as ConsolationLadder,
  }
}

async function getDatabaseStatsRoomData(seasonId: string): Promise<StatsRoomData | null> {
  const sql = getDatabase()
  const snapshotRows = await sql<SnapshotRow[]>`
    select season_id, generated_at, playoff_bracket, consolation_brackets
    from stats_room_snapshots
    where season_id = ${seasonId}
  `
  const snapshot = snapshotRows[0]
  if (!snapshot) return null

  const [standings, matchups, nineCatRows, totalsRows, draftRows] = await Promise.all([
    sql<StandingRow[]>`
      select team_id, display_name, wins, losses, ties, rank
      from stats_standings
      where season_id = ${seasonId}
      order by rank, team_id
    `,
    sql<MatchupRow[]>`
      select week, team_a_id, team_b_id, score_a, score_b
      from stats_regular_season_matchups
      where season_id = ${seasonId}
      order by week, team_a_id, team_b_id
    `,
    sql<NineCatRow[]>`
      select team_id, category, rank, value_display
      from stats_nine_cat
      where season_id = ${seasonId}
      order by team_id, category
    `,
    sql<TotalsRow[]>`
      select team_id, stats
      from stats_season_totals
      where season_id = ${seasonId}
      order by team_id
    `,
    sql<DraftRow[]>`
      select pick, team_id, label, locked
      from stats_next_draft_order
      where season_id = ${seasonId}
      order by pick
    `,
  ])

  const nineCatByTeam = new Map<string, StatsRoomData['nineCatLeague'][number]['rows']>()
  for (const row of nineCatRows) {
    const rows = nineCatByTeam.get(row.team_id) ?? []
    rows.push({
      category: row.category,
      rank: row.rank,
      valueDisplay: row.value_display,
    })
    nineCatByTeam.set(row.team_id, rows)
  }

  return {
    seasonId: snapshot.season_id,
    generatedAt:
      snapshot.generated_at instanceof Date
        ? snapshot.generated_at.toISOString()
        : snapshot.generated_at ?? undefined,
    standings: standings.map((row) => ({
      teamId: row.team_id,
      displayName: row.display_name,
      wins: row.wins,
      losses: row.losses,
      ties: row.ties,
      rank: row.rank,
    })),
    regularSeasonMatchups: matchups.map((row) => ({
      week: row.week,
      teamAId: row.team_a_id,
      teamBId: row.team_b_id,
      scoreA: row.score_a,
      scoreB: row.score_b,
    })),
    nineCatLeague: [...nineCatByTeam.entries()].map(([teamId, rows]) => ({ teamId, rows })),
    seasonStatsLeague: totalsRows.map((row) => ({
      teamId: row.team_id,
      stats: stringRecord(row.stats),
    })),
    playoffBracket: playoffBracket(snapshot.playoff_bracket),
    consolationBrackets: consolationBrackets(snapshot.consolation_brackets),
    nextDraftOrder: draftRows.map((row) => ({
      pick: row.pick,
      teamId: row.team_id,
      label: row.label,
      locked: row.locked,
    })),
  }
}

export function createEmptyStatsRoomData(seasonId: string): StatsRoomData {
  return {
    seasonId,
    standings: [],
    regularSeasonMatchups: [],
    nineCatLeague: [],
    seasonStatsLeague: [],
    playoffBracket: {
      format: '6_team_top2_bye',
      round1: [],
      round2: [],
      championship: {
        type: 'matchup',
        teamIds: [null, null],
        scores: null,
      },
    },
  }
}

export async function getStatsRoomData(seasonId: string): Promise<StatsRoomData | null> {
  const source = getFantasyDataSource()
  if (source === 'static') return getStaticStatsRoomData(seasonId)

  if (!isDatabaseConfigured()) {
    if (source === 'database') {
      throw new Error('FANTASY_DATA_SOURCE=database requiere DATABASE_URL.')
    }
    return getStaticStatsRoomData(seasonId)
  }

  try {
    const data = await getDatabaseStatsRoomData(seasonId)
    if (data) return data
    if (source === 'database') return null
  } catch (error) {
    if (source === 'database') throw error
    console.warn(
      `[data] No se pudo leer Stats Room ${seasonId} de PostgreSQL; se usará el archivo estático.`,
      error
    )
  }

  return getStaticStatsRoomData(seasonId)
}
