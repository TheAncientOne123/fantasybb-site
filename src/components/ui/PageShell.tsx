import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { ui, type ContainerWidth } from './styles'

type PageShellProps = {
  children: ReactNode
  /** Ancho del contenido: narrow (texto/admin), default, wide (tablas). */
  width?: ContainerWidth
  /** Fondo decorativo opcional (p. ej. <GiphyBackdrop />), detrás del contenido. */
  background?: ReactNode
  className?: string
}

/** Estructura estándar de página: header, contenido centrado y footer. */
export function PageShell({ children, width = 'default', background, className }: PageShellProps) {
  return (
    <div className={cn(ui.page, 'relative flex flex-col overflow-x-clip')}>
      {background}
      <SiteHeader />
      <main
        className={cn(
          'relative z-10 mx-auto w-full flex-1 space-y-10 px-4 pb-16 pt-8 sm:px-6 sm:pt-10',
          ui.container[width],
          className
        )}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
