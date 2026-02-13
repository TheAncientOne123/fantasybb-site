'use client'

import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

type Props = {
  src: string
  alt?: string
  className?: string
  /** Si la imagen falla, se muestra la primera letra de este texto (ej. nombre del equipo). */
  placeholderText?: string
}

/**
 * Imagen del rewind con fallback: si no carga (proxy 502, CORS, etc.),
 * muestra un placeholder (inicial del equipo o icono) en lugar del ícono roto.
 */
export function RewindImage({ src, alt = '', className = '', placeholderText }: Props) {
  const [error, setError] = useState(false)

  if (error) {
    const letter = placeholderText?.trim().charAt(0)?.toUpperCase()
    return (
      <div
        className={`flex min-h-[6rem] min-w-[4rem] items-center justify-center rounded-lg bg-white/10 text-white/80 ${className}`}
        aria-hidden
      >
        {letter ? (
          <span className="font-heading text-3xl font-bold">{letter}</span>
        ) : (
          <ImageIcon className="h-1/2 w-1/2 max-h-16 max-w-16 opacity-60" />
        )}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  )
}
