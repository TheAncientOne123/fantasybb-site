import { strict as assert } from 'node:assert'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnvConfig } from '@next/env'
import { getDatabase, closeDatabase } from '../src/lib/database'
import { getLeagueCatalog } from '../src/data/catalog/repository'
import { STATIC_ROSTERS, STATIC_TEAM_CATALOGS } from '../src/data/catalog/static'
import { getTeamProfile } from '../src/data/team-profiles/repository'

loadEnvConfig(process.cwd())
const baselinePath = resolve('node_modules/.cache/fantasybb/history-baseline.json')
const historicalTables = ['team_seasons', 'profile_achievements', 'profile_roster_entries',
  'team_category_stats', 'team_nba_composition', 'stats_room_snapshots', 'stats_standings',
  'stats_regular_season_matchups', 'stats_nine_cat', 'stats_season_totals', 'stats_next_draft_order']

async function historyHashes() {
  const hashes: Record<string, string> = {}
  for (const table of historicalTables) {
    // Identifiers come exclusively from the fixed allowlist above.
    const rows = await getDatabase().unsafe(`select to_jsonb(r) as row from ${table} r where season_id = '2026' order by to_jsonb(r)::text`)
    hashes[table] = createHash('sha256').update(JSON.stringify(rows)).digest('hex')
  }
  return hashes
}

async function main() {
  try {
    if (process.argv.includes('--capture')) {
      await mkdir(resolve(baselinePath, '..'), { recursive: true })
      await writeFile(baselinePath, JSON.stringify(await historyHashes()))
      console.log('Huella del historial 2026 guardada antes de la sincronización.')
      return
    }
    assert.deepEqual(await historyHashes(), JSON.parse(await readFile(baselinePath, 'utf8')),
      'La actualización debe conservar todos los datos estadísticos históricos.')
    const canonical = await getDatabase()<Array<{ id: string; display_name: string }>>`select id, display_name from teams`
    for (const identity of STATIC_TEAM_CATALOGS['2027'].teams) {
      assert.equal(canonical.find((team) => team.id === identity.id)?.display_name, identity.displayName.trim(),
        'Una importación histórica no debe revertir el nombre actual.')
    }
    assert.equal(canonical.length, new Set(Object.values(STATIC_TEAM_CATALOGS).flatMap((catalog) => catalog.teams.map((team) => team.id))).size,
      'Un cambio de nombre no debe crear otra franquicia.')
    for (const source of ['database', 'static']) {
      process.env.FANTASY_DATA_SOURCE = source
      const catalog = await getLeagueCatalog()
      assert.equal(catalog.seasons.find((season) => season.isActive)?.id, '2027')
      assert.equal(catalog.teamsBySeason['2027'].length, 12)
      assert.equal(catalog.teamsBySeason['2027'].filter((team) => team.isExpansion).length, 2)
      for (const [seasonId, expected] of Object.entries(STATIC_TEAM_CATALOGS)) {
        for (const identity of expected.teams) {
          const entry = catalog.teamsBySeason[seasonId].find((team) => team.id === identity.id)
          assert.equal(entry?.displayName, identity.displayName.trim())
          assert.equal(entry?.logoUrl, identity.logoUrl)
          const profile = await getTeamProfile(identity.id)
          const season = profile?.seasons.find((row) => row.seasonId === seasonId)
          assert.equal(season?.displayName, identity.displayName.trim())
          assert.equal(season?.logoUrl, identity.logoUrl)
          assert.equal(profile?.activeSeasonId, '2027')
          const expectedRoster = STATIC_ROSTERS[seasonId]?.teams.find((team) => team.id === identity.id)
          if (expectedRoster) {
            assert.deepEqual(season?.finalRoster, expectedRoster.currentRoster)
            assert.deepEqual(season?.draftedRoster, expectedRoster.draftedRoster)
            assert.equal(season?.hasStats, false)
          }
          if (identity.logoUrl?.startsWith('/')) await readFile(resolve('public', identity.logoUrl.slice(1)))
        }
      }
      console.log(`Verificado ${source}: identidades por temporada, prioridad actual, 12 rosters y draft.`)
    }
    console.log('Historial 2026 intacto: coinciden las huellas de las 11 tablas estadísticas.')
  } finally { await closeDatabase() }
}
main().catch((error) => { console.error(error); process.exitCode = 1 })
