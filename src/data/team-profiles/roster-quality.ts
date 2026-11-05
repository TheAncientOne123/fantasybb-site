export type RosterQualityMeasure = {
  score: number | null
  rank: number | null
  rawValue: number | null
  knownPlayers: number
  totalPlayers: number
}

export type RosterQualitySeason = {
  seasonId: string
  methodVersion: 'fantasy-roster-v1'
  source: 'ESPN'
  generatedAt: string
  projectionStatus: 'captured' | 'not-captured' | 'unavailable'
  projection: null | {
    capturedAt: string
    windowGames: number
    referenceSize: number
    teams: Array<RosterQualityMeasure & { teamId: string }>
  }
  performance: null | {
    capturedAt: string
    isFinal: boolean
    windowGames: number
    referenceSize: number
    teams: Array<{ teamId: string; drafted: RosterQualityMeasure; final: RosterQualityMeasure; improvement: number | null }>
  }
}

export type TeamRosterQuality = {
  projectionStatus: RosterQualitySeason['projectionStatus']
  projection: null | { capturedAt: string; referenceSize: number; measurement: RosterQualityMeasure }
  performance: null | { capturedAt: string; isFinal: boolean; referenceSize: number;
    draftedLeagueSize: number; finalLeagueSize: number; drafted: RosterQualityMeasure;
    final: RosterQualityMeasure; improvement: number | null }
}

function measurement(row: RosterQualityMeasure): RosterQualityMeasure {
  return { score: row.score, rank: row.rank, rawValue: row.rawValue,
    knownPlayers: row.knownPlayers, totalPlayers: row.totalPlayers }
}

export function teamRosterQuality(data: RosterQualitySeason | undefined, teamId: string): TeamRosterQuality {
  const projection = data?.projection?.teams.find((row) => row.teamId === teamId)
  const performance = data?.performance?.teams.find((row) => row.teamId === teamId)
  return {
    projectionStatus: data?.projectionStatus ?? 'unavailable',
    projection: projection && data?.projection ? {
      capturedAt: data.projection.capturedAt, referenceSize: data.projection.referenceSize,
      measurement: measurement(projection),
    } : null,
    performance: performance && data?.performance ? {
      capturedAt: data.performance.capturedAt, isFinal: data.performance.isFinal,
      referenceSize: data.performance.referenceSize,
      draftedLeagueSize: data.performance.teams.filter((row) => row.drafted.score !== null).length,
      finalLeagueSize: data.performance.teams.filter((row) => row.final.score !== null).length,
      drafted: measurement(performance.drafted), final: measurement(performance.final), improvement: performance.improvement,
    } : null,
  }
}
