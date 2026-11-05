import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnvConfig } from '@next/env'
import postgres from 'postgres'
import { readSeasonArgument } from './stats-room-datasets'
import type { SeasonRosters } from '../src/data/team-profiles/season-rosters'
import { importRosterQuality } from './roster-quality-dataset'

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
  const rosterText = await readFile(resolve(filePath, '..', 'team-rosters.json'), 'utf8').catch((error: NodeJS.ErrnoException) => {
    if (error.code !== 'ENOENT') throw error
    return null
  })
  const rosters: SeasonRosters | null = rosterText ? JSON.parse(rosterText) : null
  if (rosters && (rosters.seasonId !== seasonId || !Array.isArray(rosters.teams) || !Number.isFinite(Date.parse(rosters.generatedAt)))) {
    throw new Error('El archivo de rosters no corresponde a esta temporada o no es válido.')
  }
  if (new Set(catalog.teams.map((team) => team.id)).size !== catalog.teams.length) throw new Error('IDs duplicados.')
  if (rosters && (rosters.teams.length !== catalog.teams.length || new Set(rosters.teams.map((team) => team.id)).size !== rosters.teams.length)) {
    throw new Error('El archivo de rosters debe contener exactamente los equipos del catálogo.')
  }

  const sql = postgres(databaseUrl, { max: 1, connect_timeout: 10 })
  try {
    await sql.begin(async (transaction) => {
      const seasons = await transaction<Array<{ id: string }>>`
        select id from seasons where id = ${seasonId} for update
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
          where not exists (
            select 1 from season_teams newer join seasons s on s.id = newer.season_id
            where newer.team_id = teams.id and s.year > (select year from seasons where id = ${seasonId})
          )
        `
        await transaction`
          insert into season_teams (season_id, team_id, is_expansion, display_name, logo_url, espn_team_id)
          values (
            ${seasonId},
            ${team.id},
            not exists (
              select 1 from season_teams previous join seasons s on s.id = previous.season_id
              where previous.team_id = ${team.id} and s.year < (select year from seasons where id = ${seasonId})
            ),
            ${team.displayName.trim()}, ${team.logoUrl ?? null}, ${team.espnTeamId ?? null}
          )
          on conflict (season_id, team_id) do update set
            display_name = excluded.display_name,
            logo_url = excluded.logo_url,
            espn_team_id = coalesce(excluded.espn_team_id, season_teams.espn_team_id)
        `
      }
      for (const roster of rosters?.teams ?? []) {
        if (!catalog.teams.some((team) => team.id === roster.id) ||
            !Array.isArray(roster.currentRoster) || !Array.isArray(roster.draftedRoster) || !Array.isArray(roster.draftPicks)) {
          throw new Error(`Roster inválido: ${roster.id}`)
        }
        for (const player of [...roster.currentRoster, ...roster.draftedRoster]) {
          if (!Number.isSafeInteger(player.playerId) || !player.name?.trim()) throw new Error(`Jugador inválido: ${roster.id}`)
        }
        const previous = await transaction<Array<{ current_count: number; drafted_count: number }>>`
          select jsonb_array_length(current_roster) as current_count,
            jsonb_array_length(drafted_roster) as drafted_count
          from season_rosters where season_id = ${seasonId} and team_id = ${roster.id}
        `
        if ((previous[0]?.current_count > 0 && !roster.currentRoster.length) ||
            (previous[0]?.drafted_count > 0 && !roster.draftedRoster.length)) {
          throw new Error(`ESPN devolvió un roster vacío para ${roster.id}; se conserva la versión anterior.`)
        }
        await transaction`
          insert into season_rosters (season_id, team_id, generated_at, current_roster, drafted_roster, draft_picks)
          values (${seasonId}, ${roster.id}, ${rosters!.generatedAt}, ${transaction.json(roster.currentRoster)},
            ${transaction.json(roster.draftedRoster)}, ${transaction.json(roster.draftPicks)})
          on conflict (season_id, team_id) do update set
            generated_at = excluded.generated_at, current_roster = excluded.current_roster,
            drafted_roster = excluded.drafted_roster, draft_picks = excluded.draft_picks
          where excluded.generated_at >= season_rosters.generated_at
        `
      }
      await importRosterQuality(transaction, seasonId)
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
