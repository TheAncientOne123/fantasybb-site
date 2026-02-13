'use client'

import { motion } from 'framer-motion'
import type { QuoteSlide as QuoteSlideType } from '@/data/rewind-types'

type Props = {
  slide: QuoteSlideType
  accent: string
}

export function QuoteSlide({ slide, accent }: Props) {
  return (
    <motion.div
      className="flex min-h-full flex-col items-center justify-center px-8 py-12 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <blockquote className="max-w-2xl">
        <p className="font-heading text-2xl font-bold leading-relaxed text-white sm:text-3xl md:text-4xl">
          &ldquo;{slide.quote}&rdquo;
        </p>
        {slide.author && (
          <cite
            className="mt-6 block not-italic text-lg font-medium"
            style={{ color: accent }}
          >
            {slide.author}
          </cite>
        )}
      </blockquote>
      {slide.footer && (
        <p className="mt-auto pt-8 text-xs uppercase tracking-widest text-white/40">
          {slide.footer}
        </p>
      )}
    </motion.div>
  )
}
