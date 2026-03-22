'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trophy, Clock, Award, BarChart3 } from 'lucide-react'

const navItems = [
  {
    name: 'Rewind',
    href: '/rewind',
    icon: Clock,
    description: 'Revive tu temporada'
  },
  {
    name: 'Timeline',
    href: '/timeline',
    icon: BarChart3,
    description: 'Historial de la liga'
  },
  {
    name: 'Hall of Fame',
    href: '/awards',
    icon: Trophy,
    description: 'Premios y reconocimientos'
  },
  {
    name: 'Stats Room',
    href: '/stats',
    icon: Award,
    description: 'Estadísticas detalladas'
  }
]

export default function LeagueNav() {
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
          Explora la Liga
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={item.href}
                className="block group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-amber-400/50"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-amber-500/10 p-4 group-hover:bg-amber-500/20 transition-colors">
                    <item.icon className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-white/60">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
