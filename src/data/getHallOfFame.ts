import type { Slide, TeamRewindData } from './rewind-types'
import type {
  HallOfFameData,
  HofAchievement,
  HofLeagueRecord,
  HofMotyAllTimeRow,
  HofMotySeasonRanking,
  HofMotySeasonRow,
  HofNineCatFirst,
  HofSeasonShowcase,
  HofTeamShowcase,
  HofTrophyKind,
} from './hall-of-fame-types'
import { SEASONS } from './seasons'
import { getTeamRewindData, teamExists } from './getTeamRewind'
import { getTeamsForSeason } from './teams'
import { getStatsRoomData } from './getStatsRoomData'
import { achievementImageOrFallback } from './team-profiles/achievement-images'

/** Nombres de badge 9CAT (alineado con FIRST_PLACE_TITLES en league_data.py). */
const NINECAT_SALON_ACHIEVEMENT_NAMES = new Set([
  'The Scoring King',
  'The Sharpshooter',
  'The Cold Blooded',
  'The Worm',
  'The Point God',
  'The Splash Father',
  'The Grand Theft Alvarado',
  'The Rim Guardian',
  'The Caretaker',
])

const ACHIEVEMENT_NAME_TO_CATEGORY: Record<string, string> = {
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

function findLastSlide<T extends Slide['type']>(
  slides: Slide[],
  t: T
): Extract<Slide, { type: T }> | undefined {
  for (let i = slides.length - 1; i >= 0; i--) {
    const s = slides[i]
    if (s.type === t) return s as Extract<Slide, { type: T }>
  }
  return undefined
}

function parseCategoryFromLabel(label?: string): string | undefined {
  if (!label?.trim()) return undefined
  const m = label.trim().match(/#1\s+en\s+([^\s(]+)/i)
  if (!m) return undefined
  return m[1].toUpperCase()
}

function extractArchetypeName(slides: Slide[]): string | undefined {
  const summary = findLastSlide(slides, 'summary')
  if (summary?.archetype?.name?.trim()) return summary.archetype.name.trim()
  const arch = slides.find((s) => s.type === 'award' && s.title === 'Your Archetype')
  if (arch?.type === 'award' && arch.badgeName?.trim()) return arch.badgeName.trim()
  return undefined
}

function hasMoty(slides: Slide[]): boolean {
  return slides.some((s) => s.type === 'award' && s.title === 'Manager Of The Year')
}

function isPlayoffChampion(slides: Slide[]): boolean {
  const po = findLastSlide(slides, 'playoffOutcome')
  return po?.outcome === 'champion'
}

const NINECAT_DISPLAY_ORDER = [
  'PTS',
  'REB',
  'AST',
  'STL',
  'BLK',
  '3PM',
  'FG%',
  'FT%',
  'TO',
] as const

function sortNineCatFirsts(firsts: HofNineCatFirst[]): HofNineCatFirst[] {
  const order = new Map(NINECAT_DISPLAY_ORDER.map((c, i) => [c, i]))
  return [...firsts].sort((a, b) => {
    const ia = order.get(a.category as (typeof NINECAT_DISPLAY_ORDER)[number]) ?? 100
    const ib = order.get(b.category as (typeof NINECAT_DISPLAY_ORDER)[number]) ?? 100
    if (ia !== ib) return ia - ib
    return a.category.localeCompare(b.category)
  })
}

type SalonNineRow = {
  achievementName: string
  category: string
  image?: string
}

/**
 * Títulos 9CAT del salón (misma lógica que compute_first_place_titles en Python): slides Category Titles + summary.
 */
function extractSalonNineCatRows(data: TeamRewindData): SalonNineRow[] {
  const byCategory = new Map<string, SalonNineRow>()

  const add = (row: SalonNineRow) => {
    if (!byCategory.has(row.category)) byCategory.set(row.category, row)
  }

  const catSlide = data.slides.find((s) => s.type === 'list' && s.title === 'Category Titles')
  if (catSlide?.type === 'list') {
    for (const it of catSlide.items) {
      const achievementName = it.primary?.trim()
      if (!achievementName || !NINECAT_SALON_ACHIEVEMENT_NAMES.has(achievementName)) continue
      const category =
        parseCategoryFromLabel(it.secondary) ?? ACHIEVEMENT_NAME_TO_CATEGORY[achievementName]
      if (!category) continue
      add({ achievementName, category, image: it.image })
    }
  }

  const summary = findLastSlide(data.slides, 'summary')
  for (const t of summary?.titles ?? []) {
    if (!NINECAT_SALON_ACHIEVEMENT_NAMES.has(t.name)) continue
    const category = parseCategoryFromLabel(t.label) ?? ACHIEVEMENT_NAME_TO_CATEGORY[t.name]
    if (!category) continue
    add({ achievementName: t.name, category, image: t.image })
  }

  const profile = data.profileStats?.nineCat
  return sortNineCatFirsts(
    [...byCategory.values()].map((v) => ({
      category: v.category,
      achievementName: v.achievementName,
      image: v.image,
      valueDisplay: profile?.find((r) => r.category === v.category)?.valueDisplay,
    }))
  )
}

function nameSeenInAchievements(out: HofAchievement[], name: string): boolean {
  const n = name.trim().toLowerCase()
  return out.some((a) => a.name.trim().toLowerCase() === n)
}

const HOF_FAILURE_BADGES = new Set(['the choke', 'free fall'])

function splitAchievementsByPolarity(achievements: HofAchievement[]): {
  achievementsPositive: HofAchievement[]
  achievementsNegative: HofAchievement[]
} {
  const achievementsNegative = achievements.filter((a) => HOF_FAILURE_BADGES.has(a.name.trim().toLowerCase()))
  const achievementsPositive = achievements.filter((a) => !HOF_FAILURE_BADGES.has(a.name.trim().toLowerCase()))
  return { achievementsPositive, achievementsNegative }
}

function motyPillarSum(r: HofMotySeasonRow): number {
  return r.statsContribution + r.standings + r.mva
}

function extractMotyScoreSnapshot(slides: Slide[]): HofMotySeasonRow | null {
  const summary = findLastSlide(slides, 'summary')
  const s = summary?.motyScoreSnapshot
  if (!s) return null
  return {
    teamId: '',
    displayName: '',
    score: Number(s.score) || 0,
    statsPointsRaw: Number(s.statsPointsRaw) || 0,
    statsContribution: Number(s.stats) || 0,
    standings: Number(s.standings) || 0,
    mva: Number(s.mva) || 0,
  }
}

function collectAchievements(data: TeamRewindData, trophies: HofTrophyKind[]): HofAchievement[] {
  const out: HofAchievement[] = []

  const summary = findLastSlide(data.slides, 'summary')
  for (const t of summary?.titles ?? []) {
    const name = t.name?.trim()
    if (!name) continue
    out.push({
      name,
      label: t.label?.trim() || undefined,
      image: achievementImageOrFallback(name, t.image),
      source: 'summary',
    })
  }

  const catSlide = data.slides.find((s) => s.type === 'list' && s.title === 'Category Titles')
  if (catSlide?.type === 'list') {
    for (const it of catSlide.items) {
      const name = it.primary?.trim()
      if (!name) continue
      if (nameSeenInAchievements(out, name)) continue
      out.push({
        name,
        label: it.secondary?.trim() || undefined,
        image: achievementImageOrFallback(name, it.image),
        source: 'categoryTitles',
      })
    }
  }

  for (const s of data.slides) {
    if (s.type !== 'award' || !s.image?.trim()) continue
    const displayName =
      s.title === 'Your Archetype'
        ? s.badgeName?.trim() || s.title
        : s.title === 'Manager Of The Year'
          ? 'Manager Of The Year'
          : s.title
    if (nameSeenInAchievements(out, displayName)) continue
    const label =
      s.title === 'Your Archetype'
        ? 'Arquetipo'
        : s.badgeName?.trim() && s.badgeName.trim() !== displayName
          ? s.badgeName.trim()
          : undefined
    out.push({
      name: displayName,
      label,
      image: achievementImageOrFallback(displayName, s.image),
      source: 'award',
    })
  }

  if (trophies.includes('champion') && !out.some((a) => /campeón|champion/i.test(a.name))) {
    out.unshift({
      name: 'Campeón de liga',
      label: 'Playoffs',
      image: '/badges/larry.png',
      source: 'trophy',
    })
  }
  if (
    trophies.includes('moty') &&
    !out.some((a) => /manager of the year|^moty$/i.test(a.name.trim()))
  ) {
    out.push({
      name: 'Manager Of The Year',
      label: 'MOTY',
      image: '/badges/manager-of-the-year.png',
      source: 'trophy',
    })
  }
  if (
    trophies.includes('nine_cat_sweep') &&
    !out.some((a) => /9 categor/i.test(a.name))
  ) {
    out.push({
      name: '#1 en las 9 categorías',
      label: 'Totales de temporada (salón)',
      source: 'trophy',
    })
  }

  return out
}

function collectTrophies(
  data: TeamRewindData,
  championTeamIdFromBracket: string | null | undefined,
  salonNineCatSweep: boolean
): HofTrophyKind[] {
  const out: HofTrophyKind[] = []
  if (isPlayoffChampion(data.slides) || (championTeamIdFromBracket && data.id === championTeamIdFromBracket)) {
    out.push('champion')
  }
  if (hasMoty(data.slides)) out.push('moty')
  if (salonNineCatSweep) out.push('nine_cat_sweep')
  return out
}

function findRankLeader(
  slides: Slide[],
  title: string
): { teamId: string; displayName: string; value: string } | null {
  const s = slides.find((x) => x.type === 'rank' && x.title === title)
  if (!s || s.type !== 'rank') return null
  const row = s.rows.find((r) => r.rank === 1)
  if (!row) return null
  return {
    teamId: row.id,
    displayName: row.name,
    value: String(row.value),
  }
}

/**
 * League-wide rank slides repeat on every rewind; some generated teams may omit a slide.
 * Scan until we have each record.
 */
async function leagueRecordsForSeason(seasonId: string, seasonLabel: string): Promise<HofLeagueRecord[]> {
  const teams = getTeamsForSeason(seasonId)
  let win: { teamId: string; displayName: string; value: string } | null = null
  let ceiling: { teamId: string; displayName: string; value: string } | null = null
  let lose: { teamId: string; displayName: string; value: string } | null = null
  for (const t of teams) {
    const data = await getTeamRewindData(seasonId, t.id)
    if (!data) continue
    if (!win) win = findRankLeader(data.slides, 'Win Streaks')
    if (!ceiling) ceiling = findRankLeader(data.slides, 'Highest Scoring Week (per team)')
    if (!lose) lose = findRankLeader(data.slides, 'Lose Streaks')
    if (win && ceiling && lose) break
  }
  const out: HofLeagueRecord[] = []
  if (win) {
    out.push({
      kind: 'win_streak',
      seasonId,
      seasonLabel,
      leaderTeamId: win.teamId,
      leaderDisplayName: win.displayName,
      value: `${win.value} victorias`,
    })
  }
  if (ceiling) {
    out.push({
      kind: 'ceiling_check',
      seasonId,
      seasonLabel,
      leaderTeamId: ceiling.teamId,
      leaderDisplayName: ceiling.displayName,
      value: `${ceiling.value} pts`,
    })
  }
  if (lose) {
    out.push({
      kind: 'lose_streak',
      seasonId,
      seasonLabel,
      leaderTeamId: lose.teamId,
      leaderDisplayName: lose.displayName,
      value: `${lose.value} derrotas`,
    })
  }
  return out
}

function mergeDisplayNamesByNewestSeason(): Map<string, string> {
  const chronological = [...SEASONS].sort((a, b) => a.id.localeCompare(b.id))
  const byId = new Map<string, string>()
  for (const s of chronological) {
    for (const t of getTeamsForSeason(s.id)) {
      byId.set(t.id, t.displayName)
    }
  }
  return byId
}

function allTeamIdsUnion(): string[] {
  const ids = new Set<string>()
  for (const s of SEASONS) {
    for (const t of getTeamsForSeason(s.id)) {
      ids.add(t.id)
    }
  }
  return [...ids].sort((a, b) => a.localeCompare(b))
}

/**
 * Aggregates Hall of Fame showcases across every season that has rewind data.
 */
export async function getHallOfFameData(): Promise<HallOfFameData> {
  const displayById = mergeDisplayNamesByNewestSeason()
  const teamIds = allTeamIdsUnion()
  const motyRowsBySeason = new Map<string, HofMotySeasonRow[]>()

  const bracketChampions: Record<string, string | null | undefined> = {}
  for (const s of SEASONS) {
    const room = await getStatsRoomData(s.id)
    bracketChampions[s.id] = room?.playoffBracket?.championTeamId ?? null
  }

  const teams: HofTeamShowcase[] = []
  for (const teamId of teamIds) {
    const seasonsOut: HofSeasonShowcase[] = []
    const seasonOrder = [...SEASONS].sort((a, b) => b.id.localeCompare(a.id))
    for (const meta of seasonOrder) {
      if (!teamExists(meta.id, teamId)) continue
      const data = await getTeamRewindData(meta.id, teamId)
      if (!data) continue
      const motySnapshot = extractMotyScoreSnapshot(data.slides)
      if (motySnapshot) {
        const rows = motyRowsBySeason.get(meta.id) ?? []
        rows.push({
          ...motySnapshot,
          teamId,
          displayName: displayById.get(teamId) ?? data.displayName ?? dataFallbackName(teamId),
        })
        motyRowsBySeason.set(meta.id, rows)
      }
      const nineCatFirsts = extractSalonNineCatRows(data)
      const salonSweep = nineCatFirsts.length === NINECAT_SALON_ACHIEVEMENT_NAMES.size
      const trophies = collectTrophies(data, bracketChampions[meta.id], salonSweep)
      const achievements = collectAchievements(data, trophies)
      const { achievementsPositive, achievementsNegative } = splitAchievementsByPolarity(achievements)
      const archetypeName = extractArchetypeName(data.slides)
      seasonsOut.push({
        seasonId: meta.id,
        seasonLabel: meta.label,
        archetypeName,
        trophies,
        achievements,
        achievementsPositive,
        achievementsNegative,
        nineCatFirsts,
      })
    }
    if (seasonsOut.length === 0) continue
    teams.push({
      teamId,
      displayName: displayById.get(teamId) ?? dataFallbackName(teamId),
      seasons: seasonsOut,
    })
  }

  teams.sort((a, b) => a.displayName.localeCompare(b.displayName, 'es', { sensitivity: 'base' }))

  const leagueRecords: HofLeagueRecord[] = []
  for (const meta of [...SEASONS].sort((a, b) => b.id.localeCompare(a.id))) {
    const recs = await leagueRecordsForSeason(meta.id, meta.label)
    leagueRecords.push(...recs)
  }

  // MOTY current-season ranking: most recent season with snapshot rows.
  const seasonOrderDesc = [...SEASONS].sort((a, b) => b.id.localeCompare(a.id))
  let motyCurrentSeason: HofMotySeasonRanking | null = null
  for (const meta of seasonOrderDesc) {
    const rows = motyRowsBySeason.get(meta.id) ?? []
    if (!rows.length) continue
    const sorted = [...rows].sort((a, b) => {
      const d = motyPillarSum(b) - motyPillarSum(a)
      if (d !== 0) return d
      return a.displayName.localeCompare(b.displayName, 'es', { sensitivity: 'base' })
    })
    motyCurrentSeason = {
      seasonId: meta.id,
      seasonLabel: meta.label,
      rows: sorted,
    }
    break
  }

  // MOTY all-time ranking (count of titles + seasons won).
  const motyAllTime: HofMotyAllTimeRow[] = teams
    .map((t) => {
      const seasons = t.seasons
        .filter((s) => s.trophies.includes('moty'))
        .map((s) => s.seasonId)
        .sort((a, b) => b.localeCompare(a))
      return {
        teamId: t.teamId,
        displayName: t.displayName,
        motyTitles: seasons.length,
        seasons,
      }
    })
    .filter((r) => r.motyTitles > 0)
    .sort((a, b) => (b.motyTitles !== a.motyTitles ? b.motyTitles - a.motyTitles : a.displayName.localeCompare(b.displayName)))

  // Larry showcase for 2026..2030 (future years shown as empty until season exists).
  const larrySeasons = ['2026', '2027', '2028', '2029', '2030']
  const larryTable = teams.map((t) => {
    const seasonsWon = larrySeasons.filter((sid) => (bracketChampions[sid] ?? null) === t.teamId)
    return {
      teamId: t.teamId,
      displayName: t.displayName,
      seasonsWon,
    }
  })

  return { teams, leagueRecords, motyCurrentSeason, motyAllTime, larryTable }
}

function dataFallbackName(teamId: string): string {
  return teamId
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
