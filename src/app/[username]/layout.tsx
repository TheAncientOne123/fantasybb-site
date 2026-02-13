'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function UsernameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string

  useEffect(() => {
    const user = getUser()
    if (!user) {
      router.push('/login')
      return
    }

    // Verificar que el username de la URL coincide con el usuario autenticado
    const usernameSlug = user.username.toLowerCase().replace(/\s+/g, '_')
    if (usernameSlug !== username) {
      // Redirigir a la ruta correcta del usuario
      const currentPath = window.location.pathname
      const newPath = currentPath.replace(`/${username}`, `/${usernameSlug}`)
      router.push(newPath)
    }
  }, [username, router])

  return <ProtectedRoute>{children}</ProtectedRoute>
}
