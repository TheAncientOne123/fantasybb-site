'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Film, User, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUsername } from '@/hooks/useUsername'

const getNavigation = (username: string | null) => {
  if (!username) return []
  return [
    { name: 'Home', href: `/${username}/home`, icon: Home },
    { name: 'Wrapped', href: '/wrapped', icon: Film },
    { name: 'Mi perfil', href: '/me', icon: User },
    { name: 'Admin', href: '/admin/rewinds', icon: Settings },
  ]
}

export function Sidebar() {
  const pathname = usePathname()
  const username = useUsername()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = getNavigation(username)

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-sidebar bg-slate-900 border-r border-slate-800">
      <div className="flex h-full flex-col">
        <div className="flex h-topbar items-center justify-center border-b border-slate-800 px-6">
          <h1 className="font-heading text-2xl text-primary-500">Wrapped</h1>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {mounted && navigation.length > 0 ? (
            navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== `/${username}/home` && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive ? 'bg-primary-500/10 text-primary-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })
          ) : (
            <div className="space-y-1 px-4 py-3">
              <div className="h-10 w-full bg-slate-800/50 rounded-lg animate-pulse" />
              <div className="h-10 w-full bg-slate-800/50 rounded-lg animate-pulse" />
              <div className="h-10 w-full bg-slate-800/50 rounded-lg animate-pulse" />
            </div>
          )}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <p className="text-xs text-slate-500 text-center">Season Wrapped</p>
        </div>
      </div>
    </aside>
  )
}
