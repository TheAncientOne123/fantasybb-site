/**
 * URLs de imágenes del rewind.
 * - Logos por defecto de ESPN (g.espncdn.com, .svg) cargan bien en el navegador.
 * - Imágenes subidas por el usuario vienen de mystique-api.fantasy.espn.com y
 *   no cargan directamente (CORS / no son recurso directo), por lo que se sirven
 *   a través del proxy de la app.
 */

const ESPN_MYSTIQUE_IMAGE_HOST = 'mystique-api.fantasy.espn.com'

/**
 * Indica si la URL es de una imagen subida por el usuario en ESPN
 * (mystique-api), que no se puede cargar directamente en el cliente.
 */
export function isEspnUserUploadedImageUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false
  try {
    const u = new URL(url)
    return u.hostname === ESPN_MYSTIQUE_IMAGE_HOST
  } catch {
    return false
  }
}

/**
 * Devuelve la URL que debe usarse para mostrar la imagen en el rewind.
 * Si es una imagen de mystique-api (subida por el usuario), devuelve la URL
 * del proxy de la app; en caso contrario devuelve la URL original.
 */
export function getRewindImageUrl(url: string | undefined | null): string {
  if (!url || typeof url !== 'string') return ''
  if (isEspnUserUploadedImageUrl(url)) {
    return `/api/proxy-image?url=${encodeURIComponent(url)}`
  }
  return url
}
