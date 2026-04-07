'use client'

import Image from 'next/image'
import clsx from 'clsx'
import type { DraftLadderRowMeta } from '@/data/draftOrderFromLadders'
import type { NextDraftOrderRow, StatsStandingRow } from '@/data/stats-room-types'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'

const TABLE_COL_COUNT = 5

function defaultDraftRows(): NextDraftOrderRow[] {
  return [
    { pick: 1, teamId: null, label: 'Consolation ladder (seeds 7–10)' },
    { pick: 2, teamId: null, label: 'Consolation ladder (seeds 7–10)' },
    { pick: 3, teamId: null, label: 'Consolation ladder (seeds 7–10)' },
    { pick: 4, teamId: null, label: 'Consolation ladder (seeds 7–10)' },
    { pick: 5, teamId: null, label: "Winner's consolation ladder" },
    { pick: 6, teamId: null, label: "Winner's consolation ladder" },
    { pick: 7, teamId: null, label: "Winner's consolation ladder" },
    { pick: 8, teamId: null, label: "Winner's consolation ladder" },
    { pick: 9, teamId: null, label: 'Subcampeón (perdedor de la final)' },
    { pick: 10, teamId: null, label: 'Campeón' },
  ]
}

function badgeForPick(pick: number): { tag: string; className: string } {
  if (pick <= 4) return { tag: 'CL', className: 'bg-amber-500/25 text-amber-200 border-amber-500/35' }
  if (pick <= 8) return { tag: 'WCL', className: 'bg-sky-500/20 text-sky-100 border-sky-500/35' }
  return { tag: 'CHAMP', className: 'bg-emerald-500/20 text-emerald-100 border-emerald-500/35' }
}

type SectionHeaderProps = { title: string; picks: string; className: string }

function SectionHeaderRow({ title, picks, className }: SectionHeaderProps) {
  return (
    <tr className={clsx('border-b border-white/10', className)}>
      <td
        colSpan={TABLE_COL_COUNT}
        className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-white/90"
      >
        {title} · {picks}
      </td>
    </tr>
  )
}

function ladderMetaForPick(
  pick: number,
  teamId: string | null,
  clLadderMeta: Map<string, DraftLadderRowMeta>,
  wclLadderMeta: Map<string, DraftLadderRowMeta>
): DraftLadderRowMeta | null {
  if (!teamId || pick > 8) return null
  if (pick <= 4) return clLadderMeta.get(teamId) ?? null
  return wclLadderMeta.get(teamId) ?? null
}

type PickRowProps = {
  row: NextDraftOrderRow
  standingsById: Map<string, StatsStandingRow>
  highlightTeamId: string | null
  pickClassName: string
  rowHighlightClass: string | null
  meta: DraftLadderRowMeta | null
}

function DraftPickRow({
  row,
  standingsById,
  highlightTeamId,
  pickClassName,
  rowHighlightClass,
  meta,
}: PickRowProps) {
  const b = badgeForPick(row.pick)
  const recordStr = meta ? `${meta.wins}–${meta.losses}` : '—'
  const pctStr = meta ? `${meta.seed1Pct.toFixed(1)}%` : '—'

  return (
    <tr
      className={clsx(
        'border-b border-white/5',
        row.teamId && highlightTeamId === row.teamId && rowHighlightClass
      )}
    >
      <td className={clsx('whitespace-nowrap px-2 py-2 font-mono text-xs', pickClassName)}>{row.pick}</td>
      <td className="min-w-0 px-2 py-2">
        {row.teamId ? (
          <div className="flex items-center gap-2">
            {getTeamLogoPath(row.teamId) ? (
              <Image
                src={getTeamLogoPath(row.teamId)!}
                alt=""
                width={22}
                height={22}
                className="h-5 w-5 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="h-5 w-5 shrink-0 rounded-full bg-white/10" />
            )}
            <span className="truncate text-slate-100">
              {standingsById.get(row.teamId)?.displayName ?? row.teamId}
            </span>
          </div>
        ) : (
          <span className="text-slate-500">TBD</span>
        )}
      </td>
      <td className="whitespace-nowrap px-2 py-2 text-right font-mono text-xs text-slate-300">{recordStr}</td>
      <td className="whitespace-nowrap px-2 py-2 text-right font-mono text-xs text-slate-300">{pctStr}</td>
      <td className="w-10 px-1 py-2 text-center">
        <span className={clsx('inline-block rounded border px-1 py-0.5 text-[9px] font-bold', b.className)}>
          {b.tag}
        </span>
      </td>
    </tr>
  )
}

