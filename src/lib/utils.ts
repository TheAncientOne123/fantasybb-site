import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clases de Tailwind CSS de forma segura
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea números grandes (ej: 1234.5 -> "1,234.5")
 */
export function formatNumber(num: number, decimals: number = 1): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Formatea percentiles (ej: 85 -> "85th")
 */
export function formatPercentile(percentile: number): string {
  const suffix = ['th', 'st', 'nd', 'rd']
  const v = percentile % 100
  return `${percentile}${suffix[(v - 20) % 10] || suffix[v] || suffix[0]}`
}

/**
 * Obtiene el color según el percentil
 */
export function getPercentileColor(percentile: number): string {
  if (percentile >= 80) return 'text-green-500'
  if (percentile >= 60) return 'text-blue-500'
  if (percentile >= 40) return 'text-yellow-500'
  if (percentile >= 20) return 'text-orange-500'
  return 'text-red-500'
}

/**
 * Obtiene el color según el veredicto
 */
export function getVerdictColor(verdict: string): string {
  const colors: Record<string, string> = {
    great: 'text-green-500 bg-green-500/10',
    good: 'text-blue-500 bg-blue-500/10',
    neutral: 'text-gray-500 bg-gray-500/10',
    bad: 'text-orange-500 bg-orange-500/10',
    blunder: 'text-red-500 bg-red-500/10',
  }
  return colors[verdict] || colors.neutral
}

/**
 * Obtiene el icono según el tipo de evento
 */
export function getEventIcon(type: string): string {
  const icons: Record<string, string> = {
    trade: '🔄',
    waiver: '➕',
    result: '📊',
    clutch: '⚡',
    milestone: '🏆',
  }
  return icons[type] || '📅'
}

/**
 * Calcula la probabilidad de ganar basada en proyecciones
 */
export function calculateWinProbability(
  myProjection: number,
  opponentProjection: number
): number {
  const diff = myProjection - opponentProjection
  // Función sigmoide para convertir diferencia en probabilidad
  const probability = 1 / (1 + Math.exp(-diff / 50))
  return Math.round(probability * 100)
}

/**
 * Formatea fechas de forma legible
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Obtiene el nombre de la semana (ej: "Semana 12")
 */
export function getWeekLabel(week: number): string {
  return `Semana ${week}`
}

/**
 * Obtiene el nombre de la temporada (ej: "2024-25")
 */
export function getSeasonLabel(season: string): string {
  return season
}
