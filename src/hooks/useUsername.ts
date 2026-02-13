'use client'

import { getUser } from '@/lib/auth'

export function useUsername() {
  const user = getUser()
  if (!user) return null
  
  // Convertir username a formato de URL (ej: "Novigrad 21ers" -> "novigrad_21ers")
  return user.username.toLowerCase().replace(/\s+/g, '_')
}

export function getUsernameSlug(username: string): string {
  return username.toLowerCase().replace(/\s+/g, '_')
}
