import { loadEnvConfig } from '@next/env'
import { getAllRewindTeamIds } from '../src/data/getTeamRewind'
import { buildTeamProfile } from '../src/data/team-profiles/buildFromRewind'

loadEnvConfig(process.cwd())

async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error('Falta DATABASE_URL en .env.local o en el entorno.')
  }

  process.env.FANTASY_DATA_SOURCE = 'database'
  const [{ getTeamProfile }, { closeDatabase }] = await Promise.all([
    import('../src/data/team-profiles/repository'),
    import('../src/lib/database'),
  ])

  const failures: string[] = []
  let comparedSeasons = 0

  try {
    for (const teamId of getAllRewindTeamIds()) {
      const [expected, actual] = await Promise.all([
        buildTeamProfile(teamId),
        getTeamProfile(teamId),
      ])

      if (!expected || !actual) {
        failures.push(`${teamId}: perfil ${expected ? 'ausente en PostgreSQL' : 'ausente en archivos'}`)
        continue
      }

      if (actual.displayName.trim() !== expected.displayName.trim()) {
        failures.push(`${teamId}: nombre distinto`)
      }

      for (const expectedSeason of expected.seasons) {
        comparedSeasons += 1
        const actualSeason = actual.seasons.find(
          (season) => season.seasonId === expectedSeason.seasonId
        )
        if (!actualSeason) {
          failures.push(`${teamId}/${expectedSeason.seasonId}: temporada ausente`)
          continue
        }

        const comparisons: Array<[string, string | number, string | number]> = [
          ['récord', expectedSeason.record, actualSeason.record],
          ['standing', expectedSeason.regularSeasonRank, actualSeason.regularSeasonRank],
          ['logros', expectedSeason.achievements.length, actualSeason.achievements.length],
          ['roster final', expectedSeason.finalRoster.length, actualSeason.finalRoster.length],
          ['roster drafted', expectedSeason.draftedRoster?.length ?? 0, actualSeason.draftedRoster?.length ?? 0],
          ['permanencia', expectedSeason.longevityRoster?.length ?? 0, actualSeason.longevityRoster?.length ?? 0],
          ['9CAT', expectedSeason.nineCatFull?.length ?? 0, actualSeason.nineCatFull?.length ?? 0],
        ]
        for (const [field, expectedValue, actualValue] of comparisons) {
          if (expectedValue !== actualValue) {
            failures.push(
              `${teamId}/${expectedSeason.seasonId}: ${field} esperaba ${expectedValue}, recibió ${actualValue}`
            )
          }
        }
      }
    }
  } finally {
    await closeDatabase()
  }

  if (failures.length) {
    throw new Error(`La verificación encontró ${failures.length} diferencia(s):\n- ${failures.join('\n- ')}`)
  }

  console.log(
    `Verificación completa: ${getAllRewindTeamIds().length} equipo(s), ${comparedSeasons} perfil(es) de temporada.`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
