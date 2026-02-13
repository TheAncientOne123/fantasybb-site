/**
 * Fantasy Rewind – slide and team data types
 */

export type HeroSlide = {
  type: 'hero'
  title: string
  subtitle?: string
  image?: string
  footer?: string
}

export type StatSlide = {
  type: 'stat'
  title: string
  value: string | number
  label: string
  description?: string
  compareTo?: { label: string; value: string | number } // "League avg", "Rank", "Opponent"
  delta?: { value: number; direction: 'up' | 'down' } // opcional
  image?: string
  footer?: string
}

export type AwardSlide = {
  type: 'award'
  title: string
  badgeName: string
  description: string
  /** 'award' = confetti; 'standoff' = no confetti (e.g. Tier C archetype); 'no-award' = no confetti (e.g. The Choke) */
  awardTier?: 'award' | 'standoff' | 'no-award'
  image?: string
  footer?: string
  /** MOTY breakdown: weighted contributions to total score */
  motyBreakdown?: {
    stats: number
    standings: number
    champion: number
    mva: number
  }
}

export type ImageSlide = {
  type: 'image'
  title?: string
  image: string
  caption?: string
  footer?: string
}

export type QuoteSlide = {
  type: 'quote'
  quote: string
  author?: string
  footer?: string
}

export type ChartSlide = {
  type: 'chart'
  title: string
  subtitle?: string
  chart: {
    kind: 'bar' | 'line' | 'stackedBar' | 'radar'
    xLabel?: string
    yLabel?: string
    series: Array<{
      name: string
      data: Array<{ x: string; y: number }>
      color?: string
    }>
  }
  highlight?: { label: string; value: string }
  footer?: string
}

export type RankSlide = {
  type: 'rank'
  title: string
  subtitle?: string
  metricLabel: string
  rows: Array<{
    id: string
    name: string
    value: number | string
    rank: number
    tag?: string // "I Am Consistent", "Hit-or-Miss"
  }>
  highlightTeamId?: string
  footer?: string
}

export type MatchupSlide = {
  type: 'matchup'
  title: string
  week: number
  result: 'W' | 'L' | 'T'
  me: { name: string; score: number }
  opp: { name: string; score: number }
  margin: number
  note?: string // "2-point thriller", "Worst loss"
  footer?: string
}

export type ListSlide = {
  type: 'list'
  title: string
  subtitle?: string
  items: Array<{ primary: string; secondary?: string; meta?: string }>
  footer?: string
}

export type TimelineSlide = {
  type: 'timeline'
  title: string
  subtitle?: string
  events: Array<{
    label: string // "Week 11"
    title: string // "Beat Diego's Daring Team"
    detail?: string // "1510–1504 (6 pts)"
    kind?: 'win' | 'loss' | 'trade' | 'award'
  }>
  footer?: string
}

export type RosterDiffSlide = {
  type: 'rosterDiff'
  title: string
  draftedCount: number
  currentCount: number
  kept: string[]
  lost: string[]
  added: string[]
  footer?: string
}

export type Slide =
  | HeroSlide
  | StatSlide
  | AwardSlide
  | ImageSlide
  | QuoteSlide
  | ChartSlide
  | RankSlide
  | MatchupSlide
  | ListSlide
  | TimelineSlide
  | RosterDiffSlide

export type TeamRewindData = {
  id: string
  displayName: string
  theme?: {
    background: string
    accent: string
  }
  slides: Slide[]
}

export type TeamIndexEntry = {
  id: string
  displayName: string
}
