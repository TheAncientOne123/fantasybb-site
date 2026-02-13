'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { api } from '@/lib/api'

export default function AdminRewindsSeasonPage() {
  const params = useParams()
  const seasonId = Number(params.seasonId)
  const [season, setSeason] = useState<{ id: number; league_id: number; label: string } | null>(null)
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([])
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
      .catch((e) => setError(e.detail || 'Error'))
      .finally(() => setLoading(false))
  }, [seasonId])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/rewinds" className="text-slate-400 hover:text-slate-200">← Admin</Link>
        </div>
        <div>
          <h1 className="font-heading text-4xl text-slate-100 mb-2">
            {season?.label ?? '…'} — Equipos
          </h1>
          <p className="text-slate-400">Elige un equipo para editar su rewind (subir imágenes, textos, estadísticas).</p>
        </div>

        {loading && <p className="text-slate-400">Cargando…</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <ul className="space-y-2">
            {teams.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/admin/rewinds/${seasonId}/${t.id}`}
                  className="block rounded-lg bg-slate-900 border border-slate-800 p-4 hover:border-primary-500/50"
                >
                  <span className="font-medium text-slate-200">{t.name}</span>
                  <span className="text-slate-400 ml-2">— Editar rewind</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  )
}
