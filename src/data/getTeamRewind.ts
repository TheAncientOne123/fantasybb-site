/**
 * Resolve team rewind data by season and team id.
 * Auto-generated team loaders (scanned from seasons/).
 */

import type { TeamRewindData } from './rewind-types'

const teamLoaders: Record<string, Record<string, () => Promise<{ default: TeamRewindData }>>> = {
  '2026': {
    'beijing-ducks': () => import('./seasons/2026/teams/beijing-ducks'),
    'diegos-daring-team': () => import('./seasons/2026/teams/diegos-daring-team'),
    'fiestas-fantastic-team': () => import('./seasons/2026/teams/fiestas-fantastic-team'),
    'glizzy-goblers': () => import('./seasons/2026/teams/glizzy-goblers'),
    'huecox-y-un-dobel': () => import('./seasons/2026/teams/huecox-y-un-dobel'),
    'lalocomotora': () => import('./seasons/2026/teams/lalocomotora'),
    'lububumatcha': () => import('./seasons/2026/teams/lububumatcha'),
    'metefierros': () => import('./seasons/2026/teams/metefierros'),
    'novigrad-21ers': () => import('./seasons/2026/teams/novigrad-21ers'),
    'tochetaos': () => import('./seasons/2026/teams/tochetaos'),
  },
}

export async function getTeamRewindData(seasonId: string, teamId: string): Promise<TeamRewindData | null> {
  const seasonLoaders = teamLoaders[seasonId]
  if (!seasonLoaders) return null
  const loader = seasonLoaders[teamId]
  if (!loader) return null
  try {
    const mod = await loader()
    return mod.default ?? null
  } catch {
    return null
  }
}

export function teamExists(seasonId: string, teamId: string): boolean {
  const seasonLoaders = teamLoaders[seasonId]
  return Boolean(seasonLoaders && teamId in seasonLoaders)
}

/** Team ids for static routes (e.g. `/team/[teamId]`). Uses union of all seasons in loaders. */
export function getAllRewindTeamIds(): string[] {
  const ids = new Set<string>()
  for (const season of Object.values(teamLoaders)) {
    for (const id of Object.keys(season)) {
      ids.add(id)
    }
  }
  return [...ids].sort()
}
