'use client'

import { motion } from 'framer-motion'
import type { RankSlide as RankSlideType } from '@/data/rewind-types'

type Props = {
  slide: RankSlideType
  accent: string
}

export function RankSlide({ slide, accent }: Props) {
  const { title, subtitle, metricLabel, rows, highlightTeamId, footer } = slide

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

      <div className="mt-4 space-y-2 overflow-auto max-h-[280px]">
        {rows.map((row, i) => {
          const isHighlight = highlightTeamId && row.id === highlightTeamId
          return (
            <motion.div
              key={row.id}
              className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 ${
                isHighlight
                  ? 'border-amber-400/50 bg-amber-500/20'
                  : 'border-white/10 bg-white/5'
              }`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/90">
                #{row.rank}
              </span>
              <span className={`min-w-0 flex-1 truncate text-sm ${isHighlight ? 'font-semibold text-white' : 'text-white/90'}`}>
                {row.name}
              </span>
              <span className={`shrink-0 text-sm font-medium ${isHighlight ? 'text-amber-300' : 'text-white/70'}`}>
                {row.value}
              </span>
              {row.tag && (
                <span className="hidden shrink-0 text-xs text-white/50 sm:inline">
                  {row.tag}
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      {footer && (
        <p className="mt-auto pt-6 text-center text-xs uppercase tracking-widest text-white/40">
          {footer}
        </p>
      )}
    </motion.div>
  )
}
