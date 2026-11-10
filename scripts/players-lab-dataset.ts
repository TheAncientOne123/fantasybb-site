import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { TransactionSql } from 'postgres'
import { isPlayersLabData, type PlayersLabData } from '../src/data/players-lab/types'

const STATUSES = new Set(['FA', 'WAIVERS', 'TEAM'])
const LABELS = new Set(['streamer', 'sleeper', 'bust', 'fluke', 'slump'])

function validate(data: PlayersLabData, seasonId: string, memberIds: Set<string>) {
  if (!isPlayersLabData(data, seasonId) || data.source !== 'ESPN') throw new Error('Dataset de Players Lab inválido.')
  if (data.players.length === 0) throw new Error('El Players Lab no tiene jugadores.')
  const ids = new Set<number>()
  for (const player of data.players) {
    if (!Number.isSafeInteger(player.id) || ids.has(player.id) || !player.name?.trim()) {
      throw new Error(`Jugador inválido o repetido en Players Lab: ${player.id}.`)
    }
    ids.add(player.id)
    if (!STATUSES.has(player.status)) throw new Error(`Estado inválido para ${player.name}: ${player.status}.`)
    if (player.status === 'TEAM' && player.fantasyTeamId && !memberIds.has(player.fantasyTeamId)) {
      throw new Error(`${player.name} apunta a un equipo que no está en la temporada: ${player.fantasyTeamId}.`)
    }
    if (!player.windows || typeof player.windows !== 'object' || !Array.isArray(player.labels) ||
        player.labels.some((label) => !LABELS.has(label.kind) || typeof label.reason !== 'string')) {
      throw new Error(`Ventanas o etiquetas inválidas para ${player.name}.`)
    }
  }
}

export async function importPlayersLab(sql: TransactionSql, seasonId: string): Promise<boolean> {
  const text = await readFile(resolve('src/data/seasons', seasonId, 'players-lab.json'), 'utf8').catch(
    (error: NodeJS.ErrnoException) => {
      if (error.code !== 'ENOENT') throw error
      return null
    }
  )
  if (!text) return false
  const data = JSON.parse(text) as PlayersLabData
  const members = await sql<Array<{ team_id: string }>>`select team_id from season_teams where season_id = ${seasonId}`
  validate(data, seasonId, new Set(members.map((row) => row.team_id)))
  await sql`
    insert into players_lab_snapshots (season_id, method_version, generated_at, data)
    values (${seasonId}, ${data.methodVersion}, ${data.generatedAt}, ${sql.json(data as never)})
    on conflict (season_id) do update set
      method_version = excluded.method_version,
      generated_at = excluded.generated_at,
      data = excluded.data,
      updated_at = now()
    where excluded.generated_at >= players_lab_snapshots.generated_at
  `
  return true
}
