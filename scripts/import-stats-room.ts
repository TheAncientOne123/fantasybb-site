import { loadEnvConfig } from '@next/env'
import postgres from 'postgres'
import { loadStatsRoomDatasets, readSeasonArgument } from './stats-room-datasets'

loadEnvConfig(process.cwd())

function jsonValue(value: unknown) {
  return JSON.parse(JSON.stringify(value))
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (!databaseUrl) throw new Error('Falta DATABASE_URL en .env.local, .env o en el entorno.')

  const datasets = await loadStatsRoomDatasets(readSeasonArgument())
  const sql = postgres(databaseUrl, { max: 1, connect_timeout: 10 })

  try {
    await sql.begin(async (transaction) => {
      for (const { seasonId, data } of datasets) {
        const seasonRows = await transaction<Array<{ id: string }>>`
          select id from seasons where id = ${seasonId}
        `
        if (!seasonRows[0]) {
          throw new Error(`La temporada ${seasonId} no existe en PostgreSQL.`)
        }

        // El dataset de ESPN es también la fuente de membresía para equipos nuevos.
        for (const standing of data.standings) {
          await transaction`
            insert into teams (id, display_name)
            values (${standing.teamId}, ${standing.displayName.trim()})
            on conflict (id) do update set display_name = excluded.display_name
          `
          await transaction`
            insert into season_teams (season_id, team_id, is_expansion)
            values (
              ${seasonId},
              ${standing.teamId},
              not exists (
                select 1 from season_teams existing where existing.team_id = ${standing.teamId}
              )
            )
            on conflict (season_id, team_id) do nothing
          `
        }

        await transaction`
          insert into stats_room_snapshots (
            season_id,
            generated_at,
            playoff_bracket,
            consolation_brackets
          ) values (
            ${seasonId},
            ${data.generatedAt ?? null},
            ${transaction.json(jsonValue(data.playoffBracket))},
            ${data.consolationBrackets
              ? transaction.json(jsonValue(data.consolationBrackets))
              : null}
          )
          on conflict (season_id) do update set
            generated_at = excluded.generated_at,
            playoff_bracket = excluded.playoff_bracket,
            consolation_brackets = excluded.consolation_brackets,
            updated_at = now()
        `

        await transaction`delete from stats_standings where season_id = ${seasonId}`
        await transaction`delete from stats_regular_season_matchups where season_id = ${seasonId}`
        await transaction`delete from stats_nine_cat where season_id = ${seasonId}`
        await transaction`delete from stats_season_totals where season_id = ${seasonId}`
        await transaction`delete from stats_next_draft_order where season_id = ${seasonId}`

        for (const row of data.standings) {
          await transaction`
            insert into stats_standings (
              season_id, team_id, display_name, wins, losses, ties, rank
            ) values (
              ${seasonId}, ${row.teamId}, ${row.displayName.trim()},
              ${row.wins}, ${row.losses}, ${row.ties}, ${row.rank}
            )
          `
        }

        for (const row of data.regularSeasonMatchups) {
          await transaction`
            insert into stats_regular_season_matchups (
              season_id, week, team_a_id, team_b_id, score_a, score_b
            ) values (
              ${seasonId}, ${row.week}, ${row.teamAId}, ${row.teamBId},
              ${row.scoreA}, ${row.scoreB}
            )
          `
        }

        for (const block of data.nineCatLeague) {
          for (const row of block.rows) {
            await transaction`
              insert into stats_nine_cat (
                season_id, team_id, category, rank, value_display
              ) values (
                ${seasonId}, ${block.teamId}, ${row.category}, ${row.rank}, ${row.valueDisplay}
              )
            `
          }
        }

        for (const row of data.seasonStatsLeague ?? []) {
          await transaction`
            insert into stats_season_totals (season_id, team_id, stats)
            values (${seasonId}, ${row.teamId}, ${transaction.json(jsonValue(row.stats))})
          `
        }

        for (const row of data.nextDraftOrder ?? []) {
          await transaction`
            insert into stats_next_draft_order (
              season_id, pick, team_id, label, locked
            ) values (
              ${seasonId}, ${row.pick}, ${row.teamId}, ${row.label}, ${row.locked ?? false}
            )
          `
        }
      }
    })

    console.log(
      `Stats Room importado: ${datasets.length} temporada(s), ${datasets.reduce((sum, entry) => sum + entry.data.regularSeasonMatchups.length, 0)} matchup(s).`
    )
  } finally {
    await sql.end({ timeout: 5 })
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
