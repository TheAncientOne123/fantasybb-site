/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Verification builds can run alongside a user's development server.
  distDir: process.env.FANTASY_NEXT_DIST_DIR || '.next',
  images: {
    domains: [
      'a.espncdn.com',
      'secure.espncdn.com',
      'g.espncdn.com',
      'cdn.nba.com',
      'mystique-api.fantasy.espn.com',
    ],
  },
}

module.exports = nextConfig
