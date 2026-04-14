'use client'

import type {
  ConsolationLadder,
  NextDraftOrderRow,
  PlayoffBracket as PlayoffBracketData,
  StatsStandingRow,
} from '@/data/stats-room-types'
import { WINNERS_CONSOLATION_STATS_MIN_PERIOD } from '@/data/draftOrderFromLadders'
import PlayoffBracket from './PlayoffBracket'
import { ConsolationLadderBlock } from './ConsolationLadderBlock'
import DraftOrderSidebar from './DraftOrderSidebar'

type Props = {
  playoffBracket: PlayoffBracketData
  bottomFour: ConsolationLadder
  winnersConsolation: ConsolationLadder
  nextDraftOrder: NextDraftOrderRow[] | null | undefined
  standingsById: Map<string, StatsStandingRow>
  highlightTeamId: string | null
  hasFullDraftData: boolean
}

export default function PlayoffsDraftHub({
  playoffBracket,
  bottomFour,
  winnersConsolation,
  nextDraftOrder,
  standingsById,
  highlightTeamId,
  hasFullDraftData,
}: Props) {
  return (
    <div className="flex flex-col gap-10">
      <div className="min-w-0 space-y-10">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Playoffs</h3>
          <PlayoffBracket
            bracket={playoffBracket}
            standingsById={standingsById}
            highlightTeamId={highlightTeamId}
          />
        </div>

        <div className="space-y-3 border-t border-white/10 pt-8">
          <ConsolationLadderBlock
            ladder={winnersConsolation}
            standingsById={standingsById}
            highlightTeamId={highlightTeamId}
            minMatchupPeriod={WINNERS_CONSOLATION_STATS_MIN_PERIOD}
          />
        </div>

        <div className="space-y-3 border-t border-white/10 pt-8">
          <ConsolationLadderBlock
            ladder={bottomFour}
            standingsById={standingsById}
            highlightTeamId={highlightTeamId}
          />
        </div>
      </div>

      <div className="w-full border-t border-white/10 pt-8">
        <DraftOrderSidebar
          rows={nextDraftOrder}
          standingsById={standingsById}
          highlightTeamId={highlightTeamId}
          showRegenerateHint={!hasFullDraftData}
        />
      </div>
    </div>
  )
}
