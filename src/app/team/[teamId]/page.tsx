import { notFound } from 'next/navigation'
import TeamProfileView from '@/components/team/TeamProfileView'
import { buildTeamProfile } from '@/data/team-profiles/buildFromRewind'
import { getAllRewindTeamIds } from '@/data/getTeamRewind'

export function generateStaticParams() {
  return getAllRewindTeamIds().map((teamId) => ({ teamId }))
}

export default async function TeamProfilePage({ params }: { params: { teamId: string } }) {
  const profile = await buildTeamProfile(params.teamId)
  if (!profile) notFound()
  return <TeamProfileView profile={profile} />
}
