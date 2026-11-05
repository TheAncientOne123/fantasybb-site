import type { Config } from 'tailwindcss'

/**
 * Los tokens visuales compartidos (superficies, títulos, botones, controles)
 * viven en src/components/ui/styles.ts. Aquí sólo se configuran las fuentes.
 * Paleta del sitio: slate (base), amber (marca/interacción), sky (datos).
 */
const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'Bebas Neue', 'Oswald', 'Inter', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
