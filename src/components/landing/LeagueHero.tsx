'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type GiphyGif = {
  id: string
  title: string
  images: {
    downsized_medium?: { url?: string }
  }
}

export default function LeagueHero() {
  const [gifUrl, setGifUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadRandomCurryGif() {
      try {
        const category = 'stephen curry'
        const url = `https://api.giphy.com/v1/gifs/search?api_key=oPp42NnSudZtrh4bAGiavfiIV8Oe41oK&q=${encodeURIComponent(category)}&limit=100`
        const resp = await fetch(url)
        if (!resp.ok) return
        const json: { data?: GiphyGif[] } = await resp.json()
        const gifs = (json.data || [])
          .map((img) => ({
            id: img.id,
            title: img.title || 'Stephen Curry',
            url: img.images?.downsized_medium?.url || '',
          }))
          .filter((gif) => Boolean(gif.url))

        if (!cancelled && gifs.length > 0) {
          const random = gifs[Math.floor(Math.random() * gifs.length)]
          setGifUrl(random.url)
        }
      } catch {
        // Silent fail: hero renders normally if gif fetch fails.
      }
    }

    loadRandomCurryGif()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {gifUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${gifUrl})` }}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-slate-950/65" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, #3b82f6, transparent), radial-gradient(ellipse 60% 40% at 80% 100%, #8b5cf6, transparent)',
        }}
      />
      <motion.div
        className="relative z-10 text-center max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          LACMSI League
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Look At Curry Man So Inspirational
        </motion.p>
        <motion.p
          className="text-lg text-white/60 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Una liga de Fantasy Basketball donde la competencia se encuentra con la camaradería
        </motion.p>
      </motion.div>
    </section>
  )
}
