'use client'

import { Info, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { MetricTileProps } from '@/types'
import { formatNumber, formatPercentile, getPercentileColor, cn } from '@/lib/utils'

export function MetricTile({
  title,
  value,
  percentile,
  interpretation,
  tooltip,
  trend,
  className,
}: MetricTileProps) {
  return (
    <div className={cn('rounded-lg bg-slate-900 border border-slate-800 p-6', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-medium text-slate-300">{title}</h3>
            {tooltip && (
              <button className="text-slate-500 hover:text-slate-400">
                <Info className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-bold text-slate-100">
              {typeof value === 'number' ? formatNumber(value) : value}
            </span>
            {trend && (
              <span className="text-slate-500">
                {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                {trend === 'neutral' && <Minus className="h-4 w-4 text-slate-500" />}
              </span>
            )}
          </div>
        </div>
      </div>

      {percentile !== undefined && (
        <div className="mb-3">
          <span className={cn('text-sm font-medium', getPercentileColor(percentile))}>
            Percentil: {formatPercentile(percentile)}
          </span>
        </div>
      )}

      <p className="text-sm text-slate-400">{interpretation}</p>
    </div>
  )
}
