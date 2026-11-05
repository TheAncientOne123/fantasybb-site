import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { readSeasonArgument } from './stats-room-datasets'
import { getTeamsForSeason } from '../src/data/teams'
import { buildTeamProfile } from '../src/data/team-profiles/buildFromRewind'

async function main() {
  const seasonId = readSeasonArgument()
  if (!seasonId) throw new Error('Falta --season.')
  const teams = await Promise.all(getTeamsForSeason(seasonId).map(async (team) => {
    const profile = await buildTeamProfile(team.id)
    const season = profile?.seasons.find((row) => row.seasonId === seasonId)
    if (!season) throw new Error(`Falta el perfil histórico ${team.id}/${seasonId}`)
    return { id: team.id,
      currentRoster: season.finalRoster.map((player) => ({ playerId: player.playerId ?? null })),
      draftedRoster: (season.draftedRoster ?? []).map((player) => ({ playerId: player.playerId ?? null })),
    }
  }))
  if (!teams.length) throw new Error('No hay rosters históricos archivados.')
  await writeFile(resolve('src/data/seasons', seasonId, 'quality-rosters.json'), JSON.stringify({ seasonId, teams }, null, 2) + '\n')
  console.log(`Rosters históricos para evaluación: ${teams.length}, temporada ${seasonId}.`)
}
main().catch((error) => { console.error(error); process.exitCode = 1 })
