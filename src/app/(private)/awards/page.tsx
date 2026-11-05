import { getHallOfFameData } from '@/data/getHallOfFame'
import HallOfFameView from '@/components/hall-of-fame/HallOfFameView'
import { getLeagueCatalog } from '@/data/catalog/repository'
import { TeamIdentityProvider } from '@/components/team/TeamIdentityProvider'

export const revalidate = 300

export default async function AwardsPage() {
  const [data, catalog] = await Promise.all([getHallOfFameData(), getLeagueCatalog()])
  const activeSeason = catalog.seasons.find((season) => season.isActive) ?? catalog.seasons[0]
  return <TeamIdentityProvider teams={catalog.teamsBySeason[activeSeason?.id] ?? []}>
    <HallOfFameView data={data} seasons={catalog.seasons} teamsBySeason={catalog.teamsBySeason} />
  </TeamIdentityProvider>
}
