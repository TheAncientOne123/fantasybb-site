'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ui } from './styles'

export const SITE_NAV = [
  { name: 'Rewind', href: '/rewind' },
  { name: 'Hall of Fame', href: '/awards' },
  { name: 'Stats Room', href: '/stats' },
  { name: 'Reglas', href: '/rules' },
] as const

/** Barra superior compartida por todas las páginas internas. */
export function SiteHeader() {
  const pathname = usePathname() ?? ''

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className={cn(
            'shrink-0 rounded-md font-heading text-xl tracking-wide text-white transition hover:text-amber-300 sm:text-2xl',
            ui.focusRing
          )}
        >
          LACMSI <span className="text-amber-400">League</span>
        </Link>
        <nav className="-mr-2 flex min-w-0 items-center gap-1 overflow-x-auto" aria-label="Secciones">
          {SITE_NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:text-sm',
                  ui.focusRing,
                  active ? 'bg-amber-400/10 text-amber-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
