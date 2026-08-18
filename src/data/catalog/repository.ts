import type { TeamIndexEntry } from '@/data/rewind-types'
import { SEASONS, type Season } from '@/data/seasons'
import { getTeamsForSeason } from '@/data/teams'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'
import {
  getDatabase,
  getFantasyDataSource,
  isDatabaseConfigured,
} from '@/lib/database'

export type LeagueCatalog = {
  seasons: Season[]
  teamsBySeason: Record<string, TeamIndexEntry[]>
}

type SeasonRow = {
  id: string
  year: number
  label: string
  is_active: boolean
}

type TeamRow = {
  season_id: string
  id: string
  display_name: string
  logo_url: string | null
  is_expansion: boolean
}

function getStaticCatalog(): LeagueCatalog {
  return {
    seasons: [...SEASONS],
    teamsBySeason: Object.fromEntries(
      SEASONS.map((season) => [
        season.id,
        getTeamsForSeason(season.id).map((team) => ({
          ...team,
          displayName: team.displayName.trim(),
          logoUrl: getTeamLogoPath(team.id),
        })),
      ])
    ),
  }
}

export function getStaticRewindCatalog(): LeagueCatalog {
  return getStaticCatalog()
}

async function getDatabaseCatalog(): Promise<LeagueCatalog | null> {
  const sql = getDatabase()
  const [seasonRows, teamRows] = await Promise.all([
    sql<SeasonRow[]>`
      select id, year, label, is_active
      from seasons
      order by year desc, id desc
    `,
    sql<TeamRow[]>`
      select
        st.season_id,
        t.id,
        t.display_name,
        t.logo_url,
        st.is_expansion
      from season_teams st
      join teams t on t.id = st.team_id
      join seasons s on s.id = st.season_id
      order by s.year desc, st.is_expansion, t.display_name, t.id
    `,
  ])

  if (seasonRows.length === 0) return null

  const teamsBySeason: Record<string, TeamIndexEntry[]> = Object.fromEntries(
    seasonRows.map((season) => [season.id, []])
  )
  for (const row of teamRows) {
    ;(teamsBySeason[row.season_id] ??= []).push({
      id: row.id,
      displayName: row.display_name.trim(),
      logoUrl: row.logo_url ?? undefined,
      isExpansion: row.is_expansion,
    })
  }

  return {
    seasons: seasonRows.map((season) => ({
      id: season.id,
      year: String(season.year),
      label: season.label,
      isActive: season.is_active,
    })),
    teamsBySeason,
  }
}

export async function getLeagueCatalog(): Promise<LeagueCatalog> {
  const source = getFantasyDataSource()
  const staticCatalog = getStaticCatalog()
  if (source === 'static') return staticCatalog

  if (!isDatabaseConfigured()) {
    if (source === 'database') {
      throw new Error('FANTASY_DATA_SOURCE=database requiere DATABASE_URL.')
    }
    return staticCatalog
  }

  try {
    const catalog = await getDatabaseCatalog()
    if (catalog) {
      if (source === 'database') return catalog

      return {
        seasons: catalog.seasons,
        teamsBySeason: Object.fromEntries(
          catalog.seasons.map((season) => {
            const databaseTeams = catalog.teamsBySeason[season.id] ?? []
            const fallbackTeams = staticCatalog.teamsBySeason[season.id] ?? []
            return [season.id, databaseTeams.length > 0 ? databaseTeams : fallbackTeams]
          })
        ),
      }
    }
    if (source === 'database') throw new Error('PostgreSQL no contiene temporadas importadas.')
  } catch (error) {
    if (source === 'database') throw error
    console.warn('[data] No se pudo leer el catálogo de PostgreSQL; se usarán los archivos estáticos.', error)
  }

  return staticCatalog
}
