import { getHallOfFameData } from '@/data/getHallOfFame'
import HallOfFameView from '@/components/hall-of-fame/HallOfFameView'

export default async function AwardsPage() {
  const data = await getHallOfFameData()
  return <HallOfFameView data={data} />
}
