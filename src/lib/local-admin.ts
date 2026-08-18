export function isLocalAdminHost(host: string | null): boolean {
  if (process.env.NODE_ENV === 'production' || !host) return false
  const normalized = host.trim().toLowerCase()
  return (
    normalized === 'localhost' ||
    normalized.startsWith('localhost:') ||
    normalized === '127.0.0.1' ||
    normalized.startsWith('127.0.0.1:') ||
    normalized === '[::1]' ||
    normalized.startsWith('[::1]:')
  )
}
