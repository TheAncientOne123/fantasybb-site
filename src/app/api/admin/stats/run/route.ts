import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import { getLeagueCatalog } from '@/data/catalog/repository'
import { readGeneratedStatsRoom } from '@/lib/generated-stats-room'
import { isLocalAdminHost } from '@/lib/local-admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Action = 'generate' | 'publish'
type RunnerGlobal = typeof globalThis & { __fantasyStatsAdminRunning?: boolean }

const runnerGlobal = globalThis as RunnerGlobal

function runCommand(
  command: string,
  args: string[],
  environment: NodeJS.ProcessEnv,
  write: (message: string) => void
): Promise<void> {
  return new Promise((resolveCommand, rejectCommand) => {
    write(`\n> ${command} ${args.join(' ')}\n`)
    const child = spawn(command, args, {
      cwd: process.cwd(),
      env: environment,
      shell: false,
      windowsHide: true,
    })

    child.stdout.on('data', (chunk) => write(String(chunk)))
    child.stderr.on('data', (chunk) => write(String(chunk)))
    child.on('error', rejectCommand)
    child.on('close', (code) => {
      if (code === 0) resolveCommand()
      else rejectCommand(new Error(`${command} terminó con código ${code ?? 'desconocido'}.`))
    })
  })
}

async function runPython(
  args: string[],
  environment: NodeJS.ProcessEnv,
  write: (message: string) => void
) {
  try {
    await runCommand('python', args, environment, write)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    write('No se encontró python; intentando con el launcher py de Windows.\n')
    await runCommand('py', ['-3', ...args], environment, write)
  }
}

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
  const seasonId = typeof body?.seasonId === 'string' ? body.seasonId : ''
  const action: Action | null =
    body?.action === 'generate' || body?.action === 'publish' ? body.action : null

  if (!/^\d{4}$/.test(seasonId)) {
    return Response.json({ error: 'Temporada inválida.' }, { status: 400 })
  }
  if (!action) {
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
      const environment = { ...process.env, YEAR: seasonId, PYTHONUNBUFFERED: '1' }
      const pythonScript = resolve(process.cwd(), 'analytics', 'generate_team_data.py')
      const tsxRunner = resolve(process.cwd(), 'scripts', 'run-tsx.cjs')

      void (async () => {
        try {
          if (action === 'generate') {
            write(`Generando borrador local de Stats Room ${seasonId}.\n`)
            write('Consultando ESPN y generando archivos locales...\n')
            await runPython([pythonScript, '--season', seasonId], environment, write)
            write('\n[DONE] Borrador generado. Revísalo antes de publicarlo.\n')
          } else {
            write(`Publicando Stats Room ${seasonId} en Neon.\n`)
            write('Paso 1/2: importando el borrador generado...\n')
            await runCommand(
              process.execPath,
              [tsxRunner, 'scripts/import-stats-room.ts', '--season', seasonId],
              environment,
              write
            )

            write('\nPaso 2/2: verificando la importación...\n')
            await runCommand(
              process.execPath,
              [tsxRunner, 'scripts/verify-stats-room-import.ts', '--season', seasonId],
              environment,
              write
            )
            write('\n[DONE] Estadísticas publicadas y verificadas correctamente.\n')
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          write(`\n[ERROR] ${message}\n`)
        } finally {
          runnerGlobal.__fantasyStatsAdminRunning = false
          controller.close()
        }
      })()
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
