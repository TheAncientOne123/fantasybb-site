import { getGeneratedStatsRoomPreview } from '@/lib/generated-stats-room'
import { isLocalAdminHost } from '@/lib/local-admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  if (!isLocalAdminHost(request.headers.get('host'))) {
    return new Response('Not found', { status: 404 })
  }

  const seasonId = new URL(request.url).searchParams.get('season') ?? ''
  if (!/^\d{4}$/.test(seasonId)) {
    return Response.json({ error: 'Temporada inválida.' }, { status: 400 })
  }

  const preview = await getGeneratedStatsRoomPreview(seasonId)
  return Response.json({ preview }, { headers: { 'Cache-Control': 'no-store' } })
}
