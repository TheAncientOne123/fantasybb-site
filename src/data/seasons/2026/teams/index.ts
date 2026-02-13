/**
 * Team index – list of all teams for this season (landing autocomplete).
 * Auto-generated from ESPN Fantasy Basketball data.
 */

import type { TeamIndexEntry } from '../../rewind-types'

export const teamsIndex: TeamIndexEntry[] = [
  { id: 'novigrad-21ers', displayName: 'Novigrad 21ers ' },
  { id: 'diegos-daring-team', displayName: 'Diego\'s Daring Team' },
  { id: 'lububumatcha', displayName: 'LububuMatcha' },
  { id: 'metefierros', displayName: 'METEFIERROS' },
  { id: 'tochetaos', displayName: 'Tochetaos' },
  { id: 'huecox-y-un-dobel', displayName: 'huecox y un Dobel' },
  { id: 'fiestas-fantastic-team', displayName: 'Fiesta\'s Fantastic Team' },
  { id: 'beijing-ducks', displayName: '北京首钢霹雳鸭' },
  { id: 'glizzy-goblers', displayName: 'Glizzy Goblers' },
  { id: 'lalocomotora', displayName: 'LaloComotora' }
]

export function getTeamIds(): string[] {
  return teamsIndex.map((t) => t.id)
}

export function getTeamById(id: string): TeamIndexEntry | undefined {
  return teamsIndex.find((t) => t.id === id)
}

export function searchTeams(query: string): TeamIndexEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return teamsIndex
  return teamsIndex.filter(
    (t) =>
      t.id.toLowerCase().includes(q) ||
      t.displayName.toLowerCase().includes(q)
  )
}

export function findBestMatch(query: string): TeamIndexEntry | null {
  const q = query.trim().toLowerCase()
  if (!q) return null
  const exact = teamsIndex.find(
    (t) => t.id === q || t.displayName.toLowerCase() === q
  )
  if (exact) return exact
  const startsWith = teamsIndex.find(
    (t) =>
      t.displayName.toLowerCase().startsWith(q) || t.id.toLowerCase().startsWith(q)
  )
  if (startsWith) return startsWith
  const includes = teamsIndex.find(
    (t) =>
      t.displayName.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
  )
  return includes ?? null
}
