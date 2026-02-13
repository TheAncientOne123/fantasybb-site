'use client'

import { motion } from 'framer-motion'
import type { StatSlide as StatSlideType } from '@/data/rewind-types'
import { getRewindImageUrl } from '@/lib/rewind-image'
import { RewindImage } from './RewindImage'

type Props = {
  slide: StatSlideType
  accent: string
}

export function StatSlide({ slide, accent }: Props) {
  return (
    <motion.div
      className="flex min-h-full flex-col items-center justify-center px-6 py-12 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {slide.image && (
        <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-xl">
          <RewindImage
            src={getRewindImageUrl(slide.image)}
            alt=""
            className="h-full w-full object-cover rounded-xl"
            placeholderText={slide.title}
          />
        </div>
      )}
      <p className="text-sm font-medium uppercase tracking-widest text-white/60">
        {slide.title}
      </p>
      <p
        className="mt-2 font-heading text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl"
        style={{ color: accent }}
      >
        {slide.value}
      </p>
      <p className="mt-2 text-lg font-medium text-white/80">{slide.label}</p>
      {slide.compareTo && (
        <p className="mt-3 text-base text-white/70">
          {slide.compareTo.label}: <span style={{ color: accent }}>{slide.compareTo.value}</span>
        </p>
      )}
      {slide.description && (
        <p className="mt-4 max-w-md text-base text-white/60">{slide.description}</p>
      )}
      {slide.footer && (
        <p className="mt-auto pt-8 text-xs uppercase tracking-widest text-white/40">
          {slide.footer}
        </p>
      )}
    </motion.div>
  )
}
