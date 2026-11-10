'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { ChevronDown, ChevronRight, ChevronUp, Search } from 'lucide-react'
import { Card, PageHeader, PageShell, Section, ui } from '@/components/ui'
import type { Season } from '@/data/seasons'
import type { TeamIndexEntry } from '@/data/rewind-types'
import {
  PLAYERS_LAB_WINDOWS,
  type PlayersLabData,
  type PlayersLabLabelKind,
  type PlayersLabPlayer,
  type PlayersLabWindow,
  type PlayersLabWindowKey,
} from '@/data/players-lab/types'
import { compareWithNaNLast, type SortDirection } from '@/lib/table-sort'
import { InjuryBadge, LABEL_META, LABEL_ORDER, PlayerHeadshot, StatusBadge } from './players-lab-ui'

type Tab = 'available' | 'universe'
type StatusFilter = 'ALL' | 'FA' | 'WAIVERS' | 'TEAM'

type Column = {
  key: string
  label: string
  title: string
  value: (player: PlayersLabPlayer, window: PlayersLabWindow | undefined) => number | null | undefined
  format?: (value: number) => string
  /** TO: menos es mejor, así que el primer clic ordena ascendente. */
  ascending?: boolean
}

const one = (value: number) => value.toFixed(1)
const percent = (value: number) => `${(value * 100).toFixed(1)}%`
const stat = (key: keyof PlayersLabWindow) => (_: PlayersLabPlayer, w: PlayersLabWindow | undefined) =>
  w?.[key] as number | null | undefined

const COLUMNS: Column[] = [
  { key: 'fpts', label: 'FPTS/G', title: 'Puntos de fantasy por partido (scoring de la liga)', value: stat('fpts'), format: one },
  { key: 'gp', label: 'GP', title: 'Partidos jugados en la ventana', value: stat('gp'), format: String },
  { key: 'min', label: 'MIN', title: 'Minutos por partido', value: stat('min'), format: one },
  {
    key: 'usage',
    label: 'Uso*',
    title: 'Uso aproximado: (FGA + 0.44·FTA + TO) por 36 minutos',
    value: stat('usage'),
    format: one,
  },
  { key: 'pts', label: 'PTS', title: 'Puntos', value: stat('pts'), format: one },
  { key: 'reb', label: 'REB', title: 'Rebotes', value: stat('reb'), format: one },
  { key: 'ast', label: 'AST', title: 'Asistencias', value: stat('ast'), format: one },
  { key: 'stl', label: 'STL', title: 'Robos', value: stat('stl'), format: one },
  { key: 'blk', label: 'BLK', title: 'Tapones', value: stat('blk'), format: one },
  { key: 'stocks', label: 'Stocks', title: 'Robos + tapones', value: stat('stocks'), format: one },
  { key: 'tpm', label: '3PM', title: 'Triples anotados', value: stat('tpm'), format: one },
  { key: 'fgPct', label: 'FG%', title: 'Tiros de campo', value: stat('fgPct'), format: percent },
  { key: 'ftPct', label: 'FT%', title: 'Tiros libres', value: stat('ftPct'), format: percent },
  { key: 'tpPct', label: '3PT%', title: 'Triples', value: stat('tpPct'), format: percent },
  { key: 'to', label: 'TO', title: 'Pérdidas (menos es mejor)', value: stat('to'), format: one, ascending: true },
  { key: 'owned', label: '% Own', title: '% de ligas de ESPN donde tiene dueño', value: (p) => p.percentOwned, format: (v) => `${v.toFixed(1)}%` },
  {
    key: 'trend',
    label: 'Δ Own',
    title: 'Cambio del % de propiedad en ESPN',
    value: (p) => p.percentChange,
    format: (v) => `${v > 0 ? '+' : ''}${v.toFixed(2)}`,
  },
  { key: 'games7', label: 'Juegos 7d', title: 'Partidos de su equipo NBA en los próximos 7 días', value: (p) => p.gamesNext7, format: String },
]

const POSITIONS = ['ALL', 'PG', 'SG', 'SF', 'PF', 'C'] as const
const PAGE_SIZE = 50
const HIDDEN_INJURIES = new Set(['OUT', 'INJURY_RESERVE', 'SUSPENSION'])

