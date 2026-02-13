'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Share2, Home } from 'lucide-react'
import { toPng } from 'html-to-image'
import { getTeamRewindData } from '@/data/getTeamRewind'
import type { TeamRewindData } from '@/data/rewind-types'
import { SlideRenderer } from '@/components/rewind/SlideRenderer'
import { getSeasonById } from '@/data/seasons'

const DEFAULT_BG = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
const DEFAULT_ACCENT = '#f59e0b'

export default function RewindPage() {
  const params = useParams()
  const router = useRouter()
  const seasonId = params.seasonId as string
  const teamId = params.teamId as string
  const [data, setData] = useState<TeamRewindData | null>(null)
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [sharing, setSharing] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Validate season exists
    const season = getSeasonById(seasonId)
    if (!season) {
      router.replace('/')
      return
    }

    getTeamRewindData(seasonId, teamId)
      .then((d) => {
        setData(d ?? null)
        if (!d) router.replace('/')
      })
      .finally(() => setLoading(false))
  }, [seasonId, teamId, router])

  const goNext = useCallback(() => {
    if (!data) return
    setIndex((i) => (i >= data.slides.length - 1 ? i : i + 1))
  }, [data])

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? i : i - 1))
  }, [])

  const handleShare = useCallback(async () => {
    const el = slideRef.current
    if (!el || sharing) return
    setSharing(true)
    try {
      const dataUrl = await toPng(el, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#0f172a',
      })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `fantasy-rewind-${seasonId}-${teamId}-slide-${index + 1}.png`
      a.click()
    } catch (e) {
      console.error(e)
    } finally {
      setSharing(false)
    }
  }, [seasonId, teamId, index, sharing])

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    )
  }

  const slide = data.slides[index]
  const accent = data.theme?.accent ?? DEFAULT_ACCENT
  const background = data.theme?.background ?? DEFAULT_BG
  const total = data.slides.length

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ background }}
    >
      <header className="flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <button
          onClick={handleShare}
          disabled={sharing}
          className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20 disabled:opacity-50"
        >
          <Share2 className="h-4 w-4" />
          {sharing ? '…' : 'Share'}
        </button>
      </header>

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            ref={slideRef}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm sm:p-8"
          >
            <SlideRenderer slide={slide} accent={accent} />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="flex flex-col items-center gap-4 px-4 py-6">
        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={index === 0}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-sm hover:bg-white/30 disabled:opacity-30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-1.5">
            {data.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="h-2 rounded-full transition-all duration-200"
                style={{
                  width: i === index ? 24 : 8,
                  backgroundColor: i === index ? accent : 'rgba(255,255,255,0.4)',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={index === total - 1}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-sm hover:bg-white/30 disabled:opacity-30"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        <p className="text-sm text-white/50">
          {index + 1} / {total}
        </p>
      </footer>
    </div>
  )
}
