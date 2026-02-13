'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { api } from '@/lib/api'

export default function WrappedSeasonTeamsPage() {
  const params = useParams()
  const seasonId = Number(params.seasonId)
  const [season, setSeason] = useState<{ id: number; league_id: number; label: string; year: number } | null>(null)
  const [teams, setTeams] = useState<{ id: number; name: string; owner_name?: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!seasonId) return
    api.getSeason(seasonId)
      .then((s) => {
        setSeason(s)
        return api.getTeams(s.league_id)
      })
      .then((res) => setTeams(res.teams || []))
      .catch((e) => setError(e.detail || 'Error al cargar'))
      .finally(() => setLoading(false))
  }, [seasonId])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/wrapped" className="text-slate-400 hover:text-slate-200">← Temporadas</Link>
        </div>
        <div>
          <h1 className="font-heading text-4xl text-slate-100 mb-2">
            {season?.label ?? '…'} — Equipos
          </h1>
          <p className="text-slate-400">Elige un equipo para ver su Wrapped</p>
        </div>

        {loading && <p className="text-slate-400">Cargando equipos…</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teams.length === 0 ? (
              <p className="text-slate-400 col-span-full">No hay equipos en esta liga.</p>
            ) : (
              teams.map((t) => (
                <Link
                  key={t.id}
                  href={`/wrapped/${seasonId}/team/${t.id}`}
                  className="rounded-lg bg-slate-900 border border-slate-800 p-6 hover:border-primary-500/50 transition-colors"
                >
                  <h2 className="font-heading text-xl text-slate-100">{t.name}</h2>
                  {t.owner_name && <p className="text-slate-400 text-sm mt-1">{t.owner_name}</p>}
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
