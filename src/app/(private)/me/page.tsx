'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { getUser } from '@/lib/auth'
import { api } from '@/lib/api'

export default function MePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: number; username: string; email?: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const u = getUser()
    if (!u) {
      router.push('/login')
      return
    }
    api.getCurrentUser()
      .then(setUser)
      .catch(() => setUser({ id: u.id ?? 0, username: u.username ?? '' }))
      .finally(() => setLoading(false))
  }, [router])

  if (loading) {
    return (
      <MainLayout>
        <p className="text-slate-400 p-6">Cargando…</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl text-slate-100 mb-2">Mi perfil</h1>
          <p className="text-slate-400">Datos de tu cuenta</p>
        </div>
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-6">
          <dl className="space-y-2">
            <div>
              <dt className="text-slate-400 text-sm">Usuario</dt>
              <dd className="text-slate-100 font-medium">{user?.username ?? '—'}</dd>
            </div>
            {user?.email && (
              <div>
                <dt className="text-slate-400 text-sm">Email</dt>
                <dd className="text-slate-100">{user.email}</dd>
              </div>
            )}
          </dl>
        </div>
        <p className="text-slate-400">
          <Link href="/wrapped" className="text-primary-400 hover:underline">Ver Season Wrapped</Link>
        </p>
      </div>
    </MainLayout>
  )
}
