'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { AwardSlide as AwardSlideType } from '@/data/rewind-types'
import { getRewindImageUrl } from '@/lib/rewind-image'
import { RewindImage } from './RewindImage'

type Props = {
  slide: AwardSlideType
  accent: string
}

/** Convierte hex a { r, g, b } para canvas-confetti. */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace(/^#/, '').match(/(.{2})(.{2})(.{2})/)
  if (!match) return null
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  }
}

export function AwardSlide({ slide, accent }: Props) {
  const hasFired = useRef(false)

  useEffect(() => {
    if (hasFired.current) return
    hasFired.current = true

    // Solo confetti para award; standoff y no-award no muestran nada
    if (slide.awardTier === 'standoff' || slide.awardTier === 'no-award') return

    const colors = hexToRgb(accent) ? [accent] : undefined
    const count = 120
    const defaults = { origin: { y: 0.55 }, colors }

    const fire = (options: confetti.Options) => {
      confetti({ ...defaults, ...options })
    }

    setTimeout(() => fire({ particleCount: count * 0.4, spread: 60 }), 0)
    setTimeout(() => fire({ particleCount: count * 0.35, spread: 100, angle: 60 }), 80)
    setTimeout(() => fire({ particleCount: count * 0.35, spread: 100, angle: 120 }), 160)
  }, [accent, slide.awardTier])

  return (
    <motion.div
      className="flex min-h-full flex-col items-center justify-center px-6 py-12 text-center"
      initial={{ opacity: 0, rotateY: -10 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      {slide.image && (
        <div className="relative mb-6 h-28 w-28 overflow-hidden rounded-2xl">
          <RewindImage
            src={getRewindImageUrl(slide.image)}
            alt=""
            className="h-full w-full object-cover rounded-2xl"
            placeholderText={slide.badgeName}
          />
        </div>
      )}
      <p className="text-sm font-medium uppercase tracking-widest text-white/60">
        {slide.title}
      </p>
      <div
        className="mt-4 rounded-2xl border-2 px-6 py-4"
        style={{ borderColor: accent }}
      >
        <p className="font-heading text-2xl font-bold sm:text-3xl" style={{ color: accent }}>
          {slide.badgeName}
        </p>
      </div>
      <p className="mt-6 max-w-md text-lg text-white/90">{slide.description}</p>
      {slide.motyBreakdown && (
        <div className="mt-6 max-w-md space-y-2 text-sm text-white/70">
          <div className="flex justify-between gap-4">
            <span>Stats (25%)</span>
            <span className="font-medium" style={{ color: accent }}>{slide.motyBreakdown.stats.toFixed(1)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Standings (15%)</span>
            <span className="font-medium" style={{ color: accent }}>{slide.motyBreakdown.standings.toFixed(1)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Champion (25%)</span>
            <span className="font-medium" style={{ color: accent }}>{slide.motyBreakdown.champion.toFixed(1)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>MVA (35%)</span>
            <span className="font-medium" style={{ color: accent }}>{slide.motyBreakdown.mva.toFixed(1)}</span>
          </div>
          <div className="mt-3 border-t border-white/20 pt-2 flex justify-between gap-4 font-semibold">
            <span>Total Score</span>
            <span style={{ color: accent }}>
              {(slide.motyBreakdown.stats + slide.motyBreakdown.standings + slide.motyBreakdown.champion + slide.motyBreakdown.mva).toFixed(1)}
            </span>
          </div>
        </div>
      )}
      {slide.footer && (
        <p className="mt-auto pt-8 text-xs uppercase tracking-widest text-white/40">
          {slide.footer}
        </p>
      )}
    </motion.div>
  )
}
