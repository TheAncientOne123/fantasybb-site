/**
 * Design tokens de LACMSI League.
 *
 * Una sola fuente para la apariencia compartida del sitio: fondo slate-950,
 * acento ámbar (marca), sky para resaltar datos, tarjetas de vidrio y títulos
 * en Bebas Neue. Usa estos tokens (o los componentes de `@/components/ui`)
 * en lugar de repetir clases a mano en cada página.
 */
export const ui = {
  /** Fondo y color de texto base de cualquier página. */
  page: 'min-h-screen bg-slate-950 text-slate-100',

  /** Anchos de contenido. */
  container: {
    narrow: 'max-w-4xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  },

  /** Tipografía. */
  /** Título de página (h1) y de las secciones grandes de la landing. */
  pageTitle: 'font-heading text-4xl text-white sm:text-5xl',
  sectionTitle: 'font-heading text-2xl text-white sm:text-3xl',
  eyebrow: 'text-[10px] font-semibold uppercase tracking-widest text-slate-500',
  muted: 'text-sm leading-6 text-slate-400',

  /** Superficies. */
  card: 'rounded-2xl border border-white/10 bg-white/[0.03]',
  cardInteractive: 'transition hover:border-amber-400/40 hover:bg-white/[0.06]',
  cardPadding: { none: '', sm: 'p-4', md: 'p-5 sm:p-6', lg: 'p-6 sm:p-8' },
  notice:
    'rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4 text-sm leading-6 text-amber-100/80',

  /** Controles. */
  field: 'flex flex-col gap-1.5 text-xs text-slate-500',
  select:
    'rounded-xl border border-white/15 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition hover:border-white/25 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/30 disabled:cursor-not-allowed disabled:opacity-50',
  focusRing:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
} as const

export type ContainerWidth = keyof typeof ui.container
export type CardPadding = keyof typeof ui.cardPadding

const buttonBase =
  'inline-flex w-fit items-center justify-center gap-2 rounded-full font-medium transition disabled:cursor-not-allowed disabled:opacity-50'

export const buttonVariants = {
  /** Acción principal (ámbar). */
  primary: 'bg-amber-500 text-slate-950 hover:bg-amber-400',
  /** Acción secundaria de vidrio; también para enlaces de navegación. */
  secondary:
    'border border-white/15 bg-white/5 text-slate-200 hover:border-amber-400/40 hover:bg-white/10 hover:text-white',
  /** Resaltado suave en ámbar (p. ej. "Ver Rewind"). */
  accent: 'border border-amber-400/30 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20',
  /** Sólo texto. */
  ghost: 'text-slate-400 hover:text-white',
} as const

export const buttonSizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
} as const

export type ButtonVariant = keyof typeof buttonVariants
export type ButtonSize = keyof typeof buttonSizes

export function buttonClass(variant: ButtonVariant = 'secondary', size: ButtonSize = 'md') {
  return [buttonBase, buttonVariants[variant], variant === 'ghost' ? '' : buttonSizes[size], ui.focusRing].join(' ')
}
