/**
 * Utilidades de autenticación
 */

export interface User {
  id: number
  username: string
  team_id: number
  league_id: number
  email: string
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function setUser(user: User, token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('access_token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function clearAuth(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null && getUser() !== null
}

export function getAuthHeaders(): HeadersInit {
  const token = getAccessToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}
