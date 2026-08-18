'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { TeamIndexEntry } from '@/data/rewind-types'
import { TEAM_LOGO_PATHS } from '@/data/team-profiles/team-logos'

interface LeagueMembersProps {
  teams: TeamIndexEntry[]
}

export default function LeagueMembers({ teams }: LeagueMembersProps) {
  const regularTeams = teams.filter((team) => !team.isExpansion)
  const expansionTeams = teams.filter((team) => team.isExpansion)

  const teamGrid = (rows: TeamIndexEntry[], indexOffset = 0) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {rows.map((team, index) => (
        <motion.div
          key={team.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (indexOffset + index) * 0.05, duration: 0.4 }}
        >
          <Link href={`/team/${team.id}`} className="block group">
            <div className="relative aspect-square rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-amber-400/50 hover:scale-105">
              {team.logoUrl ?? TEAM_LOGO_PATHS[team.id] ? (
                <div className="relative w-full h-full">
                  <Image
                    src={team.logoUrl ?? TEAM_LOGO_PATHS[team.id]}
                    alt={team.displayName}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-4xl font-heading text-white/50">
                    {team.displayName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <p className="mt-3 text-center text-sm text-white/80 group-hover:text-amber-400 transition-colors line-clamp-2">
              {team.displayName}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  )

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-heading text-3xl sm:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Equipos de la Liga
        </motion.h2>
        {teams.length > 0 ? (
          <div>
            {teamGrid(regularTeams)}
            {expansionTeams.length > 0 ? (
              <div className="mt-16 border-t border-amber-400/20 pt-10">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8 text-center"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/70">
                    Nuevos contendientes
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
                    Equipos de Expansión
                  </h3>
                </motion.div>
                {teamGrid(expansionTeams, regularTeams.length)}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-center text-white/50">
            Todavía no hay equipos asociados a una temporada.
          </p>
        )}
      </div>
    </section>
  )
}
