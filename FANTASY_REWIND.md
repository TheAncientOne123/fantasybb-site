# Fantasy Rewind (Spotify Wrapped style)

Static, frontend-only “Fantasy Rewind” experience for a private fantasy basketball league. No backend, no database — all content is local JSON and images in `/public`.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). On the landing page, select or type a team name and click **View my Rewind** to go to `/rewind/[teamId]`.

## Routes

- **`/`** — Landing / “login”. Searchable dropdown of team names. Submit navigates to `/rewind/[teamId]`. Link to “View League Recap” → `/league`.
- **`/rewind/[teamId]`** — Full-screen slide story: Next/Prev, progress dots, Share (downloads current slide as PNG).
- **`/league`** — Placeholder for league recap.

## Data model

- **`src/data/teams/index.ts`** — List of teams: `{ id, displayName }`. Used for autocomplete and routing.
- **`src/data/teams/[teamId].ts`** — One file per team, exporting `TeamRewindData`:
  - `id`, `displayName`, optional `theme: { background, accent }`
  - `slides: Slide[]` (union: `hero` | `stat` | `award` | `image` | `quote`)

Slide types (each can have optional `footer`):

- **hero**: `title`, `subtitle?`, `image?`
- **stat**: `title`, `value`, `label`, `description?`, `image?`
- **award**: `title`, `badgeName`, `description`, `image?`
- **image**: `title?`, `image`, `caption?`
- **quote**: `quote`, `author?`

## Adding a team

1. Add **one data file**: `src/data/teams/[teamId].ts` exporting default `TeamRewindData` (see `curry-lovers.ts` or `sample.ts`).
2. Add **one index entry** in `src/data/teams/index.ts`: `{ id: 'team-id', displayName: 'Team Name' }`.
3. Register the loader in `src/data/getTeamRewind.ts`: add `'team-id': () => import('./teams/team-id')` to `teamModules`.

Images: place assets in `public/assets/` and reference as `/assets/filename.ext` in slide `image` fields.

## File structure

```
src/
├── app/
│   ├── page.tsx                 # Landing (team selector)
│   ├── rewind/[teamId]/page.tsx # Rewind experience
│   └── league/page.tsx          # League recap placeholder
├── components/rewind/
│   ├── SlideRenderer.tsx        # Dispatches by slide.type
│   ├── HeroSlide.tsx
│   ├── StatSlide.tsx
│   ├── AwardSlide.tsx
│   ├── ImageSlide.tsx
│   └── QuoteSlide.tsx
├── data/
│   ├── rewind-types.ts          # Slide union + TeamRewindData
│   ├── getTeamRewind.ts         # Loader by teamId
│   └── teams/
│       ├── index.ts             # Team list + search
│       ├── curry-lovers.ts
│       ├── lebron-army.ts
│       └── sample.ts
public/
└── assets/
    └── rewind-hero-placeholder.svg
```

## Tech

- Next.js 14+ (App Router), TypeScript
- Tailwind CSS, Framer Motion
- html-to-image for Share (PNG download)
- Static export: `next build` / deploy to Vercel or GitHub Pages (no server-only features)
