'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { SummaryInsightRow, SummarySlide as SummarySlideType } from '@/data/rewind-types'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'
import { getRewindImageUrl } from '@/lib/rewind-image'
import { RewindImage } from './RewindImage'

type Props = {
  slide: SummarySlideType
  accent: string
}

const INSIGHT_ROWS: Array<{ key: keyof NonNullable<SummarySlideType['summaryInsights']>; label: string }> = [
  { key: 'rival', label: 'Rival' },
  { key: 'nemesis', label: 'Nemesis' },
  { key: 'closestGame', label: 'Closest game' },
  { key: 'highestScoringWeek', label: 'Highest scoring week' },
]

function normalizeInsight(raw: string | SummaryInsightRow | undefined): {
  stat: string
  opponentTeamId?: string
} {
  if (raw == null) return { stat: '—' }
  if (typeof raw === 'string') {
    const t = raw.trim()
    return { stat: t === '' ? '—' : t }
  }
  const stat = raw.stat?.trim() || '—'
  return { stat, opponentTeamId: raw.opponentTeamId }
}

function OpponentLogo({ teamId }: { teamId?: string }) {
  const src = teamId ? getTeamLogoPath(teamId) : undefined
  if (!src) {
    return (
      <div
        className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white/25"
        aria-hidden
      >
        ?
      </div>
    )
  }
  const remote = src.startsWith('http')
  return (
    <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black/25">
      {remote ? (
        <Image
          src={src}
          alt=""
          fill
          className="object-contain p-2"
          sizes="72px"
          unoptimized={src.includes('.svg')}
        />
      ) : (
        <Image src={src} alt="" fill className="object-contain p-2" sizes="72px" />
      )}
    </div>
  )
}

export function SummarySlide({ slide, accent }: Props) {
  const { title, subtitle, record, archetype, titles, badges, summaryInsights, footer } = slide

  const insights = summaryInsights

  return (
    <motion.div
      className="flex min-h-full w-full max-w-full flex-col overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6 text-center sm:mb-8">
        {title && (
          <p className="text-sm font-medium uppercase tracking-widest text-white/60">{title}</p>
        )}
        {subtitle && (
          <p className="mt-2 text-xl font-bold text-white/95 sm:text-2xl" style={{ color: accent }}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 lg:items-start">
        {/* Left: record, archetype, titles */}
        <div className="min-w-0 space-y-4">
          {record && (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-widest text-white/50">Record</p>
              <p className="text-xl font-bold" style={{ color: accent }}>
                {record.value}
                {record.standing && (
                  <span className="ml-2 text-base font-normal text-white/70">
                    · Standing {record.standing}
                  </span>
                )}
              </p>
            </div>
          )}
          {archetype && (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-widest text-white/50">Archetype</p>
              <div className="mt-1 flex items-center gap-3">
                {archetype.image && (
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                    <RewindImage
                      src={getRewindImageUrl(archetype.image)}
                      alt=""
                      className="h-full w-full object-cover"
                      placeholderText={archetype.name}
                    />
                  </div>
                )}
                <p className="font-medium text-white/95">{archetype.name}</p>
              </div>
            </div>
          )}
          {titles.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-widest text-white/50">Titles & Awards</p>
              <ul className="mt-2 space-y-2">
                {titles.map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {t.image && (
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded">
                        <RewindImage
                          src={getRewindImageUrl(t.image)}
                          alt=""
                          className="h-full w-full object-cover"
                          placeholderText={t.name}
                        />
                      </div>
                    )}
                    <span className="text-white/90">{t.name}</span>
                    {t.label && <span className="text-sm text-white/50">· {t.label}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: season matchups */}
        {insights ? (
          <div className="flex min-w-0 flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/50">Season matchups</p>
            {INSIGHT_ROWS.map(({ key, label }) => {
              const { stat, opponentTeamId } = normalizeInsight(insights[key])
              const showLogo = Boolean(opponentTeamId)
              return (
                <div
                  key={key}
                  className="flex min-w-0 gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4"
                >
                  {showLogo ? <OpponentLogo teamId={opponentTeamId} /> : null}
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                      {label}
                    </p>
                    <p
                      className={`mt-1.5 break-words font-semibold leading-snug text-white/95 ${
                        showLogo ? 'text-base sm:text-lg' : 'text-sm'
                      }`}
                    >
                      {stat}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : badges && badges.length > 0 ? (
          <div className="flex min-w-0 shrink-0 flex-col items-center lg:items-start">
            <p className="mb-3 text-xs uppercase tracking-widest text-white/50">Badges</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {badges.slice(0, 12).map((img, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-lg border border-white/10"
                >
                  <RewindImage
                    src={getRewindImageUrl(img)}
                    alt=""
                    className="h-full w-full object-cover"
                    placeholderText=""
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {footer && (
        <p className="mt-auto pt-6 text-center text-xs uppercase tracking-widest text-white/40 sm:pt-8">
          {footer}
        </p>
      )}
    </motion.div>
  )
}
