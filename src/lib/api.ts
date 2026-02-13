/**
 * Cliente API para Fantasy League Wrapped
 * - Ligas, temporadas, equipos, rewinds (contenido admin)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface ApiError {
  detail: string
  status?: number
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('access_token')
    : null

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Error desconocido' }))
    const error: ApiError = {
      detail: typeof errorData.detail === 'string' ? errorData.detail : 'Error en la petición',
      status: response.status,
    }
    throw error
  }

  return response.json()
}

export interface RewindSlide {
  type: string
  title: string
  content: Record<string, unknown>
}

export interface ShareCard {
  season: string
  team_name: string
  record: string
  standing: number
  power_score: number
  title?: string
  top_badges: unknown[]
  highlight: string
}

export interface RewindResponse {
  season: string
  team_id: string
  slides: RewindSlide[]
  share_card: ShareCard
}

export const api = {
  // Auth
  login: (username: string, password: string) =>
    apiRequest<{ access_token: string; user: unknown }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  getCurrentUser: () =>
    apiRequest<{ id: number; username: string; email?: string }>('/api/auth/me'),

  logout: () =>
    apiRequest('/api/auth/logout', { method: 'POST' }),

  // Leagues
  getLeagues: () =>
    apiRequest<{ leagues: { id: number; name: string; is_active: boolean }[] }>('/api/leagues'),

  getLeague: (leagueId: number) =>
    apiRequest<{ id: number; name: string }>(`/api/leagues/${leagueId}`),

  // Seasons
  getSeasons: (leagueId?: number) => {
    const params = leagueId != null ? `?league_id=${leagueId}` : ''
    return apiRequest<{ seasons: { id: number; league_id: number; label: string; year: number }[] }>(`/api/seasons${params}`)
  },

  getSeason: (seasonId: number) =>
    apiRequest<{ id: number; league_id: number; label: string; year: number }>(`/api/seasons/${seasonId}`),

  // Teams
  getTeams: (leagueId: number) =>
    apiRequest<{ teams: { id: number; league_id: number; name: string; owner_name?: string }[] }>(`/api/teams?league_id=${leagueId}`),

  getTeam: (teamId: number) =>
    apiRequest<{ id: number; name: string; owner_name?: string }>(`/api/teams/${teamId}`),

  // Rewind (Wrapped) - contenido creado por admin
  getRewind: (seasonId: number, teamId: number) =>
    apiRequest<RewindResponse>(`/api/rewind?season_id=${seasonId}&team_id=${teamId}`),

  // Admin: crear/editar rewind
  getRewindAdmin: (seasonId: number, teamId: number) =>
    apiRequest<{ season_id: number; team_id: number; slides: RewindSlide[]; share_card: ShareCard }>(`/api/admin/rewind?season_id=${seasonId}&team_id=${teamId}`),

  upsertRewind: (seasonId: number, teamId: number, slides: RewindSlide[], shareCard: ShareCard) =>
    apiRequest('/api/admin/rewind', {
      method: 'POST',
      body: JSON.stringify({ season_id: seasonId, team_id: teamId, slides, share_card: shareCard }),
    }),

  uploadRewindImage: async (file: File): Promise<{ url: string; filename: string }> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    const form = new FormData()
    form.append('file', file)
    const res = await fetch(`${API_URL}/api/admin/rewind/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw { detail: err.detail || 'Error al subir' }
    }
    return res.json()
  },
}
