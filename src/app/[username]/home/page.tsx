'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { getUser } from '@/lib/auth'

export default function HomePage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string

  useEffect(() => {
    const user = getUser()
    if (!user) {
      router.push('/login')
      return
    }
  }, [router])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl text-slate-100">Inicio</h1>
          <p className="text-slate-400">Bienvenido a Fantasy League Wrapped</p>
        </div>

        <div className="rounded-lg bg-slate-900 border border-slate-800 p-6">
          <h2 className="font-heading text-xl text-slate-200 mb-4">Season Wrapped</h2>
          <p className="text-slate-400 mb-4">
            Revive la temporada con el resumen personalizado de tu equipo.
          </p>
          <Link
            href="/wrapped"
            className="inline-block rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700 transition-colors"
          >
            Ver Wrapped
          </Link>
        </div>

        <div className="rounded-lg bg-slate-900 border border-slate-800 p-6">
          <h2 className="font-heading text-xl text-slate-200 mb-2">Tu cuenta</h2>
          <p className="text-slate-400">
            <Link href={`/${username}/me`} className="text-primary-400 hover:underline">Ir a Mi perfil</Link>
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
