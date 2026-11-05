import { getLeagueCatalog } from '@/data/catalog/repository'
import LeagueHero from '@/components/landing/LeagueHero'
import LeagueNav from '@/components/landing/LeagueNav'
import LeagueIntro from '@/components/landing/LeagueIntro'
import LeagueMembers from '@/components/landing/LeagueMembers'
import LeagueRules from '@/components/landing/LeagueRules'
import SeasonChampions from '@/components/landing/SeasonChampions'
import { SiteFooter } from '@/components/ui'

export const revalidate = 300

export default async function LandingPage() {
  const catalog = await getLeagueCatalog()
  const activeSeason = catalog.seasons.find((season) => season.isActive)
  const displayedSeason =
    activeSeason && (catalog.teamsBySeason[activeSeason.id]?.length ?? 0) > 0
      ? activeSeason
      : catalog.seasons.find((season) => (catalog.teamsBySeason[season.id]?.length ?? 0) > 0)
  const teams = displayedSeason ? catalog.teamsBySeason[displayedSeason.id] ?? [] : []

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <LeagueHero />
      <LeagueNav />
      <LeagueIntro />
      <LeagueMembers teams={teams} />
      <LeagueRules />
      <SeasonChampions />
      <SiteFooter />
    </div>
  )
}
