import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import StatsAdminRunner from '@/components/admin/StatsAdminRunner'
import { LinkButton, PageHeader, PageShell, ui } from '@/components/ui'
import { getLeagueCatalog } from '@/data/catalog/repository'
import { isLocalAdminHost } from '@/lib/local-admin'

export const dynamic = 'force-dynamic'

export default async function StatsAdminPage() {
  if (!isLocalAdminHost(headers().get('host'))) notFound()

  const catalog = await getLeagueCatalog()
  const activeSeason =
    catalog.seasons.find((season) => season.isActive) ?? catalog.seasons[0]

  return (
    <PageShell width="narrow">
      <PageHeader
        eyebrow="Sólo localhost"
        title="Administrar estadísticas"
        description="Primero genera un borrador con los datos de ESPN, revísalo aquí y después decide si quieres publicarlo en Neon. La sincronización diaria automática (n8n, 3:00 AM) ejecuta estos mismos pasos con npm run sync:espn."
        actions={
          <LinkButton href="/stats" size="sm">
            Ver Stats Room
          </LinkButton>
        }
      />

      <aside className={ui.notice}>
        La generación puede tardar varios minutos. No cierres esta pestaña ni detengas el
        servidor local mientras trabaja. Generar borrador sólo modifica archivos locales.
        Sincronizar equipos y Publicar en Neon sí escriben en la base de datos compartida.
      </aside>

      <StatsAdminRunner seasons={catalog.seasons} defaultSeasonId={activeSeason?.id ?? ''} />
    </PageShell>
  )
}
