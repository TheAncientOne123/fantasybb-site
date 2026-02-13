'use client'

import { motion } from 'framer-motion'
import type { ImageSlide as ImageSlideType } from '@/data/rewind-types'
import { getRewindImageUrl } from '@/lib/rewind-image'
import { RewindImage } from './RewindImage'

type Props = {
  slide: ImageSlideType
  accent: string
}

export function ImageSlide({ slide, accent }: Props) {
  return (
    <motion.div
      className="flex min-h-full flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {slide.title && (
        <p
          className="mb-6 text-center font-heading text-2xl font-bold sm:text-3xl"
          style={{ color: accent }}
        >
          {slide.title}
        </p>
      )}
      <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-2xl">
        <RewindImage
          src={getRewindImageUrl(slide.image)}
          alt={slide.caption ?? ''}
          className="h-full w-full object-cover rounded-2xl"
          placeholderText={slide.title ?? slide.caption}
        />
      </div>
      {slide.caption && (
        <p className="mt-6 text-center text-lg text-white/80">{slide.caption}</p>
      )}
      {slide.footer && (
        <p className="mt-auto pt-8 text-center text-xs uppercase tracking-widest text-white/40">
          {slide.footer}
        </p>
      )}
    </motion.div>
  )
}
