'use client'

import Image from 'next/image'
import clsx from 'clsx'
import type { PlayoffBracket as PlayoffBracketType, StatsStandingRow } from '@/data/stats-room-types'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'

function ordinalRank(n: number): string {
  const j = n % 10
  const k = n % 100
  if (j === 1 && k !== 11) return `${n}st`
  if (j === 2 && k !== 12) return `${n}nd`
  if (j === 3 && k !== 13) return `${n}rd`
  return `${n}th`
}

function recordForTeam(teamId: string | null | undefined, byId: Map<string, StatsStandingRow>): string {
  if (!teamId) return '—'
  const row = byId.get(teamId)
  if (!row) return '—'
  const t = row.ties ? `-${row.ties}` : ''
  return `${row.wins}-${row.losses}${t}`
}

function rsPlace(teamId: string | null | undefined, byId: Map<string, StatsStandingRow>): string {
  if (!teamId) return '—'
  const row = byId.get(teamId)
  if (!row) return '—'
  return `${ordinalRank(row.rank)}`
}

type RowProps = {
  seed?: number
  teamId: string | null | undefined
  score: number | null | undefined
  standingsById: Map<string, StatsStandingRow>
  dimmed: boolean
  isBye?: boolean
}

function BracketRow({ seed, teamId, score, standingsById, dimmed, isBye }: RowProps) {
  const row = teamId ? standingsById.get(teamId) : undefined
  const name = row?.displayName ?? (isBye ? 'BYE' : 'TBD')
  const logo = teamId ? getTeamLogoPath(teamId) : undefined
  const showScore = !isBye && teamId
  const scoreText =
    score != null && Number.isFinite(score) ? score.toFixed(1) : showScore ? '—' : ''

  const subtitle = (() => {
    if (isBye && teamId) {
      return `${recordForTeam(teamId, standingsById)} · ${rsPlace(teamId, standingsById)} · BYE`
    }
    if (teamId) {
      return `${recordForTeam(teamId, standingsById)} · ${rsPlace(teamId, standingsById)}`
    }
    return 'TBD'
  })()

  return (
    <div
      className={clsx(
        'flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1.5 text-sm',
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
        <div className="truncate text-[11px] text-slate-500">{subtitle}</div>
      </div>
      {showScore && (
        <span className="shrink-0 font-heading text-base font-bold tabular-nums text-white">
          {scoreText}
        </span>
      )}
    </div>
  )
}

type Props = {
  bracket: PlayoffBracketType
  standingsById: Map<string, StatsStandingRow>
  highlightTeamId: string | null
}

export default function PlayoffBracket({ bracket, standingsById, highlightTeamId }: Props) {
  const dim = (tid: string | null | undefined) =>
    Boolean(highlightTeamId && tid && tid !== highlightTeamId)

  const r1 = bracket.round1
  const bye1 = r1.find((s) => s.type === 'bye' && s.seed === 1)
  const bye2 = r1.find((s) => s.type === 'bye' && s.seed === 2)
  const m54 = r1.find((s) => s.type === 'matchup' && s.seeds[0] === 5)
  const m63 = r1.find((s) => s.type === 'matchup' && s.seeds[0] === 6)

  const r2a = bracket.round2.find((s) => s.slotIndex === 0)
  const r2b = bracket.round2.find((s) => s.slotIndex === 1)
  const fin = bracket.championship

  const labels = bracket.roundLabels

  return (
    <div className="space-y-4">
      {bracket.championTeamId && (
        <p className="text-center text-sm text-amber-400/90">
          Campeón:{' '}
          <span className="font-semibold text-white">
            {standingsById.get(bracket.championTeamId)?.displayName ?? bracket.championTeamId}
          </span>
        </p>
      )}
      {bracket.notes && <p className="text-center text-xs text-slate-500">{bracket.notes}</p>}

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr] lg:items-stretch">
        {/* Round 1 */}
        <div className="flex flex-col gap-3">
          <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            {labels?.[0] ?? 'Round 1'}
          </h3>
          <div className="flex flex-1 flex-col justify-between gap-3">
            {bye1?.type === 'bye' && (
              <div className="space-y-1">
                <BracketRow
                  seed={1}
                  teamId={bye1.teamId}
                  score={null}
                  standingsById={standingsById}
                  dimmed={dim(bye1.teamId)}
                  isBye
                />
              </div>
            )}
            {m54?.type === 'matchup' && (
              <div className="space-y-1 rounded-xl border border-white/10 bg-white/[0.03] p-2">
                <BracketRow
                  seed={m54.seeds[0]}
                  teamId={m54.teamIds[0]}
                  score={m54.scores?.[0] ?? null}
                  standingsById={standingsById}
                  dimmed={dim(m54.teamIds[0])}
                />
                <BracketRow
                  seed={m54.seeds[1]}
                  teamId={m54.teamIds[1]}
                  score={m54.scores?.[1] ?? null}
                  standingsById={standingsById}
                  dimmed={dim(m54.teamIds[1])}
                />
              </div>
            )}
            {m63?.type === 'matchup' && (
              <div className="space-y-1 rounded-xl border border-white/10 bg-white/[0.03] p-2">
                <BracketRow
                  seed={m63.seeds[0]}
                  teamId={m63.teamIds[0]}
                  score={m63.scores?.[0] ?? null}
                  standingsById={standingsById}
                  dimmed={dim(m63.teamIds[0])}
                />
                <BracketRow
                  seed={m63.seeds[1]}
                  teamId={m63.teamIds[1]}
                  score={m63.scores?.[1] ?? null}
                  standingsById={standingsById}
                  dimmed={dim(m63.teamIds[1])}
                />
              </div>
            )}
            {bye2?.type === 'bye' && (
              <div className="space-y-1">
                <BracketRow
                  seed={2}
                  teamId={bye2.teamId}
                  score={null}
                  standingsById={standingsById}
                  dimmed={dim(bye2.teamId)}
                  isBye
                />
              </div>
            )}
          </div>
        </div>

        {/* Round 2 */}
        <div className="flex flex-col gap-3 lg:justify-center">
          <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            {labels?.[1] ?? 'Semifinals'}
          </h3>
          <div className="flex flex-col gap-8">
            {r2a && (
              <div className="space-y-1 rounded-xl border border-amber-500/20 bg-amber-500/5 p-2">
                <BracketRow
                  seed={r2a.seedsInvolved[0]}
                  teamId={r2a.teamIds[0]}
                  score={r2a.scores?.[0] ?? null}
                  standingsById={standingsById}
                  dimmed={dim(r2a.teamIds[0])}
                />
                <BracketRow
                  seed={
                    r2a.teamIds[1]
                      ? standingsById.get(r2a.teamIds[1])?.rank ?? r2a.seedsInvolved[1]
                      : r2a.seedsInvolved[1]
                  }
                  teamId={r2a.teamIds[1]}
                  score={r2a.scores?.[1] ?? null}
                  standingsById={standingsById}
                  dimmed={dim(r2a.teamIds[1])}
                />
              </div>
            )}
            {r2b && (
              <div className="space-y-1 rounded-xl border border-amber-500/20 bg-amber-500/5 p-2">
                <BracketRow
                  seed={r2b.seedsInvolved[0]}
                  teamId={r2b.teamIds[0]}
                  score={r2b.scores?.[0] ?? null}
                  standingsById={standingsById}
                  dimmed={dim(r2b.teamIds[0])}
                />
                <BracketRow
                  seed={
                    r2b.teamIds[1]
                      ? standingsById.get(r2b.teamIds[1])?.rank ?? r2b.seedsInvolved[1]
                      : r2b.seedsInvolved[1]
                  }
                  teamId={r2b.teamIds[1]}
                  score={r2b.scores?.[1] ?? null}
                  standingsById={standingsById}
                  dimmed={dim(r2b.teamIds[1])}
                />
              </div>
            )}
          </div>
        </div>

        {/* Finals */}
        <div className="flex flex-col gap-3 lg:justify-center">
          <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            {labels?.[2] ?? 'Championship'}
          </h3>
          <div className="space-y-1 rounded-xl border border-white/15 bg-white/[0.05] p-3">
            <BracketRow
              teamId={fin.teamIds[0]}
              score={fin.scores?.[0] ?? null}
              standingsById={standingsById}
              dimmed={dim(fin.teamIds[0])}
            />
            <BracketRow
              teamId={fin.teamIds[1]}
              score={fin.scores?.[1] ?? null}
              standingsById={standingsById}
              dimmed={dim(fin.teamIds[1])}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
