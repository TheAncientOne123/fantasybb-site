'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/MainLayout'
import { api } from '@/lib/api'

export default function WrappedListPage() {
  const [seasons, setSeasons] = useState<{ id: number; league_id: number; label: string; year: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.getSeasons()
      .then((res) => setSeasons(res.seasons || []))
      .catch((e) => setError(e.detail || 'Error al cargar temporadas'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-4xl text-slate-100 mb-2">Season Wrapped</h1>
          <p className="text-slate-400">Elige una temporada para ver los rewinds</p>
        </div>

        {loading && <p className="text-slate-400">Cargando temporadas…</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {seasons.length === 0 ? (
              <p className="text-slate-400 col-span-full">No hay temporadas. Crea una desde Admin.</p>
            ) : (
              seasons.map((s) => (
                <Link
                  key={s.id}
                  href={`/wrapped/${s.id}`}
                  className="rounded-lg bg-slate-900 border border-slate-800 p-6 hover:border-primary-500/50 transition-colors"
                >
                  <h2 className="font-heading text-2xl text-slate-100">{s.label}</h2>
                  <p className="text-slate-400 mt-1">Año {s.year}</p>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
