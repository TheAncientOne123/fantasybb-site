import { loadEnvConfig } from '@next/env'
import postgres, { type TransactionSql } from 'postgres'
import { SEASONS } from '../src/data/seasons'
import { getAllRewindTeamIds } from '../src/data/getTeamRewind'
import { buildTeamProfile } from '../src/data/team-profiles/buildFromRewind'
import type { ProfileRosterPlayer, TeamProfileSeason } from '../src/data/team-profiles/types'

loadEnvConfig(process.cwd())

type RosterKind = 'final' | 'drafted' | 'longevity' | 'core' | 'waiver'

async function insertRoster(
  sql: TransactionSql,
  teamId: string,
  seasonId: string,
  rosterKind: RosterKind,
  players: ProfileRosterPlayer[] | undefined
) {
  for (const [position, player] of (players ?? []).entries()) {
    await sql`
      insert into profile_roster_entries (
        team_id,
        season_id,
        roster_kind,
        position,
        player_external_id,
        name,
        positions_json,
        headshot_url,
        pro_team_abbrev,
        team_logo_url,
        pro_team_from_nba_catalog,
        pro_team_name,
        lineup_weeks,
        key_piece_weeks,
        fantasy_points,
        stats_9cat
      ) values (
        ${teamId},
        ${seasonId},
        ${rosterKind},
        ${position},
        ${player.playerId ?? null},
        ${player.name},
        ${sql.json(player.positions ?? [])},
        ${player.headshotUrl ?? null},
        ${player.proTeamAbbrev ?? null},
        ${player.teamLogoUrl ?? null},
        ${player.proTeamFromNbaCatalog ?? null},
        ${player.proTeamName ?? null},
        ${player.lineupWeeks ?? null},
        ${player.keyPieceWeeks ?? null},
        ${player.fantasyPoints ?? null},
        ${sql.json(player.stats9cat ?? {})}
      )
    `
  }
}

