'use client'

import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <Sidebar />
        <TopBar />
        <main className="ml-sidebar mt-topbar p-6">
          {children}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        <TopBar />
        <main className="mt-topbar mb-16 p-4 pb-20">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
