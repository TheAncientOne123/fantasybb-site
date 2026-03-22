'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState, useCallback } from 'react'
import clsx from 'clsx'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import type { StatsStandingRow } from '@/data/stats-room-types'
import { SEASON_STATS_VOLUME_KEYS } from '@/data/stats-room-types'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'

/** Si no hay `seasonStatsLeague` (archivo antiguo), mismas categorías 9CAT como columnas (sin FGM/FGA…). */
const FALLBACK_STAT_KEYS = ['REB', 'AST', 'STL', 'BLK', '3PM', 'FG%', 'FT%', 'PTS'] as const

type NineLookup = Map<string, Map<string, { rank: number; valueDisplay: string }>>

type SortKey = 'rk' | 'team' | string

type Props = {
  seasonId: string
  standings: StatsStandingRow[]
  seasonStatsLeague?: { teamId: string; stats: Record<string, string> }[]
  nineByTeam: NineLookup
  teamFilter: string
}

function parseStatForSort(_key: string, raw: string): number {
  const s = raw.trim()
  if (!s || s === '—' || s === '-') return Number.NaN
  if (s.includes('%')) {
    const n = parseFloat(s.replace(/%/g, '').replace(',', '.'))
    return Number.isFinite(n) ? n : Number.NaN
  }
  const n = parseFloat(s.replace(/,/g, ''))
  return Number.isFinite(n) ? n : Number.NaN
}

function compareWithNaNLast(a: number, b: number, dir: 'asc' | 'desc'): number {
  const aNaN = Number.isNaN(a)
  const bNaN = Number.isNaN(b)
  if (aNaN && bNaN) return 0
  if (aNaN) return 1
  if (bNaN) return -1
  const cmp = a < b ? -1 : a > b ? 1 : 0
  return dir === 'asc' ? cmp : -cmp
}

function defaultSortDirForKey(key: SortKey): 'asc' | 'desc' {
  if (key === 'rk' || key === 'team') return 'asc'
  if (key === 'TO') return 'asc'
  return 'desc'
}

