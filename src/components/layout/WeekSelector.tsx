'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

// Fantasy basketball típicamente tiene 18 semanas de temporada regular
const TOTAL_WEEKS = 18
const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1)

export interface WeekSelectorProps {
  selectedWeek?: number
  onWeekChange?: (week: number) => void
  maxWeek?: number // Semana máxima disponible (puede ser menor si la temporada no ha terminado)
}

export function WeekSelector({ selectedWeek: controlledWeek, onWeekChange, maxWeek }: WeekSelectorProps = {}) {
  const [internalWeek, setInternalWeek] = useState(1)
  const selectedWeek = controlledWeek || internalWeek
  const availableWeeks = maxWeek ? weeks.slice(0, maxWeek) : weeks
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 transition-colors"
      >
        <span>Week: {selectedWeek}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-32 max-h-64 overflow-y-auto rounded-lg bg-slate-800 border border-slate-700 shadow-lg z-20 custom-scrollbar">
            {availableWeeks.map((week) => (
              <button
                key={week}
                onClick={() => {
                  if (onWeekChange) {
                    onWeekChange(week)
                  } else {
                    setInternalWeek(week)
                  }
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Semana {week}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
