'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { TeamIndexEntry } from '@/data/rewind-types'
import { getTeamLogoPath } from '@/data/team-profiles/team-logos'

const TeamIdentities = createContext<TeamIndexEntry[]>([])

export function TeamIdentityProvider({ teams, children }: { teams: TeamIndexEntry[]; children: ReactNode }) {
  return <TeamIdentities.Provider value={teams}>{children}</TeamIdentities.Provider>
}

export function useTeamLogo() {
  const teams = useContext(TeamIdentities)
  return (teamId: string) => teams.find((team) => team.id === teamId)?.logoUrl ?? getTeamLogoPath(teamId)
}
