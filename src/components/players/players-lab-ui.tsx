import Image from 'next/image'
import clsx from 'clsx'
import type { TeamIndexEntry } from '@/data/rewind-types'
import type { PlayersLabLabelKind, PlayersLabPlayer } from '@/data/players-lab/types'

export const LABEL_META: Record<
  PlayersLabLabelKind,
  { title: string; short: string; description: string; chip: string; accent: string }
> = {
  streamer: {
    title: 'Streamers',
    short: 'Streamer',
    description: 'Libres que rinden a nivel de reemplazo en los últimos 7 días y juegan seguido esta semana.',
    chip: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
    accent: 'text-sky-300',
  },
  sleeper: {
    title: 'Sleepers',
    short: 'Sleeper',
    description: 'Poco rosterizados (< 30%) con más minutos y mejor producción.',
    chip: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    accent: 'text-emerald-300',
  },
  bust: {
    title: 'Bust',
    short: 'Bust',
    description: 'Proyectados en el top 150 y rindiendo +20% por debajo en la temporada.',
    chip: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
    accent: 'text-rose-300',
  },
  fluke: {
    title: 'Fluke',
    short: 'Fluke',
    description: 'Racha sin más minutos y con un tiro muy por encima de lo habitual.',
    chip: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    accent: 'text-amber-300',
  },
  slump: {
    title: 'Slump',
    short: 'Slump',
    description: 'Bajón de 25% o más en 15 días con minutos estables.',
    chip: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
    accent: 'text-violet-300',
  },
}

export const LABEL_ORDER: PlayersLabLabelKind[] = ['streamer', 'sleeper', 'bust', 'fluke', 'slump']

const INJURY_META: Record<string, { label: string; title: string; className: string }> = {
  DAY_TO_DAY: { label: 'GTD', title: 'Día a día (Game-Time Decision)', className: 'bg-amber-400/15 text-amber-300' },
  OUT: { label: 'OUT', title: 'Fuera', className: 'bg-rose-500/15 text-rose-300' },
  INJURY_RESERVE: { label: 'IL', title: 'Lista de lesionados', className: 'bg-rose-500/15 text-rose-300' },
  SUSPENSION: { label: 'SUSP', title: 'Suspendido', className: 'bg-rose-500/15 text-rose-300' },
}

export function InjuryBadge({ status }: { status: string }) {
  const meta = INJURY_META[status]
  if (!meta) return null
  return (
    <span
      title={meta.title}
      className={clsx('rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide', meta.className)}
    >
      {meta.label}
    </span>
  )
}

function formatWaiverDate(value: string) {
  return new Date(value).toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    weekday: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function StatusBadge({
  player,
  team,
  compact = false,
}: {
  player: PlayersLabPlayer
  team?: TeamIndexEntry
  compact?: boolean
}) {
  if (player.status === 'FA') {
    return (
      <span
        title="Agente libre: se puede fichar de inmediato"
        className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-200"
      >
        FA
      </span>
    )
  }
  if (player.status === 'WAIVERS') {
    const clears = player.waiverClearsAt ? `Se libera: ${formatWaiverDate(player.waiverClearsAt)}` : 'En waivers'
    return (
      <span
        title={clears}
        className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-200"
      >
        Waivers
      </span>
    )
  }
  return (
    <span
      title={team?.displayName ?? 'En un equipo de la liga'}
      className="inline-flex max-w-[11rem] items-center gap-1.5 rounded-full border border-white/10 bg-white/5 py-0.5 pl-0.5 pr-2 text-[11px] font-medium text-slate-300"
    >
      {team?.logoUrl ? (
        <Image
          src={team.logoUrl}
          alt=""
          width={16}
          height={16}
          unoptimized
          className="h-4 w-4 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="h-4 w-4 shrink-0 rounded-full bg-slate-700" />
      )}
      {!compact && <span className="truncate">{team?.displayName ?? 'Equipo'}</span>}
    </span>
  )
}

export function PlayerHeadshot({ player, size = 32 }: { player: PlayersLabPlayer; size?: number }) {
  return player.headshotUrl ? (
    <Image
      src={player.headshotUrl}
      alt=""
      width={size}
      height={size}
      unoptimized
      loading="lazy"
      className="shrink-0 rounded-full bg-slate-800 object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-400"
      style={{ width: size, height: size }}
    >
      {player.name.charAt(0)}
    </span>
  )
}
