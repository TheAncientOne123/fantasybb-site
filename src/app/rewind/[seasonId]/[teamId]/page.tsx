import RewindPlayerClient from '@/components/rewind/RewindPlayerClient'
import { getLeagueCatalog } from '@/data/catalog/repository'
import { TeamIdentityProvider } from '@/components/team/TeamIdentityProvider'

type PageProps = {
  params: { seasonId: string; teamId: string }
}

export default async function RewindPlayerPage({ params }: PageProps) {
  const catalog = await getLeagueCatalog()
  return <TeamIdentityProvider teams={catalog.teamsBySeason[params.seasonId] ?? []}>
    <RewindPlayerClient seasonId={params.seasonId} teamId={params.teamId} />
  </TeamIdentityProvider>
}
