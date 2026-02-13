'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LeaguePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          className="max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            League Recap
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Full league recap coming soon. Stats, standings, and highlights for the whole league.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-2xl bg-amber-500 px-6 py-3 font-bold text-slate-950 hover:bg-amber-400"
          >
            Back to Fantasy Rewind
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
