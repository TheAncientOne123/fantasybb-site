# Fantasy NBA League Web App

Aplicación web privada para ligas de Fantasy NBA con enfoque en experiencia premium tipo "Spotify Wrapped + Dashboard Deportivo".

## 🚀 Características

- **Matchup Hub**: Vista semanal con estado actual del matchup
- **My Team**: Perfil completo del equipo con métricas y análisis
- **Stats Lab**: Analítica avanzada con múltiples métricas
- **Moves**: Análisis de waivers, trades y recomendaciones de streamers
- **Timeline**: Historia narrativa de la temporada
- **Awards**: Badges, títulos y Season Rewind/Wrapped

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Autenticación**: NextAuth.js
- **State Management**: Zustand + React Query
- **Charts**: Recharts
- **Animaciones**: Framer Motion
- **Icons**: Lucide React

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start
```

## 📁 Estructura del Proyecto

```
fantasybb-site/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Rutas de autenticación
│   │   ├── (private)/    # Rutas privadas
│   │   └── layout.tsx    # Layout principal
│   ├── components/       # Componentes reutilizables
│   │   ├── ui/          # UI Kit (shadcn-style)
│   │   ├── layout/      # Layout components
│   │   └── features/    # Feature components
│   ├── lib/             # Utilidades y helpers
│   ├── hooks/           # Custom hooks
│   ├── types/           # TypeScript types
│   └── styles/          # Estilos globales
├── public/              # Assets estáticos
└── DESIGN_SPEC.md       # Especificación completa de diseño
```

## 🔐 Autenticación

La app requiere autenticación para todas las rutas privadas. Cada usuario está asociado a un `teamId` y `leagueId`.

## 📊 Integración con ESPN API

El backend utiliza el paquete `espn-api` de Python para obtener datos de la liga de Fantasy NBA.

## 📖 Documentación

Ver `DESIGN_SPEC.md` para la especificación completa de diseño, componentes, rutas y UX.

## 🎨 Diseño

- **Desktop**: Sidebar fija + Top bar
- **Mobile**: Bottom navigation + Tabs internos
- **Tema**: Dark mode por defecto
- **Tipografía**: Bebas Neue (headings) + Inter (body)

## 📝 Licencia

Privado - Uso interno
