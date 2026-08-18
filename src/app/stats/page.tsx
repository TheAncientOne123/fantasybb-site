import StatsRoomView from '@/components/stats/StatsRoomView'
import { getLeagueCatalog } from '@/data/catalog/repository'
import {
  createEmptyStatsRoomData,
  getStatsRoomData,
} from '@/data/stats-room/repository'

export const revalidate = 300

type Props = {
  searchParams?: {
    season?: string | string[]
  }
}

export default async function StatsPage({ searchParams }: Props) {
  const catalog = await getLeagueCatalog()
  const requestedSeason = Array.isArray(searchParams?.season)
    ? searchParams.season[0]
    : searchParams?.season
  const selectedSeason =
    catalog.seasons.find((season) => season.id === requestedSeason) ??
    catalog.seasons.find((season) => season.isActive) ??
    catalog.seasons[0]
  const seasonId = selectedSeason?.id ?? '2026'
  const storedData = await getStatsRoomData(seasonId)

  return (
    <StatsRoomView
      data={storedData ?? createEmptyStatsRoomData(seasonId)}
      seasons={catalog.seasons}
      hasData={Boolean(storedData)}
    />
  )
}
