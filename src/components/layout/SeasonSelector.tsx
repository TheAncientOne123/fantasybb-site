'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const seasons = [
  { value: '2025-26', label: '2025-26', seasonId: 2026 },
  { value: '2024-25', label: '2024-25', seasonId: 2025 },
  { value: '2023-24', label: '2023-24', seasonId: 2024 },
]

export interface SeasonSelectorProps {
  selectedSeason?: string
  onSeasonChange?: (season: string, seasonId: number) => void
}

export function SeasonSelector({ selectedSeason: controlledSeason, onSeasonChange }: SeasonSelectorProps = {}) {
  const [internalSeason, setInternalSeason] = useState('2025-26')
  const selectedSeason = controlledSeason || internalSeason
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 transition-colors"
      >
        <span>Season: {selectedSeason}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-40 rounded-lg bg-slate-800 border border-slate-700 shadow-lg z-20">
            {seasons.map((season) => (
              <button
                key={season.value}
                onClick={() => {
                  if (onSeasonChange) {
                    onSeasonChange(season.value, season.seasonId)
                  } else {
                    setInternalSeason(season.value)
                  }
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {season.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
