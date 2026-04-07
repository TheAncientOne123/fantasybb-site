/** Índice del ganador en un duelo de dos scores, o null si no hay resultado claro (ties, faltan datos, 0–0). */
export function matchupWinnerIndex(
  scoreA: number | null | undefined,
  scoreB: number | null | undefined
): 0 | 1 | null {
  if (scoreA == null || scoreB == null) return null
  if (!Number.isFinite(scoreA) || !Number.isFinite(scoreB)) return null
  if (scoreA === 0 && scoreB === 0) return null
  if (scoreA > scoreB) return 0
  if (scoreB > scoreA) return 1
  return null
}
