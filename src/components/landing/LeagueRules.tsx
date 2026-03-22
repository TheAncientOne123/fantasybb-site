'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, ExternalLink } from 'lucide-react'

export default function LeagueRules() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="rounded-3xl border border-white/20 bg-gradient-to-br from-amber-500/10 to-purple-500/10 p-8 md:p-12 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="rounded-full bg-amber-500/20 p-3">
              <FileText className="h-8 w-8 text-amber-400" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Reglas de la Liga
            </h2>
          </div>
          <p className="text-white/70 text-lg mb-6">
            Conoce las reglas oficiales que rigen nuestra liga. Desde el formato de draft 
            hasta los criterios de scoring, todo está diseñado para mantener la competencia 
            justa y emocionante.
          </p>
          <Link
            href="/rules"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Ver Reglas Completas
            <ExternalLink className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
