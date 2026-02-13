'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // TODO: Implementar recuperación de contraseña
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <h1 className="font-heading text-4xl text-primary-500 mb-2">
              Email enviado
            </h1>
            <p className="text-slate-400">
              Revisa tu bandeja de entrada para restablecer tu contraseña
            </p>
          </div>
          <Link
            href="/login"
            className="inline-block rounded-lg bg-primary-600 px-6 py-2 font-medium text-white hover:bg-primary-700 transition-colors"
          >
            Volver a login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl text-primary-500 mb-2">
            Recuperar contraseña
          </h1>
          <p className="text-slate-400">
            Ingresa tu email para recibir un enlace de recuperación
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-slate-900 p-8 border border-slate-800">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-slate-800 px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="tu@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-wait transition-colors"
          >
            {loading ? 'Enviando...' : 'Enviar enlace'}
          </button>

          <p className="text-center text-sm text-slate-400">
            <Link href="/login" className="text-primary-400 hover:text-primary-300">
              Volver a login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
