import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { TransactionSql } from 'postgres'
import type { RosterQualityMeasure, RosterQualitySeason } from '../src/data/team-profiles/roster-quality'

function validDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value))
}

function validateMeasurement(row: RosterQualityMeasure) {
  if (!row || !Number.isSafeInteger(row.knownPlayers) || !Number.isSafeInteger(row.totalPlayers) ||
      row.knownPlayers < 0 || row.totalPlayers < 0 || row.knownPlayers > row.totalPlayers ||
      (row.rawValue !== null && !Number.isFinite(row.rawValue)) ||
      (row.score !== null && (!Number.isFinite(row.score) || row.score < 0 || row.score > 100)) ||
      (row.rank !== null && (!Number.isSafeInteger(row.rank) || row.rank < 1)) ||
      (row.score !== null && (row.totalPlayers === 0 || row.knownPlayers !== row.totalPlayers || row.rawValue === null || row.rank === null))) {
    throw new Error('Medición de calidad inválida o cobertura incompleta con calificación.')
  }
}

export async function importRosterQuality(sql: TransactionSql, seasonId: string): Promise<boolean> {
  const text = await readFile(resolve('src/data/seasons', seasonId, 'roster-quality.json'), 'utf8').catch((error: NodeJS.ErrnoException) => {
    if (error.code !== 'ENOENT') throw error
    return null
  })
  if (!text) return false
  const data = JSON.parse(text) as RosterQualitySeason
  await persistRosterQuality(sql, seasonId, data)
  return true
}

export async function persistRosterQuality(sql: TransactionSql, seasonId: string, data: RosterQualitySeason) {
  if (data.seasonId !== seasonId || data.methodVersion !== 'fantasy-roster-v1' || data.source !== 'ESPN' ||
      !validDate(data.generatedAt) || !['captured', 'not-captured', 'unavailable'].includes(data.projectionStatus) ||
      (data.projectionStatus === 'captured') !== (data.projection !== null)) throw new Error('Dataset de calidad inválido.')
  const members = await sql<Array<{ team_id: string }>>`select team_id from season_teams where season_id = ${seasonId}`
  const memberIds = new Set(members.map((row) => row.team_id))
  for (const snapshot of [data.projection, data.performance]) {
    if (!snapshot) continue
    if (!validDate(snapshot.capturedAt) || !Number.isFinite(snapshot.windowGames) || snapshot.windowGames <= 0 ||
        !Array.isArray(snapshot.teams) || new Set(snapshot.teams.map((row) => row.teamId)).size !== snapshot.teams.length ||
        snapshot.teams.length !== memberIds.size || snapshot.teams.some((row) => !memberIds.has(row.teamId))) {
      throw new Error('La captura de calidad debe corresponder a todos los equipos de la temporada.')
    }
  }
  for (const row of data.projection?.teams ?? []) validateMeasurement(row)
  for (const row of data.performance?.teams ?? []) {
    validateMeasurement(row.drafted)
    validateMeasurement(row.final)
    const expected = row.drafted.score === null || row.final.score === null ? null
      : Math.round((row.final.score - row.drafted.score) * 10) / 10
    if (row.improvement !== expected) throw new Error('La mejora debe comparar las dos calificaciones de rendimiento real.')
  }
  await sql`
    insert into roster_quality_snapshots (season_id, method_version, generated_at, projection_status, projection, performance)
    values (${seasonId}, ${data.methodVersion}, ${data.generatedAt}, ${data.projectionStatus},
      ${data.projection ? sql.json(data.projection) : null}, ${data.performance ? sql.json(data.performance) : null})
    on conflict (season_id) do update set
      generated_at = excluded.generated_at,
      projection = coalesce(roster_quality_snapshots.projection, excluded.projection),
      projection_status = case when roster_quality_snapshots.projection is not null then 'captured' else excluded.projection_status end,
      performance = case when coalesce((roster_quality_snapshots.performance->>'isFinal')::boolean, false)
        then roster_quality_snapshots.performance else coalesce(excluded.performance, roster_quality_snapshots.performance) end
    where roster_quality_snapshots.method_version = excluded.method_version
      and excluded.generated_at >= roster_quality_snapshots.generated_at
  `
}
