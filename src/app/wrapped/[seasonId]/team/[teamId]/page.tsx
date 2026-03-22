'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { api, type RewindResponse, type RewindSlide } from '@/lib/api'
import { getRewindImageUrl } from '@/lib/rewind-image'
import { RewindImage } from '@/components/rewind/RewindImage'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function SlideContent({ slide }: { slide: RewindSlide }) {
  const c = slide.content || {}
  const imageUrl = c.image_url as string | undefined
  const text = c.text as string | undefined
  const stats = c.stats as Record<string, string | number> | undefined
  const rawImageUrl = imageUrl?.startsWith('http') ? imageUrl : imageUrl ? `${API_URL}${imageUrl}` : null
  const fullImageUrl = rawImageUrl ? getRewindImageUrl(rawImageUrl) : null

  return (
    <div className="space-y-4">
      {fullImageUrl && (
        <RewindImage
          src={fullImageUrl}
          alt=""
          className="max-w-full rounded-lg mx-auto max-h-80 object-contain"
          placeholderText={slide.title}
        />
      )}
      {text && <p className="text-slate-200 whitespace-pre-wrap">{text}</p>}
      {stats && Object.keys(stats).length > 0 && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-slate-700 pb-1">
              <span className="text-slate-400">{k}</span>
              <span className="text-slate-200 font-mono">{String(v)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function WrappedViewPage() {
  const params = useParams()
  const seasonId = Number(params.seasonId)
  const teamId = Number(params.teamId)
  const [data, setData] = useState<RewindResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!seasonId || !teamId) return
    api.getRewind(seasonId, teamId)
      .then(setData)
      .catch((e) => setError(e.detail || 'Error al cargar el rewind'))
      .finally(() => setLoading(false))
  }, [seasonId, teamId])

  if (loading) return <MainLayout><p className="text-slate-400 p-6">Cargando Wrapped…</p></MainLayout>
  if (error) return <MainLayout><p className="text-red-400 p-6">{error}</p></MainLayout>
  if (!data) return null

  const { slides, share_card } = data

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href={`/wrapped/${seasonId}`} className="text-slate-400 hover:text-slate-200">← Equipos</Link>
        </div>
        <div>
          <h1 className="font-heading text-4xl text-slate-100 mb-2">
            {share_card.team_name as string} — {share_card.season as string}
          </h1>
          <p className="text-slate-400">Season Wrapped</p>
        </div>

        <div className="space-y-12">
          {slides.length === 0 ? (
            <section className="rounded-lg bg-slate-900 border border-slate-800 p-12 text-center">
              <p className="text-slate-400">Este rewind aún no tiene contenido. El admin puede añadir slides desde Admin.</p>
            </section>
          ) : (
            slides.map((slide, i) => (
              <section
                key={i}
                className="rounded-lg bg-slate-900 border border-slate-800 p-8 md:p-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl text-slate-100 mb-6 text-center">
                  {slide.title}
                </h2>
                <div className="max-w-2xl mx-auto">
                  <SlideContent slide={slide} />
                </div>
              </section>
            ))
          )}

          <section className="rounded-lg bg-gradient-to-br from-primary-900/50 to-accent-900/50 border border-slate-800 p-8 text-center">
            <h2 className="font-heading text-2xl text-white mb-4">Share card</h2>
            <p className="text-slate-200">{share_card.team_name as string}</p>
            <p className="text-slate-400">{share_card.season as string} · {String(share_card.record || '')} · {String(share_card.highlight || '')}</p>
          </section>
        </div>
      </div>
    </MainLayout>
  )
}
