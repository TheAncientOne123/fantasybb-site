'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { api, type RewindSlide, type ShareCard } from '@/lib/api'

const defaultShareCard: ShareCard = {
  season: '',
  team_name: '',
  record: '',
  standing: 0,
  power_score: 0,
  top_badges: [],
  highlight: '',
}

export default function AdminEditRewindPage() {
  const params = useParams()
  const seasonId = Number(params.seasonId)
  const teamId = Number(params.teamId)
  const [slides, setSlides] = useState<RewindSlide[]>([])
  const [shareCard, setShareCard] = useState<ShareCard>(defaultShareCard)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!seasonId || !teamId) return
    api.getRewindAdmin(seasonId, teamId)
      .then((res) => {
        setSlides(Array.isArray(res.slides) ? res.slides : [])
        setShareCard(res.share_card && typeof res.share_card === 'object' ? res.share_card as ShareCard : defaultShareCard)
      })
      .catch(() => {
        setSlides([])
        setShareCard(defaultShareCard)
      })
      .finally(() => setLoading(false))
  }, [seasonId, teamId])

  const addSlide = () => {
    setSlides((s) => [...s, { type: 'custom', title: 'Nueva slide', content: {} }])
  }

  const updateSlide = (index: number, field: 'type' | 'title' | 'content', value: string | Record<string, unknown>) => {
    setSlides((s) => {
      const next = [...s]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const updateContentField = (slideIndex: number, key: string, value: string | number) => {
    setSlides((s) => {
      const next = [...s]
      const content = { ...(next[slideIndex].content || {}), [key]: value }
      next[slideIndex] = { ...next[slideIndex], content }
      return next
    })
  }

  const removeSlide = (index: number) => {
    setSlides((s) => s.filter((_, i) => i !== index))
  }

  const handleImageUpload = async (slideIndex: number, file: File) => {
    try {
      const { url } = await api.uploadRewindImage(file)
      updateContentField(slideIndex, 'image_url', url)
      setMessage('Imagen subida')
    } catch (e) {
      setError((e as { detail?: string }).detail || 'Error al subir')
    }
  }

  const save = async () => {
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      await api.upsertRewind(seasonId, teamId, slides, shareCard)
      setMessage('Guardado correctamente')
    } catch (e) {
      setError((e as { detail?: string }).detail || 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <MainLayout><p className="text-slate-400 p-6">Cargando…</p></MainLayout>

  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-4">
          <Link href={`/admin/rewinds/${seasonId}`} className="text-slate-400 hover:text-slate-200">← Equipos</Link>
        </div>
        <div>
          <h1 className="font-heading text-4xl text-slate-100 mb-2">Editar rewind</h1>
          <p className="text-slate-400">Añade slides con imágenes, textos y estadísticas personalizadas.</p>
        </div>

        {error && <p className="text-red-400">{error}</p>}
        {message && <p className="text-green-400">{message}</p>}

        <div className="space-y-6">
          <div className="rounded-lg bg-slate-900 border border-slate-800 p-6">
            <h2 className="font-heading text-xl text-slate-200 mb-4">Share card</h2>
            <div className="grid gap-4">
              <label className="block">
                <span className="text-slate-400 text-sm">team_name</span>
                <input
                  type="text"
                  value={shareCard.team_name}
                  onChange={(e) => setShareCard((c) => ({ ...c, team_name: e.target.value }))}
                  className="mt-1 w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200"
                />
              </label>
              <label className="block">
                <span className="text-slate-400 text-sm">season</span>
                <input
                  type="text"
                  value={shareCard.season}
                  onChange={(e) => setShareCard((c) => ({ ...c, season: e.target.value }))}
                  className="mt-1 w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200"
                />
              </label>
              <label className="block">
                <span className="text-slate-400 text-sm">record</span>
                <input
                  type="text"
                  value={shareCard.record}
                  onChange={(e) => setShareCard((c) => ({ ...c, record: e.target.value }))}
                  className="mt-1 w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200"
                />
              </label>
              <label className="block">
                <span className="text-slate-400 text-sm">highlight</span>
                <input
                  type="text"
                  value={shareCard.highlight}
                  onChange={(e) => setShareCard((c) => ({ ...c, highlight: e.target.value }))}
                  className="mt-1 w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200"
                />
              </label>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl text-slate-200">Slides</h2>
              <button
                type="button"
                onClick={addSlide}
                className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-500"
              >
                + Añadir slide
              </button>
            </div>

            <div className="space-y-6">
              {slides.map((slide, i) => (
                <div key={i} className="rounded-lg bg-slate-900 border border-slate-800 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-slate-400">Slide {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeSlide(i)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="grid gap-4">
                    <label>
                      <span className="text-slate-400 text-sm">Título</span>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateSlide(i, 'title', e.target.value)}
                        className="mt-1 w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200"
                      />
                    </label>
                    <label>
                      <span className="text-slate-400 text-sm">Texto</span>
                      <textarea
                        value={(slide.content?.text as string) ?? ''}
                        onChange={(e) => updateContentField(i, 'text', e.target.value)}
                        rows={3}
                        className="mt-1 w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200"
                      />
                    </label>
                    <label>
                      <span className="text-slate-400 text-sm">Imagen</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full text-slate-400"
                        onChange={(e) => {
                          const f = e.target.files?.[0]
                          if (f) handleImageUpload(i, f)
                        }}
                      />
                      {(slide.content?.image_url as string) && (
                        <p className="text-slate-500 text-sm mt-1">URL: {(slide.content as Record<string, string>).image_url}</p>
                      )}
                    </label>
                    <label>
                      <span className="text-slate-400 text-sm">Estadísticas (JSON: clave: valor)</span>
                      <textarea
                        placeholder='{"Wins": "12", "Lugar": "3"}'
                        value={typeof slide.content?.stats === 'object' && slide.content.stats
                          ? JSON.stringify(slide.content.stats, null, 2)
                          : ''}
                        onChange={(e) => {
                          try {
                            const v = e.target.value.trim()
                            const stats = v ? JSON.parse(v) : {}
                            setSlides((s) => {
                              const next = [...s]
                              next[i] = { ...next[i], content: { ...next[i].content, stats } }
                              return next
                            })
                          } catch {
                            // ignore invalid json
                          }
                        }}
                        rows={4}
                        className="mt-1 w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200 font-mono text-sm"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded bg-primary-600 px-6 py-3 text-white hover:bg-primary-500 disabled:opacity-50"
          >
            {saving ? 'Guardando…' : 'Guardar rewind'}
          </button>
        </div>

        <p className="text-slate-500 text-sm">
          <Link href={`/wrapped/${seasonId}/team/${teamId}`} className="text-primary-400 hover:underline">Ver rewind publicado</Link>
        </p>
      </div>
    </MainLayout>
  )
}
