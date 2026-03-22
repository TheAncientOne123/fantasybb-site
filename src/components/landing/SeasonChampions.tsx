'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trophy, Crown } from 'lucide-react'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'

interface Champion {
  seasonId: string
  seasonLabel: string
  teamName: string
  teamId: string
  record?: string
  /** Equipo que perdió la final (opcional). */
  runnerUp?: {
    teamId: string
    teamName: string
    record?: string
  }
}

const champions: Champion[] = [
  {
    seasonId: '2026',
    seasonLabel: '2025-26',
    teamName: '北京首钢霹雳鸭',
    teamId: 'beijing-ducks',
    record: '13-5-0',
    runnerUp: {
      teamId: 'tochetaos',
      teamName: 'Tochetaos',
      record: '12-6-0',
    },
  },
]

function TeamLogo({
  teamId,
  size,
}: {
  teamId: string
  size: 'lg' | 'sm'
}) {
  const src = getTeamLogoPath(teamId)
  const dim = size === 'lg' ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-10 w-10 sm:h-11 sm:w-11'
  if (!src) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-black/20 ${dim} text-lg font-bold text-amber-200/50`}
        aria-hidden
      >
        ?
      </div>
    )
  }
  const remote = src.startsWith('http')
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl border border-amber-400/35 bg-black/25 ${dim}`}
    >
      {remote ? (
        <Image
          src={src}
          alt=""
          fill
          className="object-contain p-2"
          sizes={size === 'lg' ? '96px' : '44px'}
          unoptimized={src.includes('.svg')}
        />
      ) : (
        <Image src={src} alt="" fill className="object-contain p-2" sizes={size === 'lg' ? '96px' : '44px'} />
      )}
    </div>
  )
}

export default function SeasonChampions() {
  return (
    <section className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-12 text-center font-heading text-3xl font-bold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Campeones por Temporada
        </motion.h2>
        <div className="flex w-full flex-col gap-6">
          {champions.map((champion, index) => (
            <motion.article
              key={champion.seasonId}
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <div className="relative w-full overflow-hidden rounded-2xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 p-5 shadow-lg shadow-amber-900/20 backdrop-blur-sm sm:p-7">
                <div className="pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-5">
                  <Crown className="h-7 w-7 text-amber-400 sm:h-8 sm:w-8" aria-hidden />
                </div>

                <div className="flex min-w-0 flex-col gap-6 pr-10 sm:pr-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pr-12">
                  {/* Campeón */}
                  <Link
                    href={`/team/${champion.teamId}`}
                    className="group flex min-w-0 flex-1 items-start gap-4 sm:gap-5"
                  >
                    <TeamLogo teamId={champion.teamId} size="lg" />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <div className="rounded-full bg-amber-500/20 p-2">
                          <Trophy className="h-5 w-5 text-amber-400 sm:h-6 sm:w-6" />
                        </div>
                        <span className="font-heading text-lg font-bold text-amber-400 sm:text-xl">
                          {champion.seasonLabel}
                        </span>
                      </div>
                      <h3 className="mb-1 font-heading text-2xl font-bold leading-tight text-white transition-colors group-hover:text-amber-300 sm:text-3xl">
                        {champion.teamName}
                      </h3>
                      {champion.record ? (
                        <p className="text-sm text-white/65">Record: {champion.record}</p>
                      ) : null}
                    </div>
                  </Link>

                  {/* Subcampeón — minimizado */}
                  {champion.runnerUp ? (
                    <Link
                      href={`/team/${champion.runnerUp.teamId}`}
                      className="group/ru flex shrink-0 flex-col justify-center border-t border-amber-400/25 pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
                    >
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/45">
                        Perdió la final
                      </p>
                      <div className="flex items-center gap-3">
                        <TeamLogo teamId={champion.runnerUp.teamId} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white/80 transition-colors group-hover/ru:text-amber-200/90 sm:text-base">
                            {champion.runnerUp.teamName}
                          </p>
                          {champion.runnerUp.record ? (
                            <p className="text-xs text-white/45">Record: {champion.runnerUp.record}</p>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
