/**
 * Fallback badge paths when generated slides omit `image` on list items (sync with analytics/league_data BADGE_IMAGES).
 */
export const ACHIEVEMENT_IMAGE_FALLBACK: Record<string, string> = {
  'The Scoring King': '/badges/the-scoring-king-badge.png',
  'The Sharpshooter': '/badges/the-sharpshooter-badge.png',
  'The Cold Blooded': '/badges/the-coldblooded-badge.png',
  'The Worm': '/badges/the-worm-badge.png',
  'The Point God': '/badges/the-poing-god-badge.png',
  'The Splash Father': '/badges/the-splash-father-badge.png',
  'The Grand Theft Alvarado': '/badges/grand-theft-alvarado.png',
  'The Rim Guardian': '/badges/the-rim-guardian-badge.png',
  'The Caretaker': '/badges/the-caretaker-badge.png',
  'The Closer': '/badges/the-closer-badge.png',
  'The Choke': '/badges/the-choke.png',
  'The Kingslayer': '/badges/kingslayer.png',
  Unstoppable: '/badges/the-unstoppable-badge.png',
  'Free Fall': '/badges/free-fall.png',
  'Ceiling Check': '/badges/ceiling-check.png',
  'Public Enemy No. 1': '/badges/public-enemy-no1.png',
  'Manager Of The Year': '/badges/manager-of-the-year.png',
}

export function achievementImageOrFallback(name: string, image?: string): string | undefined {
  if (image?.trim()) return image
  return ACHIEVEMENT_IMAGE_FALLBACK[name]
}
