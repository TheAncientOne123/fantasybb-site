/** Utilidades de ordenamiento compartidas por las tablas de estadísticas. */

export type SortDirection = 'asc' | 'desc'

/** Convierte "45.3%", "1,234" o "—" en número (NaN si no hay dato). */
export function parseStatForSort(raw: string): number {
  const s = raw.trim()
  if (!s || s === '—' || s === '-') return Number.NaN
  if (s.includes('%')) {
    const n = parseFloat(s.replace(/%/g, '').replace(',', '.'))
    return Number.isFinite(n) ? n : Number.NaN
  }
  const n = parseFloat(s.replace(/,/g, ''))
  return Number.isFinite(n) ? n : Number.NaN
}

/** Compara números dejando los vacíos (NaN/null) siempre al final, sin importar la dirección. */
export function compareWithNaNLast(
  a: number | null | undefined,
  b: number | null | undefined,
  dir: SortDirection
): number {
  const aNaN = a == null || Number.isNaN(a)
  const bNaN = b == null || Number.isNaN(b)
  if (aNaN && bNaN) return 0
  if (aNaN) return 1
  if (bNaN) return -1
  const cmp = a < b ? -1 : a > b ? 1 : 0
  return dir === 'asc' ? cmp : -cmp
}
