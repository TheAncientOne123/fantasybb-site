import { notFound } from 'next/navigation'
import TeamProfileView from '@/components/team/TeamProfileView'
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
  return <TeamProfileView profile={profile} selectedSeasonId={selectedSeasonId} />
}
