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
        className="cursor-pointer appearance-none rounded-full border border-zinc-600 bg-zinc-900 py-1.5 pl-3 pr-9 text-xs font-semibold uppercase tracking-wider text-zinc-300 outline-none transition hover:border-sky-500/60 hover:text-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
      >
        {seasons.map((season) => (
          <option key={season.id} value={season.id}>
            {season.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
      />
    </div>
  )
}
