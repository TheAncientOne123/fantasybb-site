# Landing Page de LACMSI League

## Descripción

La landing page de la **LACMSI League** (Look At Curry Man So Inspirational League) es la página principal del sitio web de Fantasy Basketball. Presenta una experiencia completa e inmersiva que introduce a los visitantes a la liga y les permite acceder rápidamente a sus equipos.

## Estructura de la Landing Page

La landing page está compuesta por las siguientes secciones, en orden:

### 1. Hero Section (LeagueHero)
- Presenta el nombre completo de la liga: **LACMSI League**
- Muestra el nombre expandido: "Look At Curry Man So Inspirational"
- Incluye un tagline descriptivo
- Diseño con gradientes y animaciones de entrada

### 2. Menú de Navegación (LeagueNav)
Cuatro tarjetas interactivas que llevan a las principales secciones:
- **Rewind**: Revive tu temporada
- **Timeline**: Historial de la liga
- **Hall of Fame**: Premios y reconocimientos
- **Stats Room**: Estadísticas detalladas

### 3. Introducción a la Liga (LeagueIntro)
- Explica qué es la LACMSI League
- Describe la filosofía y valores de la liga
- Presenta la comunidad y el espíritu competitivo

### 4. Miembros/Equipos (LeagueMembers)
- Grid visual de todos los equipos de la temporada activa
- Muestra logos de equipos cuando están disponibles
- Cada equipo es clickeable y lleva a su Rewind individual
- Diseño responsive (2-3-5 columnas según el tamaño de pantalla)

### 5. Reglas de la Liga (LeagueRules)
- Tarjeta destacada que invita a conocer las reglas
- Botón que lleva a la página completa de reglas (`/rules`)
- Diseño con gradiente especial para destacar

### 6. Acceso Rápido (QuickAccess)
- Buscador de equipos con autocompletado
- Selector de temporada
- Permite acceso directo al Rewind de cualquier equipo
- Misma funcionalidad que la página anterior pero integrada en la landing

### 7. Campeones por Temporada (SeasonChampions)
- Grid de tarjetas doradas mostrando los campeones de cada temporada
- Incluye el record del campeón
- Diseño especial con iconos de trofeo y corona
- Enlaces directos al Rewind del campeón

### 8. Footer
- Copyright y tagline de la liga

## Componentes Creados

Todos los componentes están en `src/components/landing/`:

- `LeagueHero.tsx` - Hero section principal
- `LeagueNav.tsx` - Menú de navegación con 4 secciones
- `LeagueIntro.tsx` - Introducción y descripción de la liga
- `LeagueMembers.tsx` - Grid de equipos con logos
- `LeagueRules.tsx` - Tarjeta de reglas con CTA
- `QuickAccess.tsx` - Buscador rápido de equipos
- `SeasonChampions.tsx` - Lista de campeones por temporada

## Páginas

### Página Principal (`src/app/page.tsx`)
Integra todos los componentes de landing en una experiencia fluida y cohesiva.

### Página de Reglas (`src/app/rules/page.tsx`)
Página dedicada con las reglas completas de la liga:
- Formato de la liga
- Categorías de scoring (9CAT)
- Reglas de draft
- Configuración de roster
- Políticas de trades
- Sistema de playoffs
- Conducta y fair play
- Filosofía de la liga

## Características Técnicas

- **Animaciones**: Uso de Framer Motion para transiciones suaves
- **Responsive**: Diseño adaptable a todos los tamaños de pantalla
- **Accesibilidad**: Labels apropiados y navegación por teclado
- **Performance**: Componentes optimizados con lazy loading de imágenes
- **Tipado**: TypeScript completo en todos los componentes

## Personalización

### Agregar Nuevos Campeones

Edita `src/components/landing/SeasonChampions.tsx` y agrega entradas al array `champions`:

```typescript
const champions: Champion[] = [
  {
    seasonId: '2027',
    seasonLabel: '2026-27',
    teamName: 'Nombre del Equipo',
    teamId: 'team-id',
    record: '12-4-0'
  },
  // ... más campeones
]
```

### Actualizar Logos de Equipos

Los logos se mapean en `src/components/landing/LeagueMembers.tsx`:

```typescript
const teamLogos: Record<string, string> = {
  'team-id': '/team-logos/team-logo.png',
  // ... más logos
}
```

Coloca los archivos de imagen en `public/team-logos/`.

### Modificar Secciones del Menú

Edita el array `navItems` en `src/components/landing/LeagueNav.tsx` para cambiar las secciones principales.

## Estilo Visual

- **Colores principales**: 
  - Fondo: slate-950
  - Acento: amber-400/500
  - Secundario: purple/blue gradients
- **Tipografía**:
  - Headings: Bebas Neue (font-heading)
  - Body: Inter (font-body)
- **Efectos**: Backdrop blur, borders translúcidos, hover states

## Próximos Pasos

Para completar la experiencia, considera implementar:
- Página de Timeline (`/timeline`)
- Página de Stats Room (`/stats`)
- Mejorar la página de Hall of Fame (`/awards`)
- Agregar más temporadas históricas
- Sistema de autenticación para managers
