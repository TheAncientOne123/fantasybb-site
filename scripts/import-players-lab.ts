import { loadEnvConfig } from '@next/env'
import postgres from 'postgres'
import { readSeasonArgument } from './stats-room-datasets'
import { importPlayersLab } from './players-lab-dataset'

loadEnvConfig(process.cwd())
async function main() {
  const seasonId = readSeasonArgument()
  if (!seasonId || !process.env.DATABASE_URL?.trim()) throw new Error('Faltan --season o DATABASE_URL.')
  const sql = postgres(process.env.DATABASE_URL, { max: 1, connect_timeout: 10 })
  try {
    let imported = false
    await sql.begin(async (transaction) => {
      imported = await importPlayersLab(transaction, seasonId)
    })
    console.log(
      imported
        ? `Players Lab importado para ${seasonId}.`
        : `No hay players-lab.json para ${seasonId}; se conserva la captura anterior.`
    )
  } finally {
    await sql.end({ timeout: 5 })
  }
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
