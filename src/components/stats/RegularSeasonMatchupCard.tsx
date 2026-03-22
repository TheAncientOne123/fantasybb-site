'use client'

import Image from 'next/image'
import clsx from 'clsx'
import type { RegularSeasonMatchupRow } from '@/data/stats-room-types'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'

type StandingsLookup = Map<string, { displayName: string }>

/** Equipos empatados al puntaje más bajo de la semana (todos los matchups del periodo). */
export function getWeekLowestScoreTeamIds(rows: RegularSeasonMatchupRow[]): Set<string> {
  const scores: { teamId: string; score: number }[] = []
  for (const m of rows) {
    scores.push({ teamId: m.teamAId, score: m.scoreA })
    scores.push({ teamId: m.teamBId, score: m.scoreB })
  }
  if (scores.length === 0) return new Set()
  let min = Infinity
  for (const s of scores) {
    if (s.score < min) min = s.score
  }
  const ids = new Set<string>()
  for (const s of scores) {
    if (s.score === min) ids.add(s.teamId)
  }
  return ids
}

const PENALTY_LABEL = '- $100'

type Props = {
  matchup: RegularSeasonMatchupRow
  standingsById: StandingsLookup
  teamFilter: string
  lowestScoreTeamIds: Set<string>
}

export default function RegularSeasonMatchupCard({
  matchup: m,
  standingsById,
  teamFilter,
  lowestScoreTeamIds,
}: Props) {
  const { scoreA, scoreB, teamAId, teamBId } = m
  const aWins = scoreA > scoreB
  const bWins = scoreB > scoreA
  const tie = scoreA === scoreB
  const diff = Math.abs(scoreA - scoreB)
  const maxScore = Math.max(scoreA, scoreB, 1)
  const barPct = Math.min(48, 8 + (diff / maxScore) * 42)

  const nameA = standingsById.get(teamAId)?.displayName ?? teamAId
  const nameB = standingsById.get(teamBId)?.displayName ?? teamBId
  const logoA = getTeamLogoPath(teamAId)
  const logoB = getTeamLogoPath(teamBId)
  const hiA = teamFilter === teamAId
  const hiB = teamFilter === teamBId
  const penaltyA = lowestScoreTeamIds.has(teamAId)
  const penaltyB = lowestScoreTeamIds.has(teamBId)

  return (
    <li className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4 shadow-inner shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div className={clsx('flex min-w-0 flex-1 flex-col items-center gap-2', hiA && 'text-amber-200')}>
          <span
            className={clsx(
              'flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold',
              aWins && !tie && 'bg-emerald-500 text-white',
              bWins && !tie && 'bg-red-500 text-white',
              tie && 'bg-white/20 text-white/70'
            )}
            aria-label={tie ? 'Empate' : aWins ? 'Victoria' : 'Derrota'}
          >
            {tie ? '—' : aWins ? 'W' : 'L'}
          </span>
          <div className="flex flex-col items-center gap-1">
            {logoA ? (
              <Image
                src={logoA}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white/60">
                {nameA.slice(0, 2).toUpperCase()}
              </div>
            )}
            <span className="max-w-[120px] truncate text-center text-xs font-medium text-slate-200 sm:max-w-[140px]">
              {nameA}
            </span>
            {penaltyA && (
              <span className="rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                {PENALTY_LABEL}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center justify-center gap-2 px-1 pt-6">
          <div className="flex items-baseline gap-2 font-heading text-xl font-bold tabular-nums sm:text-2xl">
            <span className={clsx(aWins && !tie && 'text-emerald-400', (bWins || tie) && !aWins && 'text-slate-200')}>
              {scoreA.toFixed(1)}
            </span>
            <span className="text-slate-600">—</span>
            <span className={clsx(bWins && !tie && 'text-emerald-400', (aWins || tie) && !bWins && 'text-slate-200')}>
              {scoreB.toFixed(1)}
            </span>
          </div>
          <div className="relative h-1.5 w-full min-w-[140px] max-w-[200px] rounded-full bg-white/10">
            {!tie && (
              <div
                className="absolute top-0 h-full rounded-full bg-emerald-500/85"
                style={
                  aWins
                    ? { left: `${50 - barPct}%`, width: `${barPct}%` }
                    : { left: '50%', width: `${barPct}%` }
                }
                aria-hidden
              />
            )}
          </div>
          <p className="text-[11px] tabular-nums text-slate-500">
            {tie ? 'Empate' : `dif. ${diff.toFixed(1)} pts`}
          </p>
        </div>

        <div className={clsx('flex min-w-0 flex-1 flex-col items-center gap-2', hiB && 'text-amber-200')}>
          <span
            className={clsx(
              'flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold',
              bWins && !tie && 'bg-emerald-500 text-white',
              aWins && !tie && 'bg-red-500 text-white',
              tie && 'bg-white/20 text-white/70'
            )}
            aria-label={tie ? 'Empate' : bWins ? 'Victoria' : 'Derrota'}
          >
            {tie ? '—' : bWins ? 'W' : 'L'}
          </span>
          <div className="flex flex-col items-center gap-1">
            {logoB ? (
              <Image
                src={logoB}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white/60">
                {nameB.slice(0, 2).toUpperCase()}
              </div>
            )}
            <span className="max-w-[120px] truncate text-center text-xs font-medium text-slate-200 sm:max-w-[140px]">
              {nameB}
            </span>
            {penaltyB && (
              <span className="rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                {PENALTY_LABEL}
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
