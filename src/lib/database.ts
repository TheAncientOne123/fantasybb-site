import postgres, { type Sql } from 'postgres'

export type FantasyDataSource = 'auto' | 'database' | 'static'

const globalForDatabase = globalThis as typeof globalThis & {
  fantasyDatabase?: Sql
}

export function getFantasyDataSource(): FantasyDataSource {
  const value = process.env.FANTASY_DATA_SOURCE?.trim().toLowerCase() || 'auto'
  if (value === 'auto' || value === 'database' || value === 'static') return value
  throw new Error(
    `FANTASY_DATA_SOURCE debe ser "auto", "database" o "static"; se recibió "${value}".`
  )
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim())
}

export function getDatabase(): Sql {
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (!databaseUrl) {
    throw new Error('Falta DATABASE_URL. Configúrala en .env.local antes de usar PostgreSQL.')
  }

  if (!globalForDatabase.fantasyDatabase) {
    globalForDatabase.fantasyDatabase = postgres(databaseUrl, {
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
    })
  }

  return globalForDatabase.fantasyDatabase
}

export async function closeDatabase(): Promise<void> {
  if (!globalForDatabase.fantasyDatabase) return
  await globalForDatabase.fantasyDatabase.end({ timeout: 5 })
  delete globalForDatabase.fantasyDatabase
}
