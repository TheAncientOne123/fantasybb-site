import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ui } from './styles'

type PageHeaderProps = {
  title: ReactNode
  eyebrow?: ReactNode
  description?: ReactNode
  /** Botones o filtros alineados a la derecha en escritorio. */
  actions?: ReactNode
  className?: string
}

/** Encabezado estándar: título de página + descripción + acciones. */
export function PageHeader({ title, eyebrow, description, actions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className="min-w-0 space-y-2">
        {eyebrow && <p className={ui.eyebrow}>{eyebrow}</p>}
        <h1 className={ui.pageTitle}>{title}</h1>
        {description && <div className={cn(ui.muted, 'max-w-2xl')}>{description}</div>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
    </header>
  )
}
