'use client'

import { AlertTriangle } from 'lucide-react'
import { MatchupHeroCardProps } from '@/types'
import { formatNumber, calculateWinProbability, cn } from '@/lib/utils'

export function MatchupHeroCard({ matchup, className }: MatchupHeroCardProps) {
  // Verificar que los datos necesarios estén disponibles
  if (!matchup || !matchup.myTeam || !matchup.opponent) {
    return (
      <div className={cn('rounded-lg bg-slate-900 border border-slate-800 p-6', className)}>
        <p className="text-slate-400">Cargando datos del matchup...</p>
      </div>
    )
  }

  const isWinning = matchup.myScore > matchup.opponentScore
  const winProb = matchup.winProbability || calculateWinProbability(
    matchup.myProjection,
    matchup.opponentProjection
  )

  return (
    <div className={cn('rounded-lg bg-slate-900 border border-slate-800 p-6', className)}>
      {/* Score Display */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-2">Mi Equipo</p>
          <h2 className="font-heading text-2xl text-slate-200 mb-1">
            {matchup.myTeam.name}
          </h2>
          <div className="text-4xl font-mono font-bold text-primary-400">
            {formatNumber(matchup.myScore)}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Proy: {formatNumber(matchup.myProjection)}
          </p>
        </div>

        <div className="text-center border-l border-slate-800">
          <p className="text-sm text-slate-400 mb-2">Rival</p>
          <h2 className="font-heading text-2xl text-slate-200 mb-1">
            {matchup.opponent.name}
          </h2>
          <div className="text-4xl font-mono font-bold text-slate-400">
            {formatNumber(matchup.opponentScore)}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Proy: {formatNumber(matchup.opponentProjection)}
          </p>
        </div>
      </div>

      {/* Win Probability & Status */}
      <div className="flex items-center justify-between mb-4 p-4 rounded-lg bg-slate-800/50">
        <div>
          <p className="text-sm text-slate-400 mb-1">Win Probability</p>
          <div className="flex items-center gap-2">
            <div className={cn(
              'text-2xl font-bold',
              winProb >= 70 ? 'text-green-500' : winProb >= 50 ? 'text-yellow-500' : 'text-red-500'
            )}>
              {winProb}%
            </div>
            <div className={cn(
              'h-2 w-24 rounded-full',
              winProb >= 70 ? 'bg-green-500' : winProb >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            )} />
          </div>
        </div>
        <div className={cn(
          'px-4 py-2 rounded-lg font-medium text-sm',
          isWinning ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        )}>
          {isWinning ? 'Ganando' : 'Perdiendo'}
        </div>
      </div>

      {/* Alerts */}
      {matchup.alerts && matchup.alerts.length > 0 && (
        <div className="space-y-2">
          {matchup.alerts.map((alert, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
            >
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <p className="text-sm text-yellow-400">{alert.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
