'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { RosterDiffSlide as RosterDiffSlideType } from '@/data/rewind-types'

const VISIBLE_INITIAL = 8

type Props = {
  slide: RosterDiffSlideType
  accent: string
}

function ColumnList({
  names,
  expanded,
  onExpand,
}: {
  names: string[]
  expanded: boolean
  onExpand: () => void
}) {
  const visible = expanded ? names : names.slice(0, VISIBLE_INITIAL)
  const hasMore = names.length > VISIBLE_INITIAL && !expanded
  const moreCount = names.length - VISIBLE_INITIAL
  return (
    <ul className="mt-2 space-y-1 text-sm text-white/90">
      {visible.map((name, i) => (
        <li key={i} className="truncate">
          {name}
        </li>
      ))}
      {hasMore && (
        <li>
          <button
            type="button"
            onClick={onExpand}
            className="text-white/50 underline decoration-dotted underline-offset-2 hover:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
            aria-label={`Show ${moreCount} more`}
          >
            +{moreCount} more
          </button>
        </li>
      )}
    </ul>
  )
}

export function RosterDiffSlide({ slide, accent }: Props) {
  const { title, draftedCount, currentCount, kept, lost, added, footer } = slide
  const [expandedKept, setExpandedKept] = useState(false)
  const [expandedLost, setExpandedLost] = useState(false)
  const [expandedAdded, setExpandedAdded] = useState(false)

  return (
    <motion.div
      className="flex min-h-full flex-col px-4 py-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-center text-sm font-medium uppercase tracking-widest text-white/60">
        {title}
      </p>
      <p className="mt-2 text-center text-lg text-white/80">
        You kept <span style={{ color: accent }}>{kept.length}</span>/{draftedCount} from draft
        {added.length > 0 && (
          <> · Rebuilt <span style={{ color: accent }}>{added.length}</span> spots</>
        )}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {kept.length > 0 && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Kept ({kept.length})
            </p>
            <ColumnList
              names={kept}
              expanded={expandedKept}
              onExpand={() => setExpandedKept(true)}
            />
          </div>
        )}
        {lost.length > 0 && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Lost ({lost.length})
            </p>
            <ColumnList
              names={lost}
              expanded={expandedLost}
              onExpand={() => setExpandedLost(true)}
            />
          </div>
        )}
        {added.length > 0 && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Added ({added.length})
            </p>
            <ColumnList
              names={added}
              expanded={expandedAdded}
              onExpand={() => setExpandedAdded(true)}
            />
          </div>
        )}
      </div>

      {footer && (
        <p className="mt-auto pt-8 text-center text-xs uppercase tracking-widest text-white/40">
          {footer}
        </p>
      )}
    </motion.div>
  )
}
