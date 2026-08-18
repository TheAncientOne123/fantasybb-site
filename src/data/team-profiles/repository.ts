import type { ProfileRosterPlayer, TeamProfile, TeamProfileSeason } from './types'
import { buildTeamProfile as buildStaticTeamProfile } from './buildFromRewind'
import {
  getDatabase,
  getFantasyDataSource,
  isDatabaseConfigured,
} from '@/lib/database'

type TeamRow = {
  id: string
  display_name: string
  owner: string | null
  description: string | null
  logo_url: string | null
}

type TeamSeasonRow = {
  season_id: string
  season_label: string
  record: string
  regular_season_rank: number
  made_playoffs: boolean
  won_finals: boolean
  playoff_depth_label: string
  longest_streaks: string | null
  highest_scoring_week: string | null
  debt_paid: string
  longevity_key_weeks_team_avg: number | null
}

type AchievementRow = {
  season_id: string
  name: string
  label: string | null
  image_url: string | null
}

type RosterKind = 'final' | 'drafted' | 'longevity' | 'core' | 'waiver'

type RosterRow = {
  season_id: string
  roster_kind: RosterKind
  player_external_id: string | number | null
  name: string
  positions_json: unknown
  headshot_url: string | null
  pro_team_abbrev: string | null
  team_logo_url: string | null
  pro_team_from_nba_catalog: boolean | null
  pro_team_name: string | null
  lineup_weeks: number | null
  key_piece_weeks: number | null
  fantasy_points: string | null
  stats_9cat: unknown
}

type CategoryRow = {
  season_id: string
  category: string
  rank: number
  value_display: string | null
}

type CompositionRow = {
  season_id: string
  team_abbrev: string
  player_count: number
  percentage: number
}

function optionalText(value: string | null): string | undefined {
  return value?.trim() || undefined
}

function stringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const values = value.filter((item): item is string => typeof item === 'string')
  return values.length ? values : undefined
}

function statsRecord(value: unknown): Partial<Record<string, string | number>> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  const entries = Object.entries(value).filter(
    (entry): entry is [string, string | number] =>
      typeof entry[1] === 'string' || typeof entry[1] === 'number'
  )
  return entries.length ? Object.fromEntries(entries) : undefined
}

function rosterPlayer(row: RosterRow): ProfileRosterPlayer {
  const parsedId = row.player_external_id == null ? undefined : Number(row.player_external_id)
  return {
    playerId: parsedId != null && Number.isSafeInteger(parsedId) ? parsedId : undefined,
    name: row.name,
    positions: stringArray(row.positions_json),
    headshotUrl: optionalText(row.headshot_url),
    proTeamAbbrev: optionalText(row.pro_team_abbrev),
    teamLogoUrl: optionalText(row.team_logo_url),
    proTeamFromNbaCatalog: row.pro_team_from_nba_catalog ?? undefined,
    proTeamName: optionalText(row.pro_team_name),
    lineupWeeks: row.lineup_weeks ?? undefined,
    keyPieceWeeks: row.key_piece_weeks ?? undefined,
    fantasyPoints: optionalText(row.fantasy_points),
    stats9cat: statsRecord(row.stats_9cat),
  }
}

