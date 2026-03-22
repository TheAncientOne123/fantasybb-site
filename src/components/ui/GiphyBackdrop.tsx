'use client'

import { useEffect, useState } from 'react'

type GiphyGif = {
  id: string
  title: string
  images: {
    downsized_medium?: { url?: string }
  }
}

const GIPHY_KEY =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GIPHY_API_KEY
    ? process.env.NEXT_PUBLIC_GIPHY_API_KEY
    : 'oPp42NnSudZtrh4bAGiavfiIV8Oe41oK'

type Props = {
  /** Giphy search query (e.g. "NBA basketball", "stephen curry") */
  query: string
  /** Max results to sample for random pick */
  limit?: number
  /** Dark overlay opacity on top of the gif (0–1) */
  overlayOpacity?: number
  className?: string
}

/**
 * Full-bleed background: random GIF from Giphy search + dark overlays (same idea as LeagueHero).
 * Parent should be `relative min-h-screen` (or similar) so layers stack correctly.
 */
export default function GiphyBackdrop({
  query,
  limit = 80,
  overlayOpacity = 0.65,
  className = '',
}: Props) {
  const [gifUrl, setGifUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadRandomGif() {
      try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(query)}&limit=${limit}`
        const resp = await fetch(url)
        if (!resp.ok) return
        const json: { data?: GiphyGif[] } = await resp.json()
        const gifs = (json.data || [])
          .map((img) => ({
            id: img.id,
            url: img.images?.downsized_medium?.url || '',
          }))
          .filter((gif) => Boolean(gif.url))

        if (!cancelled && gifs.length > 0) {
          const random = gifs[Math.floor(Math.random() * gifs.length)]
          setGifUrl(random.url)
        }
      } catch {
        // Silent fail: page works without gif
      }
    }

    loadRandomGif()
    return () => {
      cancelled = true
    }
  }, [query, limit])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {gifUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${gifUrl})` }}
        />
      )}
      <div
        className="absolute inset-0 bg-slate-950"
        style={{ opacity: overlayOpacity }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, #3b82f6, transparent), radial-gradient(ellipse 60% 40% at 80% 100%, #8b5cf6, transparent)',
        }}
      />
    </div>
  )
}
