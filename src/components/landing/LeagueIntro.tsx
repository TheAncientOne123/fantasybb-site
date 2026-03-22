'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type GiphyGif = {
  id: string
  title: string
  images: {
    downsized_medium?: { url?: string; width?: string; height?: string }
  }
}

type LoadedGif = {
  url: string
  title: string
  width: number
  height: number
}

export default function LeagueIntro() {
  const [gif, setGif] = useState<LoadedGif | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadRandomFlightGif() {
      try {
        const category = 'flightreacts'
        const url = `https://api.giphy.com/v1/gifs/search?api_key=oPp42NnSudZtrh4bAGiavfiIV8Oe41oK&q=${encodeURIComponent(category)}&limit=25`
        const resp = await fetch(url)
        if (!resp.ok) return
        const json: { data?: GiphyGif[] } = await resp.json()
        const gifs = (json.data || [])
          .map((img) => {
            const dm = img.images?.downsized_medium
            const w = parseInt(dm?.width ?? '', 10)
            const h = parseInt(dm?.height ?? '', 10)
            return {
              id: img.id,
              title: img.title || 'Flight reaction',
              url: dm?.url || '',
              width: Number.isFinite(w) && w > 0 ? w : 0,
              height: Number.isFinite(h) && h > 0 ? h : 0,
            }
          })
          .filter((g) => Boolean(g.url))

        if (!cancelled && gifs.length > 0) {
          const random = gifs[Math.floor(Math.random() * gifs.length)]
          setGif(random)
        }
      } catch {
        // Silent fail: intro text still renders if Giphy is unavailable.
      }
    }

    loadRandomFlightGif()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="rounded-3xl border border-white/20 bg-white/5 p-8 md:p-12 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">
            Sobre la Liga
          </h2>
          <div className="space-y-4 text-white/70 text-lg leading-relaxed">
            <p>
              La LACMSI League es una liga de Fantasy Basketball fundada en la pasión por el baloncesto 
              y la competencia amistosa. Inspirados por el legendario Stephen Curry, nos reunimos cada 
              temporada para demostrar nuestras habilidades como managers.
            </p>
            <p>
              Desde drafts estratégicos hasta trades audaces, cada decisión cuenta. Aquí celebramos 
              tanto las victorias épicas como las derrotas que nos enseñan. Más que una liga, somos 
              una comunidad de amigos unidos por el amor al juego.
            </p>
            <p className="text-amber-400 font-medium">
              "Look at Curry man, so inspirational" - flight
            </p>
            {gif && (
              <div className="flex justify-center pt-2">
                <img
                  src={gif.url}
                  alt={gif.title}
                  width={gif.width || undefined}
                  height={gif.height || undefined}
                  className="h-auto max-h-[min(70vh,640px)] w-auto max-w-full rounded-xl border border-white/20 object-contain shadow-lg"
                  loading="lazy"
                  onLoad={(e) => {
                    setGif((prev) => {
                      const el = e.currentTarget
                      if (!prev) return prev
                      if (prev.width > 0 && prev.height > 0) return prev
                      const nw = el.naturalWidth
                      const nh = el.naturalHeight
                      if (nw <= 0 || nh <= 0) return prev
                      return { ...prev, width: nw, height: nh }
                    })
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
