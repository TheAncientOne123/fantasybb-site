import QuickAccess from '@/components/landing/QuickAccess'
import GiphyBackdrop from '@/components/ui/GiphyBackdrop'
import { PageShell } from '@/components/ui'
import { getLeagueCatalog } from '@/data/catalog/repository'
import { teamExists } from '@/data/getTeamRewind'

export const revalidate = 300

export default async function RewindEntryPage() {
  const catalog = await getLeagueCatalog()
  const availableRewinds = Object.fromEntries(
    catalog.seasons.map((season) => [
      season.id,
      (catalog.teamsBySeason[season.id] ?? []).filter((team) => teamExists(season.id, team.id)).map((team) => team.id),
    ])
  )

  return (
    <PageShell background={<GiphyBackdrop query="NBA basketball" limit={80} />} className="pt-0 sm:pt-0">
      <QuickAccess seasons={catalog.seasons} teamsBySeason={catalog.teamsBySeason} availableRewinds={availableRewinds} />
    </PageShell>
  )
}

