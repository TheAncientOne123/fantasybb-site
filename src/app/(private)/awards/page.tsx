'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'

export default function AwardsPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/wrapped')
  }, [router])
  return (
    <MainLayout>
      <div className="p-6 text-slate-400">Redirigiendo a Wrapped…</div>
    </MainLayout>
  )
}
