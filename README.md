# D&D 101

A beginner's reference to Dungeons & Dragons 5th Edition — races, classes, race/class pairings, ability scores, actions, spells, and the anatomy of a combat round.

A single React app that renders a sidebar desktop layout above 768px and a bottom-tab mobile layout at or below it, switching live on resize. Two hand-crafted dark ("Grimoire") and light ("Scroll") themes, toggleable and persisted to `localStorage`.

## Stack

- [Vite](https://vite.dev) + React 19, plain JS (no TypeScript)
- No CSS framework — hand-written CSS custom properties for theming, flexbox/grid for layout
- No routing library or state management library — this app doesn't need one

## Project structure

```
src/
  data/dndData.js              All game content (races, classes, spells, rules) as one exported object
  hooks/useTheme.js            Theme state + localStorage persistence
  hooks/useMediaQuery.js       matchMedia-backed responsive hook (useSyncExternalStore)
  components/desktop/          Sidebar layout: DesktopApp, Sections, Cards
  components/mobile/           Bottom-tab layout: MobileApp, MobileScreens
  App.jsx                      Picks Desktop or Mobile based on viewport width
  index.css                    Theme tokens + layout CSS for both experiences
legacy-static/                 Original no-build-step HTML/Babel-in-browser prototype (kept for reference; not part of the build)
```

## Development

Requires Node 20+ (built and tested on Node 24 LTS).

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build locally at http://localhost:4173
npm run lint      # oxlint
```

## Deploying

`npm run build` produces a fully static `dist/` folder — no server-side code, no environment variables required. It can be deployed to any static host:

- **Vercel / Netlify / Cloudflare Pages**: connect the repo and set build command `npm run build`, output directory `dist`. All three auto-detect Vite.
- **GitHub Pages**: run `npm run build`, then publish the `dist/` folder to the `gh-pages` branch (e.g. via the `gh-pages` npm package or a GitHub Actions workflow). If served from a subpath (`username.github.io/repo-name`), set `base: '/repo-name/'` in `vite.config.js` first.
- **Any static file server** (S3+CloudFront, nginx, etc.): upload the contents of `dist/` as-is.

No server runtime, database, or API is involved — this is a static content reference app.
