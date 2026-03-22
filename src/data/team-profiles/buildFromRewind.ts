import type { TeamRewindData, Slide } from '../rewind-types'
import type { ProfileAchievement, ProfileRosterPlayer, TeamProfile, TeamProfileSeason } from './types'
import { achievementImageOrFallback } from './achievement-images'
import { getSeasonDebtAmount } from './season-debt'
import { getTeamRewindData, teamExists } from '../getTeamRewind'
import { SEASONS } from '../seasons'

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

function parseRegularSeasonRank(standing?: string): number {
  if (!standing?.trim()) return 0
  const m = standing.match(/#(\d+)/)
  return m ? parseInt(m[1], 10) : 0
}

function parseCategoryRank(secondary?: string): string {
  const m = secondary?.match(/#?\s*(\d+)/)
  return m ? m[1] : ''
}

function parseFantasyPoints(secondary?: string): string | undefined {
  if (!secondary) return undefined
  const m = secondary.match(/([\d,]+)\s*fantasy/i) || secondary.match(/^([\d,]+)/)
  if (!m) return undefined
  return m[1].replace(/,/g, '')
}

function playoffFields(outcome: string, standing?: number) {
  switch (outcome) {
    case 'champion':
      return { madePlayoffs: true, wonFinals: true, playoffDepthLabel: 'Campeón' }
    case 'lost_finals':
      return { madePlayoffs: true, wonFinals: false, playoffDepthLabel: 'Final' }
    case 'lost_round2':
      return { madePlayoffs: true, wonFinals: false, playoffDepthLabel: 'Semifinales' }
    case 'lost_round1':
      return { madePlayoffs: true, wonFinals: false, playoffDepthLabel: 'Cuartos de final' }
    case 'made_playoffs':
      return { madePlayoffs: true, wonFinals: false, playoffDepthLabel: 'En playoffs — resultado pendiente' }
    case 'in_progress':
      return { madePlayoffs: true, wonFinals: false, playoffDepthLabel: 'Playoffs en curso' }
    case 'eliminated':
      if (standing === 0 || standing === undefined)
        return { madePlayoffs: false, wonFinals: false, playoffDepthLabel: 'No clasificó a playoffs' }
      return { madePlayoffs: false, wonFinals: false, playoffDepthLabel: 'Eliminado' }
    default:
      return { madePlayoffs: false, wonFinals: false, playoffDepthLabel: '—' }
  }
}

function normalizeWLRecord(val: string): string {
  const t = val.trim()
  const parts = t.split(/[-–]/)
  if (parts.length === 2 && parts.every((p) => /^\d+$/.test(p.trim()))) {
    return `${parts[0].trim()}-${parts[1].trim()}-0`
  }
  return t
}

function extractFromStatSeasonRecord(slides: Slide[]): { record?: string; standingNum?: number } {
  const s = slides.find((x) => x.type === 'stat' && x.title === 'Season Record')
  if (!s || s.type !== 'stat') return {}
  const record =
    s.value !== undefined && s.value !== null && s.value !== '' ? String(s.value) : undefined
  let standingNum: number | undefined
  const cmp = s.compareTo?.value
  if (typeof cmp === 'string') {
    const m = cmp.match(/#(\d+)/)
    if (m) standingNum = parseInt(m[1], 10)
  }
  return { record, standingNum }
}

function extractFromStandingsRank(slides: Slide[], teamId: string): { record?: string; standingNum?: number } {
  const r = slides.find((x) => x.type === 'rank' && x.title === 'Season Standings')
  if (!r || r.type !== 'rank') return {}
  const row = r.rows.find((row) => row.id === teamId)
  if (!row) return {}
  return {
    record: row.value !== undefined && row.value !== null ? String(row.value) : undefined,
    standingNum: row.rank,
  }
}

function resolveRecordStanding(
  data: TeamRewindData,
  teamId: string
): { record: string; regularSeasonRank: number } {
  const slides = data.slides
  const summary = findLastSlide(slides, 'summary')
  let record = summary?.record?.value ? String(summary.record.value) : '—'
  let rank = parseRegularSeasonRank(summary?.record?.standing)

  if (record === '—' || !summary?.record?.value) {
    const fromStat = extractFromStatSeasonRecord(slides)
    if (fromStat.record) record = fromStat.record
    if (fromStat.standingNum && fromStat.standingNum > 0) rank = fromStat.standingNum
  }

  if (rank === 0 || record === '—') {
    const fromRank = extractFromStandingsRank(slides, teamId)
    if (fromRank.record) record = normalizeWLRecord(fromRank.record)
    if (fromRank.standingNum && fromRank.standingNum > 0) rank = fromRank.standingNum
  }

  return { record, regularSeasonRank: rank }
}

function extractLongestStreaks(slides: Slide[]): string | undefined {
  const s = slides.find((x) => x.type === 'stat' && x.title === 'Longest Streaks')
  if (!s || s.type !== 'stat') return undefined
  const v = s.value
  const base = v !== undefined && v !== null ? String(v) : ''
  const lbl = s.label ? ` · ${s.label}` : ''
  return base ? `${base}${lbl}` : undefined
}

function extractHighestScoringWeek(slides: Slide[], teamId: string): string | undefined {
  const r = slides.find(
    (x) => x.type === 'rank' && typeof x.title === 'string' && x.title.includes('Highest Scoring Week')
  )
  if (!r || r.type !== 'rank') return undefined
  const row = r.rows.find((row) => row.id === teamId)
  if (!row) return undefined
  return `Puesto #${row.rank} · mejor semana ${row.value} pts`
}

function collectAchievements(slides: Slide[], summaryTitles: ProfileAchievement[]): ProfileAchievement[] {
  const seen = new Set<string>()
  const out: ProfileAchievement[] = []
  const add = (a: ProfileAchievement) => {
    if (seen.has(a.name)) return
    seen.add(a.name)
    out.push({
      ...a,
      image: achievementImageOrFallback(a.name, a.image),
    })
  }
  for (const t of summaryTitles) add(t)
  for (const s of slides) {
    if (s.type !== 'list' || s.title !== 'Category Titles') continue
    for (const it of s.items) {
      add({
        name: it.primary,
        label: it.secondary,
        image: it.image,
      })
    }
  }
  return out
}

/**
 * Maps one season’s rewind JSON (slides) into a profile season block.
 * Keeps rewind as source of truth; same file is edited by `generate_team_data.py`.
 */
export function rewindDataToProfileSeason(
  data: TeamRewindData,
  seasonId: string,
  seasonLabel: string,
  teamId: string
): TeamProfileSeason {
  const slides = data.slides
  const po = findLastSlide(slides, 'playoffOutcome')
  const rosterSlide = findLastSlide(slides, 'rosterDiff')
  const mvpList = slides.find((s) => s.type === 'list' && s.title === 'Season MVPs')
  const catList = slides.find((s) => s.type === 'list' && s.title === 'Category Dominance')

  const { record, regularSeasonRank } = resolveRecordStanding(data, teamId)

  const pMeta = po
    ? playoffFields(po.outcome, po.standing)
    : { madePlayoffs: false, wonFinals: false, playoffDepthLabel: '—' }

  const summary = findLastSlide(slides, 'summary')
  const summaryAchievements: ProfileAchievement[] = (summary?.titles ?? []).map((t) => ({
    name: t.name,
    label: t.label,
    image: t.image,
  }))
  const achievements = collectAchievements(slides, summaryAchievements)

  const mvpPts: Record<string, string> = {}
  if (mvpList?.type === 'list') {
    for (const it of mvpList.items) {
      const pts = parseFantasyPoints(it.secondary)
      if (pts) mvpPts[it.primary] = pts
    }
  }

  const ps = data.profileStats
  let finalRoster: ProfileRosterPlayer[] = []
  if (ps?.rosterFantasyPoints?.length) {
    finalRoster = ps.rosterFantasyPoints.map((r) => ({
      name: r.name,
      fantasyPoints: String(r.points),
    }))
  } else if (rosterSlide?.type === 'rosterDiff') {
    for (const name of [...rosterSlide.kept, ...rosterSlide.added]) {
      finalRoster.push({
        name,
        fantasyPoints: mvpPts[name],
      })
    }
  }

  const categoryRanks9cat: Record<string, string> = {}
  let nineCatFull = ps?.nineCat?.map((row) => ({
    category: row.category,
    rank: row.rank,
    valueDisplay: row.valueDisplay,
  }))

  if (nineCatFull?.length) {
    for (const row of nineCatFull) {
      if (row.rank > 0) categoryRanks9cat[row.category] = String(row.rank)
    }
  } else if (catList?.type === 'list') {
    for (const it of catList.items) {
      const r = parseCategoryRank(it.secondary)
      if (it.primary && r) categoryRanks9cat[it.primary] = r
    }
  }

  return {
    seasonId,
    seasonLabel,
    record,
    regularSeasonRank,
    madePlayoffs: pMeta.madePlayoffs,
    wonFinals: pMeta.wonFinals,
    playoffDepthLabel: pMeta.playoffDepthLabel,
    achievements,
    finalRoster,
    categoryRanks9cat,
    nineCatFull: nineCatFull?.length ? nineCatFull : undefined,
    longestStreaks: extractLongestStreaks(slides),
    highestScoringWeek: extractHighestScoringWeek(slides, teamId),
    debtPaid: getSeasonDebtAmount(seasonId, teamId),
  }
}

/**
 * Loads rewind modules for every `SEASONS` entry that includes this team; newest season first.
 */
export async function buildTeamProfile(teamId: string): Promise<TeamProfile | null> {
  const seasonOrder = [...SEASONS].filter((s) => teamExists(s.id, teamId)).sort((a, b) => b.id.localeCompare(a.id))
  if (seasonOrder.length === 0) return null

  const newest = await getTeamRewindData(seasonOrder[0].id, teamId)
  if (!newest) return null

  const seasonsOut: TeamProfileSeason[] = []
  for (const meta of seasonOrder) {
    const d = await getTeamRewindData(meta.id, teamId)
    if (!d) continue
    seasonsOut.push(rewindDataToProfileSeason(d, meta.id, meta.label, teamId))
  }
  if (seasonsOut.length === 0) return null

  return {
    id: newest.id,
    displayName: newest.displayName,
    owner: newest.owner?.trim() || undefined,
    description: newest.description?.trim() || undefined,
    seasons: seasonsOut,
  }
}
