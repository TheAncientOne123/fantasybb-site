import quality2026 from '@/data/seasons/2026/roster-quality.json'
import quality2027 from '@/data/seasons/2027/roster-quality.json'
import type { RosterQualitySeason } from './roster-quality'

export const STATIC_ROSTER_QUALITY: Record<string, RosterQualitySeason> = {
  '2026': quality2026 as RosterQualitySeason,
  '2027': quality2027 as RosterQualitySeason,
}
