/**
 * Pantalla de carga simple para Suspense / loading.tsx de Next.js.
 */
export default function PageLoading({ message = 'Cargando…' }: { message?: string }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-slate-950 px-6 py-24">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500/80 border-t-transparent"
        aria-hidden
      />
      <p className="text-sm font-medium text-white/50">{message}</p>
    </div>
  )
}
