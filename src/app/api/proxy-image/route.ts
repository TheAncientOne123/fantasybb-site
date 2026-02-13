import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_HOST = 'mystique-api.fantasy.espn.com'

/**
 * Proxy para imágenes subidas por el usuario en ESPN (mystique-api).
 * Esas URLs no cargan directamente en el navegador por CORS / no ser recurso directo.
 * Solo se permiten URLs de mystique-api.fantasy.espn.com por seguridad.
 */
export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get('url')
  if (!urlParam) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  }

  let targetUrl: URL
  try {
    targetUrl = new URL(urlParam)
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }

  if (targetUrl.hostname !== ALLOWED_HOST) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 403 })
  }

  try {
    const res = await fetch(targetUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'image/*,*/*',
      },
      next: { revalidate: 86400 }, // 24h — solo uno: no usar cache y next a la vez
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: res.status === 404 ? 404 : 502 }
      )
    }

    const contentType = res.headers.get('content-type') || 'image/png'
    const body = await res.arrayBuffer()

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (e) {
    console.error('[proxy-image]', e)
    return NextResponse.json({ error: 'Proxy failed' }, { status: 502 })
  }
}
