import type { ConsolationLadder, NextDraftOrderRow, StatsStandingRow } from '@/data/stats-room-types'

export type MiniBracketStats = { wins: number; losses: number; pf: number }

type MiniStats = MiniBracketStats

/** Misma regla que la vista WCL: excluye periodos bajos donde el scoreboard mezcla bracket principal. */
export const WINNERS_CONSOLATION_STATS_MIN_PERIOD = 21

function emptyStats(): MiniStats {
  return { wins: 0, losses: 0, pf: 0 }
}

/** Labels tipo "Periodo 20" del generador: solo rondas con número >= min. */
export function filterLadderRoundsByMinPeriod(
  rounds: ConsolationLadder['rounds'],
  minPeriod: number
): ConsolationLadder['rounds'] {
  const re = /^Periodo\s+(\d+)$/i
  return rounds.filter((r) => {
    const m = r.label?.trim().match(re)
    if (!m) return true
    return parseInt(m[1], 10) >= minPeriod
  })
}

/** Partidos dentro del ladder (duelos con scores entre equipos del bloque). */
function miniBracketStats(
  ladder: ConsolationLadder,
  teamIds: Set<string>,
  minMatchupPeriod?: number
): Map<string, MiniStats> {
  const map = new Map<string, MiniStats>()
  for (const tid of teamIds) map.set(tid, emptyStats())

  const rounds =
    minMatchupPeriod == null ? ladder.rounds : filterLadderRoundsByMinPeriod(ladder.rounds, minMatchupPeriod)

  for (const round of rounds) {
    for (const m of round.matchups) {
      const [ta, tb] = m.teamIds
      const sc = m.scores
      if (!ta || !tb || !sc || sc[0] == null || sc[1] == null) continue
      if (!teamIds.has(ta) || !teamIds.has(tb)) continue
      const a = Number(sc[0])
      const b = Number(sc[1])
      if (Number.isNaN(a) || Number.isNaN(b)) continue

      const sa = map.get(ta)!
      const sb = map.get(tb)!
      sa.pf += a
      sb.pf += b
      if (a > b) {
        sa.wins += 1
        sb.losses += 1
      } else if (b > a) {
        sb.wins += 1
        sa.losses += 1
      }
    }
  }
  return map
}

/** Stats W–L–PF en partidos del ladder entre los equipos dados. */
export function getMiniBracketStatsForTeams(
  ladder: ConsolationLadder,
  teamIds: string[],
  minMatchupPeriod?: number
): Map<string, MiniBracketStats> {
  const unique = [...new Set(teamIds)]
  return miniBracketStats(ladder, new Set(unique), minMatchupPeriod)
}

/**
 * Probabilidad seed #1 del bloque: peso `1 + victorias` en el ladder (mismo subconjunto de rondas que el récord).
 */
export function seed1LotteryPctByTeam(
  teamIds: string[],
  statsByTeam: Map<string, Pick<MiniBracketStats, 'wins'>>
): Map<string, number> {
  const unique = [...new Set(teamIds)]
  if (unique.length === 0) return new Map()
  const weights = unique.map((t) => 1 + (statsByTeam.get(t)?.wins ?? 0))
  const sumW = weights.reduce((a, b) => a + b, 0)
  if (sumW <= 0) return new Map(unique.map((t) => [t, 0]))

  const rounded = unique.map((t, i) => ({
    t,
    v: Math.round(((100 * weights[i]) / sumW) * 10) / 10,
  }))
  let sum = rounded.reduce((a, r) => a + r.v, 0)
  const diff = Math.round((100 - sum) * 10) / 10
  if (diff !== 0 && rounded.length > 0) {
    rounded[0] = { t: rounded[0].t, v: Math.round((rounded[0].v + diff) * 10) / 10 }
  }
  return new Map(rounded.map((r) => [r.t, r.v]))
}

export type DraftLadderRowMeta = { wins: number; losses: number; seed1Pct: number }

export type BuildDraftBlockMetaOptions = {
  /** P. ej. WCL: solo `Periodo N` con N >= este valor para récord y lotería. */
  minMatchupPeriod?: number
}

/** Metadatos de tabla draft para un bloque de 4 filas (CL o WCL). */
export function buildDraftBlockLadderMeta(
  blockRows: NextDraftOrderRow[],
  ladder: ConsolationLadder,
  options?: BuildDraftBlockMetaOptions
): Map<string, DraftLadderRowMeta> {
  const ids = [...new Set(blockRows.map((r) => r.teamId).filter((x): x is string => x != null))]
  if (ids.length === 0) return new Map()
  const stats = getMiniBracketStatsForTeams(ladder, ids, options?.minMatchupPeriod)
  const pct = seed1LotteryPctByTeam(ids, stats)
  const out = new Map<string, DraftLadderRowMeta>()
  for (const id of ids) {
    const s = stats.get(id) ?? emptyStats()
    out.set(id, { wins: s.wins, losses: s.losses, seed1Pct: pct.get(id) ?? 0 })
  }
  return out
}

function sortTeamIdsForDraftBlock(
  teamIds: string[],
  ladder: ConsolationLadder,
  standingsById: Map<string, StatsStandingRow>,
  minMatchupPeriod?: number
): string[] {
  const unique = [...new Set(teamIds)]
  if (unique.length === 0) return []
  const stats = miniBracketStats(ladder, new Set(unique), minMatchupPeriod)
  return unique.sort((x, y) => {
    const sx = stats.get(x) ?? emptyStats()
    const sy = stats.get(y) ?? emptyStats()
    if (sy.wins !== sx.wins) return sy.wins - sx.wins
    if (sx.losses !== sy.losses) return sx.losses - sy.losses
    if (sy.pf !== sx.pf) return sy.pf - sx.pf
    const rx = standingsById.get(x)?.rank ?? 99
    const ry = standingsById.get(y)?.rank ?? 99
    return rx - ry
  })
}

/**
 * Reordena picks 1–4 y 5–8 según victorias en los ladders (WCL solo desde {@link WINNERS_CONSOLATION_STATS_MIN_PERIOD}).
 * Equipos sin `teamId` se dejan al final del bloque.
 */
export function nextDraftOrderSortedByLadderWins(
  rows: NextDraftOrderRow[],
  bottomFour: ConsolationLadder,
  winnersConsolation: ConsolationLadder,
  standingsById: Map<string, StatsStandingRow>
): NextDraftOrderRow[] {
  if (rows.length !== 10) return rows

  const reorderBlock = (
    startIndex: number,
    ladder: ConsolationLadder,
    minMatchupPeriod?: number
  ) => {
    const block = rows.slice(startIndex, startIndex + 4)
    const known = block.map((r) => r.teamId).filter((id): id is string => id != null)
    const sortedKnown = sortTeamIdsForDraftBlock(known, ladder, standingsById, minMatchupPeriod)
    const nulls = 4 - sortedKnown.length
    const orderedIds: (string | null)[] = [...sortedKnown, ...Array(nulls).fill(null)]
    return block.map((row, i) => ({
      ...row,
      pick: startIndex + i + 1,
      teamId: orderedIds[i] ?? null,
    }))
  }

  const b = reorderBlock(0, bottomFour, undefined)
  const w = reorderBlock(4, winnersConsolation, WINNERS_CONSOLATION_STATS_MIN_PERIOD)
  return [...b, ...w, ...rows.slice(8, 10)]
}
