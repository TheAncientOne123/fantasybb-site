import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Trophy, Home } from 'lucide-react'
import type { TeamProfile, TeamProfileSeason } from '@/data/team-profiles/types'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'
import { teamExists } from '@/data/getTeamRewind'
import { getSeasonById } from '@/data/seasons'

const CAT_ORDER = ['PTS', 'REB', 'AST', 'STL', 'BLK', '3PM', 'FG%', 'FT%', 'TO']

/** Remove pictographs (badges often ship without emojis; data sometimes includes them). */
function stripEmojis(s: string): string {
  return s
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\uFE0F/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function sortRoster(season: TeamProfileSeason) {
  return [...season.finalRoster].sort((a, b) => {
    const pa = a.fantasyPoints ? parseInt(a.fantasyPoints, 10) : -1
    const pb = b.fantasyPoints ? parseInt(b.fantasyPoints, 10) : -1
    if (pb !== pa) return pb - pa
    return a.name.localeCompare(b.name)
  })
}

/** e.g. "5W / 4L" → tiles for visualization */
function parseWinLossStreak(str: string): { wins: number; losses: number } | null {
  const m = str.replace(/\s+/g, ' ').match(/(\d+)\s*W\s*\/\s*(\d+)\s*L/i)
  if (!m) return null
  const wins = parseInt(m[1], 10)
  const losses = parseInt(m[2], 10)
  if (!Number.isFinite(wins) || !Number.isFinite(losses) || wins < 0 || losses < 0) return null
  if (wins === 0 && losses === 0) return null
  return { wins, losses }
}

/** Prefer "NNNN pts" from generated copy */
function formatMejorSemana(raw?: string): string {
  if (!raw?.trim()) return '—'
  const pts = raw.match(/(\d[\d,]*)\s*pts/i)
  if (pts) return `${pts[1].replace(/,/g, '')} pts`
  return stripEmojis(raw)
}

function nineCatGridRows(season: TeamProfileSeason): Array<{
  category: string
  rank: number
  valueDisplay: string
}> {
  const full = season.nineCatFull
  const byCat = full?.length ? new Map(full.map((r) => [r.category, r])) : null
  const ranks = season.categoryRanks9cat
  return CAT_ORDER.map((category) => {
    const row = byCat?.get(category)
    if (row) return row
    const rStr = ranks[category]
    if (!rStr) return { category, rank: 0, valueDisplay: '—' }
    const rank = parseInt(String(rStr).replace(/\D/g, ''), 10) || 0
    return { category, rank, valueDisplay: '—' }
  })
}

export default function TeamProfileView({ profile }: { profile: TeamProfile }) {
  const logo = getTeamLogoPath(profile.id)
  const hasRewind2026 = teamExists('2026', profile.id)
  const newestSeason = profile.seasons[0]
  const headerSeasonLabel = newestSeason ? getSeasonById(newestSeason.seasonId)?.label ?? newestSeason.seasonLabel : ''

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-sky-500/40 hover:bg-zinc-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
          {hasRewind2026 && (
            <Link
              href={`/rewind/2026/${profile.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/35 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300 transition hover:bg-sky-500/15"
            >
              <Trophy className="h-4 w-4" />
              Rewind 2025-26
            </Link>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        {/* Hero: logo, nombre, dueño, temporada, descripción */}
        <section className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-zinc-700 bg-zinc-900 shadow-lg shadow-black/40 sm:mx-0 sm:h-32 sm:w-32">
            {logo ? (
              <Image src={logo} alt={profile.displayName} fill className="object-contain p-2" />
            ) : (
              <span className="flex h-full items-center justify-center text-3xl font-bold text-zinc-600">
                {profile.displayName.trim().charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {profile.displayName.trim()}
              </h1>
              {headerSeasonLabel ? (
                <span className="shrink-0 rounded-full border border-zinc-600 bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {headerSeasonLabel}
                </span>
              ) : null}
            </div>
            {profile.owner?.trim() ? (
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-500">
                {profile.owner.trim()}
              </p>
            ) : (
              <p className="mt-2 text-sm italic text-zinc-600">
                Dueño pendiente — edita <code className="rounded bg-zinc-900 px-1 text-sky-400/80">owner</code> en el
                .ts del equipo.
              </p>
            )}
            <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 text-left">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Descripción del equipo</h2>
              {profile.description?.trim() ? (
                <p className="mt-2 whitespace-pre-line text-pretty leading-relaxed text-zinc-300">
                  {profile.description.trim()}
                </p>
              ) : (
                <p className="mt-2 text-sm italic text-zinc-600">
                  Sin descripción — añade <code className="rounded bg-zinc-950 px-1 text-sky-400/80">description</code>{' '}
                  en{' '}
                  <code className="break-all text-[11px] text-zinc-500">
                    src/data/seasons/…/teams/{profile.id}.ts
                  </code>
                  . El script de generación conserva estos campos.
                </p>
              )}
            </div>
          </div>
        </section>

        <h2 className="mb-6 font-heading text-lg font-semibold uppercase tracking-wide text-zinc-500">Historial</h2>
        <div className="flex flex-col gap-12">
          {profile.seasons.map((season) => (
            <SeasonBlock key={season.seasonId} season={season} teamId={profile.id} />
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-800 py-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300">
          <Home className="h-4 w-4" />
          Volver a la liga
        </Link>
      </footer>
    </div>
  )
}

function SeasonBlock({ season, teamId }: { season: TeamProfileSeason; teamId: string }) {
  const meta = getSeasonById(season.seasonId)
  const label = meta?.label ?? season.seasonLabel
  const rosterRows = sortRoster(season)
  const standingDisplay = season.regularSeasonRank > 0 ? `#${season.regularSeasonRank}` : '—'
  const nineGrid = nineCatGridRows(season)
  const streakParsed = season.longestStreaks ? parseWinLossStreak(season.longestStreaks) : null
  const mejorSemana = formatMejorSemana(season.highestScoringWeek)

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/35 p-5 shadow-xl shadow-black/20 sm:p-7">
      <div className="mb-8 flex flex-col gap-1 border-b border-zinc-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-heading text-2xl font-bold text-sky-400">{label}</h3>
        <p className="text-xs text-zinc-600">
          Deuda temporada: <span className="text-zinc-400">{season.debtPaid}</span>
        </p>
      </div>

      {/* Récord · Standing · Estado (reservado) · Mejor semana */}
      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard k="Récord" v={season.record === '—' ? '—' : season.record} />
        <StatCard k="Standing" v={standingDisplay} highlight />
        <div
          className="min-h-[5.25rem] rounded-xl border border-dashed border-zinc-700 bg-zinc-950/50 px-4 py-3"
          aria-label="Estado de playoffs: pendiente"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Estado</p>
        </div>
        <StatCard k="Mejor semana" v={mejorSemana} />
      </div>

      {/* Rachas */}
      {streakParsed ? (
        <div className="mb-8">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Rachas</h4>
          <p className="mb-2 text-xs text-zinc-600">Mejor racha W / peor racha L (temporada regular)</p>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: streakParsed.wins }, (_, i) => (
              <span
                key={`w-${i}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/35 bg-emerald-500/15 text-xs font-bold text-emerald-300"
              >
                W
              </span>
            ))}
            {Array.from({ length: streakParsed.losses }, (_, i) => (
              <span
                key={`l-${i}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/80 text-xs font-bold text-zinc-500"
              >
                L
              </span>
            ))}
          </div>
          {season.longestStreaks ? (
            <p className="mt-2 font-mono text-xs text-zinc-500">{stripEmojis(season.longestStreaks)}</p>
          ) : null}
        </div>
      ) : season.longestStreaks ? (
        <div className="mb-8">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Rachas</h4>
          <p className="text-sm text-zinc-400">{stripEmojis(season.longestStreaks)}</p>
        </div>
      ) : null}

      {/* Logros */}
      {season.achievements.length > 0 ? (
        <div className="mb-8">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Logros de temporada
          </h4>
          <ul className="custom-scrollbar flex gap-3 overflow-x-auto pb-2">
            {season.achievements.map((a) => (
              <li
                key={a.name + (a.label ?? '')}
                className="w-[140px] shrink-0 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3"
              >
                {a.image ? (
                  <div className="relative mx-auto mb-2 h-16 w-16 overflow-hidden rounded-lg bg-zinc-900">
                    <Image src={a.image} alt="" width={64} height={64} className="object-contain p-1" />
                  </div>
                ) : (
                  <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-zinc-800 text-lg font-bold text-zinc-600">
                    {a.name.charAt(0)}
                  </div>
                )}
                <p className="truncate text-center text-sm font-semibold text-zinc-100">{stripEmojis(a.name)}</p>
                {a.label ? (
                  <p className="mt-1 truncate text-center text-xs text-zinc-500">{stripEmojis(a.label)}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* 9 categorías — rejilla */}
      {nineGrid.some((r) => r.rank > 0 || r.valueDisplay !== '—') ? (
        <div className="mb-8">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            9 categorías — liga completa
          </h4>
          {!season.nineCatFull?.length && (
            <p className="mb-3 text-xs text-zinc-600">
              Valores totales parciales: regenera con{' '}
              <code className="rounded bg-zinc-950 px-1 text-sky-500/80">generate_team_data.py</code> para ver todas
              las cantidades.
            </p>
          )}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {nineGrid.map((row) => (
              <div
                key={row.category}
                className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-3 py-3 text-center"
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">{row.category}</p>
                <p className="mt-1 font-mono text-lg font-semibold text-zinc-100 tabular-nums">
                  {row.valueDisplay === '—' ? '—' : row.valueDisplay}
                </p>
                <p className="mt-1 text-sm font-semibold text-sky-400 tabular-nums">
                  {row.rank > 0 ? `#${row.rank}` : '—'}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Roster — solo #, nombre, puntos */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Roster final · puntos fantasy (ESPN)
        </h4>
        <p className="mb-3 text-xs text-zinc-600">
          {rosterRows.length > 0 &&
          rosterRows.every((p) => p.fantasyPoints != null && p.fantasyPoints !== '' && p.fantasyPoints !== '—')
            ? 'Totales de temporada por jugador.'
            : 'Puede haber jugadores sin total hasta regenerar datos (profileStats).'}
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/80 text-xs uppercase tracking-wide text-zinc-500">
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Jugador</th>
                <th className="px-3 py-2 text-right font-medium">Pts</th>
              </tr>
            </thead>
            <tbody>
              {rosterRows.map((p, idx) => (
                <tr key={p.name} className="border-b border-zinc-800/80 last:border-0">
                  <td className="px-3 py-2.5 font-mono text-sm font-semibold text-sky-400 tabular-nums">
                    {idx + 1}
                  </td>
                  <td className="px-3 py-2.5 text-zinc-200">{p.name}</td>
                  <td className="px-3 py-2.5 text-right font-mono tabular-nums text-zinc-400">
                    {p.fantasyPoints ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {teamExists(season.seasonId, teamId) ? (
        <div className="mt-6 text-right">
          <Link
            href={`/rewind/${season.seasonId}/${teamId}`}
            className="text-sm text-sky-400 hover:text-sky-300"
          >
            Ver rewind {season.seasonLabel} →
          </Link>
        </div>
      ) : null}
    </article>
  )
}

function StatCard({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{k}</p>
      <p
        className={`mt-1 text-xl font-bold tabular-nums ${highlight ? 'text-sky-400' : 'text-zinc-50'}`}
      >
        {v}
      </p>
    </div>
  )
}
