import { getLeagueCatalog } from '@/data/catalog/repository'
import { isLocalAdminHost } from '@/lib/local-admin'
import { isSeasonId, isStatsAction, readGeneratedStatsRoom, runStatsAction } from '@/lib/stats-pipeline'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type RunnerGlobal = typeof globalThis & { __fantasyStatsAdminRunning?: boolean }

const runnerGlobal = globalThis as RunnerGlobal

export async function POST(request: Request) {
  if (!isLocalAdminHost(request.headers.get('host'))) {
    return new Response('Not found', { status: 404 })
  }
  if (runnerGlobal.__fantasyStatsAdminRunning) {
    return Response.json({ error: 'Ya hay un proceso de estadísticas en curso.' }, { status: 409 })
  }

  const body = (await request.json().catch(() => null)) as {
    seasonId?: unknown
    action?: unknown
  } | null
  const seasonId = body?.seasonId
  const action = body?.action

  if (!isSeasonId(seasonId)) {
    return Response.json({ error: 'Temporada inválida.' }, { status: 400 })
  }
  if (!isStatsAction(action) || action === 'daily') {
    return Response.json({ error: 'Acción inválida.' }, { status: 400 })
  }

  const catalog = await getLeagueCatalog()
  if (!catalog.seasons.some((season) => season.id === seasonId)) {
    return Response.json({ error: 'La temporada no existe en el catálogo de Neon.' }, { status: 400 })
  }
  if (action === 'publish' && !(await readGeneratedStatsRoom(seasonId))) {
    return Response.json(
      { error: 'Primero genera y revisa el borrador local de esta temporada.' },
      { status: 400 }
    )
  }

  runnerGlobal.__fantasyStatsAdminRunning = true
  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const write = (message: string) => controller.enqueue(encoder.encode(message))

      void runStatsAction(action, seasonId, write)
        .catch((error) => {
          const message = error instanceof Error ? error.message : String(error)
          write(`\n[ERROR] ${message}\n`)
        })
        .finally(() => {
          runnerGlobal.__fantasyStatsAdminRunning = false
          controller.close()
        })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