function formatDate(value: string) {
  return new Date(value).toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function PlayersLabView({
  data,
  seasonId,
  seasons,
  teams,
}: {
  data: PlayersLabData | null
  seasonId: string
  seasons: Season[]
  teams: TeamIndexEntry[]
}) {
  const router = useRouter()
  const [isChangingSeason, startSeasonChange] = useTransition()
  const [tab, setTab] = useState<Tab>('available')
  const [windowKey, setWindowKey] = useState<PlayersLabWindowKey>('season')
  const [position, setPosition] = useState<(typeof POSITIONS)[number]>('ALL')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const [query, setQuery] = useState('')
  const [hideInjured, setHideInjured] = useState(false)
  const [sortKey, setSortKey] = useState('fpts')
  const [sortDir, setSortDir] = useState<SortDirection>('desc')
  const [limit, setLimit] = useState(PAGE_SIZE)

  const teamsById = useMemo(() => new Map(teams.map((team) => [team.id, team])), [teams])
  const players = useMemo(() => data?.players ?? [], [data])

  const tabPlayers = useMemo(
    () => (tab === 'available' ? players.filter((p) => p.status !== 'TEAM') : players),
    [players, tab]
  )

  const radar = useMemo(() => {
    const groups = Object.fromEntries(LABEL_ORDER.map((kind) => [kind, [] as Array<{ player: PlayersLabPlayer; reason: string; score: number }>]))
    for (const player of tabPlayers) {
      for (const label of player.labels) groups[label.kind].push({ player, reason: label.reason, score: label.score })
    }
    for (const kind of LABEL_ORDER) groups[kind].sort((a, b) => b.score - a.score)
    return groups as Record<PlayersLabLabelKind, Array<{ player: PlayersLabPlayer; reason: string; score: number }>>
  }, [tabPlayers])

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    const column = COLUMNS.find((c) => c.key === sortKey) ?? COLUMNS[0]
    return tabPlayers
      .filter((p) => position === 'ALL' || p.positions.includes(position))
      .filter((p) => tab === 'available' || statusFilter === 'ALL' || p.status === statusFilter)
      .filter((p) => !hideInjured || !HIDDEN_INJURIES.has(p.injuryStatus))
      .filter((p) => !needle || p.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(needle))
      .map((p) => ({ player: p, window: p.windows[windowKey] }))
      .sort((a, b) =>
        compareWithNaNLast(column.value(a.player, a.window), column.value(b.player, b.window), sortDir) ||
        a.player.name.localeCompare(b.player.name)
      )
  }, [tabPlayers, position, statusFilter, hideInjured, query, windowKey, sortKey, sortDir, tab])

  const visibleRows = rows.slice(0, limit)
  const counts = useMemo(
    () => ({
      fa: players.filter((p) => p.status === 'FA').length,
      waivers: players.filter((p) => p.status === 'WAIVERS').length,
      team: players.filter((p) => p.status === 'TEAM').length,
    }),
    [players]
  )

  const changeSeason = (next: string) => {
    startSeasonChange(() => {
      router.replace(`/players?season=${encodeURIComponent(next)}`, { scroll: false })
    })
  }

  const toggleSort = (column: Column) => {
    if (column.key === sortKey) setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(column.key)
      setSortDir(column.ascending ? 'asc' : 'desc')
    }
  }

  const resetPaging = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value)
    setLimit(PAGE_SIZE)
  }

  return (
    <PageShell width="wide">
      <PageHeader
        eyebrow="Laboratorio de jugadores"
        title="Players Lab"
        description={
          <>
            Métricas por jugador con el scoring de la liga (FPTS por partido), priorizando a los que puedes fichar hoy.
            {data && <> Actualizado el {formatDate(data.generatedAt)} con datos de ESPN.</>}
          </>
        }
        actions={
          <label className={ui.field}>
            Temporada
            <select
              className={ui.select}
              value={seasonId}
              disabled={isChangingSeason}
              onChange={(e) => changeSeason(e.target.value)}
            >
              {seasons.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        }
      />

      {!data || players.length === 0 ? (
        <p className={ui.notice}>
          Todavía no hay datos del Players Lab para esta temporada. Se generan en la sincronización diaria con ESPN (3:00 AM).
        </p>
      ) : (
        <>
          <div
            role="tablist"
            aria-label="Grupo de jugadores"
            className="flex w-full flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 sm:w-fit"
          >
            {(
              [
                { id: 'available', label: 'Disponibles', detail: `${counts.fa} FA · ${counts.waivers} waivers` },
                { id: 'universe', label: 'Universo', detail: `${players.length} jugadores` },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => {
                  setTab(item.id)
                  setLimit(PAGE_SIZE)
                }}
                className={clsx(
                  'flex flex-1 flex-col items-start rounded-xl px-4 py-2 text-left transition sm:flex-none',
                  ui.focusRing,
                  tab === item.id ? 'bg-amber-400/15 text-amber-200' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <span className="font-heading text-lg leading-tight">{item.label}</span>
                <span className="text-[11px] text-slate-500">{item.detail}</span>
              </button>
            ))}
          </div>

          <Section
            title="Radar"
            description={
              tab === 'available'
            }
          >
            <div className="space-y-4">
              {LABEL_ORDER.map((kind) => {
                const meta = LABEL_META[kind]
                const items = radar[kind]
                return (
                  <Card key={kind} padding="sm" className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                    <div className="lg:w-60 lg:shrink-0 lg:border-r lg:border-white/[0.06] lg:pr-6">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className={clsx('font-heading text-2xl', meta.accent)}>{meta.title}</h3>
                        <span className="text-xs tabular-nums text-slate-500">
                          {items.length} {items.length === 1 ? 'jugador' : 'jugadores'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{meta.description}</p>
                    </div>
                    {items.length === 0 ? (
                      <p className="self-center text-xs italic text-slate-600">Nadie cumple la regla ahora mismo.</p>
                    ) : (
                      <ul className="grid flex-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {items.slice(0, 5).map(({ player, reason }) => (
                          <li key={player.id} className="flex gap-2.5">
                            <PlayerHeadshot player={player} size={32} />
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="truncate text-sm font-medium text-slate-100">{player.name}</span>
                                <InjuryBadge status={player.injuryStatus} />
                              </div>
                              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                                <span>{player.proTeam}</span>
                                <StatusBadge
                                  player={player}
                                  team={player.fantasyTeamId ? teamsById.get(player.fantasyTeamId) : undefined}
                                  compact
                                />
                              </div>
                              <p className="mt-1 text-[11px] leading-4 text-slate-400">{reason}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                )
              })}
            </div>
          </Section>

          <Section
            title={tab === 'available' ? 'Jugadores disponibles' : 'Universo de jugadores'}
            description={
              tab === 'available'
            }
          >
            <div className="flex flex-wrap items-end gap-3">
              <label className={ui.field}>
                Periodo
                <select
                  className={ui.select}
                  value={windowKey}
                  onChange={(e) => resetPaging(setWindowKey)(e.target.value as PlayersLabWindowKey)}
                >
                  {PLAYERS_LAB_WINDOWS.map((w) => (
                    <option key={w.key} value={w.key}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className={ui.field}>
                Posición
                <select
                  className={ui.select}
                  value={position}
                  onChange={(e) => resetPaging(setPosition)(e.target.value as (typeof POSITIONS)[number])}
                >
                  {POSITIONS.map((p) => (
                    <option key={p} value={p}>
                      {p === 'ALL' ? 'Todas' : p}
                    </option>
                  ))}
                </select>
              </label>
              {tab === 'universe' && (
                <label className={ui.field}>
                  Estado
                  <select
                    className={ui.select}
                    value={statusFilter}
                    onChange={(e) => resetPaging(setStatusFilter)(e.target.value as StatusFilter)}
                  >
                    <option value="ALL">Todos</option>
                    <option value="FA">Free agents</option>
                    <option value="WAIVERS">Waivers</option>
                    <option value="TEAM">Con equipo en la liga</option>
                  </select>
                </label>
              )}
              <label className={clsx(ui.field, 'min-w-[12rem] flex-1 sm:max-w-xs')}>
                Buscar
                <span className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => resetPaging(setQuery)(e.target.value)}
                    placeholder="Nombre del jugador"
                    className={clsx(ui.select, 'w-full pl-9')}
                  />
                </span>
              </label>
              <label className="flex items-center gap-2 pb-2 text-xs text-slate-400">
                <input
                  type="checkbox"
                  checked={hideInjured}
                  onChange={(e) => resetPaging(setHideInjured)(e.target.checked)}
                  className="h-4 w-4 accent-amber-400"
                />
                Ocultar OUT / IL
              </label>
            </div>

            <Card padding="none" className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[72rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-[11px] uppercase tracking-wider text-slate-500">
                      <th scope="col" className="sticky left-0 z-10 bg-slate-950 px-3 py-3 font-semibold">
                        Jugador
                      </th>
                      <th scope="col" className="px-3 py-3 font-semibold">
                        Estado
                      </th>
                      {COLUMNS.map((column) => {
                        const active = column.key === sortKey
                        return (
                          <th
                            key={column.key}
                            scope="col"
                            aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                            className="px-2 py-3 text-right font-semibold"
                          >
                            <button
                              type="button"
                              title={column.title}
                              onClick={() => toggleSort(column)}
                              className={clsx(
                                'inline-flex items-center gap-0.5 rounded uppercase tracking-wider transition hover:text-white',
                                ui.focusRing,
                                active && 'text-amber-300'
                              )}
                            >
                              {column.label}
                              {active &&
                                (sortDir === 'asc' ? (
                                  <ChevronUp className="h-3 w-3" aria-hidden />
                                ) : (
                                  <ChevronDown className="h-3 w-3" aria-hidden />
                                ))}
                            </button>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.length === 0 ? (
                      <tr>
                        <td colSpan={COLUMNS.length + 2} className="px-3 py-10 text-center text-sm text-slate-500">
                          Ningún jugador coincide con los filtros.
                        </td>
                      </tr>
                    ) : (
                      visibleRows.map(({ player, window }) => (
                        <tr key={player.id} className="group border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03]">
                          <th
                            scope="row"
                            className="sticky left-0 z-10 bg-slate-950 px-3 py-2 text-left font-normal group-hover:bg-slate-900"
                          >
                            <div className="flex min-w-[14rem] items-center gap-2.5">
                              <PlayerHeadshot player={player} size={32} />
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="truncate font-medium text-slate-100">{player.name}</span>
                                  <InjuryBadge status={player.injuryStatus} />
                                </div>
                                <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
                                  <span>
                                    {player.proTeam} · {player.positions.join('/') || '—'}
                                  </span>
                                  {player.labels.map((label) => (
                                    <span
                                      key={label.kind}
                                      title={label.reason}
                                      className={clsx(
                                        'rounded-full border px-1.5 text-[10px] font-semibold',
                                        LABEL_META[label.kind].chip
                                      )}
                                    >
                                      {LABEL_META[label.kind].short}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </th>
                          <td className="px-3 py-2">
                            <StatusBadge
                              player={player}
                              team={player.fantasyTeamId ? teamsById.get(player.fantasyTeamId) : undefined}
                            />
                          </td>
                          {COLUMNS.map((column) => {
                            const value = column.value(player, window)
                            return (
                              <td
                                key={column.key}
                                className={clsx(
                                  'px-2 py-2 text-right tabular-nums',
                                  column.key === sortKey ? 'font-semibold text-white' : 'text-slate-300',
                                  column.key === 'trend' && value != null && value > 0 && 'text-emerald-300',
                                  column.key === 'trend' && value != null && value < 0 && 'text-rose-300'
                                )}
                              >
                                {value == null || Number.isNaN(value) ? (
                                  <span className="text-slate-600">—</span>
                                ) : column.format ? (
                                  column.format(value)
                                ) : (
                                  value
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                Mostrando {visibleRows.length} de {rows.length} jugadores · * Uso aproximado con datos de ESPN
              </span>
              {rows.length > visibleRows.length && (
                <button
                  type="button"
                  onClick={() => setLimit((n) => n + PAGE_SIZE)}
                  className={clsx(
                    'rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-slate-200 transition hover:border-amber-400/40 hover:text-white',
                    ui.focusRing
                  )}
                >
                  Mostrar {Math.min(PAGE_SIZE, rows.length - visibleRows.length)} más
                </button>
              )}
            </div>
          </Section>

          <Glossary replacementLevel={data.replacementLevel} />
        </>
      )}
    </PageShell>
  )
}

const GLOSSARY: Array<{ term: string; text: string }> = [
  {
    term: 'Usage Rate (tasa de uso)',
    text: 'Porcentaje de jugadas de un equipo que terminan en las manos de un jugador (tiros, tiros libres o pérdidas) mientras está en pista. A mayor uso, más oportunidades de sumar.'
  },
  {
    term: 'Counting stats',
    text: 'Puntos, rebotes, asistencias, robos y tapones.',
  },
  {
    term: 'Porcentajes (FG%, FT%, 3PT%)',
    text: 'Eficiencia de tiro.',
  },
  { term: 'Stocks', text: 'Robos + tapones' },
  {
    term: 'Regresión a la media',
    text: 'Con el paso de los partidos, la buena o mala suerte se acaba y el jugador vuelve a promediar lo que corresponde a su talento y rol. Es lo que equilibra un Fluke y un Slump.',
  },
  {
    term: 'Waivers',
    text: 'Cuando un mánager corta a un jugador, pasa un periodo (24–48 h) en el que cualquier equipo puede reclamarlo según su prioridad o presupuesto.',
  },
  { term: 'FA (Free Agent)', text: 'Jugador libre que se puede fichar de inmediato, sin esperar turno de reclamación.' },
  {
    term: 'FAAB',
    text: 'Presupuesto ficticio que da la liga a cada mánager para pujar a ciegas por jugadores en waivers.',
  },
  {
    term: 'IL / IR',
    text: 'Casillas para jugadores lesionados: permiten fichar a un sustituto sin tener que cortar al lesionado.',
  },
  { term: 'GTD (Game-Time Decision)', text: 'Su participación se decide minutos antes del partido por molestias físicas.' },
  { term: 'Out', text: 'Estado oficial: no jugará el partido de esa jornada.' },
]

function Glossary({ replacementLevel }: { replacementLevel: number | null }) {
  const [open, setOpen] = useState(false)
  return (
    <Card padding="sm">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="players-lab-glossary"
        onClick={() => setOpen((value) => !value)}
        className={clsx(
          'flex w-full items-center gap-2 rounded-lg px-1 py-2 text-left transition hover:bg-white/[0.04]',
          ui.focusRing,
          open && 'mb-3'
        )}
      >
        <ChevronRight className={clsx('h-5 w-5 shrink-0 text-amber-400 transition-transform', open && 'rotate-90')} aria-hidden />
        <span className="font-heading text-lg text-amber-300">Glosario y metodología</span>
      </button>
      {open && (
        <div id="players-lab-glossary" className="grid gap-6 px-1 pb-2 lg:grid-cols-2">
          <dl className="space-y-3">
            {GLOSSARY.map((item) => (
              <div key={item.term}>
                <dt className="text-sm font-semibold text-slate-200">{item.term}</dt>
                <dd className="mt-0.5 text-sm leading-6 text-slate-400">{item.text}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-3">
            <p className="text-sm leading-6 text-slate-400">
              Todas las etiquetas usan <strong className="text-slate-200">FPTS por partido</strong> con el scoring de la liga.
              La <strong className="text-slate-200">base</strong> de cada jugador es su proyección de ESPN (o su promedio de la
              temporada si no tiene). El <strong className="text-slate-200">nivel de reemplazo</strong> es el FPTS/G del jugador
              con roster número 120 de la liga
              {replacementLevel != null && <> (hoy: {replacementLevel.toFixed(1)} FPTS/G)</>}.
            </p>
            <ul className="space-y-2">
              {LABEL_ORDER.map((kind) => (
                <li key={kind} className="text-sm leading-6 text-slate-400">
                  <span className={clsx('font-semibold', LABEL_META[kind].accent)}>{LABEL_META[kind].title}:</span>{' '}
                  {LABEL_META[kind].description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  )
}
