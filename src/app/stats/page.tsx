import Link from 'next/link'
import { SEASONS } from '@/data/seasons'
import { getStatsRoomData } from '@/data/getStatsRoomData'
import StatsRoomView from '@/components/stats/StatsRoomView'

export default async function StatsPage() {
  const seasonId = SEASONS[0]?.id ?? '2026'
  const data = await getStatsRoomData(seasonId)

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
        <div className="mx-auto max-w-lg space-y-4 text-center">
          <h1 className="font-heading text-2xl font-bold">Stats Room</h1>
          <p className="text-sm text-slate-400">
            No se encontró <code className="text-slate-300">stats-room.ts</code> para la temporada activa.
            Genera datos con{' '}
            <code className="text-slate-300">python analytics/generate_team_data.py</code>.
          </p>
          <Link
            href="/"
            className="inline-block rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return <StatsRoomView data={data} seasons={SEASONS} />
}
