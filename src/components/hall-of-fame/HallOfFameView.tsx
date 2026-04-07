'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Trophy } from 'lucide-react'
import type {
  HallOfFameData,
  HofLarryRow,
  HofLeagueRecord,
  HofMotySeasonRow,
  HofSeasonShowcase,
} from '@/data/hall-of-fame-types'
import { SEASONS } from '@/data/seasons'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'

function recordTitle(kind: HofLeagueRecord['kind']): string {
  if (kind === 'ceiling_check') return 'Ceiling Check'
  if (kind === 'lose_streak') return 'Free Fall'
  return 'Racha de victorias'
}

function recordDescription(kind: HofLeagueRecord['kind']): string {
  if (kind === 'ceiling_check') return 'Mejor semana individual de la liga (totales de equipo).'
  if (kind === 'lose_streak') return 'Racha de derrotas más larga en temporada regular.'
  return 'Racha de victorias más larga en temporada regular.'
}

/** Suma de los tres pilares MOTY mostrados en tabla (Stats + Standings + MVA). */
function motyPillarSum(r: HofMotySeasonRow): number {
  return r.statsContribution + r.standings + r.mva
}

function motyPillarSumDisplay(r: HofMotySeasonRow): string {
  return (Math.round(motyPillarSum(r) * 10) / 10).toFixed(1)
}

function groupRecordsBySeason(records: HofLeagueRecord[]): {
  order: string[]
  labels: Map<string, string>
  bySeason: Map<string, HofLeagueRecord[]>
} {
  const order: string[] = []
  const labels = new Map<string, string>()
  const bySeason = new Map<string, HofLeagueRecord[]>()
  for (const r of records) {
    if (!bySeason.has(r.seasonId)) {
      order.push(r.seasonId)
      labels.set(r.seasonId, r.seasonLabel)
      bySeason.set(r.seasonId, [])
    }
    bySeason.get(r.seasonId)!.push(r)
  }
  return { order, labels, bySeason }
}

type ShowcaseCard = {
  key: string
  teamId: string
  displayName: string
  season: HofSeasonShowcase
}

function buildShowcaseBySeason(data: HallOfFameData): { seasonId: string; seasonLabel: string; cards: ShowcaseCard[] }[] {
  const seasonIds = [
    ...new Set(data.teams.flatMap((t) => t.seasons.map((s) => s.seasonId))),
  ].sort((a, b) => b.localeCompare(a))
  const labelBySeason = new Map<string, string>()
  for (const team of data.teams) {
    for (const s of team.seasons) {
      if (!labelBySeason.has(s.seasonId)) labelBySeason.set(s.seasonId, s.seasonLabel)
    }
  }
  const sections: { seasonId: string; seasonLabel: string; cards: ShowcaseCard[] }[] = []
  for (const seasonId of seasonIds) {
    const cards: ShowcaseCard[] = []
    for (const team of data.teams) {
      const season = team.seasons.find((s) => s.seasonId === seasonId)
      if (season) {
        cards.push({
          key: `${team.teamId}-${seasonId}`,
          teamId: team.teamId,
          displayName: team.displayName,
          season,
        })
      }
    }
    cards.sort((a, b) => a.displayName.localeCompare(b.displayName, 'es', { sensitivity: 'base' }))
    sections.push({
      seasonId,
      seasonLabel: labelBySeason.get(seasonId) ?? seasonId,
      cards,
    })
  }
  return sections
}

type LarryBucketTeam = {
  teamId: string
  displayName: string
  trophies: { seasonId: string; seasonLabel: string }[]
}

type LarryBucket = { count: number; teams: LarryBucketTeam[] }

