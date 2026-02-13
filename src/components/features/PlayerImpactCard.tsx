'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { PlayerImpactCardProps } from '@/types'
import { formatNumber, cn } from '@/lib/utils'

export function PlayerImpactCard({
  player,
  impact,
  type,
  matchupContext,
  className,
}: PlayerImpactCardProps) {
  const isPositive = impact > 0

  return (
    <div className={cn(
      'rounded-lg border p-4',
      type === 'contributor' 
        ? 'bg-green-500/5 border-green-500/20' 
        : 'bg-red-500/5 border-red-500/20',
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-slate-200 mb-1">{player.name}</h3>
          <p className="text-xs text-slate-400">
            {player.position.join(', ')} • {player.team}
          </p>
        </div>
        {player.injuryStatus && player.injuryStatus !== 'healthy' && (
          <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400">
            {player.injuryStatus}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span className={cn(
          'text-lg font-mono font-bold',
          isPositive ? 'text-green-400' : 'text-red-400'
        )}>
          {isPositive ? '+' : ''}{formatNumber(impact)}
        </span>
        <span className="text-sm text-slate-400">
          {type === 'contributor' ? 'contribución' : 'liabilidad'}
        </span>
      </div>
    </div>
  )
}