type Props = {
  rows: NextDraftOrderRow[] | null | undefined
  standingsById: Map<string, StatsStandingRow>
  highlightTeamId: string | null
  clLadderMeta: Map<string, DraftLadderRowMeta>
  wclLadderMeta: Map<string, DraftLadderRowMeta>
  showRegenerateHint?: boolean
}

export default function DraftOrderSidebar({
  rows,
  standingsById,
  highlightTeamId,
  clLadderMeta,
  wclLadderMeta,
  showRegenerateHint,
}: Props) {
  const data = rows && rows.length === 10 ? rows : defaultDraftRows()
  const emptyMeta = new Map<string, DraftLadderRowMeta>()
  const cl = rows && rows.length === 10 ? clLadderMeta : emptyMeta
  const wcl = rows && rows.length === 10 ? wclLadderMeta : emptyMeta

  return (
    <aside className="flex w-full flex-col rounded-2xl border border-white/15 bg-slate-900/60 p-4 shadow-lg">
      <h3 className="font-heading text-lg font-bold text-white">Draft order</h3>
      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-wide text-slate-500">
              <th className="px-2 py-2">Pick</th>
              <th className="px-2 py-2">Equipo</th>
              <th className="px-2 py-2 text-right">Récord</th>
              <th className="px-2 py-2 text-right">% seed #1</th>
              <th className="w-10 px-1 py-2 text-center" />
            </tr>
          </thead>
          <tbody>
            <SectionHeaderRow
              title="Consolation ladder"
              picks="Picks 1–4"
              className="bg-amber-500/15"
            />
            {data.slice(0, 4).map((row) => (
              <DraftPickRow
                key={row.pick}
                row={row}
                standingsById={standingsById}
                highlightTeamId={highlightTeamId}
                pickClassName="text-amber-400/90"
                rowHighlightClass="bg-amber-500/10"
                meta={ladderMetaForPick(row.pick, row.teamId, cl, wcl)}
              />
            ))}
            <SectionHeaderRow
              title="Winner's consolation"
              picks="Picks 5–8"
              className="bg-sky-500/15"
            />
            {data.slice(4, 8).map((row) => (
              <DraftPickRow
                key={row.pick}
                row={row}
                standingsById={standingsById}
                highlightTeamId={highlightTeamId}
                pickClassName="text-sky-300/90"
                rowHighlightClass="bg-sky-500/10"
                meta={ladderMetaForPick(row.pick, row.teamId, cl, wcl)}
              />
            ))}
            <SectionHeaderRow title="Finales" picks="Picks 9–10" className="bg-emerald-500/15" />
            {data.slice(8, 10).map((row) => (
              <DraftPickRow
                key={row.pick}
                row={row}
                standingsById={standingsById}
                highlightTeamId={highlightTeamId}
                pickClassName="text-emerald-300/90"
                rowHighlightClass="bg-emerald-500/10"
                meta={null}
              />
            ))}
          </tbody>
        </table>
      </div>
      {showRegenerateHint && (
        <p className="mt-3 text-[11px] text-slate-500">
          Regenera con{' '}
          <code className="text-slate-400">python analytics/generate_team_data.py</code> para rellenar equipos desde
          ESPN.
        </p>
      )}
    </aside>
  )
}
