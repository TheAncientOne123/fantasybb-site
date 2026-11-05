import { LinkButton, PageShell, ui } from '@/components/ui'

export default function NotFound() {
  return (
    <PageShell width="narrow" className="flex flex-col items-center justify-center gap-4 space-y-0 py-24 text-center">
      <p className={ui.eyebrow}>Error 404</p>
      <h1 className={ui.pageTitle}>Esta jugada no existe</h1>
      <p className={ui.muted}>La página que buscas no está en la liga.</p>
      <LinkButton href="/" variant="primary">
        Volver al inicio
      </LinkButton>
    </PageShell>
  )
}
