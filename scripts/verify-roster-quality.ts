import { strict as assert } from 'node:assert'
import { loadEnvConfig } from '@next/env'
import { getTeamProfile } from '../src/data/team-profiles/repository'
import { STATIC_ROSTER_QUALITY } from '../src/data/team-profiles/quality-static'
import { getDatabase, closeDatabase } from '../src/lib/database'
import { persistRosterQuality } from './roster-quality-dataset'

loadEnvConfig(process.cwd())
async function main() {
  try {
    for (const source of ['static', 'database']) {
      process.env.FANTASY_DATA_SOURCE = source
      const profile = await getTeamProfile('diegos-daring-team')
      const current = profile?.seasons.find((season) => season.seasonId === '2027')?.rosterQuality
      const previous = profile?.seasons.find((season) => season.seasonId === '2026')?.rosterQuality
      assert.ok(current?.projection?.measurement.score != null)
      assert.equal(current?.performance, null)
      assert.equal(previous?.projection, null)
      assert.equal(previous?.projectionStatus, 'not-captured')
      assert.ok(previous?.performance?.isFinal)
      const performance = previous!.performance!
      assert.equal(performance.improvement, Math.round((performance.final.score! - performance.drafted.score!) * 10) / 10)
      const incomplete = (await getTeamProfile('novigrad-21ers'))?.seasons.find((season) => season.seasonId === '2027')?.rosterQuality
      assert.equal(incomplete?.projection?.measurement.score, null)
      console.log(`Verificado ${source}: expectativa real, mejora con la misma referencia y estados pendientes sin valores inventados.`)
    }
    const rollback = new Error('Revertir la transacción de verificación')
    await getDatabase().begin(async (transaction) => {
      const before = await transaction`select * from roster_quality_snapshots order by season_id`
      for (const seasonId of ['2026', '2027']) {
        const changed = structuredClone(STATIC_ROSTER_QUALITY[seasonId])
        changed.generatedAt = new Date().toISOString()
        const snapshot = changed.projection ?? changed.performance!
        snapshot.capturedAt = '2099-01-01T00:00:00Z'
        await persistRosterQuality(transaction, seasonId, changed)
      }
      const after = await transaction`select * from roster_quality_snapshots order by season_id`
      assert.deepEqual(after.find((row) => row.season_id === '2027')?.projection,
        before.find((row) => row.season_id === '2027')?.projection)
      assert.deepEqual(after.find((row) => row.season_id === '2026')?.performance,
        before.find((row) => row.season_id === '2026')?.performance)
      throw rollback
    }).catch((error) => { if (error !== rollback) throw error })
    console.log('Persistencia verificada con transacción revertida: la captura original y el cierre final permanecen intactos.')
  } finally { await closeDatabase() }
}
main().catch((error) => { console.error(error); process.exitCode = 1 })
