'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import QuickAccess from '@/components/landing/QuickAccess'

export default function RewindEntryPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 px-6 py-4 backdrop-blur-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Volver a la liga
        </Link>
      </header>
      <QuickAccess />
    </div>
  )
}

