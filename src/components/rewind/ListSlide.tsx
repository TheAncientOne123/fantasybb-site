'use client'

import { motion } from 'framer-motion'
import type { ListSlide as ListSlideType } from '@/data/rewind-types'
import { getRewindImageUrl } from '@/lib/rewind-image'
import { RewindImage } from './RewindImage'

const RANK_STYLES = {
  1: {
    box: 'border-amber-400/40 bg-amber-500/20',
    badge: 'bg-amber-400/30 text-amber-300 border border-amber-400/50',
  },
  2: {
    box: 'border-slate-400/40 bg-slate-500/20',
    badge: 'bg-slate-400/30 text-slate-200 border border-slate-400/50',
  },
  3: {
    box: 'border-amber-700/50 bg-amber-800/25',
    badge: 'bg-amber-700/40 text-amber-200 border border-amber-600/50',
  },
} as const

function getRankFromItem(item: { primary: string; secondary?: string; meta?: string; image?: string }): number | null {
  const str = item.meta ?? item.secondary ?? ''
  const match = str.match(/#(\d+)/)
  return match ? parseInt(match[1], 10) : null
}

type Props = {
  slide: ListSlideType
  accent: string
}

export function ListSlide({ slide, accent }: Props) {
  const { title, subtitle, items, footer } = slide

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

      <ul className="mt-6 space-y-4">
        {items.map((item, i) => {
          const rank = getRankFromItem(item)
          const rankStyle = rank !== null && rank >= 1 && rank <= 3 ? RANK_STYLES[rank as 1 | 2 | 3] : null
          return (
            <motion.li
              key={i}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
                rankStyle ? rankStyle.box : 'border-white/10 bg-white/5'
              }`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              {item.image && (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <RewindImage
                    src={getRewindImageUrl(item.image)}
                    alt=""
                    className="h-full w-full object-cover rounded-lg"
                    placeholderText={item.primary}
                  />
                </div>
              )}
              {item.meta && (
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    rankStyle ? rankStyle.badge : ''
                  }`}
                  style={rankStyle ? undefined : { backgroundColor: `${accent}30`, color: accent }}
                >
                  {item.meta}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white/95">{item.primary}</p>
                {item.secondary && (
                  <p className="mt-0.5 text-sm text-white/60">{item.secondary}</p>
                )}
              </div>
            </motion.li>
          )
        })}
      </ul>

      {footer && (
        <p className="mt-auto pt-8 text-center text-xs uppercase tracking-widest text-white/40">
          {footer}
        </p>
      )}
    </motion.div>
  )
}
