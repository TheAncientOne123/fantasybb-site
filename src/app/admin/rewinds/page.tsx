'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/MainLayout'
import { api } from '@/lib/api'

export default function AdminRewindsPage() {
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
          <h1 className="font-heading text-4xl text-slate-100 mb-2">Admin — Rewinds</h1>
          <p className="text-slate-400">Elige temporada y equipo para crear o editar el Wrapped (imágenes, textos, estadísticas).</p>
        </div>

        {loading && <p className="text-slate-400">Cargando…</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {seasons.length === 0 ? (
              <p className="text-slate-400">No hay temporadas. Crea una liga y temporada desde la API o directamente en la base de datos.</p>
            ) : (
              <ul className="space-y-2">
                {seasons.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/admin/rewinds/${s.id}`}
                      className="block rounded-lg bg-slate-900 border border-slate-800 p-4 hover:border-primary-500/50"
                    >
                      <span className="font-medium text-slate-200">{s.label}</span>
                      <span className="text-slate-400 ml-2">— Editar rewinds por equipo</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
