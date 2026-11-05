'use client'

import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

type SeasonOption = {
  id: string
  label: string
}

export default function TeamSeasonSelector({
  teamId,
  seasons,
  selectedSeasonId,
}: {
  teamId: string
  seasons: SeasonOption[]
  selectedSeasonId: string
}) {
  const router = useRouter()

  return (
    <div className="relative shrink-0">
      <label htmlFor="team-profile-season" className="sr-only">
        Filtrar estadísticas por temporada
      </label>
      <select
        id="team-profile-season"
        value={selectedSeasonId}
        onChange={(event) => {
          router.replace(`/team/${teamId}?season=${encodeURIComponent(event.target.value)}`, {
            scroll: false,
          })
        }}
        className="cursor-pointer appearance-none rounded-full border border-slate-600 bg-slate-900 py-1.5 pl-3 pr-9 text-xs font-semibold uppercase tracking-wider text-slate-300 outline-none transition hover:border-amber-400/50 hover:text-white focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/30"
      >
        {seasons.map((season) => (
          <option key={season.id} value={season.id}>
            {season.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      />
    </div>
  )
}
