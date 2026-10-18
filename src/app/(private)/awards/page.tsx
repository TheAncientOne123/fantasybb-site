import { getHallOfFameData } from '@/data/getHallOfFame'
import HallOfFameView from '@/components/hall-of-fame/HallOfFameView'
import { getLeagueCatalog } from '@/data/catalog/repository'

export const revalidate = 300

export default async function AwardsPage() {
  const [data, catalog] = await Promise.all([getHallOfFameData(), getLeagueCatalog()])
  return <HallOfFameView data={data} seasons={catalog.seasons} teamsBySeason={catalog.teamsBySeason} />
}
