'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, isAuthenticated, clearAuth, User } from '@/lib/auth'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const logout = () => {
    clearAuth()
    setUser(null)
    router.push('/login')
  }

  return {
    user,
    isAuthenticated: isAuthenticated(),
    loading,
    logout,
  }
}
