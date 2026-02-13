import type { Metadata } from 'next'
import { Inter, Bebas_Neue, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
})

const bebas = Bebas_Neue({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Fantasy NBA League | lookatcurrymansoinspirational.com',
  description: 'Premium analytics and narrative experience for Fantasy NBA leagues',
  keywords: ['fantasy', 'nba', 'basketball', 'analytics', 'league'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${bebas.variable} ${jetbrains.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  )
}
