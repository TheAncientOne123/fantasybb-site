import { loadEnvConfig } from '@next/env'
import postgres from 'postgres'
import { readSeasonArgument } from './stats-room-datasets'
import { importRosterQuality } from './roster-quality-dataset'

loadEnvConfig(process.cwd())
async function main() {
  const seasonId = readSeasonArgument()
  if (!seasonId || !process.env.DATABASE_URL?.trim()) throw new Error('Faltan --season o DATABASE_URL.')
  const sql = postgres(process.env.DATABASE_URL, { max: 1, connect_timeout: 10 })
  try {
    await sql.begin(async (transaction) => {
      if (!await importRosterQuality(transaction, seasonId)) throw new Error('No existe la captura de calidad.')
    })
    console.log(`Calidad de roster importada para ${seasonId}; se conservan la proyección original y el cierre archivado.`)
  } finally { await sql.end({ timeout: 5 }) }
}
main().catch((error) => { console.error(error); process.exitCode = 1 })
