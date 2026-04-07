'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { ProfileRosterPlayer } from '@/data/team-profiles/types'
import {
  getNbaTeamCardTintRgba,
  getNbaTeamLogoUrl,
  rosterPositionsForDisplay,
} from '@/lib/nbaTeamBranding'
import clsx from 'clsx'

type Props = {
  player: ProfileRosterPlayer
  /** Texto secundario bajo el nombre (ej. semanas o pts) */
  subtitle?: string
  className?: string
}

export function RosterPlayerCard({ player, subtitle, className }: Props) {
  const [imgFailed, setImgFailed] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const positions = rosterPositionsForDisplay(
    player.positions?.length ? player.positions : ['—']
  )
  const initial = player.name.trim().charAt(0).toUpperCase() || '?'
  const showImg = player.headshotUrl && !imgFailed
  const abbr = player.proTeamAbbrev
  const isFA = abbr?.trim().toUpperCase() === 'FA'
  const fromNbaCatalog = player.proTeamFromNbaCatalog === true
  const catalogLogoUrl = player.teamLogoUrl?.trim()
  const abbrLogoUrl = getNbaTeamLogoUrl(abbr)
  const logoUrl = fromNbaCatalog
    ? catalogLogoUrl || undefined
    : catalogLogoUrl || abbrLogoUrl || undefined
  const showLogo = Boolean(logoUrl && !logoFailed)
  const tint = getNbaTeamCardTintRgba(abbr, 0.13)

  return (
    <div
      className={clsx(
        'flex gap-3 rounded-xl border border-zinc-800 p-3 shadow-sm shadow-black/20',
        !tint && 'bg-zinc-950/60',
        className
      )}
      style={tint ? { backgroundColor: tint } : undefined}
    >
      <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
        {showImg ? (
          <Image
            src={player.headshotUrl!}
            alt=""
            width={44}
            height={56}
            className="h-full w-full object-cover object-top"
            unoptimized
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm font-bold text-zinc-500">
            {initial}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <p className="min-w-0 truncate font-medium text-zinc-100">{player.name}</p>
          {player.proTeamName?.trim() ? (
            <span className="shrink-0 text-[11px] font-medium text-zinc-500">
              {player.proTeamName.trim()}
            </span>
          ) : null}
          {showLogo ? (
            <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full ring-1 ring-zinc-600/80">
              <Image
                src={logoUrl!}
                alt=""
                width={20}
                height={20}
                className="h-full w-full object-cover"
                unoptimized
                onError={() => setLogoFailed(true)}
              />
            </span>
          ) : isFA ? (
            <span className="shrink-0 rounded border border-zinc-600 px-1 py-0 text-[9px] font-semibold uppercase tracking-wide text-zinc-500">
              FA
            </span>
          ) : null}
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          {positions.map((pos, i) => (
            <span
              key={`${pos}-${i}`}
              className="rounded border border-zinc-700 bg-zinc-900/80 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-zinc-400"
            >
              {pos}
            </span>
          ))}
        </div>
        {subtitle ? <p className="mt-1 text-[11px] text-zinc-500">{subtitle}</p> : null}
      </div>
    </div>
  )
}
