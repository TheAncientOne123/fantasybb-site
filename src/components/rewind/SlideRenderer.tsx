'use client'

import type { Slide } from '@/data/rewind-types'
import { HeroSlide } from './HeroSlide'
import { StatSlide } from './StatSlide'
import { AwardSlide } from './AwardSlide'
import { ImageSlide } from './ImageSlide'
import { QuoteSlide } from './QuoteSlide'
import { ChartSlide } from './ChartSlide'
import { ListSlide } from './ListSlide'
import { MatchupSlide } from './MatchupSlide'
import { RosterDiffSlide } from './RosterDiffSlide'
import { RankSlide } from './RankSlide'
import { TimelineSlide } from './TimelineSlide'

const DEFAULT_ACCENT = '#f59e0b'

type Props = {
  slide: Slide
  accent?: string
}

export function SlideRenderer({ slide, accent = DEFAULT_ACCENT }: Props) {
  switch (slide.type) {
    case 'hero':
      return <HeroSlide slide={slide} accent={accent} />
    case 'stat':
      return <StatSlide slide={slide} accent={accent} />
    case 'award':
      return <AwardSlide slide={slide} accent={accent} />
    case 'image':
      return <ImageSlide slide={slide} accent={accent} />
    case 'quote':
      return <QuoteSlide slide={slide} accent={accent} />
    case 'chart':
      return <ChartSlide slide={slide} accent={accent} />
    case 'list':
      return <ListSlide slide={slide} accent={accent} />
    case 'matchup':
      return <MatchupSlide slide={slide} accent={accent} />
    case 'rosterDiff':
      return <RosterDiffSlide slide={slide} accent={accent} />
    case 'rank':
      return <RankSlide slide={slide} accent={accent} />
    case 'timeline':
      return <TimelineSlide slide={slide} accent={accent} />
    default: {
      const _: never = slide
      return null
    }
  }
}
