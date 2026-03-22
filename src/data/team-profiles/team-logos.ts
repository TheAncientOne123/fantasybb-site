/**
 * Public logo paths by team id (landing + profiles).
 */

export const TEAM_LOGO_PATHS: Record<string, string> = {
  'beijing-ducks': '/team-logos/beijing-ducks-logo.png',
  'glizzy-goblers': '/team-logos/glizzy-goblers-logo.jpg',
  'huecox-y-un-dobel': '/team-logos/huecox-y-un-dobel.png',
  lububumatcha: '/team-logos/labubu-matcha-logo.png',
  'novigrad-21ers': '/team-logos/novigrad-21ers-logo.png',
  tochetaos: '/team-logos/tochetaos.png',
  'diegos-daring-team': 'https://g.espncdn.com/lm-static/fba/images/default_logos/1.svg',
  metefierros: 'https://g.espncdn.com/lm-static/logo-packs/core/SimpleShields/shields-4.svg',
  'fiestas-fantastic-team': 'https://g.espncdn.com/lm-static/fba/images/default_logos/3.svg',
  lalocomotora: 'https://g.espncdn.com/lm-static/fba/images/default_logos/5.svg',
}

export function getTeamLogoPath(teamId: string): string | undefined {
  return TEAM_LOGO_PATHS[teamId]
}
