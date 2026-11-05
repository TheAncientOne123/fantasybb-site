import { notFound } from 'next/navigation'
import TeamProfileView, { pickProfileSeason } from '@/components/team/TeamProfileView'
import { getLeagueCatalog } from '@/data/catalog/repository'
import { getAchievementDetails } from '@/data/team-profiles/achievement-details'
import { getTeamProfile } from '@/data/team-profiles/repository'
import { getAllRewindTeamIds } from '@/data/getTeamRewind'

export const revalidate = 300

export function generateStaticParams() {
  return getAllRewindTeamIds().map((teamId) => ({ teamId }))
}

export default async function TeamProfilePage({
  params,
  searchParams,
}: {
  params: { teamId: string }
  searchParams?: { season?: string | string[] }
}) {
  const profile = await getTeamProfile(params.teamId)
  if (!profile) notFound()
  const selectedSeasonId = typeof searchParams?.season === 'string' ? searchParams.season : undefined
  const season = pickProfileSeason(profile, selectedSeasonId)
  const catalog = await getLeagueCatalog()
  const achievementDetails = season
    ? await getAchievementDetails(season, profile.id, catalog.teamsBySeason[season.seasonId] ?? [])
    : {}
  return (
    <TeamProfileView
      profile={profile}
      selectedSeasonId={selectedSeasonId}
      achievementDetails={achievementDetails}
    />
  )
}
