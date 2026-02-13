'use client'

import { useState } from 'react'
import { Search, User, Bell } from 'lucide-react'

export function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-sidebar right-0 z-30 h-topbar bg-slate-900 border-b border-slate-800">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left: Empty space (filters moved to individual pages) */}
        <div className="flex items-center gap-4">
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar jugadores, equipos, eventos..."
              className="w-full rounded-lg bg-slate-800 pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        </div>

        {/* Right: Notifications & Avatar */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          
          <div className="relative">
            <button className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 hover:bg-slate-700 transition-colors">
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-slate-200 hidden md:block">Usuario</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
