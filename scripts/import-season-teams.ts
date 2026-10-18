import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnvConfig } from '@next/env'
import postgres from 'postgres'
import { readSeasonArgument } from './stats-room-datasets'

type TeamCatalog = {
  seasonId: string
  generatedAt?: string
  teams: Array<{
    id: string
    espnTeamId?: number
    displayName: string
    logoUrl?: string | null
  }>
}

loadEnvConfig(process.cwd())

async function main() {
  const seasonId = readSeasonArgument()
  if (!seasonId) throw new Error('Falta --season.')
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (!databaseUrl) throw new Error('Falta DATABASE_URL en el entorno.')

  const filePath = resolve(
    process.cwd(),
    'src',
    'data',
    'seasons',
    seasonId,
    'teams-catalog.json'
  )
  const catalog = JSON.parse(await readFile(filePath, 'utf8')) as TeamCatalog
  if (catalog.seasonId !== seasonId || !Array.isArray(catalog.teams) || catalog.teams.length === 0) {
    throw new Error(`El catálogo local de ${seasonId} no es válido o está vacío.`)
  }

  const sql = postgres(databaseUrl, { max: 1, connect_timeout: 10 })
  try {
    await sql.begin(async (transaction) => {
      const seasons = await transaction<Array<{ id: string }>>`
        select id from seasons where id = ${seasonId}
      `
      if (!seasons[0]) throw new Error(`La temporada ${seasonId} no existe en Neon.`)

      for (const team of catalog.teams) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(team.id) || !team.displayName.trim()) {
          throw new Error(`Equipo inválido en el catálogo: ${team.id || '(sin id)'}.`)
        }
        await transaction`
          insert into teams (id, display_name, logo_url)
          values (${team.id}, ${team.displayName.trim()}, ${team.logoUrl ?? null})
          on conflict (id) do update set
            display_name = excluded.display_name,
            logo_url = coalesce(excluded.logo_url, teams.logo_url),
            updated_at = now()
        `
        await transaction`
          insert into season_teams (season_id, team_id, is_expansion)
          values (
            ${seasonId},
            ${team.id},
            not exists (
              select 1 from season_teams previous where previous.team_id = ${team.id}
            )
          )
          on conflict (season_id, team_id) do nothing
        `
      }
    })

    console.log(`Equipos sincronizados en Neon: ${catalog.teams.length} para ${seasonId}.`)
  } finally {
    await sql.end({ timeout: 5 })
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
