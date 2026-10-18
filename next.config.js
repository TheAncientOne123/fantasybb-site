/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
