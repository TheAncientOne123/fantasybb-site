'use client'

import { motion } from 'framer-motion'
import type { HeroSlide as HeroSlideType } from '@/data/rewind-types'
import { getRewindImageUrl } from '@/lib/rewind-image'
import { RewindImage } from './RewindImage'

type Props = {
  slide: HeroSlideType
  accent: string
}

export function HeroSlide({ slide, accent }: Props) {
  return (
    <motion.div
      className="flex min-h-full flex-col items-center justify-center px-6 py-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {slide.image && (
        <div className="relative mb-8 h-40 w-40 overflow-hidden rounded-2xl">
          <RewindImage
            src={getRewindImageUrl(slide.image)}
            alt=""
            className="h-full w-full object-cover rounded-2xl"
            placeholderText={slide.subtitle}
          />
        </div>
      )}
      <h2
        className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ color: accent }}
      >
        {slide.title}
      </h2>
      {slide.subtitle && (
        <p className="mt-4 text-xl font-medium text-white/90 sm:text-2xl md:text-3xl">
          {slide.subtitle}
        </p>
      )}
      {slide.footer && (
        <p className="mt-auto pt-8 text-sm uppercase tracking-widest text-white/50">
          {slide.footer}
        </p>
      )}
    </motion.div>
  )
}