function buildLarryShowcaseBuckets(rows: HofLarryRow[]): {
  buckets: LarryBucket[]
  zeroWinTeams: { teamId: string; displayName: string }[]
} {
  const labelById = new Map(SEASONS.map((s) => [s.id, s.label]))
  const withWins = rows.filter((r) => r.seasonsWon.length > 0)
  const byCount = new Map<number, HofLarryRow[]>()
  for (const r of withWins) {
    const c = r.seasonsWon.length
    if (!byCount.has(c)) byCount.set(c, [])
    byCount.get(c)!.push(r)
  }
  const countsDesc = [...byCount.keys()].sort((a, b) => b - a)
  const buckets: LarryBucket[] = countsDesc.map((count) => ({
    count,
    teams: (byCount.get(count) ?? [])
      .sort((a, b) => a.displayName.localeCompare(b.displayName, 'es', { sensitivity: 'base' }))
      .map((r) => ({
        teamId: r.teamId,
        displayName: r.displayName,
        trophies: [...r.seasonsWon]
          .sort((a, b) => b.localeCompare(a))
          .map((sid) => ({
            seasonId: sid,
            seasonLabel: labelById.get(sid) ?? `Temporada ${sid}`,
          })),
      })),
  }))
  const zeroWinTeams = rows
    .filter((r) => r.seasonsWon.length === 0)
    .sort((a, b) => a.displayName.localeCompare(b.displayName, 'es', { sensitivity: 'base' }))
    .map((r) => ({ teamId: r.teamId, displayName: r.displayName }))
  return { buckets, zeroWinTeams }
}

function TeamLogo({
  teamId,
  name,
  size = 'md',
}: {
  teamId: string
  name: string
  size?: 'md' | 'lg' | 'larry'
}) {
  const src = getTeamLogoPath(teamId)
  const box =
    size === 'larry'
      ? 'h-[5.25rem] w-[5.25rem] sm:h-28 sm:w-28'
      : size === 'lg'
        ? 'h-[4.5rem] w-[4.5rem] sm:h-[5.5rem] sm:w-[5.5rem]'
        : 'h-12 w-12'
  const imgSizes =
    size === 'larry'
      ? '(max-width: 640px) 84px, 112px'
      : size === 'lg'
        ? '(max-width: 640px) 72px, 88px'
        : '48px'
  if (!src) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-slate-500 ${box}`}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
    )
  }
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-white/10 bg-slate-900 shadow-inner shadow-black/30 ${box}`}
    >
      <Image src={src} alt={name} fill className="object-contain p-2 sm:p-2.5" sizes={imgSizes} />
    </div>
  )
}

function AchievementTile({
  name,
  label,
  image,
}: {
  name: string
  label?: string
  image?: string
}) {
  return (
    <div className="flex h-full min-h-[22rem] flex-col rounded-2xl border border-white/[0.08] bg-slate-950/60 p-6 text-center sm:min-h-[24rem]">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative flex h-44 w-44 shrink-0 items-center justify-center sm:h-52 sm:w-52">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={208}
              height={208}
              className="max-h-full max-w-full object-contain drop-shadow-md"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10">
              <Trophy className="h-20 w-20 text-amber-300/90 sm:h-24 sm:w-24" aria-hidden />
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 shrink-0 space-y-2">
        <p className="font-heading text-lg font-bold leading-snug text-white sm:text-xl">{name}</p>
        {label ? (
          <p className="min-h-[2.75rem] text-sm leading-snug text-slate-400 sm:text-base">{label}</p>
        ) : (
          <span className="block min-h-[2.75rem]" aria-hidden />
        )}
      </div>
    </div>
  )
}

