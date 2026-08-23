# D&D 101

[![CI](https://github.com/RiqueBR/dnd101/actions/workflows/ci.yml/badge.svg)](https://github.com/RiqueBR/dnd101/actions/workflows/ci.yml)

A beginner's reference to Dungeons & Dragons 5th Edition: races, classes, race/class pairings, ability scores, actions, spells, and the anatomy of a combat round.

A single React app that renders a sidebar desktop layout above 768px and a bottom-tab mobile layout at or below it, switching live on resize. Two hand-crafted dark ("Grimoire") and light ("Scroll") themes, toggleable and persisted to `localStorage`.

## Stack

- [Vite](https://vite.dev) + React 19, plain JS (no TypeScript)
- [styled-components](https://styled-components.com) for CSS-in-JS. Theming is CSS custom properties generated from a token file and flipped via a `data-theme` attribute; flexbox/grid for layout
- No routing library or state management library. This app doesn't need one

## Project structure

```
src/
  data/dndData.js              All game content (races, classes, spells, rules) as one exported object
  styles/tokens.js             Design tokens: both themes' CSS custom properties + shared content-derived color maps
  styles/GlobalStyle.js        createGlobalStyle: reset, theme CSS custom properties, #root layout
  styles/keyframes.js          Shared styled-components keyframe animations (fadeIn, slideIn)
  hooks/useTheme.js            Theme state + localStorage persistence
  hooks/useMediaQuery.js       matchMedia-backed responsive hook (useSyncExternalStore)
  components/ThemeToggle.jsx   Shared styled theme-toggle button (desktop + mobile variants)
  components/desktop/          Sidebar layout: DesktopApp, Sections, Cards
  components/mobile/           Bottom-tab layout: MobileApp, MobileScreens
  App.jsx                      Picks Desktop or Mobile based on viewport width
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

`npm run build` produces a fully static `dist/` folder. No server-side code, no environment variables required. It can be deployed to any static host:

- **Vercel / Netlify / Cloudflare Pages**: connect the repo and set build command `npm run build`, output directory `dist`. All three auto-detect Vite.
- **GitHub Pages**: run `npm run build`, then publish the `dist/` folder to the `gh-pages` branch (e.g. via the `gh-pages` npm package or a GitHub Actions workflow). If served from a subpath (`username.github.io/repo-name`), set `base: '/repo-name/'` in `vite.config.js` first.
- **Any static file server** (S3+CloudFront, nginx, etc.): upload the contents of `dist/` as-is.

No server runtime, database, or API is involved. This is a static content reference app.