export default function SeasonStatsTable({
  seasonId,
  standings,
  seasonStatsLeague,
  nineByTeam,
  teamFilter,
}: Props) {
  const useVolume = Boolean(seasonStatsLeague && seasonStatsLeague.length > 0)
  const columns = useVolume ? [...SEASON_STATS_VOLUME_KEYS] : [...FALLBACK_STAT_KEYS]

  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = useState('')

  const statsByTeamId = useMemo(() => {
    const m = new Map<string, Record<string, string>>()
    if (useVolume && seasonStatsLeague) {
      for (const row of seasonStatsLeague) {
        m.set(row.teamId, row.stats)
      }
    }
    return m
  }, [useVolume, seasonStatsLeague])

  const cellValue = useCallback(
    (teamId: string, key: string): string => {
      if (useVolume) {
        return statsByTeamId.get(teamId)?.[key] ?? '—'
      }
      return nineByTeam.get(teamId)?.get(key)?.valueDisplay ?? '—'
    },
    [useVolume, statsByTeamId, nineByTeam]
  )

  const cellRankTitle = (teamId: string, key: string): string | undefined => {
    const r = nineByTeam.get(teamId)?.get(key)?.rank
    if (!r || r < 1) return undefined
    return `Rango en ${key}: #${r} en la liga`
  }

  const filteredStandings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return standings
    return standings.filter(
      (r) =>
        r.displayName.toLowerCase().includes(q) || r.teamId.toLowerCase().includes(q)
    )
  }, [standings, searchQuery])

  const displayedRows = useMemo(() => {
    if (!sortKey) return filteredStandings
    const rows = [...filteredStandings]
    rows.sort((ra, rb) => {
      let cmp = 0
      if (sortKey === 'rk') {
        cmp = sortDir === 'asc' ? ra.rank - rb.rank : rb.rank - ra.rank
      } else if (sortKey === 'team') {
        cmp =
          sortDir === 'asc'
            ? ra.displayName.localeCompare(rb.displayName, undefined, { sensitivity: 'base' })
            : rb.displayName.localeCompare(ra.displayName, undefined, { sensitivity: 'base' })
      } else {
        const va = parseStatForSort(sortKey, cellValue(ra.teamId, sortKey))
        const vb = parseStatForSort(sortKey, cellValue(rb.teamId, sortKey))
        cmp = compareWithNaNLast(va, vb, sortDir)
      }
      if (cmp !== 0) return cmp
      return ra.teamId.localeCompare(rb.teamId)
    })
    return rows
  }, [filteredStandings, sortKey, sortDir, cellValue])

  const onHeaderClick = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(defaultSortDirForKey(key))
    }
  }

  const ariaSort = (key: SortKey): 'ascending' | 'descending' | 'none' => {
    if (sortKey !== key) return 'none'
    return sortDir === 'asc' ? 'ascending' : 'descending'
  }

  const colActive = (key: SortKey) => sortKey === key

  const headerBtn =
    'inline-flex w-full items-center justify-center gap-0.5 rounded px-1 py-0.5 text-inherit transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60'

  const statHeaderCell = (key: string) => {
    const active = colActive(key)
    return (
      <th
        key={key}
        aria-sort={ariaSort(key)}
        className={clsx('px-1 py-2 text-center tabular-nums', active && 'bg-sky-500/20')}
      >
        <button type="button" className={headerBtn} onClick={() => onHeaderClick(key)}>
          <span>{key}</span>
          {active &&
            (sortDir === 'asc' ? (
              <ChevronUp className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
            ))}
        </button>
      </th>
    )
  }

  const rkTeamThBase =
    'border-b border-r border-white/10 bg-slate-950 px-2 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400'

  return (
    <section className="space-y-3" id="ninecat">
      <h2 className="font-heading text-xl font-semibold text-white">Season stats</h2>
      <p className="text-xs text-slate-500">
        Ordena con un clic en el encabezado de una columna (otro clic invierte asc/desc). Busca por nombre o id de
        equipo. El rango 9CAT sigue en el tooltip al pasar el cursor sobre cada celda.
      </p>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filtrar equipos…"
          className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-600 focus:border-sky-500/40 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          aria-label="Filtrar equipos en la tabla"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/50">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.06]">
              <th
                rowSpan={2}
                aria-sort={ariaSort('rk')}
                className={clsx(
                  'sticky left-0 z-20 w-12 border-b border-r border-white/10 px-1 py-3',
                  rkTeamThBase,
                  colActive('rk') && 'bg-sky-950/80 ring-1 ring-sky-500/30'
                )}
              >
                <button type="button" className={clsx(headerBtn, 'justify-start')} onClick={() => onHeaderClick('rk')}>
                  <span>RK</span>
                  {colActive('rk') &&
                    (sortDir === 'asc' ? (
                      <ChevronUp className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                    ))}
                </button>
              </th>
              <th
                rowSpan={2}
                aria-sort={ariaSort('team')}
                className={clsx(
                  'sticky left-12 z-20 min-w-[200px] border-b border-r border-white/10 px-1 py-3',
                  rkTeamThBase,
                  colActive('team') && 'bg-sky-950/80 ring-1 ring-sky-500/30'
                )}
              >
                <button type="button" className={clsx(headerBtn, 'justify-start')} onClick={() => onHeaderClick('team')}>
                  <span>Team</span>
                  {colActive('team') &&
                    (sortDir === 'asc' ? (
                      <ChevronUp className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                    ))}
                </button>
              </th>
              <th
                colSpan={columns.length}
                className="border-b border-white/10 px-2 py-2 text-center text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                {useVolume ? 'All categories' : '9CAT (sin intentos de tiro — regenera stats-room para FGM/FGA…)'}
              </th>
            </tr>
            <tr className="border-b border-white/10 bg-white/[0.04] text-xs font-semibold uppercase text-slate-400">
              {columns.map((key) => statHeaderCell(key))}
            </tr>
          </thead>
          <tbody>
            {displayedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={2 + columns.length}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  Ningún equipo coincide con la búsqueda.
                </td>
              </tr>
            ) : (
              displayedRows.map((row) => {
                const hi = teamFilter === row.teamId
                const logo = getTeamLogoPath(row.teamId)
                return (
                  <tr
                    key={row.teamId}
                    className={clsx(
                      'border-b border-white/[0.07] transition-colors hover:bg-white/[0.03]',
                      hi && 'bg-amber-500/[0.12]'
                    )}
                  >
                    <td
                      className={clsx(
                        'sticky left-0 z-10 w-12 border-r border-white/10 bg-slate-950 px-2 py-2.5 text-center font-mono tabular-nums text-slate-300',
                        hi && 'font-bold text-amber-200',
                        colActive('rk') && 'bg-sky-500/10'
                      )}
                    >
                      {row.rank}
                    </td>
                    <td
                      className={clsx(
                        'sticky left-12 z-10 min-w-[200px] border-r border-white/10 bg-slate-950 px-3 py-2.5',
                        hi && 'font-semibold',
                        colActive('team') && 'bg-sky-500/10'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        {logo ? (
                          <Image
                            src={logo}
                            alt=""
                            width={28}
                            height={28}
                            className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                          />
                        ) : (
                          <div className="h-7 w-7 shrink-0 rounded-full bg-white/10" />
                        )}
                        <div className="min-w-0 leading-tight">
                          <Link
                            href={`/rewind/${seasonId}/${row.teamId}`}
                            className="block truncate text-sky-400 transition hover:text-sky-300 hover:underline"
                          >
                            {row.displayName}
                          </Link>
                        </div>
                      </div>
                    </td>
                    {columns.map((key) => {
                      const title = cellRankTitle(row.teamId, key)
                      const active = colActive(key)
                      return (
                        <td
                          key={key}
                          title={title}
                          className={clsx(
                            'px-2 py-2.5 text-center tabular-nums text-slate-200',
                            hi && 'font-bold text-white',
                            active && 'bg-sky-500/10'
                          )}
                        >
                          {cellValue(row.teamId, key)}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
