import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import QuickAccess from '@/components/landing/QuickAccess'
import GiphyBackdrop from '@/components/ui/GiphyBackdrop'
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <GiphyBackdrop query="NBA basketball" limit={80} />
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 px-6 py-4 backdrop-blur-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Volver a la liga
        </Link>
      </header>
      <div className="relative z-10">
        <QuickAccess seasons={catalog.seasons} teamsBySeason={catalog.teamsBySeason} availableRewinds={availableRewinds} />
      </div>
    </div>
  )
}

