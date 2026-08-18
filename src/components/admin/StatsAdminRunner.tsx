'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Season } from '@/data/seasons'
import type { GeneratedStatsRoomPreview } from '@/lib/generated-stats-room'

type Props = {
  seasons: Season[]
  defaultSeasonId: string
}

type Action = 'generate' | 'publish'
type Result = { action: Action; status: 'success' | 'error' } | null

export default function StatsAdminRunner({ seasons, defaultSeasonId }: Props) {
  const [seasonId, setSeasonId] = useState(defaultSeasonId)
  const [publishConfirmed, setPublishConfirmed] = useState(false)
  const [runningAction, setRunningAction] = useState<Action | null>(null)
  const [log, setLog] = useState('')
  const [result, setResult] = useState<Result>(null)
  const [preview, setPreview] = useState<GeneratedStatsRoomPreview | null>(null)
  const [previewLoading, setPreviewLoading] = useState(true)
  const [previewError, setPreviewError] = useState<string | null>(null)

  const loadPreview = useCallback(async (selectedSeason: string, signal?: AbortSignal) => {
    setPreviewLoading(true)
    setPreviewError(null)
    try {
      const response = await fetch(
        `/api/admin/stats/generated?season=${encodeURIComponent(selectedSeason)}`,
        { cache: 'no-store', signal }
      )
      if (!response.ok) throw new Error(`No se pudo leer el borrador (${response.status}).`)
      const payload = (await response.json()) as { preview: GeneratedStatsRoomPreview | null }
      setPreview(payload.preview)
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        setPreview(null)
        setPreviewError(error instanceof Error ? error.message : String(error))
      }
    } finally {
      if (!signal?.aborted) setPreviewLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void loadPreview(seasonId, controller.signal)
    return () => controller.abort()
  }, [loadPreview, seasonId])

  const run = async (action: Action) => {
    setRunningAction(action)
    setResult(null)
    setLog(`Iniciando ${action === 'generate' ? 'generación local' : 'publicación en Neon'}...\n`)

    try {
      const response = await fetch('/api/admin/stats/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seasonId, action }),
      })
      if (!response.ok || !response.body) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error ?? `La solicitud falló con estado ${response.status}.`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let completeLog = ''
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        completeLog += chunk
        setLog((current) => current + chunk)
      }

      const succeeded = completeLog.includes('[DONE]')
      setResult({ action, status: succeeded ? 'success' : 'error' })
      if (succeeded && action === 'generate') await loadPreview(seasonId)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setLog((current) => `${current}\n[ERROR] ${message}\n`)
      setResult({ action, status: 'error' })
    } finally {
      setRunningAction(null)
      if (action === 'publish') setPublishConfirmed(false)
    }
  }

  const generatedDate = preview?.generatedAt
    ? new Date(preview.generatedAt).toLocaleString('es-MX')
    : 'Sin fecha registrada'

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <label className="flex max-w-xl flex-col gap-2 text-sm text-slate-300">
          Temporada de trabajo
          <select
            value={seasonId}
            onChange={(event) => {
              setSeasonId(event.target.value)
              setPublishConfirmed(false)
              setResult(null)
              setLog('')
            }}
            disabled={Boolean(runningAction)}
            className="rounded-xl border border-white/15 bg-slate-900 px-4 py-3 text-white disabled:opacity-60"
          >
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.label}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-sky-400/20 bg-sky-400/[0.05] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">Paso 1</p>
            <h2 className="mt-1 font-heading text-xl text-white">Generar borrador</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Consulta ESPN y reemplaza únicamente los archivos locales. No modifica Neon.
            </p>
            <button
              type="button"
              onClick={() => run('generate')}
              disabled={Boolean(runningAction) || !seasonId}
              className="mt-4 w-full rounded-xl bg-sky-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {runningAction === 'generate' ? 'Generando...' : 'Generar borrador local'}
            </button>
          </div>

          <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Paso 2</p>
            <h2 className="mt-1 font-heading text-xl text-white">Publicar en Neon</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Importa exactamente el borrador mostrado abajo y verifica el resultado.
            </p>
            <label className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-400">
              <input
                type="checkbox"
                checked={publishConfirmed}
                onChange={(event) => setPublishConfirmed(event.target.checked)}
                disabled={Boolean(runningAction) || !preview}
                className="mt-1"
              />
              Revisé el borrador y deseo reemplazar esta temporada en Neon.
            </label>
            <button
              type="button"
              onClick={() => run('publish')}
              disabled={Boolean(runningAction) || !publishConfirmed || !preview}
              className="mt-4 w-full rounded-xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {runningAction === 'publish' ? 'Publicando...' : 'Publicar borrador en Neon'}
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Vista previa local</p>
          <h2 className="mt-1 font-heading text-2xl text-white">Dataset generado</h2>
        </div>

        {previewLoading ? (
          <p className="text-sm text-slate-400">Buscando un borrador local...</p>
        ) : previewError ? (
          <p className="rounded-xl border border-red-400/20 bg-red-400/[0.05] p-4 text-sm text-red-300">
            {previewError}
          </p>
        ) : !preview ? (
          <p className="rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-slate-400">
            Todavía no existe un borrador para esta temporada. Generarlo no cambiará Neon.
          </p>
        ) : (
          <>
            <p className="text-sm text-slate-400">Generado: {generatedDate}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['Equipos', preview.teamCount],
                ['Matchups', preview.matchupCount],
                ['Filas 9CAT', preview.nineCatRowCount],
                ['Totales', preview.seasonTotalsCount],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.04] text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Equipo</th>
                    <th className="px-4 py-3">Récord</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.standings.map((standing) => (
                    <tr key={standing.teamId} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 text-amber-300">{standing.rank}</td>
                      <td className="px-4 py-3 text-white">{standing.displayName}</td>
                      <td className="px-4 py-3 text-slate-300">
                        {standing.wins}-{standing.losses}-{standing.ties}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {(log || runningAction) && (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-heading text-xl text-white">Registro de ejecución</h2>
            {result?.status === 'success' && (
              <span className="text-sm text-emerald-400">Completado</span>
            )}
            {result?.status === 'error' && <span className="text-sm text-red-400">Falló</span>}
          </div>
          <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-xs leading-5 text-slate-300">
            {log}
          </pre>
        </section>
      )}
    </div>
  )
}
