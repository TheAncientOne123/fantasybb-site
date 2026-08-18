import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import StatsAdminRunner from '@/components/admin/StatsAdminRunner'
import { getLeagueCatalog } from '@/data/catalog/repository'
import { isLocalAdminHost } from '@/lib/local-admin'

export const dynamic = 'force-dynamic'

export default async function StatsAdminPage() {
  if (!isLocalAdminHost(headers().get('host'))) notFound()

  const catalog = await getLeagueCatalog()
  const activeSeason =
    catalog.seasons.find((season) => season.isActive) ?? catalog.seasons[0]

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <Link href="/stats" className="text-sm text-slate-400 transition hover:text-white">
            ← Volver a Stats Room
          </Link>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Administrar estadísticas
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Esta herramienta sólo funciona desde localhost. Primero genera un borrador con los
            datos de ESPN, revísalo aquí y después decide si quieres publicarlo en Neon.
          </p>
        </header>

        <aside className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4 text-sm leading-6 text-amber-100/80">
          La generación puede tardar varios minutos. No cierres esta pestaña ni detengas el
          servidor local mientras trabaja. Generar nunca modifica Neon; únicamente el botón de
          publicación escribe en la base de datos.
        </aside>

        <StatsAdminRunner
          seasons={catalog.seasons}
          defaultSeasonId={activeSeason?.id ?? ''}
        />
      </div>
    </main>
  )
}
