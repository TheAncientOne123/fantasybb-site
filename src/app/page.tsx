'use client'

import { getTeamsForSeason } from '@/data/teams'
import { getActiveSeason } from '@/data/seasons'
import LeagueHero from '@/components/landing/LeagueHero'
import LeagueNav from '@/components/landing/LeagueNav'
import LeagueIntro from '@/components/landing/LeagueIntro'
import LeagueMembers from '@/components/landing/LeagueMembers'
import LeagueRules from '@/components/landing/LeagueRules'
import SeasonChampions from '@/components/landing/SeasonChampions'

export default function LandingPage() {
  const activeSeason = getActiveSeason()
  const teams = activeSeason ? getTeamsForSeason(activeSeason.id) : []

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <LeagueHero />
      <LeagueNav />
      <LeagueIntro />
      <LeagueMembers teams={teams} />
      <LeagueRules />
      <SeasonChampions />
      
      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} LACMSI League. Look at Curry man, so inspirational.
          </p>
        </div>
      </footer>
    </div>
  )
}
