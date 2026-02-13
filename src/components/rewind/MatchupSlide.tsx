'use client'

import { motion } from 'framer-motion'
import { Trophy, Skull } from 'lucide-react'
import type { MatchupSlide as MatchupSlideType } from '@/data/rewind-types'

type Props = {
  slide: MatchupSlideType
  accent: string
}

export function MatchupSlide({ slide, accent }: Props) {
  const { title, week, result, me, opp, margin, note, footer } = slide
  const isWin = result === 'W'
  const isTie = result === 'T'

  return (
    <motion.div
      className="flex min-h-full flex-col px-4 py-8"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-center text-sm font-medium uppercase tracking-widest text-white/60">
        {title}
      </p>
      <p className="mt-1 text-center text-base text-white/70">Week {week}</p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div
          className={`rounded-xl border-2 px-4 py-4 text-center ${
            isWin ? 'border-emerald-500/60 bg-emerald-500/10' : 'border-white/10 bg-white/5'
          }`}
        >
          <p className="truncate text-sm font-medium text-white/90">{me.name}</p>
          <p
            className={`mt-2 font-heading text-3xl font-bold sm:text-4xl ${
              isWin ? 'text-emerald-400' : 'text-white/80'
            }`}
          >
            {me.score.toLocaleString()}
          </p>
          {isWin && (
            <div className="mt-2 flex justify-center">
              <Trophy className="h-6 w-6 text-emerald-400" />
            </div>
          )}
        </div>
        <div
          className={`rounded-xl border-2 px-4 py-4 text-center ${
            !isWin && !isTie ? 'border-red-500/60 bg-red-500/10' : 'border-white/10 bg-white/5'
          }`}
        >
          <p className="truncate text-sm font-medium text-white/90">{opp.name}</p>
          <p
            className={`mt-2 font-heading text-3xl font-bold sm:text-4xl ${
              !isWin && !isTie ? 'text-red-400' : 'text-white/80'
            }`}
          >
            {opp.score.toLocaleString()}
          </p>
          {!isWin && !isTie && (
            <div className="mt-2 flex justify-center">
              <Skull className="h-6 w-6 text-red-400" />
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-lg text-white/70">
        Margin: <span style={{ color: accent }}>{margin.toLocaleString()}</span> pts
      </p>
      {note && (
        <p className="mt-2 text-center text-sm italic text-white/60">{note}</p>
      )}

      {footer && (
        <p className="mt-auto pt-8 text-center text-xs uppercase tracking-widest text-white/40">
          {footer}
        </p>
      )}
    </motion.div>
  )
}
