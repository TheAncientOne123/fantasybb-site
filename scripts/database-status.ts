import { loadEnvConfig } from '@next/env'
import postgres from 'postgres'

loadEnvConfig(process.cwd())

async function main() {
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (!databaseUrl) throw new Error('Falta DATABASE_URL en .env.local, .env o en el entorno.')

  const sql = postgres(databaseUrl, { max: 1, connect_timeout: 10 })
  try {
    const rows = await sql<
      Array<{
        season_id: string
        label: string
        is_active: boolean
        team_count: number
        expansion_count: number
        has_stats: boolean
        matchup_count: number
      }>
    >`
      select
        s.id as season_id,
        s.label,
        s.is_active,
        count(st.team_id)::integer as team_count,
        count(st.team_id) filter (where st.is_expansion)::integer as expansion_count,
        exists (
          select 1 from stats_room_snapshots snapshot where snapshot.season_id = s.id
        ) as has_stats,
        (
          select count(*)::integer
          from stats_regular_season_matchups matchup
          where matchup.season_id = s.id
        ) as matchup_count
      from seasons s
      left join season_teams st on st.season_id = s.id
      group by s.id, s.label, s.is_active, s.year
      order by s.year desc, s.id desc
    `

    console.table(rows)
    if (rows.length === 0) {
      throw new Error('La base no contiene temporadas. Ejecuta npm run database:setup.')
    }
  } finally {
    await sql.end({ timeout: 5 })
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
