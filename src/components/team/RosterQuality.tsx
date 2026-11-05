import type { RosterQualityMeasure, TeamRosterQuality } from '@/data/team-profiles/roster-quality'

function dateLabel(date: string) {
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeZone: 'America/Mexico_City' }).format(new Date(date))
}

function RatingBar({ label, value, color, pending, leagueSize }: {
  label: string; value?: RosterQualityMeasure | null; color: string; pending: string; leagueSize?: number
}) {
  const score = value?.score
  const available = score != null
  const missing = value ? value.totalPlayers - value.knownPlayers : 0
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="shrink-0 text-lg font-semibold tabular-nums text-white">
          {available ? `${score.toFixed(1)}/100` : '—'}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-800"
        role={available ? 'meter' : undefined}
        aria-label={available ? label : undefined}
        aria-valuemin={available ? 0 : undefined} aria-valuemax={available ? 100 : undefined}
        aria-valuenow={available ? score : undefined}>
        {available && <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />}
      </div>
      <p className="text-xs leading-5 text-slate-500">
        {available
          ? `${value!.rawValue!.toFixed(1)} pts/plaza · #${value!.rank} de ${leagueSize} · ${value!.knownPlayers}/${value!.totalPlayers} jugadores`
          : missing > 0 ? `Faltan datos de ${missing} de ${value!.totalPlayers} jugadores para calcular la calificación.` : pending}
      </p>
    </div>
  )
}

export default function RosterQuality({ quality }: { quality?: TeamRosterQuality }) {
  const projection = quality?.projection
  const performance = quality?.performance
  const improvement = performance?.improvement
  const deltaLabel = improvement == null ? 'Mejora de plantilla pendiente'
    : improvement > 0 ? `Mejoró +${improvement.toFixed(1)} puntos`
    : improvement < 0 ? `Bajó ${Math.abs(improvement).toFixed(1)} puntos` : 'Sin cambio en la calificación'
  return (
    <section className="mb-10 space-y-5 border-t border-slate-800 pt-7" aria-label="Calidad de Roster">
      <div>
        <h4 className="font-heading text-xl font-semibold text-slate-100">Calidad de Roster</h4>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">Expectativa del draft y evolución de la plantilla en esta temporada.</p>
      </div>
      <div className="grid gap-7 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <h5 className="text-sm font-semibold text-sky-400">Expectativa al draft</h5>
          <RatingBar label="Proyección de pretemporada" value={projection?.measurement} color="bg-sky-400"
            leagueSize={projection?.referenceSize}
            pending={quality?.projectionStatus === 'not-captured' ? 'Proyección original no disponible: no se guardó antes de empezar la temporada.' : 'Proyección original no disponible.'} />
          {projection && <p className="text-xs text-slate-500">Fuente: ESPN. Captura de pretemporada del {dateLabel(projection.capturedAt)}; se conserva para esta temporada.</p>}
        </div>
        <div className="space-y-4">
          <h5 className="text-sm font-semibold text-slate-200">Evolución del roster</h5>
          <RatingBar label="Drafteado · desempeño" value={performance?.drafted} color="bg-slate-400"
            leagueSize={performance?.draftedLeagueSize} pending={performance ? 'Roster drafteado archivado no disponible.' : 'Pendiente de rendimiento real de los jugadores.'} />
          <RatingBar label={performance && !performance.isFinal ? 'Actual · desempeño' : 'Final · desempeño'} value={performance?.final} color="bg-emerald-400"
            leagueSize={performance?.finalLeagueSize} pending={performance ? 'Roster final archivado no disponible.' : 'Pendiente de partidos con datos de rendimiento.'} />
          <p className={`text-sm font-semibold ${improvement == null ? 'text-slate-500' : improvement > 0 ? 'text-emerald-400' : improvement < 0 ? 'text-rose-400' : 'text-slate-300'}`}>
            {deltaLabel}
          </p>
          {performance && <p className="text-xs text-slate-500">{performance.isFinal ? 'Evaluación final' : 'Evaluación provisional'} al {dateLabel(performance.capturedAt)}. Misma ventana y referencia de {performance.referenceSize} plantillas con datos completos.</p>}
        </div>
      </div>
      <details className="text-xs leading-6 text-slate-500">
        <summary className="w-fit cursor-pointer text-slate-400 hover:text-slate-200">Cómo se calcula</summary>
        <p className="mt-2 max-w-3xl">Usamos los puntos fantasy de ESPN con las reglas de esta liga. La contribución por jugador es su promedio de puntos por partido multiplicado por su disponibilidad. La media de toda la plantilla incluye titulares y profundidad. La proyección usa los partidos previstos sobre 82; el desempeño usa los partidos jugados sobre el máximo registrado en el grupo evaluado.</p>
        <p className="mt-2 max-w-3xl">La escala 0–100 expresa la posición relativa: 100 corresponde al mayor valor y 0 al menor; los empates comparten calificación. Drafteado y final se evalúan con el rendimiento de sus jugadores durante la misma ventana NBA, incluyendo jugadores que salieron del equipo, y se normalizan juntos. La mejora es la diferencia entre esas dos calificaciones. La expectativa inicial se compara por separado entre los rosters del draft con datos completos.</p>
        <p className="mt-2 max-w-3xl">Esta evaluación describe la calidad de las plantillas. Las victorias y el momento de cada movimiento conservan sus métricas de temporada. Si falta información de un jugador, la calificación del roster queda pendiente.</p>
      </details>
    </section>
  )
}
