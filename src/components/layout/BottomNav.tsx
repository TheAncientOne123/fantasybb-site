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
    { name: 'Perfil', href: '/me', icon: User },
    { name: 'Admin', href: '/admin/rewinds', icon: Settings },
  ]
}

export function BottomNav() {
  const pathname = usePathname()
  const username = useUsername()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = getNavigation(username)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 md:hidden">
      <div className="flex h-16 items-center justify-around">
        {mounted && navigation.length > 0 ? (
          navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== `/${username}/home` && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors',
                  isActive ? 'text-primary-400' : 'text-slate-400'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </Link>
            )
          })
        ) : (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-center gap-1">
                <div className="h-5 w-5 bg-slate-800/50 rounded animate-pulse" />
                <div className="h-3 w-12 bg-slate-800/50 rounded animate-pulse" />
              </div>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}
