import RewindPlayerClient from '@/components/rewind/RewindPlayerClient'

type PageProps = {
  params: { seasonId: string; teamId: string }
}

export default function RewindPlayerPage({ params }: PageProps) {
  return <RewindPlayerClient seasonId={params.seasonId} teamId={params.teamId} />
}
