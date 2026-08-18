import { loadEnvConfig } from '@next/env'
import { loadStatsRoomDatasets, readSeasonArgument } from './stats-room-datasets'

loadEnvConfig(process.cwd())

function canonicalValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalValue)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, canonicalValue(item)])
    )
  }
  return value
}

function canonicalJson(value: unknown): string {
  return JSON.stringify(canonicalValue(value))
}

async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error('Falta DATABASE_URL en .env.local, .env o en el entorno.')
  }

  process.env.FANTASY_DATA_SOURCE = 'database'
  const datasets = await loadStatsRoomDatasets(readSeasonArgument())
  const [{ getStatsRoomData }, { closeDatabase }] = await Promise.all([
    import('../src/data/stats-room/repository'),
    import('../src/lib/database'),
  ])

  const failures: string[] = []
  let verified = 0
  try {
    for (const { seasonId, data: expected } of datasets) {
      const actual = await getStatsRoomData(seasonId)
      if (!actual) {
        failures.push(`${seasonId}: Stats Room ausente en PostgreSQL`)
        continue
      }

      verified += 1
      const comparisons: Array<[string, number, number]> = [
        ['standings', expected.standings.length, actual.standings.length],
        ['matchups', expected.regularSeasonMatchups.length, actual.regularSeasonMatchups.length],
        ['equipos 9CAT', expected.nineCatLeague.length, actual.nineCatLeague.length],
        ['filas 9CAT', expected.nineCatLeague.reduce((n, block) => n + block.rows.length, 0), actual.nineCatLeague.reduce((n, block) => n + block.rows.length, 0)],
        ['totales', expected.seasonStatsLeague?.length ?? 0, actual.seasonStatsLeague?.length ?? 0],
        ['orden de draft', expected.nextDraftOrder?.length ?? 0, actual.nextDraftOrder?.length ?? 0],
      ]

      for (const [label, expectedCount, actualCount] of comparisons) {
        if (expectedCount !== actualCount) {
          failures.push(`${seasonId}: ${label} esperaba ${expectedCount}, recibió ${actualCount}`)
        }
      }

      if (canonicalJson(expected.playoffBracket) !== canonicalJson(actual.playoffBracket)) {
        failures.push(`${seasonId}: playoff bracket distinto`)
      }
      if (canonicalJson(expected.consolationBrackets) !== canonicalJson(actual.consolationBrackets)) {
        failures.push(`${seasonId}: brackets de consolación distintos`)
      }
    }
  } finally {
    await closeDatabase()
  }

  if (failures.length) {
    throw new Error(`La verificación encontró ${failures.length} diferencia(s):\n- ${failures.join('\n- ')}`)
  }

  console.log(`Stats Room verificado: ${verified} temporada(s) con datos.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
