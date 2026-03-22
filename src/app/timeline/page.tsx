'use client'

import Link from 'next/link'

export default function TimelineMockPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl text-slate-100">Timeline</h1>
        <p className="text-slate-400">
          Mock up: la página del timeline de la liga se mostrará aquí.
        </p>
        <Link
          href="/"
          className="inline-block rounded-2xl bg-white/5 border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10"
        >
          Back to Fantasy Rewind
        </Link>
      </div>
    </div>
  )
}

