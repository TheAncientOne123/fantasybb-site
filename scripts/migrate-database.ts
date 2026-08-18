import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { loadEnvConfig } from '@next/env'
import postgres from 'postgres'

loadEnvConfig(process.cwd())

async function main() {
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (!databaseUrl) throw new Error('Falta DATABASE_URL en .env.local o en el entorno.')

  const sql = postgres(databaseUrl, { max: 1, connect_timeout: 10 })
  try {
    await sql`
      create table if not exists schema_migrations (
        filename text primary key,
        applied_at timestamptz not null default now()
      )
    `

    const migrationsDirectory = path.join(process.cwd(), 'database', 'migrations')
    const filenames = (await readdir(migrationsDirectory))
      .filter((filename) => filename.endsWith('.sql'))
      .sort((left, right) => left.localeCompare(right))

    for (const filename of filenames) {
      const applied = await sql<{ exists: boolean }[]>`
        select exists(
          select 1 from schema_migrations where filename = ${filename}
        ) as exists
      `
      if (applied[0]?.exists) {
        console.log(`skip  ${filename}`)
        continue
      }

      const migration = await readFile(path.join(migrationsDirectory, filename), 'utf8')
      await sql.begin(async (transaction) => {
        await transaction.unsafe(migration).simple()
        await transaction`
          insert into schema_migrations (filename) values (${filename})
        `
      })
      console.log(`apply ${filename}`)
    }
  } finally {
    await sql.end({ timeout: 5 })
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