function TeamSeasonShowcaseCard({
  teamId,
  displayName,
  season,
}: {
  teamId: string
  displayName: string
  season: HofSeasonShowcase
}) {
  const positive = season.achievementsPositive ?? season.achievements
  const negative = season.achievementsNegative ?? []
  const hasAchievements = positive.length > 0 || negative.length > 0

  return (
    <article className="relative rounded-2xl border border-white/[0.1] bg-slate-900/45 p-5 shadow-lg shadow-black/25 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
        <TeamLogo teamId={teamId} name={displayName} size="lg" />

        <div className="min-w-0 flex-1">
          <div className="min-w-0">
            <h3 className="font-heading text-lg font-bold uppercase leading-tight tracking-wide text-white sm:text-xl">
              {displayName}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400/95">
              <Link href={`/team/${teamId}`} className="hover:text-sky-300">
                Perfil
              </Link>
              <span className="text-slate-600" aria-hidden>
                ·
              </span>
              <Link href={`/rewind/${season.seasonId}/${teamId}`} className="hover:text-sky-300">
                Rewind
              </Link>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Arquetipo</span>
            {season.archetypeName ? (
              <span className="rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-sm font-medium text-slate-100">
                {season.archetypeName}
              </span>
            ) : (
              <span className="text-sm text-slate-600">—</span>
            )}
          </div>

          {hasAchievements ? (
            <div className="mt-6 border-t border-white/[0.06] pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Logros · esta temporada</p>
              {positive.length > 0 ? (
                <div className="mt-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
                    Logros
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {positive.map((a, i) => (
                      <li key={`pos-${a.name}-${a.label ?? ''}-${i}`} className="flex min-h-0">
                        <AchievementTile name={a.name} label={a.label} image={a.image} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {negative.length > 0 ? (
                <div className="mt-5">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-400/85">
                    Fracasos
                  </p>
                  <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {negative.map((a, i) => (
                      <li key={`neg-${a.name}-${a.label ?? ''}-${i}`} className="flex min-h-0">
                        <AchievementTile name={a.name} label={a.label} image={a.image} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function HallOfFameView({ data }: { data: HallOfFameData }) {
  const { order, labels, bySeason } = groupRecordsBySeason(data.leagueRecords)
  const showcaseSections = useMemo(() => buildShowcaseBySeason(data), [data])
  const seasonOptions = useMemo(
    () => showcaseSections.filter((s) => s.cards.length > 0),
    [showcaseSections]
  )
  const [vitrinaSeasonId, setVitrinaSeasonId] = useState<string | null>(null)
  const activeVitrinaSeasonId = vitrinaSeasonId ?? seasonOptions[0]?.seasonId ?? null
  const vitrinaSection =
    seasonOptions.find((s) => s.seasonId === activeVitrinaSeasonId) ?? null

  const moty = data.motyCurrentSeason
  const { buckets: larryBuckets, zeroWinTeams: larryZeroWin } = buildLarryShowcaseBuckets(data.larryTable)

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-10 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-16 px-4 sm:px-6">
        <header className="space-y-5 border-b border-white/[0.06] pb-8">
          <Link
            href="/"
            className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-amber-500/20 bg-slate-900/60 py-2 pl-3 pr-4 text-sm font-medium text-slate-200 shadow-lg shadow-black/20 ring-1 ring-inset ring-white/[0.04] backdrop-blur-sm transition hover:border-amber-400/40 hover:bg-slate-800/90 hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-400/95 transition group-hover:bg-amber-500/20 group-hover:text-amber-300">
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-px" aria-hidden />
            </span>
            <span>Volver al inicio</span>
          </Link>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-tight">
            Hall of Fame
          </h1>
        </header>

        <section className="space-y-8">
          <h2 className="text-center font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            This is Larry
          </h2>

          <motion.div
            className="relative mx-auto flex justify-center py-2"
            initial={{ opacity: 0, scale: 0.88, y: 28 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35, margin: '0px 0px -10% 0px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.85 }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(100%,320px)] max-w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.28] blur-[56px] sm:w-[340px] sm:blur-[72px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[58%] h-[30%] w-[min(90%,260px)] -translate-x-1/2 rounded-full bg-amber-300/[0.12] blur-[28px] sm:blur-[36px]"
              aria-hidden
            />
            <motion.div
              className="relative z-[1] h-[220px] w-[220px] sm:h-[300px] sm:w-[300px]"
              initial={{ filter: 'blur(8px)' }}
              whileInView={{ filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/badges/larry.png"
                alt="Larry O'Brien — trofeo de campeón"
                fill
                className="object-contain drop-shadow-[0_0_28px_rgba(251,191,36,0.55),0_0_56px_rgba(245,158,11,0.35),0_0_100px_rgba(251,191,36,0.15),0_16px_48px_rgba(0,0,0,0.45)]"
                sizes="(max-width: 640px) 220px, 300px"
                priority={false}
              />
            </motion.div>
          </motion.div>

          <div className="space-y-1 text-center">
            <p className="font-heading text-base font-semibold uppercase tracking-[0.2em] text-amber-400/90 sm:text-lg">
              Winners of Larry
            </p>
            <p className="text-sm text-slate-500">
              Pasa el cursor sobre cada trofeo para ver la temporada. Resumen de todas las temporadas.
            </p>
          </div>

          {larryBuckets.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-slate-900/30 px-4 py-6 text-center text-sm text-slate-500">
              Aún no hay campeones Larry en el historial agregado.
            </p>
          ) : (
            <div className="space-y-6">
              {larryBuckets.map((bucket) => (
                <div
                  key={`larry-bucket-${bucket.count}`}
                  className="rounded-2xl border border-white/[0.08] bg-slate-900/35 px-4 py-6 sm:px-6 sm:py-8"
                >
                  <div className="flex flex-wrap items-end justify-center gap-x-8 gap-y-10 sm:justify-start sm:gap-x-12 sm:gap-y-12">
                    {bucket.teams.map((t) => (
                      <div
                        key={`larry-bucket-${bucket.count}-${t.teamId}`}
                        className="inline-flex items-start gap-2 sm:gap-3"
                      >
                        <div className="flex w-[5.25rem] shrink-0 flex-col items-center gap-2 sm:w-28">
                          <TeamLogo teamId={t.teamId} name={t.displayName} size="larry" />
                          <Link
                            href={`/team/${t.teamId}`}
                            className="block w-full min-w-0 break-words px-0.5 text-center text-xs font-medium leading-snug text-sky-400/90 [text-wrap:balance] hover:text-sky-300"
                          >
                            {t.displayName}
                          </Link>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-2.5">
                          {t.trophies.map((tr) => (
                            <span
                              key={`${t.teamId}-${tr.seasonId}`}
                              title={tr.seasonLabel}
                              tabIndex={0}
                              className="hof-larry-trophy-wrap relative inline-block h-[5.25rem] w-[5.25rem] shrink-0 cursor-default sm:h-28 sm:w-28"
                            >
                              <Image
                                src="/badges/larry.png"
                                alt={`Larry — ${tr.seasonLabel}`}
                                fill
                                className="hof-larry-trophy-img object-contain drop-shadow-[0_0_16px_rgba(251,191,36,0.45),0_0_28px_rgba(245,158,11,0.2),0_12px_24px_rgba(0,0,0,0.35)]"
                                sizes="(max-width: 640px) 84px, 112px"
                              />
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {larryZeroWin.length > 0 ? (
            <div className="rounded-2xl border border-white/[0.06] bg-slate-950/35 p-4 sm:p-5">
              <p className="font-heading text-sm font-bold uppercase tracking-wide text-slate-400">
                Sin Larry (aún)
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Equipos de la liga sin campeonato en las temporadas cubiertas.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-5 sm:justify-start sm:gap-6">
                {larryZeroWin.map((t) => (
                  <div key={`larry-zero-${t.teamId}`} className="flex flex-col items-center gap-2">
                    <TeamLogo teamId={t.teamId} name={t.displayName} size="larry" />
                    <span className="max-w-[7rem] truncate text-center text-xs font-medium text-slate-500">
                      {t.displayName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section className="space-y-10">
          <div>
            <h2 className="font-heading text-lg font-bold uppercase tracking-[0.12em] text-white sm:text-xl">
              Vitrina histórica
            </h2>
            <div className="mt-3 flex max-w-md flex-col gap-1.5">
              <label htmlFor="hof-vitrina-season" className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Temporada
              </label>
              <select
                id="hof-vitrina-season"
                value={activeVitrinaSeasonId ?? ''}
                onChange={(e) => setVitrinaSeasonId(e.target.value || null)}
                disabled={seasonOptions.length === 0}
                className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition hover:border-white/25 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {seasonOptions.length === 0 ? (
                  <option value="">Sin temporadas</option>
                ) : (
                  seasonOptions.map((opt) => (
                    <option key={opt.seasonId} value={opt.seasonId}>
                      {opt.seasonLabel}
                    </option>
                  ))
                )}
              </select>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Logros con badge por equipo. La temporada seleccionada arriba filtra esta vitrina.
            </p>
          </div>
          {vitrinaSection && vitrinaSection.cards.length > 0 ? (
            <div className="flex flex-col gap-4">
              {vitrinaSection.cards.map((row) => (
                <TeamSeasonShowcaseCard
                  key={row.key}
                  teamId={row.teamId}
                  displayName={row.displayName}
                  season={row.season}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-white/10 bg-slate-900/30 px-4 py-6 text-sm text-slate-500">
              No hay datos de vitrina para ninguna temporada todavía.
            </p>
          )}
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">Récords de la liga</h2>
            <p className="mt-1 text-sm text-slate-500">
              Racha de victorias, Free Fall (racha de derrotas) y Ceiling Check: líderes según el rewind de cada temporada.
            </p>
          </div>
          {data.leagueRecords.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-slate-900/30 px-4 py-6 text-sm text-slate-500">
              Aún no hay récords agregados. Genera o completa los datos de rewind para la temporada.
            </p>
          ) : (
            <div className="space-y-10">
              {order.map((seasonId) => {
                const recs = bySeason.get(seasonId) ?? []
                const label = labels.get(seasonId) ?? seasonId
                return (
                  <div key={seasonId}>
                    <h3 className="mb-4 text-sm font-semibold text-slate-400">{label}</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {recs.map((r) => (
                        <div
                          key={`${r.kind}-${r.seasonId}`}
                          className="flex gap-4 rounded-2xl border border-white/[0.08] bg-slate-900/40 p-5"
                        >
                          <TeamLogo teamId={r.leaderTeamId} name={r.leaderDisplayName} />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-amber-400/85">
                              {recordTitle(r.kind)}
                            </p>
                            <p className="mt-0.5 text-sm text-slate-500">{recordDescription(r.kind)}</p>
                            <p className="mt-2 truncate font-medium text-white">{r.leaderDisplayName}</p>
                            <p className="text-lg font-semibold tabular-nums text-slate-200">{r.value}</p>
                            <Link
                              href={`/team/${r.leaderTeamId}`}
                              className="mt-2 inline-block text-xs text-sky-400/90 hover:text-sky-300"
                            >
                              Ver perfil
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">Sección MOTY</h2>
            <p className="mt-1 text-sm text-slate-500">
              Ranking de cercanía al MOTY en la temporada en curso. Cada fila muestra el desglose que alimenta el premio;
              abajo tienes la guía ampliada columna por columna.
            </p>
          </div>
          {!moty || moty.rows.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-slate-900/30 px-4 py-6 text-sm text-slate-500">
              Aún no hay datos MOTY para mostrar.
            </p>
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300">{moty.seasonLabel}</h3>
              <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-slate-900/70 text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-3 py-2">#</th>
                      <th className="px-3 py-2">Equipo</th>
                      <th className="px-3 py-2 text-right">Score</th>
                      <th
                        className="px-3 py-2 text-right"
                        title="Ponderado 0–40 en la liga; en cada celda, tooltip con 9CAT crudo 0–27 (3/2/1 por categoría)."
                      >
                        Stats
                      </th>
                      <th className="px-3 py-2 text-right">Standings</th>
                      <th className="px-3 py-2 text-right">MVA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moty.rows.map((r, i) => (
                      <tr key={`${r.teamId}-${moty.seasonId}`} className="border-t border-white/[0.06]">
                        <td className="px-3 py-2 text-slate-300">{i + 1}</td>
                        <td className="px-3 py-2 text-white">{r.displayName}</td>
                        <td className="px-3 py-2 text-right font-semibold text-amber-300">{motyPillarSumDisplay(r)}</td>
                        <td
                          className="px-3 py-2 text-right text-slate-300 underline decoration-dotted decoration-slate-600 underline-offset-2 cursor-help"
                          title={`9CAT crudo (podio 3/2/1 por categoría): ${r.statsPointsRaw.toFixed(1)} / 27 máx.`}
                        >
                          {r.statsContribution.toFixed(1)}
                        </td>
                        <td className="px-3 py-2 text-right text-slate-300">{r.standings.toFixed(1)}</td>
                        <td className="px-3 py-2 text-right text-slate-300">{r.mva.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-b from-amber-950/25 to-slate-950/40 px-5 py-6 text-sm leading-relaxed text-slate-400 shadow-[inset_0_1px_0_0_rgba(251,191,36,0.06)]">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="font-heading text-base font-semibold tracking-tight text-amber-200/95">
                Guía del MOTY: qué significa cada columna
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                El Manager Of The Year (MOTY) mide la gestión a lo largo de la temporada en tres pilares comparables entre
                equipos. Los números de la tabla salen del mismo snapshot que genera el rewind. En el rewind, el ganador MOTY
                lo fija el motor de analytics con precisión completa; aquí el <span className="text-slate-300">Score</span> es
                la suma de los tres pilares ya redondeados (puede diferir en décimas del total guardado). El campeón de
                playoffs (Larry) no suma aquí: es un premio distinto.
              </p>
            </div>

            <div className="mt-5 space-y-6">
              <section className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300/90">Columna: Score</h4>
                <p>
                  En esta tabla es exactamente la <span className="text-slate-300">suma de los tres pilares</span> de la misma
                  fila (<span className="text-slate-300">Stats + Standings + MVA</span>), redondeada a un decimal. El techo
                  sigue siendo <span className="text-slate-300">100</span> si alguien domina los tres pilares al máximo
                  relativo en la liga. No entra el campeón de playoffs (Larry es aparte).
                </p>
                <p>
                  El ranking de filas se ordena por esa suma para que coincida con lo que ves en{' '}
                  <span className="text-slate-300">Score</span>.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300/90">Columna: Stats</h4>
                <p>
                  Muestra el pilar <span className="text-slate-300">ponderado 0–40</span>: a partir del podio 9CAT (por
                  categoría, <span className="text-slate-300">3 / 2 / 1</span> pts por 1º / 2º / 3º en totales de temporada),
                  se suma el crudo por equipo y luego se <span className="text-slate-300">normaliza dentro de la liga</span>{' '}
                  y se escala al máximo de 40 pts. El número de la celda es ese aporte MOTY.
                </p>
                <p>
                  <span className="text-slate-300">Detalle en tooltip:</span> al pasar el cursor (o foco donde aplique) sobre la
                  celda de Stats verás el <span className="text-slate-300">9CAT crudo 0–27</span> (máximo teórico si fueras
                  top 3 en todas las categorías). Así puedes contrastar “puntos de podio” vs “recompensa relativa en la liga”.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300/90">Columna: Standings</h4>
                <p>
                  Refleja el <span className="text-slate-300">resultado en temporada regular</span>: victorias, derrotas y
                  posición en la tabla antes de playoffs. Esa información también se expresa como percentil o posición
                  relativa frente al resto de la liga (0–100 interno) y se traduce a puntos MOTY con tope de{' '}
                  <span className="text-slate-300">21 puntos</span>.
                </p>
                <p>
                  Importante: está pensado para premiar el buen desempeño “de liga” en el periodo regular, no el desenlace del
                  bracket. Así el MOTY puede separarse del campeón de playoffs si la narrativa de temporada lo merece.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300/90">Columna: MVA</h4>
                <p>
                  <span className="text-slate-300">MVA</span> son las siglas de{' '}
                  <span className="text-slate-300">Managerial Value Added</span> (valor añadido por el manager). Letra por
                  letra: <span className="text-slate-300">M</span> de <em>Managerial</em> (la gestión del roster),{' '}
                  <span className="text-slate-300">V</span> de <em>Value</em> (el valor que aportan tus decisiones) y{' '}
                  <span className="text-slate-300">A</span> de <em>Added</em> (lo que “sumas” más allá del simple talento
                  drafteado).
                </p>
                <p>
                  Dentro del pilar se combinan dos ideas con el mismo peso:{' '}
                  <span className="text-slate-300">eficiencia de alineación</span> (aprovechar mejor los huecos activos frente
                  a lo que suele sacar la liga en esos mismos slots) e{' '}
                  <span className="text-slate-300">impacto de transacciones</span> (moves en waivers y trades que mejoran el
                  valor del equipo a lo largo del año). Ambas piezas se miran en contexto de la liga, se normalizan y el
                  conjunto puede aportar hasta <span className="text-slate-300">39 puntos</span> al MOTY.
                </p>
                <p>
                  Un MVA alto sugiere que el manager optimizó partidos y movimientos; un MVA bajo puede indicar plantilla
                  estática, alineaciones subóptimas o moves que no compensaron respecto al resto.
                </p>
              </section>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-300">Ranking general (equipos con MOTY)</h3>
            {data.motyAllTime.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-slate-900/30 px-4 py-6 text-sm text-slate-500">
                Ningún equipo tiene MOTY registrado todavía.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full min-w-[540px] text-left text-sm">
                  <thead className="bg-slate-900/70 text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-3 py-2">#</th>
                      <th className="px-3 py-2">Equipo</th>
                      <th className="px-3 py-2 text-right">MOTY</th>
                      <th className="px-3 py-2">Temporadas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.motyAllTime.map((r, i) => (
                      <tr key={`moty-all-${r.teamId}`} className="border-t border-white/[0.06]">
                        <td className="px-3 py-2 text-slate-300">{i + 1}</td>
                        <td className="px-3 py-2 text-white">{r.displayName}</td>
                        <td className="px-3 py-2 text-right font-semibold text-amber-300">{r.motyTitles}</td>
                        <td className="px-3 py-2 text-slate-300">{r.seasons.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
