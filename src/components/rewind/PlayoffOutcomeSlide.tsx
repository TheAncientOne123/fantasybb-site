'use client'

import { motion } from 'framer-motion'
import type { PlayoffOutcomeSlide as PlayoffOutcomeSlideType } from '@/data/rewind-types'

type Props = {
  slide: PlayoffOutcomeSlideType
  accent: string
}

const OUTCOME_STYLES: Record<string, { bg: string; text: string }> = {
  champion: { bg: 'bg-amber-500/20 border-amber-400/50', text: 'text-amber-400' },
  lost_finals: { bg: 'bg-slate-500/20 border-slate-400/50', text: 'text-slate-300' },
  lost_round2: { bg: 'bg-slate-600/20 border-slate-500/50', text: 'text-slate-400' },
  lost_round1: { bg: 'bg-slate-700/20 border-slate-600/50', text: 'text-slate-500' },
  eliminated: { bg: 'bg-red-900/20 border-red-600/50', text: 'text-red-400' },
  made_playoffs: { bg: 'bg-emerald-900/25 border-emerald-500/50', text: 'text-emerald-300' },
  in_progress: { bg: 'bg-white/10 border-white/20', text: 'text-white/80' },
}

const FINAL_STANDING_OUTCOMES = new Set([
  'champion',
  'lost_finals',
  'lost_round2',
  'lost_round1',
])

function standingLine(outcome: string, standing: number): string {
  if (FINAL_STANDING_OUTCOMES.has(outcome)) return `Final standing: #${standing}`
  if (outcome === 'made_playoffs') return `Regular season seed: #${standing}`
  if (outcome === 'eliminated') return `Regular season finish: #${standing}`
  return `Standing: #${standing}`
}

export function PlayoffOutcomeSlide({ slide, accent }: Props) {
  const { title, description, outcome, standing, footer } = slide
  const style = OUTCOME_STYLES[outcome] ?? OUTCOME_STYLES.in_progress

  return (
    <motion.div
      className="flex min-h-full flex-col items-center justify-center px-6 py-12 text-center"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-sm font-medium uppercase tracking-widest text-white/60">
        How far you went
      </p>
      <div
        className={`mt-6 rounded-2xl border-2 px-8 py-6 ${style.bg}`}
        style={{ borderColor: outcome === 'champion' ? accent : undefined }}
      >
        <h2
          className={`text-2xl font-bold sm:text-3xl md:text-4xl ${style.text}`}
          style={outcome === 'champion' ? { color: accent } : undefined}
        >
          {title}
        </h2>
        {standing != null && standing > 0 && slide.outcome !== 'in_progress' && (
          <p className="mt-2 text-lg text-white/70">{standingLine(outcome, standing)}</p>
        )}
      </div>
      <p className="mt-6 max-w-md text-lg text-white/80">{description}</p>
      {footer && (
        <p className="mt-auto pt-8 text-xs uppercase tracking-widest text-white/40">{footer}</p>
      )}
    </motion.div>
  )
}
