/**
 * Explicación de cada logro de temporada, tal como se calcula en
 * analytics/league_data.py (FIRST_PLACE_TITLES, TITLE_DESCRIPTIONS, closer_and_choke,
 * public_enemy_no1, compute_moty_winner…). Si cambia una regla allí, actualízala aquí.
 */
export type AchievementInfo = {
  /** Etiqueta corta en español (sustituye a la etiqueta en inglés del dataset). */
  label: string
  description: string
}

export const ACHIEVEMENT_INFO: Record<string, AchievementInfo> = {
  'Campeón de liga': {
    label: 'Campeón',
    description: 'Ganó los playoffs y se llevó a Larry, el trofeo de la liga.',
  },
  'Manager Of The Year': {
    label: 'MOTY',
    description:
      'La mejor gestión de la temporada sobre 100 puntos: 40 por estadísticas (podio en las 9 categorías), 21 por la posición en temporada regular y 39 por MVA (eficiencia de alineaciones e impacto de waivers y trades). Ganar los playoffs no suma.',
  },
  Unstoppable: {
    label: 'Racha de victorias más larga',
    description: 'Encadenó la racha de victorias consecutivas más larga de toda la liga.',
  },
  'The Kingslayer': {
    label: 'Rompe-rachas',
    description: 'Derrotó al equipo Unstoppable y terminó con su racha de victorias.',
  },
  'Free Fall': {
    label: 'Racha de derrotas más larga',
    description: 'Sufrió la racha de derrotas consecutivas más larga de toda la liga.',
  },
  'Ceiling Check': {
    label: 'Mejor semana de la liga',
    description: 'Firmó la semana con más puntos anotados de toda la liga en la temporada.',
  },
  'The Closer': {
    label: 'Más duelos cerrados ganados',
    description: 'Ganó más partidos cerrados que nadie (diferencia de 100 puntos o menos).',
  },
  'The Choke': {
    label: 'Más duelos cerrados perdidos',
    description: 'Perdió más partidos cerrados que nadie (diferencia de 100 puntos o menos).',
  },
  'Public Enemy No. 1': {
    label: 'Rival #1 de más equipos',
    description:
      'Fue el archirrival de más equipos: el oponente con quien más puntos combinados sumaron en sus duelos. Requiere que al menos 2 equipos lo señalen.',
  },
  'The Scoring King': { label: '#1 en PTS', description: 'El equipo que más puntos anotó en la temporada.' },
  'The Sharpshooter': { label: '#1 en FG%', description: 'El mejor porcentaje de tiros de campo de la liga.' },
  'The Cold Blooded': { label: '#1 en FT%', description: 'El mejor porcentaje de tiros libres de la liga.' },
  'The Worm': { label: '#1 en REB', description: 'El equipo con más rebotes de la liga.' },
  'The Point God': { label: '#1 en AST', description: 'El equipo con más asistencias de la liga.' },
  'The Splash Father': { label: '#1 en 3PM', description: 'El equipo con más triples anotados de la liga.' },
  'The Grand Theft Alvarado': { label: '#1 en STL', description: 'El equipo con más robos de la liga.' },
  'The Rim Guardian': { label: '#1 en BLK', description: 'El equipo con más bloqueos de la liga.' },
  'The Caretaker': { label: '#1 en TO', description: 'El equipo con menos pérdidas de balón de la liga.' },
}

export function getAchievementInfo(name: string): AchievementInfo | undefined {
  return ACHIEVEMENT_INFO[name.trim()]
}
