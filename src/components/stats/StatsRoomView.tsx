'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useState, useRef, useEffect, useCallback, useTransition } from 'react'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import type { Season } from '@/data/seasons'
import type { TeamIndexEntry } from '@/data/rewind-types'
import type { StatsRoomData } from '@/data/stats-room-types'
import { useTeamLogo } from '@/components/team/TeamIdentityProvider'
import { Card, PageHeader, PageShell, Section, ui } from '@/components/ui'
import PlayoffsDraftHub from './PlayoffsDraftHub'
import type { ConsolationLadder } from '@/data/stats-room-types'
import SeasonStatsTable from './SeasonStatsTable'
import RegularSeasonMatchupCard, { getWeekLowestScoreTeamIds } from './RegularSeasonMatchupCard'

type Props = {
  data: StatsRoomData
  seasons: Season[]
  teams: TeamIndexEntry[]
}

export default function StatsRoomView({ data, seasons, teams }: Props) {
  const getTeamLogoPath = useTeamLogo()
  const router = useRouter()
  const [isChangingSeason, startSeasonChange] = useTransition()
  const [teamFilter, setTeamFilter] = useState<string>('')
  /** Periodos colapsados (oculta todos los matchups de ese periodo). Por defecto todos expandidos. */
  const [collapsedPeriods, setCollapsedPeriods] = useState<Set<number>>(new Set())
  /** Carpeta padre "Todos los matchups": cerrada por defecto. */
  const [allMatchupsOpen, setAllMatchupsOpen] = useState(false)

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
  const displayedStandings = data.standings.length > 0 ? data.standings : teams.map((team) => ({
    teamId: team.id, displayName: team.displayName, rank: 0, wins: 0, losses: 0, ties: 0,
  }))

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

  useEffect(() => {
    setTeamFilter('')
    setCollapsedPeriods(new Set())
    setAllMatchupsOpen(false)
  }, [data.seasonId])

  const changeSeason = (seasonId: string) => {
    startSeasonChange(() => {
      router.replace(`/stats?season=${encodeURIComponent(seasonId)}`, { scroll: false })
    })
  }

  return (
    <PageShell width="wide">
        <PageHeader
          title="Stats Room"
          description={data.generatedAt ? `Datos actualizados: ${data.generatedAt}` : undefined}
        />

        <Card
          ref={highlightRef}
          padding="sm"
          className="flex flex-wrap items-center gap-4"
        >
          <label className={ui.field}>
            Temporada
            <select
              className={ui.select}
              value={data.seasonId}
              onChange={(e) => changeSeason(e.target.value)}
              disabled={isChangingSeason}
            >
              {seasons.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className={ui.field}>
            Equipo
            <select
              className={clsx(ui.select, 'min-w-[200px]')}
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {teams.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.displayName}
                </option>
              ))}
            </select>
          </label>
          {isChangingSeason && (
            <p className="text-xs text-amber-400/90">Cargando temporada...</p>
          )}
        </Card>

        <Section title="Regular season — Standings" id="standings">
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
                {displayedStandings.map((r) => (
                  <tr
                    key={r.teamId}
                    className={clsx(
                      'border-b border-white/5',
                      teamFilter === r.teamId && 'bg-amber-500/10'
                    )}
                  >
                    <td className="px-4 py-2.5 font-mono text-amber-400/90">{r.rank > 0 ? r.rank : '—'}</td>
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
                      {data.standings.length > 0 ? `${r.wins}-${r.losses}${r.ties ? `-${r.ties}` : ''}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          title="Playoffs y orden de draft"
          id="playoffs"
          description={
            <>
              Bracket principal (top 6), winner&apos;s consolation, consolación seeds 7–10; a la derecha, el orden de
              draft de la siguiente temporada.
            </>
          }
        >
          <Card>
            <PlayoffsDraftHub
              playoffBracket={data.playoffBracket}
              winnersConsolation={
                data.consolationBrackets?.winnersConsolation ??
                ({
                  title: "Winner's consolation ladder",
                  rounds: [],
                  notes:
                    'Todavía no hay partidos de consolación.',
                } satisfies ConsolationLadder)
              }
              bottomFour={
                data.consolationBrackets?.bottomFour ??
                ({
                  title: 'Consolation ladder (seeds 7–10)',
                  rounds: [],
                  notes:
                    'Todavía no hay partidos de consolación.',
                } satisfies ConsolationLadder)
              }
              nextDraftOrder={data.nextDraftOrder}
              standingsById={standingsById}
              highlightTeamId={teamFilter}
              hasFullDraftData={Boolean(
                data.consolationBrackets && data.nextDraftOrder && data.nextDraftOrder.length === 10
              )}
            />
          </Card>
        </Section>

        <SeasonStatsTable
          seasonId={data.seasonId}
          standings={displayedStandings}
          seasonStatsLeague={data.seasonStatsLeague}
          nineByTeam={nineByTeam}
          teamFilter={teamFilter}
        />

        {/* Matchups RS */}
        <Section title="Matchups — Temporada regular" id="matchups">
          {weeksGrouped.length === 0 ? (
            <Card className="text-sm text-slate-500">Todavía no hay matchups de temporada regular.</Card>
          ) : (
            <Card padding="sm">
              <button
                type="button"
                id="stats-all-matchups"
                aria-expanded={allMatchupsOpen}
                aria-controls="stats-all-matchups-panel"
                onClick={() => setAllMatchupsOpen((open) => !open)}
                className={clsx(
                  'flex w-full items-center gap-2 rounded-lg px-1 py-2 text-left transition hover:bg-white/[0.04]',
                  allMatchupsOpen && 'mb-4'
                )}
              >
                <ChevronRight
                  className={clsx(
                    'h-5 w-5 shrink-0 text-amber-400 transition-transform',
                    allMatchupsOpen && 'rotate-90'
                  )}
                  aria-hidden
                />
                <span className="font-heading text-lg text-amber-300">Todos los matchups</span>
                <span className="ml-auto text-xs text-slate-500">
                  {weeksGrouped.length} {weeksGrouped.length === 1 ? 'periodo' : 'periodos'} ·{' '}
                  {matchupsFiltered.length} {matchupsFiltered.length === 1 ? 'duelo' : 'duelos'}
                  {allMatchupsOpen ? ' · Ocultar' : ' · Mostrar'}
                </span>
              </button>
              {allMatchupsOpen && (
            <div
              id="stats-all-matchups-panel"
              role="region"
              aria-labelledby="stats-all-matchups"
              className="space-y-4"
            >
              {weeksGrouped.map(([week, rows]) => {
                const lowestIds = getWeekLowestScoreTeamIds(rows)
                const periodOpen = !collapsedPeriods.has(week)
                const periodToggleId = `stats-period-${week}`
                return (
                  <Card key={week} padding="sm">
                    <button
                      type="button"
                      id={periodToggleId}
                      aria-expanded={periodOpen}
                      aria-controls={`${periodToggleId}-panel`}
                      onClick={() => togglePeriod(week)}
                      className={clsx(
                        'flex w-full items-center gap-2 rounded-lg px-1 py-2 text-left transition hover:bg-white/[0.04]',
                        periodOpen && 'mb-3'
                      )}
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
                  </Card>
                )
              })}
            </div>
              )}
            </Card>
          )}
        </Section>
    </PageShell>
  )
}
