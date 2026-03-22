'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import type { Season } from '@/data/seasons'
import type { StatsRoomData } from '@/data/stats-room-types'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'
import PlayoffBracket from './PlayoffBracket'
import SeasonStatsTable from './SeasonStatsTable'
import RegularSeasonMatchupCard, { getWeekLowestScoreTeamIds } from './RegularSeasonMatchupCard'

type Props = {
  data: StatsRoomData
  seasons: Season[]
}

export default function StatsRoomView({ data, seasons }: Props) {
  const [seasonId, setSeasonId] = useState(data.seasonId)
  const [teamFilter, setTeamFilter] = useState<string>('')
  /** Periodos colapsados (oculta todos los matchups de ese periodo). Por defecto todos expandidos. */
  const [collapsedPeriods, setCollapsedPeriods] = useState<Set<number>>(new Set())

  const togglePeriod = useCallback((week: number) => {
    setCollapsedPeriods((prev) => {
      const next = new Set(prev)
      if (next.has(week)) next.delete(week)
      else next.add(week)
      return next
    })
  }, [])

  const standingsById = useMemo(
    () => new Map(data.standings.map((r) => [r.teamId, r])),
    [data.standings]
  )

  const nineByTeam = useMemo(() => {
    const m = new Map<string, Map<string, { rank: number; valueDisplay: string }>>()
    for (const block of data.nineCatLeague) {
      const inner = new Map<string, { rank: number; valueDisplay: string }>()
      for (const row of block.rows) {
        inner.set(row.category, { rank: row.rank, valueDisplay: row.valueDisplay })
      }
      m.set(block.teamId, inner)
    }
    return m
  }, [data.nineCatLeague])

  const matchupsFiltered = useMemo(() => {
    if (!teamFilter) return data.regularSeasonMatchups
    return data.regularSeasonMatchups.filter(
      (m) => m.teamAId === teamFilter || m.teamBId === teamFilter
    )
  }, [data.regularSeasonMatchups, teamFilter])

  const weeksGrouped = useMemo(() => {
    const map = new Map<number, typeof matchupsFiltered>()
    for (const row of matchupsFiltered) {
      const list = map.get(row.week) ?? []
      list.push(row)
      map.set(row.week, list)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0])
  }, [matchupsFiltered])

  const highlightRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (teamFilter && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [teamFilter])

  const seasonMismatch = seasonId !== data.seasonId

  return (
    <div className="min-h-screen bg-slate-950 pb-16 pt-8 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">Stats Room</h1>
            <p className="mt-1 max-w-xl text-sm text-slate-400">
              Tabla regular, 9CAT, matchups de temporada regular y bracket playoff (6 equipos, top 2 bye).
            </p>
            {data.generatedAt && (
              <p className="mt-2 text-xs text-slate-600">Datos generados: {data.generatedAt}</p>
            )}
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            Volver al inicio
          </Link>
        </header>

        <div
          ref={highlightRef}
          className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
        >
          <label className="flex flex-col gap-1 text-xs text-slate-500">
            Temporada
            <select
              className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white"
              value={seasonId}
              onChange={(e) => setSeasonId(e.target.value)}
            >
              {seasons.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-500">
            Equipo
            <select
              className="min-w-[200px] rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white"
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {data.standings.map((r) => (
                <option key={r.teamId} value={r.teamId}>
                  {r.displayName}
                </option>
              ))}
            </select>
          </label>
          {seasonMismatch && (
            <p className="text-xs text-amber-400/90">
              Solo hay datos cargados para {data.seasonId}; el filtro de temporada es visual hasta que existan más
              archivos stats-room.
            </p>
          )}
        </div>

        {/* Standings */}
        <section className="space-y-3" id="standings">
          <h2 className="font-heading text-xl font-semibold text-white">Regular season — Standings</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Equipo</th>
                  <th className="px-4 py-3">W-L-T</th>
                </tr>
              </thead>
              <tbody>
                {data.standings.map((r) => (
                  <tr
                    key={r.teamId}
                    className={clsx(
                      'border-b border-white/5',
                      teamFilter === r.teamId && 'bg-amber-500/10'
                    )}
                  >
                    <td className="px-4 py-2.5 font-mono text-amber-400/90">{r.rank}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        {getTeamLogoPath(r.teamId) ? (
                          <Image
                            src={getTeamLogoPath(r.teamId)!}
                            alt=""
                            width={24}
                            height={24}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-white/10" />
                        )}
                        <span className={clsx(teamFilter === r.teamId && 'font-semibold text-amber-200')}>
                          {r.displayName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-slate-300">
                      {r.wins}-{r.losses}
                      {r.ties ? `-${r.ties}` : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Playoffs */}
        <section className="space-y-3" id="playoffs">
          <h2 className="font-heading text-xl font-semibold text-white">Playoff bracket</h2>
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 sm:p-6">
            <PlayoffBracket
              bracket={data.playoffBracket}
              standingsById={standingsById}
              highlightTeamId={teamFilter}
            />
          </div>
        </section>

        <SeasonStatsTable
          seasonId={data.seasonId}
          standings={data.standings}
          seasonStatsLeague={data.seasonStatsLeague}
          nineByTeam={nineByTeam}
          teamFilter={teamFilter}
        />

        {/* Matchups RS */}
        <section className="space-y-3" id="matchups">
          <h2 className="font-heading text-xl font-semibold text-white">Matchups — Temporada regular</h2>
          {weeksGrouped.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-sm text-slate-500">
              No hay matchups en el dataset. Vuelve a generar con{' '}
              <code className="text-slate-400">python analytics/generate_team_data.py</code>.
            </p>
          ) : (
            <div className="space-y-6">
              {weeksGrouped.map(([week, rows]) => {
                const lowestIds = getWeekLowestScoreTeamIds(rows)
                const periodOpen = !collapsedPeriods.has(week)
                const periodToggleId = `stats-period-${week}`
                return (
                  <div key={week} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <button
                      type="button"
                      id={periodToggleId}
                      aria-expanded={periodOpen}
                      aria-controls={`${periodToggleId}-panel`}
                      onClick={() => togglePeriod(week)}
                      className="mb-3 flex w-full items-center gap-2 rounded-lg px-1 py-2 text-left transition hover:bg-white/[0.04]"
                    >
                      <ChevronRight
                        className={clsx(
                          'h-4 w-4 shrink-0 text-amber-400/80 transition-transform',
                          periodOpen && 'rotate-90'
                        )}
                        aria-hidden
                      />
                      <span className="font-heading text-sm font-semibold text-amber-400/90">
                        Periodo {week} · Temporada regular
                      </span>
                      <span className="ml-auto text-xs text-slate-500">
                        {rows.length} {rows.length === 1 ? 'duelo' : 'duelos'}
                        {periodOpen ? ' · Ocultar' : ' · Mostrar'}
                      </span>
                    </button>
                    {periodOpen && (
                      <ul
                        id={`${periodToggleId}-panel`}
                        role="region"
                        aria-labelledby={periodToggleId}
                        className="space-y-4"
                      >
                        {rows.map((m, i) => (
                          <RegularSeasonMatchupCard
                            key={`${week}-${i}-${m.teamAId}-${m.teamBId}`}
                            matchup={m}
                            standingsById={standingsById}
                            teamFilter={teamFilter}
                            lowestScoreTeamIds={lowestIds}
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
