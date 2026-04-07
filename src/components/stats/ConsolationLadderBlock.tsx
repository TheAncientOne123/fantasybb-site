'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { filterLadderRoundsByMinPeriod } from '@/data/draftOrderFromLadders'
import type { ConsolationLadder, StatsStandingRow } from '@/data/stats-room-types'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'

function recordForTeam(teamId: string | null | undefined, byId: Map<string, StatsStandingRow>): string {
  if (!teamId) return '—'
  const row = byId.get(teamId)
  if (!row) return '—'
  const t = row.ties ? `-${row.ties}` : ''
  return `${row.wins}-${row.losses}${t}`
}

export function matchupWinnerIndex(
  a: number | null | undefined,
  b: number | null | undefined
): 0 | 1 | null {
  if (a == null || b == null || !Number.isFinite(a) || !Number.isFinite(b)) return null
  if (a === 0 && b === 0) return null
  if (a > b) return 0
  if (b > a) return 1
  return null
}

type RowProps = {
  seed?: number
  teamId: string | null | undefined
  score: number | null | undefined
  standingsById: Map<string, StatsStandingRow>
  dimmed: boolean
  isWinner?: boolean
}

function ConsolationRow({ seed, teamId, score, standingsById, dimmed, isWinner }: RowProps) {
  const row = teamId ? standingsById.get(teamId) : undefined
  const name = row?.displayName ?? 'TBD'
  const logo = teamId ? getTeamLogoPath(teamId) : undefined
  const scoreText =
    score != null && Number.isFinite(score) ? score.toFixed(1) : teamId ? '—' : ''

  return (
    <div
      className={clsx(
        'flex items-center gap-2 rounded-lg border px-2 py-1.5 text-sm',
        isWinner
          ? 'border-emerald-500/40 bg-emerald-500/15'
          : 'border-white/10 bg-slate-900/80',
        dimmed && 'opacity-35'
      )}
    >
      {seed != null && (
        <span className="w-5 shrink-0 text-right font-mono text-xs text-amber-400/90">#{seed}</span>
      )}
      {logo ? (
        <Image src={logo} alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-full object-cover" />
      ) : (
        <div className="h-7 w-7 shrink-0 rounded-full bg-white/10" />
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-slate-100">{name}</div>
        <div className="truncate text-[11px] text-slate-500">
          {teamId ? `${recordForTeam(teamId, standingsById)} · RS` : '—'}
        </div>
      </div>
      {teamId && (
        <span className="shrink-0 font-heading text-base font-bold tabular-nums text-white">{scoreText}</span>
      )}
    </div>
  )
}

type BlockProps = {
  ladder: ConsolationLadder
  standingsById: Map<string, StatsStandingRow>
  highlightTeamId: string | null
  emptyMessage?: string
  /** Si se define, solo se muestran rondas cuyo label sea `Periodo N` con N >= este valor. */
  minMatchupPeriod?: number
}

export function ConsolationLadderBlock({
  ladder,
  standingsById,
  highlightTeamId,
  emptyMessage = 'Sin partidos en el dataset de playoffs para este ladder.',
  minMatchupPeriod,
}: BlockProps) {
  const dim = (tid: string | null | undefined) => Boolean(highlightTeamId && tid && tid !== highlightTeamId)

  const rounds = useMemo(() => {
    if (minMatchupPeriod == null) return ladder.rounds
    return filterLadderRoundsByMinPeriod(ladder.rounds, minMatchupPeriod)
  }, [ladder.rounds, minMatchupPeriod])

  return (
    <div className="space-y-3">
      <h3 className="font-heading text-lg font-semibold text-white">{ladder.title}</h3>
      {ladder.notes && <p className="text-xs text-slate-500">{ladder.notes}</p>}
      {rounds.length === 0 ? (
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rounds.map((round, ri) => (
            <div key={ri} className="flex flex-col gap-2">
              <h4 className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                {round.label ?? `Ronda ${ri + 1}`}
              </h4>
              <div className="flex flex-col gap-3">
                {round.matchups.map((m, mi) => {
                  const s0 = m.scores?.[0]
                  const s1 = m.scores?.[1]
                  const winIdx = matchupWinnerIndex(s0 ?? null, s1 ?? null)
                  return (
                    <div
                      key={m.id ?? `${ri}-${mi}`}
                      className="space-y-1 rounded-xl border border-white/10 bg-white/[0.03] p-2"
                    >
                      <ConsolationRow
                        seed={m.seeds?.[0]}
                        teamId={m.teamIds[0]}
                        score={s0 ?? null}
                        standingsById={standingsById}
                        dimmed={dim(m.teamIds[0])}
                        isWinner={winIdx === 0}
                      />
                      <ConsolationRow
                        seed={m.seeds?.[1]}
                        teamId={m.teamIds[1]}
                        score={s1 ?? null}
                        standingsById={standingsById}
                        dimmed={dim(m.teamIds[1])}
                        isWinner={winIdx === 1}
                      />
                      {m.advanceNote && (
                        <p className="px-1 text-[10px] text-slate-500">{m.advanceNote}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
