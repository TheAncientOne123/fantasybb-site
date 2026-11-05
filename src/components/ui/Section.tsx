import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ui } from './styles'

type SectionProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
}

/** Bloque de contenido con título de sección consistente. */
export function Section({ title, description, actions, className, children, ...props }: SectionProps) {
  return (
    <section className={cn('space-y-4', className)} {...props}>
      {(title || description || actions) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 space-y-1">
            {title && <h2 className={ui.sectionTitle}>{title}</h2>}
            {description && <div className={cn(ui.muted, 'max-w-3xl')}>{description}</div>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  )
}
