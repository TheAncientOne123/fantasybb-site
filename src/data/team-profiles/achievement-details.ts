import 'server-only'
import { getTeamRewindData } from '@/data/getTeamRewind'
import type { AwardSlide, TeamIndexEntry } from '@/data/rewind-types'
import type { TeamProfileSeason } from './types'

/** Equipo mencionado en un logro (rivales, víctima de una racha…). */
export type AchievementTeamRef = {
  name: string
  teamId?: string
  logoUrl?: string
}

/** Datos concretos de un logro, sacados del Rewind y de las 9 categorías. */
export type AchievementDetail = {
  facts: string[]
  teams?: AchievementTeamRef[]
  teamsLabel?: string
}

const CATEGORY_BY_TITLE: Record<string, string> = {
  'The Scoring King': 'PTS',
  'The Sharpshooter': 'FG%',
  'The Cold Blooded': 'FT%',
  'The Worm': 'REB',
  'The Point God': 'AST',
  'The Splash Father': '3PM',
  'The Grand Theft Alvarado': 'STL',
  'The Rim Guardian': 'BLK',
  'The Caretaker': 'TO',
}

const MOTY_MAX = { stats: 40, standings: 21, mva: 39 } as const

const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '')

function formatPoints(raw: string) {
  const value = Number(raw.replace(/,/g, ''))
  return Number.isFinite(value) ? value.toLocaleString('es-MX', { maximumFractionDigits: 1 }) : raw
}

function plural(count: number, singular: string, pluralForm: string) {
  return `${count} ${count === 1 ? singular : pluralForm}`
}

/**
 * Construye los datos de cada logro de una temporada. Usa los slides del Rewind
 * (fuente de verdad generada por analytics) y las filas 9CAT del perfil.
 */
export async function getAchievementDetails(
  season: TeamProfileSeason,
  teamId: string,
  seasonTeams: TeamIndexEntry[]
): Promise<Record<string, AchievementDetail>> {
  const rewind = await getTeamRewindData(season.seasonId, teamId).catch(() => null)
  const awards = new Map<string, AwardSlide>()
  for (const slide of rewind?.slides ?? []) {
    if (slide.type === 'award') awards.set(slide.title, slide)
  }

  const teamsByName = new Map(seasonTeams.map((team) => [normalize(team.displayName), team]))
  const teamRef = (rawName: string): AchievementTeamRef => {
    const name = rawName.trim()
    const team = teamsByName.get(normalize(name)) ?? seasonTeams.find((t) => normalize(t.id) === normalize(name))
    return { name: team?.displayName ?? name, teamId: team?.id, logoUrl: team?.logoUrl }
  }

  const details: Record<string, AchievementDetail> = {}
  const nineCat = new Map((season.nineCatFull ?? []).map((row) => [row.category, row]))

  for (const achievement of season.achievements) {
    const name = achievement.name.trim()
    const description = awards.get(name)?.description ?? ''
    let detail: AchievementDetail | null = null

    switch (name) {
      case 'Public Enemy No. 1': {
        const match = description.match(/^(\d+) teams? had you as their main rival\s*[—-]\s*(.+)$/)
        if (match) {
          const teams = match[2].split(/,\s*/).filter(Boolean).map(teamRef)
          detail = {
            facts: [`${plural(Number(match[1]), 'equipo', 'equipos')} lo tuvieron como rival #1`],
            teams,
            teamsLabel: 'Rival #1 de',
          }
        }
        break
      }
      case 'Ceiling Check': {
        const match = description.match(/with ([\d,.]+) points/)
        if (match) detail = { facts: [`${formatPoints(match[1])} pts en una sola semana`] }
        break
      }
      case 'Unstoppable': {
        const match = description.match(/(\d+) consecutive wins/)
        if (match) detail = { facts: [`${plural(Number(match[1]), 'victoria', 'victorias')} seguidas`] }
        break
      }
      case 'Free Fall': {
        const match = description.match(/(\d+) consecutive losses/)
        if (match) detail = { facts: [`${plural(Number(match[1]), 'derrota', 'derrotas')} seguidas`] }
        break
      }
      case 'The Kingslayer': {
        const match = description.match(/ended (.+?)'s (\d+)-game win streak in week (\d+)/)
        if (match) {
          detail = {
            facts: [`Cortó una racha de ${plural(Number(match[2]), 'victoria', 'victorias')}`, `Semana ${match[3]}`],
            teams: [teamRef(match[1])],
            teamsLabel: 'Víctima',
          }
        }
        break
      }
      case 'The Closer':
      case 'The Choke': {
        const match = description.match(/(?:Won|Lost) (\d+) close games?/)
        if (match) {
          const won = name === 'The Closer'
          detail = {
            facts: [
              `${plural(Number(match[1]), 'duelo cerrado', 'duelos cerrados')} ${won ? 'ganados' : 'perdidos'}`,
              'Margen ≤ 100 pts',
            ],
          }
        }
        break
      }
      case 'Manager Of The Year': {
        const moty = awards.get(name)?.motyBreakdown
        if (moty) {
          const total = moty.stats + moty.standings + moty.mva
          detail = {
            facts: [
              `Total ${total.toFixed(1)} / 100`,
              `Stats ${moty.stats.toFixed(1)} / ${MOTY_MAX.stats}`,
              `Standings ${moty.standings.toFixed(1)} / ${MOTY_MAX.standings}`,
              `MVA ${moty.mva.toFixed(1)} / ${MOTY_MAX.mva}`,
            ],
          }
        }
        break
      }
      case 'Campeón de liga': {
        const facts = [season.record !== '—' ? `Récord ${season.record}` : '', season.playoffDepthLabel]
        detail = { facts: facts.filter((fact) => fact && fact !== '—') }
        break
      }
      default: {
        const category = CATEGORY_BY_TITLE[name]
        const row = category ? nineCat.get(category) : undefined
        if (category && row && row.valueDisplay !== '—') {
          detail = { facts: [`${category}: ${row.valueDisplay}`, `#${row.rank} de la liga`] }
        }
      }
    }

    if (detail && (detail.facts.length > 0 || detail.teams?.length)) details[name] = detail
  }

  return details
}
