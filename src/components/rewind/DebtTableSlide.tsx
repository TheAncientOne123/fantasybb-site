'use client'

import type { DebtTableSlide as DebtTableSlideType } from '@/data/rewind-types'

type Props = {
  slide: DebtTableSlideType
  accent?: string
}

export function DebtTableSlide({ slide, accent = '#f59e0b' }: Props) {
  return (
    <div className="space-y-6 text-white">
      <div>
        <h2 className="font-heading text-3xl sm:text-4xl">{slide.title}</h2>
        {slide.subtitle ? <p className="mt-2 text-white/70">{slide.subtitle}</p> : null}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/5">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-white">Equipo</th>
              <th className="px-4 py-3 text-right font-semibold text-white">Deuda</th>
            </tr>
          </thead>
          <tbody>
            {slide.rows.map((row) => {
              const isHighlight = row.teamId === slide.highlightTeamId
              return (
                <tr
                  key={row.teamId}
                  className={isHighlight ? 'bg-amber-500/20' : 'border-t border-white/10'}
                  style={isHighlight ? { boxShadow: `inset 4px 0 0 ${accent}` } : undefined}
                >
                  <td className="px-4 py-3 text-white/90">{row.teamName}</td>
                  <td className="px-4 py-3 text-right font-medium text-white">{row.amount}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-white/20 bg-white/10">
              <td className="px-4 py-3 font-semibold text-white">Total</td>
              <td className="px-4 py-3 text-right font-bold text-white">{slide.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {slide.footer ? <p className="text-sm text-white/60">{slide.footer}</p> : null}
    </div>
  )
}

