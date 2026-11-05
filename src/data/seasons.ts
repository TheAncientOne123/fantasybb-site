/**
 * Available seasons for Fantasy Rewind
 */

export type Season = {
  id: string
  year: string
  label: string
  isActive: boolean
}

export const SEASONS: Season[] = [
  { id: '2027', year: '2027', label: '2026-27 Season', isActive: true },
  {
    id: '2026',
    year: '2026',
    label: '2025-26 Season',
    isActive: false,
  },
]

export function getActiveSeason(): Season | null {
  return SEASONS.find((s) => s.isActive) ?? SEASONS[0] ?? null
}

export function getSeasonById(id: string): Season | null {
  return SEASONS.find((s) => s.id === id) ?? null
}
