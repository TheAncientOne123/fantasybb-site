'use client'

import { motion } from 'framer-motion'
import GiphyBackdrop from '@/components/ui/GiphyBackdrop'

export default function LeagueHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-20">
      <GiphyBackdrop query="stephen curry" limit={100} />
      <motion.div
        className="relative z-10 max-w-4xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="mb-6 font-heading text-5xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          LACMSI League
        </motion.h1>
        <motion.p
          className="mb-4 text-xl text-white/80 sm:text-2xl md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Look At Curry Man So Inspirational
        </motion.p>
        <motion.p
          className="mx-auto max-w-2xl text-lg text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Una liga de Fantasy Basketball donde la competencia se encuentra con la camaradería
        </motion.p>
      </motion.div>
    </section>
  )
}
