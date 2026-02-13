'use client'

import { motion } from 'framer-motion'
import { Trophy, Skull, Handshake, Award } from 'lucide-react'
import type { TimelineSlide as TimelineSlideType } from '@/data/rewind-types'

type Props = {
  slide: TimelineSlideType
  accent: string
}

const KIND_STYLES = {
  win: {
    border: 'border-emerald-500/40 bg-emerald-500/15',
    icon: Trophy,
    iconColor: 'text-emerald-400',
  },
  loss: {
    border: 'border-red-500/40 bg-red-500/15',
    icon: Skull,
    iconColor: 'text-red-400',
  },
  trade: {
    border: 'border-amber-500/40 bg-amber-500/15',
    icon: Handshake,
    iconColor: 'text-amber-400',
  },
  award: {
    border: 'border-purple-500/40 bg-purple-500/15',
    icon: Award,
    iconColor: 'text-purple-400',
  },
} as const

export function TimelineSlide({ slide, accent }: Props) {
  const { title, subtitle, events, footer } = slide

  return (
    <motion.div
      className="flex min-h-full flex-col px-4 py-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-white/60">
          {title}
        </p>
        {subtitle && (
          <p className="mt-1 text-base text-white/70">{subtitle}</p>
        )}
      </div>

      <ul className="mt-6 space-y-3 overflow-auto max-h-[280px]">
        {events.map((event, i) => {
          const kind = event.kind ?? 'win'
          const style = KIND_STYLES[kind] ?? KIND_STYLES.win
          const Icon = style.icon
          return (
            <motion.li
              key={i}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${style.border}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center ${style.iconColor}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-white/60">{event.label}</p>
                <p className="font-medium text-white/95">{event.title}</p>
                {event.detail && (
                  <p className="mt-0.5 text-sm text-white/70">{event.detail}</p>
                )}
              </div>
            </motion.li>
          )
        })}
      </ul>

      {footer && (
        <p className="mt-auto pt-6 text-center text-xs uppercase tracking-widest text-white/40">
          {footer}
        </p>
      )}
    </motion.div>
  )
}
