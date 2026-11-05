import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { ui, type CardPadding } from './styles'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: CardPadding
  /** Añade el hover ámbar para tarjetas clicables. */
  interactive?: boolean
}

/** Superficie de vidrio estándar del sitio. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = 'md', interactive = false, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(ui.card, ui.cardPadding[padding], interactive && ui.cardInteractive, className)}
      {...props}
    />
  )
})
