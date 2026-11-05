import Image from 'next/image'
import Link from 'next/link'
import { Trophy } from 'lucide-react'
import { Card, LinkButton, PageShell, Section } from '@/components/ui'
import { getAchievementInfo } from '@/data/team-profiles/achievement-info'
import type { AchievementDetail } from '@/data/team-profiles/achievement-details'
import { RosterPlayerCard } from '@/components/team/RosterPlayerCard'
import type { ProfileRosterPlayer, TeamProfile, TeamProfileSeason } from '@/data/team-profiles/types'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'
import { teamExists } from '@/data/getTeamRewind'
import { getSeasonById } from '@/data/seasons'
import { getNbaTeamPrimaryHex } from '@/lib/nbaTeamBranding'
import TeamSeasonSelector from '@/components/team/TeamSeasonSelector'
import RosterQuality from '@/components/team/RosterQuality'

const CAT_ORDER = ['PTS', 'REB', 'AST', 'STL', 'BLK', '3PM', 'FG%', 'FT%', 'TO']

/** Remove pictographs (badges often ship without emojis; data sometimes includes them). */
function stripEmojis(s: string): string {
  return s
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\uFE0F/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function longevitySubtitle(p: ProfileRosterPlayer): string | undefined {
  const lw = p.lineupWeeks
  const kw = p.keyPieceWeeks
  if (lw == null && kw == null) return undefined
  const parts: string[] = []
  if (lw != null) {
    parts.push(`${lw} semana${lw === 1 ? '' : 's'} en alineación`)
  }
  if (kw != null) {
    parts.push(`${kw} como pieza clave (top 10 del equipo)`)
  }
  return parts.join(' · ')
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

function splitLongevityForDisplay(longevity: ProfileRosterPlayer[] | undefined): {
  core: ProfileRosterPlayer[]
  waivers: ProfileRosterPlayer[]
} {
  const rows = longevity ?? []
  const coreCandidates = [...rows]
    .filter((p) => (p.keyPieceWeeks ?? 0) > 5)
    .sort(
      (a, b) =>
        (b.lineupWeeks ?? 0) - (a.lineupWeeks ?? 0) ||
        (b.keyPieceWeeks ?? 0) - (a.keyPieceWeeks ?? 0) ||
        a.name.localeCompare(b.name)
    )
  const core = coreCandidates.slice(0, 14)
  const inCore = new Set(core.map((p) => `${p.playerId ?? ''}::${p.name}`))
  const waivers = rows.filter((p) => !inCore.has(`${p.playerId ?? ''}::${p.name}`))
  return { core, waivers }
}

function pctLabel(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '0%'
  return `${Math.round(n)}%`
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

/** Temporada mostrada: la pedida en ?season=, si no la activa, si no la más reciente. */
export function pickProfileSeason(profile: TeamProfile, selectedSeasonId?: string) {
  return (
    profile.seasons.find((season) => season.seasonId === selectedSeasonId) ??
    profile.seasons.find((season) => season.seasonId === profile.activeSeasonId) ??
    profile.seasons[0]
  )
}

export default function TeamProfileView({
  profile,
  selectedSeasonId,
  achievementDetails = {},
}: {
  profile: TeamProfile
  selectedSeasonId?: string
  /** Datos de cada logro de la temporada seleccionada (ver achievement-details.ts). */
  achievementDetails?: Record<string, AchievementDetail>
}) {
  const selectedSeason = pickProfileSeason(profile, selectedSeasonId)
  const displayName = selectedSeason?.displayName ?? profile.displayName
  const logo = selectedSeason?.logoUrl ?? profile.logoUrl ?? getTeamLogoPath(profile.id)
  const owner = selectedSeason?.owner ?? profile.owner
  const description = selectedSeason?.description ?? profile.description
  const selectedSeasonLabel = selectedSeason
    ? getSeasonById(selectedSeason.seasonId)?.label ?? selectedSeason.seasonLabel
    : ''
  const hasSelectedRewind = selectedSeason ? teamExists(selectedSeason.seasonId, profile.id) : false

  return (
    <PageShell width="wide">
        {/* Hero: logo, nombre, dueño, temporada, descripción */}
        <section className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-900 shadow-lg shadow-black/40 sm:mx-0 sm:h-32 sm:w-32">
            {logo ? (
              <Image src={logo} alt={displayName} fill className="object-contain p-2" />
            ) : (
              <span className="flex h-full items-center justify-center text-3xl font-bold text-slate-600">
                {displayName.trim().charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {displayName.trim()}
              </h1>
              {selectedSeason ? (
                <TeamSeasonSelector
                  teamId={profile.id}
                  selectedSeasonId={selectedSeason.seasonId}
                  seasons={profile.seasons.map((season) => ({
                    id: season.seasonId,
                    label: getSeasonById(season.seasonId)?.label ?? season.seasonLabel,
                  }))}
                />
              ) : null}
            </div>
            {hasSelectedRewind && selectedSeason && (
              <LinkButton
                href={`/rewind/${selectedSeason.seasonId}/${profile.id}`}
                variant="accent"
                className="mx-auto mt-4 sm:mx-0"
              >
                <Trophy className="h-4 w-4" />
                Rewind {selectedSeasonLabel.replace(/\s+Season$/i, '')}
              </LinkButton>
            )}
            {owner?.trim() ? (
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-slate-500">
                {owner.trim()}
              </p>
            ) : (
              <p className="mt-2 text-sm italic text-slate-600">
                Dueño pendiente.
              </p>
            )}
            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-left">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Descripción del equipo</h2>
              {description?.trim() ? (
                <p className="mt-2 whitespace-pre-line text-pretty leading-relaxed text-slate-300">
                  {description.trim()}
                </p>
              ) : (
                <p className="mt-2 text-sm italic text-slate-600">
                  Sin descripción por ahora.
                </p>
              )}
            </div>
          </div>
        </section>

        <Section title="Historial">
          {selectedSeason ? (
            <SeasonBlock season={selectedSeason} teamId={profile.id} achievementDetails={achievementDetails} />
          ) : (
            <Card className="text-slate-500">No hay estadísticas disponibles para este equipo.</Card>
          )}
        </Section>
    </PageShell>
  )
}

function SeasonBlock({
  season,
  teamId,
  achievementDetails,
}: {
  season: TeamProfileSeason
  teamId: string
  achievementDetails: Record<string, AchievementDetail>
}) {
  const meta = getSeasonById(season.seasonId)
  const label = meta?.label ?? season.seasonLabel
  const rosterRows = sortRoster(season)
  const standingDisplay = season.regularSeasonRank > 0 ? `#${season.regularSeasonRank}` : '—'
  const nineGrid = nineCatGridRows(season)
  const streakParsed = season.longestStreaks ? parseWinLossStreak(season.longestStreaks) : null
  const mejorSemana = formatMejorSemana(season.highestScoringWeek)
  const longevityRows = season.longevityRoster ?? []
  const splitFallback = splitLongevityForDisplay(longevityRows)
  const coreTeamRows = season.coreTeamRoster ?? splitFallback.core
  const waiverRows = season.waiverRoster ?? splitFallback.waivers
  const nbaComposition = season.nbaTeamComposition ?? []

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/35 p-5 shadow-xl shadow-black/20 sm:p-7">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h3 className="font-heading text-2xl font-bold text-sky-400">{label}</h3>
      </div>

      {/* Récord · Standing · Mejor semana */}
      <div className="mb-8 grid grid-cols-1 gap-3 min-[380px]:grid-cols-3">
        <StatCard k="Récord" v={season.record === '—' ? '—' : season.record} />
        <StatCard k="Standing" v={standingDisplay} highlight />
        <StatCard k="Mejor semana" v={mejorSemana} />
      </div>

      {/* Rachas */}
      {streakParsed ? (
        <div className="mb-8">
          <h4 className="mb-3 font-heading text-lg font-semibold uppercase tracking-wide text-slate-300">
            Rachas
          </h4>
          <p className="mb-2 text-xs text-slate-600">Mejor racha W / peor racha L (temporada regular)</p>
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
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-bold text-slate-500"
              >
                L
              </span>
            ))}
          </div>
          {season.longestStreaks ? (
            <p className="mt-2 font-mono text-xs text-slate-500">{stripEmojis(season.longestStreaks)}</p>
          ) : null}
        </div>
      ) : season.longestStreaks ? (
        <div className="mb-8">
          <h4 className="mb-2 font-heading text-lg font-semibold uppercase tracking-wide text-slate-300">
            Rachas
          </h4>
          <p className="text-sm text-slate-400">{stripEmojis(season.longestStreaks)}</p>
        </div>
      ) : null}

      {/* Logros */}
      {season.achievements.length > 0 ? (
        <div className="mb-8">
          <h4 className="mb-4 font-heading text-lg font-semibold uppercase tracking-wide text-slate-300">
            Logros de temporada
          </h4>
          <ul className="flex flex-col gap-3">
            {season.achievements.map((a) => {
              const info = getAchievementInfo(a.name)
              const detail = achievementDetails[a.name.trim()]
              const label = info?.label ?? (a.label ? stripEmojis(a.label) : null)
              return (
                <li
                  key={a.name + (a.label ?? '')}
                  className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  {a.image ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-900">
                      <Image src={a.image} alt="" width={64} height={64} className="object-contain p-1" />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-lg font-bold text-slate-600">
                      {a.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="text-base font-semibold text-slate-100">{stripEmojis(a.name)}</p>
                      {label ? (
                        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium text-amber-200">
                          {label}
                        </span>
                      ) : null}
                    </div>
                    {info ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{info.description}</p>
                    ) : null}
                    {detail?.facts.length ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {detail.facts.map((fact) => (
                          <li
                            key={fact}
                            className="rounded-lg border border-sky-400/20 bg-sky-400/[0.06] px-2.5 py-1 text-xs font-semibold tabular-nums text-sky-200"
                          >
                            {fact}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {detail?.teams?.length ? (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {detail.teamsLabel ? (
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                            {detail.teamsLabel}
                          </span>
                        ) : null}
                        {detail.teams.map((team) => {
                          const chip = (
                            <>
                              {team.logoUrl ? (
                                <Image
                                  src={team.logoUrl}
                                  alt=""
                                  width={20}
                                  height={20}
                                  className="h-5 w-5 rounded-full object-cover"
                                />
                              ) : (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-slate-400">
                                  {team.name.charAt(0)}
                                </span>
                              )}
                              {team.name}
                            </>
                          )
                          const chipClass =
                            'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3 text-xs font-medium text-slate-200'
                          return team.teamId ? (
                            <Link
                              key={team.name}
                              href={`/team/${team.teamId}?season=${season.seasonId}`}
                              className={`${chipClass} transition hover:border-amber-400/40 hover:text-white`}
                            >
                              {chip}
                            </Link>
                          ) : (
                            <span key={team.name} className={chipClass}>
                              {chip}
                            </span>
                          )
                        })}
                      </div>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      {/* 9 categorías — rejilla */}
      {nineGrid.some((r) => r.rank > 0 || r.valueDisplay !== '—') ? (
        <div className="mb-8">
          <h4 className="mb-2 font-heading text-lg font-semibold uppercase tracking-wide text-slate-300">
            9 categorías — liga completa
          </h4>
          {!season.nineCatFull?.length && (
            <p className="mb-3 text-xs text-slate-600">
              Valores totales parciales: regenera con{' '}
              <code className="rounded bg-slate-950 px-1 text-sky-500/80">generate_team_data.py</code> para ver todas
              las cantidades.
            </p>
          )}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
            {nineGrid.map((row) => (
              <div
                key={row.category}
                className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-3 text-center"
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{row.category}</p>
                <p className="mt-1 font-mono text-lg font-semibold text-slate-100 tabular-nums">
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

      {/* Roster: final, draft, permanencia */}
      <RosterQuality quality={season.rosterQuality} />
      <div className="space-y-10">
        <section>
          <h4 className="mb-2 font-heading text-lg font-semibold uppercase tracking-wide text-slate-300">
            {season.hasStats === false ? 'Roster actual' : 'Roster final'}
          </h4>
          <p className="mb-3 text-xs text-slate-600">
            {rosterRows.some((p) => p.headshotUrl)
              ? season.hasStats === false ? 'Plantilla actual registrada en ESPN.' : 'Plantilla al cierre de temporada · nombre, posición y foto (ESPN).'
              : rosterRows.length > 0 &&
                  rosterRows.every(
                    (p) => p.fantasyPoints != null && p.fantasyPoints !== '' && p.fantasyPoints !== '—'
                  )
                ? 'Totales de temporada por jugador.'
                : 'La plantilla aparecerá cuando esté disponible.'}
          </p>
          {rosterRows.some((p) => p.headshotUrl || p.positions?.length) ? (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rosterRows.map((p) => (
                <RosterPlayerCard key={`final-${p.playerId ?? p.name}`} player={p} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full min-w-[280px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2 font-medium">#</th>
                    <th className="px-3 py-2 font-medium">Jugador</th>
                    <th className="px-3 py-2 text-right font-medium">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {rosterRows.map((p, idx) => (
                    <tr key={p.name} className="border-b border-slate-800/80 last:border-0">
                      <td className="px-3 py-2.5 font-mono text-sm font-semibold text-sky-400 tabular-nums">
                        {idx + 1}
                      </td>
                      <td className="px-3 py-2.5 text-slate-200">{p.name}</td>
                      <td className="px-3 py-2.5 text-right font-mono tabular-nums text-slate-400">
                        {p.fantasyPoints ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {season.draftedRoster && season.draftedRoster.length > 0 ? (
          <section>
            <h4 className="mb-2 font-heading text-lg font-semibold uppercase tracking-wide text-slate-300">
              Roster drafted
            </h4>
            <p className="mb-3 text-xs text-slate-600">Jugadores elegidos en el draft de esta temporada.</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {season.draftedRoster.map((p) => (
                <RosterPlayerCard key={`draft-${p.playerId ?? p.name}`} player={p} />
              ))}
            </div>
          </section>
        ) : null}

        {longevityRows.length > 0 ? (
          <section>
            <h4 className="mb-2 font-heading text-lg font-semibold uppercase tracking-wide text-slate-300">
              Core Team
            </h4>
            <p className="mb-3 text-xs text-slate-600">
              Hasta 14 jugadores con más permanencia y con más de 5 semanas como pieza clave durante la
              temporada regular y playoffs. El resto queda en Waivers.
            </p>
            {season.longevityKeyWeeksTeamAvg != null ? (
              <p className="mb-3 text-xs text-slate-500">
                Promedio del equipo (pieza clave):{' '}
                <span className="font-semibold tabular-nums text-slate-400">
                  {season.longevityKeyWeeksTeamAvg}
                </span>{' '}
                semanas por jugador en este listado.
              </p>
            ) : null}

            {coreTeamRows.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {coreTeamRows.map((p) => (
                  <RosterPlayerCard
                    key={`core-${p.playerId ?? p.name}`}
                    player={p}
                    subtitle={longevitySubtitle(p)}
                  />
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-xs text-slate-500">
                Ningún jugador supera el umbral de 5 semanas como pieza clave.
              </p>
            )}

            {waiverRows.length > 0 ? (
              <>
                <h5 className="mb-2 mt-7 font-heading text-base font-semibold uppercase tracking-wide text-slate-300">
                  Waivers
                </h5>
                <ul className="custom-scrollbar flex gap-2 overflow-x-auto pb-2">
                  {waiverRows.map((p) => (
                    <li key={`waiver-${p.playerId ?? p.name}`} className="w-[270px] shrink-0">
                      <RosterPlayerCard player={p} subtitle={longevitySubtitle(p)} />
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {nbaComposition.length > 0 ? (
              <div className="mt-7">
                <h5 className="mb-2 font-heading text-base font-semibold uppercase tracking-wide text-slate-300">
                  Composición por equipo NBA
                </h5>
                <p className="mb-2 text-xs text-slate-600">
                  Porcentaje de jugadores únicos por equipo NBA (solo jugadores con 10+ semanas en alineación).
                </p>
                <div className="h-3 overflow-hidden rounded-full border border-slate-800 bg-slate-900">
                  <div className="flex h-full w-full">
                    {nbaComposition.map((row) => (
                      <span
                        key={`nba-comp-seg-${row.teamAbbrev}`}
                        title={`${row.teamAbbrev} · ${pctLabel(row.pct)}`}
                        className="h-full"
                        style={{
                          width: `${row.pct}%`,
                          backgroundColor: getNbaTeamPrimaryHex(row.teamAbbrev) ?? '#52525b',
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
                  {nbaComposition.map((row) => (
                    <span key={`nba-comp-legend-${row.teamAbbrev}`} className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: getNbaTeamPrimaryHex(row.teamAbbrev) ?? '#52525b' }}
                      />
                      <span className="tabular-nums">{pctLabel(row.pct)}</span>
                      <span className="font-semibold">{row.teamAbbrev}</span>
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}
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
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{k}</p>
      <p
        className={`mt-1 text-xl font-bold tabular-nums ${highlight ? 'text-sky-400' : 'text-slate-50'}`}
      >
        {v}
      </p>
    </div>
  )
}
