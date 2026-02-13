'use client'

import { useState, useEffect } from 'react'
import { SeasonSelector } from '@/components/layout/SeasonSelector'
import { WeekSelector } from '@/components/layout/WeekSelector'

export interface DateFiltersProps {
  onSeasonChange?: (season: string, seasonId: number) => void
  onWeekChange?: (week: number) => void
  defaultSeason?: string
  defaultWeek?: number
  maxWeek?: number
  className?: string
}

export function DateFilters({
  onSeasonChange,
  onWeekChange,
  defaultSeason = '2025-26',
  defaultWeek = 1,
  maxWeek,
  className = ''
}: DateFiltersProps) {
  const [selectedSeason, setSelectedSeason] = useState(defaultSeason)
  const [selectedWeek, setSelectedWeek] = useState(defaultWeek)

  // Sincronizar con props externas si cambian
  useEffect(() => {
    if (defaultSeason) setSelectedSeason(defaultSeason)
  }, [defaultSeason])

  useEffect(() => {
    if (defaultWeek) setSelectedWeek(defaultWeek)
  }, [defaultWeek])

  // Obtener seasonId del season seleccionado
  const getSeasonId = (season: string): number => {
    const seasonMap: Record<string, number> = {
      '2025-26': 2026,
      '2024-25': 2025,
      '2023-24': 2024,
    }
    return seasonMap[season] || 2026
  }

  const handleSeasonChange = (season: string, seasonId: number) => {
    setSelectedSeason(season)
    if (onSeasonChange) {
      onSeasonChange(season, seasonId)
    }
  }

  const handleWeekChange = (week: number) => {
    setSelectedWeek(week)
    if (onWeekChange) {
      onWeekChange(week)
    }
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <SeasonSelector
        selectedSeason={selectedSeason}
        onSeasonChange={handleSeasonChange}
      />
      <WeekSelector
        selectedWeek={selectedWeek}
        onWeekChange={handleWeekChange}
        maxWeek={maxWeek}
      />
    </div>
  )
}