async function insertSeasonDetails(
  sql: TransactionSql,
  teamId: string,
  season: TeamProfileSeason
) {
  for (const [position, achievement] of season.achievements.entries()) {
    await sql`
      insert into profile_achievements (
        team_id, season_id, position, name, label, image_url
      ) values (
        ${teamId},
        ${season.seasonId},
        ${position},
        ${achievement.name},
        ${achievement.label ?? null},
        ${achievement.image ?? null}
      )
    `
  }

  await insertRoster(sql, teamId, season.seasonId, 'final', season.finalRoster)
  await insertRoster(sql, teamId, season.seasonId, 'drafted', season.draftedRoster)
  await insertRoster(sql, teamId, season.seasonId, 'longevity', season.longevityRoster)
  await insertRoster(sql, teamId, season.seasonId, 'core', season.coreTeamRoster)
  await insertRoster(sql, teamId, season.seasonId, 'waiver', season.waiverRoster)

  const fullCategories = new Map(
    (season.nineCatFull ?? []).map((category) => [category.category, category])
  )
  for (const [category, rankValue] of Object.entries(season.categoryRanks9cat)) {
    if (fullCategories.has(category)) continue
    const rank = Number.parseInt(rankValue.replace(/\D/g, ''), 10) || 0
    fullCategories.set(category, { category, rank, valueDisplay: '—' })
  }

  for (const category of fullCategories.values()) {
    await sql`
      insert into team_category_stats (
        team_id, season_id, category, rank, value_display
      ) values (
        ${teamId},
        ${season.seasonId},
        ${category.category},
        ${category.rank},
        ${category.valueDisplay}
      )
    `
  }

  for (const row of season.nbaTeamComposition ?? []) {
    await sql`
      insert into team_nba_composition (
        team_id, season_id, team_abbrev, player_count, percentage
      ) values (
        ${teamId},
        ${season.seasonId},
        ${row.teamAbbrev},
        ${row.count},
        ${row.pct}
      )
    `
  }
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (!databaseUrl) throw new Error('Falta DATABASE_URL en .env.local o en el entorno.')

  const sql = postgres(databaseUrl, { max: 1, connect_timeout: 10 })
  try {
    const profiles = (
      await Promise.all(getAllRewindTeamIds().map((teamId) => buildTeamProfile(teamId)))
    ).filter((profile) => profile != null)

    await sql.begin(async (transaction) => {
      for (const season of SEASONS) {
        await transaction`
          insert into seasons (id, year, label, is_active)
          values (${season.id}, ${Number(season.year)}, ${season.label}, false)
          on conflict (id) do update set
            year = excluded.year,
            label = excluded.label,
            updated_at = now()
        `
      }

      const activeRows = await transaction<{ id: string }[]>`
        select id from seasons where is_active limit 1
      `
      const defaultActiveSeason = SEASONS.find((season) => season.isActive)
      if (activeRows.length === 0 && defaultActiveSeason) {
        await transaction`
          update seasons
          set is_active = true, updated_at = now()
          where id = ${defaultActiveSeason.id}
        `
      }

      for (const profile of profiles) {
        await transaction`
          insert into teams (id, display_name, owner, description, logo_url)
          values (
            ${profile.id},
            ${profile.displayName.trim()},
            ${profile.owner ?? null},
            ${profile.description ?? null},
            ${profile.logoUrl ?? null}
          )
          on conflict (id) do update set
            display_name = excluded.display_name,
            owner = excluded.owner,
            description = excluded.description,
            logo_url = excluded.logo_url,
            updated_at = now()
        `

        for (const season of profile.seasons) {
          await transaction`
            insert into season_teams (season_id, team_id, is_expansion)
            values (${season.seasonId}, ${profile.id}, false)
            on conflict (season_id, team_id) do nothing
          `

          await transaction`
            insert into team_seasons (
              team_id,
              season_id,
              display_name,
              owner,
              description,
              record,
              regular_season_rank,
              made_playoffs,
              won_finals,
              playoff_depth_label,
              longest_streaks,
              highest_scoring_week,
              debt_paid,
              longevity_key_weeks_team_avg
            ) values (
              ${profile.id},
              ${season.seasonId},
              ${profile.displayName.trim()},
              ${profile.owner ?? null},
              ${profile.description ?? null},
              ${season.record},
              ${season.regularSeasonRank},
              ${season.madePlayoffs},
              ${season.wonFinals},
              ${season.playoffDepthLabel},
              ${season.longestStreaks ?? null},
              ${season.highestScoringWeek ?? null},
              ${season.debtPaid},
              ${season.longevityKeyWeeksTeamAvg ?? null}
            )
            on conflict (team_id, season_id) do update set
              display_name = excluded.display_name,
              owner = excluded.owner,
              description = excluded.description,
              record = excluded.record,
              regular_season_rank = excluded.regular_season_rank,
              made_playoffs = excluded.made_playoffs,
              won_finals = excluded.won_finals,
              playoff_depth_label = excluded.playoff_depth_label,
              longest_streaks = excluded.longest_streaks,
              highest_scoring_week = excluded.highest_scoring_week,
              debt_paid = excluded.debt_paid,
              longevity_key_weeks_team_avg = excluded.longevity_key_weeks_team_avg,
              updated_at = now()
          `

          await transaction`
            delete from profile_achievements
            where team_id = ${profile.id} and season_id = ${season.seasonId}
          `
          await transaction`
            delete from profile_roster_entries
            where team_id = ${profile.id} and season_id = ${season.seasonId}
          `
          await transaction`
            delete from team_category_stats
            where team_id = ${profile.id} and season_id = ${season.seasonId}
          `
          await transaction`
            delete from team_nba_composition
            where team_id = ${profile.id} and season_id = ${season.seasonId}
          `

          await insertSeasonDetails(transaction, profile.id, season)
        }
      }
    })

    console.log(`Importación completa: ${SEASONS.length} temporada(s), ${profiles.length} equipo(s).`)
  } finally {
    await sql.end({ timeout: 5 })
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
