import { createHash } from 'node:crypto'
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import { getTeamsForSeason } from '../src/data/teams'
import { getTeamRewindData } from '../src/data/getTeamRewind'
import { getTeamLogoPath } from '../src/data/team-profiles/team-logos'

type Catalog = { seasonId: string; generatedAt?: string; teams: Array<{
  id: string; espnTeamId?: number; displayName: string; logoUrl?: string; owner?: string; description?: string
}> }

async function main() {
  const root = resolve('src/data/seasons')
  const seasons = (await readdir(root)).filter((id) => /^\d{4}$/.test(id))
  const catalogs: Catalog[] = []
  for (const seasonId of seasons) {
    const path = resolve(root, seasonId, 'teams-catalog.json')
    const existing = await readFile(path, 'utf8').catch((error: NodeJS.ErrnoException) => {
      if (error.code !== 'ENOENT') throw error
      return null
    })
    if (existing) catalogs.push(JSON.parse(existing))
  }
  const espnIds = new Map(catalogs.flatMap((catalog) => catalog.teams.map((team) => [team.id, team.espnTeamId] as const)))
  for (const seasonId of seasons) {
    let catalog = catalogs.find((item) => item.seasonId === seasonId)
    if (!catalog) {
      const teams = await Promise.all(getTeamsForSeason(seasonId).map(async (team) => {
        const rewind = await getTeamRewindData(seasonId, team.id)
        const hero = rewind?.slides.find((slide) => slide.type === 'hero' && slide.image)
        return {
          id: team.id,
          espnTeamId: espnIds.get(team.id),
          displayName: team.displayName.trim(),
          logoUrl: hero?.type === 'hero' ? hero.image : getTeamLogoPath(team.id),
          owner: rewind?.owner,
          description: rewind?.description,
        }
      }))
      if (!teams.length) continue
      catalog = { seasonId, teams }
    }
    for (const team of catalog.teams) {
      if (!team.logoUrl?.startsWith('/team-logos/')) continue
      const source = resolve('public', team.logoUrl.slice(1))
      if (!source.startsWith(resolve('public/team-logos') + '\\') && !source.startsWith(resolve('public/team-logos') + '/')) {
        throw new Error('Logo fuera de public/team-logos')
      }
      const bytes = await readFile(source)
      const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12)
      const relative = `/team-logos/${seasonId}/${team.id}-${hash}${extname(source)}`
      await mkdir(resolve('public/team-logos', seasonId), { recursive: true })
      const destination = resolve('public', relative.slice(1))
      if (source !== destination) await copyFile(source, destination)
      team.logoUrl = relative
    }
    await writeFile(resolve(root, seasonId, 'teams-catalog.json'), JSON.stringify(catalog, null, 2) + '\n')
    console.log(`Identidades preservadas: ${seasonId}, ${catalog.teams.length} equipos.`)
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1 })
