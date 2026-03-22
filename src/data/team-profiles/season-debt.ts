/**
 * League debt by team per season (profile-only; keep in sync with rewind debt slide when it changes).
 */

const DEBT_2026_MXN: Record<string, string> = {
  'glizzy-goblers': '$100 MXN',
  lalocomotora: '$550 MXN',
  'diegos-daring-team': '$100 MXN',
  'huecox-y-un-dobel': '$200 MXN',
  metefierros: '$200 MXN',
  lububumatcha: '$200 MXN',
  'beijing-ducks': '$100 MXN',
  tochetaos: '$100 MXN',
  'fiestas-fantastic-team': '$100 MXN',
}

export function getSeasonDebtAmount(seasonId: string, teamId: string): string {
  if (seasonId === '2026') {
    return DEBT_2026_MXN[teamId] ?? '—'
  }
  return '—'
}