async function getDatabaseTeamProfile(teamId: string): Promise<TeamProfile | null> {
  const sql = getDatabase()
  const [teamRows, seasonRows, achievementRows, rosterRows, categoryRows, compositionRows] =
    await Promise.all([
      sql<TeamRow[]>`
        select id, display_name, owner, description, logo_url
        from teams
        where id = ${teamId}
      `,
      sql<TeamSeasonRow[]>`
        select
          st.season_id,
          s.label as season_label,
          coalesce(ts.record, '—') as record,
          coalesce(ts.regular_season_rank, 0) as regular_season_rank,
          coalesce(ts.made_playoffs, false) as made_playoffs,
          coalesce(ts.won_finals, false) as won_finals,
          coalesce(ts.playoff_depth_label, 'Temporada próxima') as playoff_depth_label,
          ts.longest_streaks,
          ts.highest_scoring_week,
          coalesce(ts.debt_paid, '—') as debt_paid,
          ts.longevity_key_weeks_team_avg
        from season_teams st
        join seasons s on s.id = st.season_id
        left join team_seasons ts
          on ts.team_id = st.team_id and ts.season_id = st.season_id
        where st.team_id = ${teamId}
        order by s.year desc, s.id desc
      `,
      sql<AchievementRow[]>`
        select season_id, name, label, image_url
        from profile_achievements
        where team_id = ${teamId}
        order by season_id desc, position
      `,
      sql<RosterRow[]>`
        select
          season_id,
          roster_kind,
          player_external_id,
          name,
          positions_json,
          headshot_url,
          pro_team_abbrev,
          team_logo_url,
          pro_team_from_nba_catalog,
          pro_team_name,
          lineup_weeks,
          key_piece_weeks,
          fantasy_points,
          stats_9cat
        from profile_roster_entries
        where team_id = ${teamId}
        order by season_id desc, roster_kind, position
      `,
      sql<CategoryRow[]>`
        select season_id, category, rank, value_display
        from team_category_stats
        where team_id = ${teamId}
        order by season_id desc, category
      `,
      sql<CompositionRow[]>`
        select season_id, team_abbrev, player_count, percentage
        from team_nba_composition
        where team_id = ${teamId}
        order by season_id desc, percentage desc, team_abbrev
      `,
    ])

  const team = teamRows[0]
  if (!team || seasonRows.length === 0) return null

  const achievementsBySeason = new Map<string, TeamProfileSeason['achievements']>()
  for (const row of achievementRows) {
    const items = achievementsBySeason.get(row.season_id) ?? []
    items.push({
      name: row.name,
      label: optionalText(row.label),
      image: optionalText(row.image_url),
    })
    achievementsBySeason.set(row.season_id, items)
  }

  const rostersBySeason = new Map<string, Partial<Record<RosterKind, ProfileRosterPlayer[]>>>()
  for (const row of rosterRows) {
    const rosters = rostersBySeason.get(row.season_id) ?? {}
    const players = rosters[row.roster_kind] ?? []
    players.push(rosterPlayer(row))
    rosters[row.roster_kind] = players
    rostersBySeason.set(row.season_id, rosters)
  }

  const categoriesBySeason = new Map<string, CategoryRow[]>()
  for (const row of categoryRows) {
    const categories = categoriesBySeason.get(row.season_id) ?? []
    categories.push(row)
    categoriesBySeason.set(row.season_id, categories)
  }

  const compositionBySeason = new Map<string, TeamProfileSeason['nbaTeamComposition']>()
  for (const row of compositionRows) {
    const composition = compositionBySeason.get(row.season_id) ?? []
    composition.push({
      teamAbbrev: row.team_abbrev,
      count: row.player_count,
      pct: row.percentage,
    })
    compositionBySeason.set(row.season_id, composition)
  }

  return {
    id: team.id,
    displayName: team.display_name,
    owner: optionalText(team.owner),
    description: optionalText(team.description),
    logoUrl: optionalText(team.logo_url),
    seasons: seasonRows.map((row) => {
      const rosters = rostersBySeason.get(row.season_id) ?? {}
      const categories = categoriesBySeason.get(row.season_id) ?? []
      return {
        seasonId: row.season_id,
        seasonLabel: row.season_label,
        record: row.record,
        regularSeasonRank: row.regular_season_rank,
        madePlayoffs: row.made_playoffs,
        wonFinals: row.won_finals,
        playoffDepthLabel: row.playoff_depth_label,
        achievements: achievementsBySeason.get(row.season_id) ?? [],
        finalRoster: rosters.final ?? [],
        draftedRoster: rosters.drafted,
        longevityRoster: rosters.longevity,
        coreTeamRoster: rosters.core,
        waiverRoster: rosters.waiver,
        nbaTeamComposition: compositionBySeason.get(row.season_id),
        longevityKeyWeeksTeamAvg: row.longevity_key_weeks_team_avg ?? undefined,
        categoryRanks9cat: Object.fromEntries(
          categories.filter((category) => category.rank > 0).map((category) => [category.category, String(category.rank)])
        ),
        nineCatFull: categories.map((category) => ({
          category: category.category,
          rank: category.rank,
          valueDisplay: category.value_display ?? '—',
        })),
        longestStreaks: optionalText(row.longest_streaks),
        highestScoringWeek: optionalText(row.highest_scoring_week),
        debtPaid: row.debt_paid,
      }
    }),
  }
}

export async function getTeamProfile(teamId: string): Promise<TeamProfile | null> {
  const source = getFantasyDataSource()
  if (source === 'static') return buildStaticTeamProfile(teamId)

  if (!isDatabaseConfigured()) {
    if (source === 'database') {
      throw new Error('FANTASY_DATA_SOURCE=database requiere DATABASE_URL.')
    }
    return buildStaticTeamProfile(teamId)
  }

  try {
    const profile = await getDatabaseTeamProfile(teamId)
    if (profile) return profile
    if (source === 'database') return null
  } catch (error) {
    if (source === 'database') throw error
    console.warn(`[data] No se pudo leer el perfil ${teamId} de PostgreSQL; se usará el archivo estático.`, error)
  }

  return buildStaticTeamProfile(teamId)
}
