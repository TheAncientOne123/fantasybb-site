import type { Metadata } from 'next'
import PlayersLabView from '@/components/players/PlayersLabView'
import { getLeagueCatalog } from '@/data/catalog/repository'
import { getPlayersLab } from '@/data/players-lab/repository'
import type { PlayersLabData } from '@/data/players-lab/types'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Players Lab · LACMSI League',
  description: 'Métricas de jugadores libres, en waivers y de todo el universo de fantasy.',
}

/** Los intentos y anotados sólo sirven para calcular porcentajes: no se envían al navegador. */
function slimForClient(data: PlayersLabData): PlayersLabData {
  return {
    ...data,
    players: data.players.map((player) => ({
      ...player,
      windows: Object.fromEntries(
        Object.entries(player.windows).map(([key, window]) => [
          key,
          window && { ...window, fgm: null, fga: null, ftm: null, fta: null, tpa: null },
        ])
      ),
    })),
  }
}

type Props = {
  searchParams?: {
    season?: string | string[]
  }
}

export default async function PlayersPage({ searchParams }: Props) {
  const catalog = await getLeagueCatalog()
  const requestedSeason = Array.isArray(searchParams?.season) ? searchParams.season[0] : searchParams?.season
  const selectedSeason =
    catalog.seasons.find((season) => season.id === requestedSeason) ??
    catalog.seasons.find((season) => season.isActive) ??
    catalog.seasons[0]
  const seasonId = selectedSeason?.id ?? '2027'
  const data = await getPlayersLab(seasonId)

  return (
    <PlayersLabView
      data={data ? slimForClient(data) : null}
      seasonId={seasonId}
      seasons={catalog.seasons}
      teams={catalog.teamsBySeason[seasonId] ?? []}
    />
  )
}
