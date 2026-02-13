import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login', '/register', '/forgot-password', '/api']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
  // Si es una ruta pública, permitir acceso
  if (isPublicRoute) {
    return NextResponse.next()
  }
  
  // Verificar que las rutas privadas tengan el formato [username]/...
  // Si alguien intenta acceder a /me o rutas antiguas, redirigir a login
  if (pathname.startsWith('/me') || 
      pathname.startsWith('/team') || 
      pathname.startsWith('/stats') || 
      pathname.startsWith('/matchups') || 
      pathname.startsWith('/timeline') ||
      pathname.startsWith('/moves')) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
  
  // Para rutas [username]/*, la protección se hace en el cliente con ProtectedRoute
  // El middleware solo redirige rutas antiguas
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - team-logos (logos en public/team-logos para el rewind)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|team-logos).*)',
  ],
}
