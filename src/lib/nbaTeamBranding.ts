/**
 * Logos ESPN + colores primarios aproximados para tintes en tarjetas de jugador NBA.
 */

const COURT_ORDER = ['PG', 'SG', 'SF', 'PF', 'C'] as const
const ALLOWED = new Set<string>(COURT_ORDER)

/** Misma lógica que el generador: solo PG/SG/SF/PF/C, sin G/F ni compuestos con "/". */
export function normalizeCourtPositionsForDisplay(labels: string[] | undefined): string[] {
  if (!labels?.length) return ['—']
  const seen = new Set<string>()
  for (const lab of labels) {
    if (!lab || lab === '—') continue
    for (const part of lab.split(/[/,]+/)) {
      const p = part.trim().toUpperCase()
      if (ALLOWED.has(p)) seen.add(p)
    }
  }
  const ordered = COURT_ORDER.filter((x) => seen.has(x))
  return ordered.length > 0 ? [...ordered] : ['—']
}

/**
 * Posiciones en tarjetas de roster: si son códigos de cancha (PG…C), orden fijo;
 * si no (p. ej. texto literal del catálogo NBA), se muestran tal cual.
 */
export function rosterPositionsForDisplay(labels: string[] | undefined): string[] {
  if (!labels?.length) return ['—']
  const court = normalizeCourtPositionsForDisplay(labels)
  if (court[0] !== '—') return court
  const raw = [...new Set(labels.map((l) => l.trim()).filter(Boolean))]
  return raw.length ? raw : ['—']
}

const NBA_TEAM_PRIMARY_HEX: Record<string, string> = {
  ATL: '#E03A3E',
  BOS: '#007A33',
  BKN: '#000000',
  CHA: '#1D1160',
  CHI: '#CE1141',
  CLE: '#860038',
  DAL: '#00538C',
  DEN: '#0E2240',
  DET: '#C8102E',
  GSW: '#1D428A',
  HOU: '#CE1141',
  IND: '#002D62',
  LAC: '#C8102E',
  LAL: '#552583',
  MEM: '#5D76A9',
  MIA: '#98002E',
  MIL: '#00471B',
  MIN: '#0C2340',
  NOP: '#0C2340',
  NYK: '#006BB6',
  OKC: '#ef3b24',
  ORL: '#0077C0',
  PHI: '#006BB6',
  PHX: '#1D1160',
  PHO: '#1D1160',
  POR: '#E03A3E',
  SAC: '#5A2D81',
  SAS: '#C4CED4',
  TOR: '#CE1141',
  UTA: '#3E2680',
  WAS: '#002B5C',
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace('#', '')
  if (h.length !== 6) return null
  const n = parseInt(h, 16)
  if (Number.isNaN(n)) return null
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

/** espn_api PRO_TEAM_MAP vs ESPN CDN / mapa de colores del proyecto */
const LOGO_SLUG_BY_ABBR: Record<string, string> = {
  PHL: 'phi',
  PHO: 'phx',
}

const TINT_KEY_BY_ABBR: Record<string, string> = {
  PHL: 'PHI',
  PHO: 'PHX',
}

/** Color primario sólido por abreviatura NBA (útil para barras/leyendas). */
export function getNbaTeamPrimaryHex(abbr: string | undefined | null): string | null {
  if (!abbr || typeof abbr !== 'string') return null
  const a = abbr.trim().toUpperCase()
  if (!a || a === 'FA') return null
  const tintKey = TINT_KEY_BY_ABBR[a] ?? a
  return NBA_TEAM_PRIMARY_HEX[tintKey] ?? null
}

export function getNbaTeamLogoUrl(abbr: string | undefined | null): string | null {
  if (!abbr || typeof abbr !== 'string') return null
  const a = abbr.trim().toUpperCase()
  if (!a || a === 'FA') return null
  const slug = LOGO_SLUG_BY_ABBR[a] ?? a.toLowerCase()
  return `https://a.espncdn.com/i/teamlogos/nba/500/${slug}.png`
}

/** Fondo semitransparente para tarjeta (legible en dark mode). */
export function getNbaTeamCardTintRgba(
  abbr: string | undefined | null,
  alpha = 0.14
): string | null {
  if (!abbr || typeof abbr !== 'string') return null
  const a = abbr.trim().toUpperCase()
  if (!a || a === 'FA') return null
  const hex = getNbaTeamPrimaryHex(a)
  if (!hex) return null
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
}
