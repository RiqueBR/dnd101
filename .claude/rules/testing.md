# Testing strategy (BDD-style)

Two layers, each with a distinct job — don't duplicate coverage across them:

- **Unit** (Vitest + `@testing-library/react` + jsdom, see `src/test/setup.js`): hooks with real branching logic, data-module invariants, and components with conditional rendering that's cheap to isolate. Fast, precise failure localization.
- **E2E** (Playwright, `e2e/`): cross-component flows a user actually walks through — navigation, the character wizard, theme persistence — in a real browser at real viewport sizes. This is also where responsive/breakpoint behavior belongs; jsdom + a mocked `matchMedia` can't be trusted for real CSS media queries.

When a flow is already covered end-to-end, don't also re-assert it piecemeal in a unit test — pick whichever layer is the better fit and let the other one skip it.

## Commands

- `npm test`: full gate (lint, then unit, then e2e) — what CI runs
- `npm run lint`: oxlint only
- `npm run test:unit`: Vitest only
- `npm run test:e2e`: Playwright only (starts the dev server itself)
- `npm run test:watch`: Vitest watch mode, use while developing

Run `npm test` before considering any change done. Don't wait until PR time to discover a failure.

## Unit tests

### Structure

- Co-locate tests next to the code they cover: `Foo.js(x)` → `Foo.test.js(x)` in the same directory (see `useTheme.test.js`, `Cards.test.jsx`, `dndData.test.js`).
- `describe(...)` names the unit under test (a hook, component, or data module).
- `it(...)` names a single observable behavior in plain language, phrased as **"does X when Y"**. Describe what a consumer sees, not the internal steps. Bad: `it('sets state variable')`. Good: `it('defaults to grimoire when no data-theme attribute is set')`.
- Body follows arrange → act → assert, in that order, without needing comments to label the sections.
- If a test touches shared/global state (`localStorage`, `document.documentElement`, DOM attributes), reset it in `beforeEach`/`afterEach`. See `useTheme.test.js` for the pattern.

### What to test

- Hooks with real logic (`useTheme`, `useMediaQuery`): every branch of their behavior, including defaults, transitions, and persistence.
- Data modules (`dndData.js`): shape/invariants that the app relies on (e.g., every class has required fields), not the full content.
- A specific state-gating rule that's cheap to pin down in isolation (e.g. "the Class step is disabled until a race is picked").

Skip dedicated tests for purely presentational leaf components with no logic or branching (e.g. `Label`, `StatBadge` in `Cards.jsx`). Add one only once they gain actual behavior. Skip a unit test for a full multi-step interaction flow (a wizard walkthrough, nav + layout switching) if that flow is already exercised end-to-end — see E2E below.

### How to test components

Use Testing Library queries against rendered output (`getByRole`, `getByText`, etc.) and simulate real interaction (`fireEvent`/`userEvent`, wrapped in `act` for hooks). Assert on what the user/consumer would observe: visible text, DOM attributes, hook return values, not on internal component state or implementation details. No snapshot tests.

## E2E tests

- Live in `e2e/`, one `*.spec.js` per flow area (see `navigation.spec.js`, `character-wizard.spec.js`, `theme.spec.js`), not co-located with the components they exercise — a flow spans multiple files.
- Config is `playwright.config.js`: Chromium only, `webServer` boots `npm run dev` itself (no need to start one manually), `baseURL` is `http://localhost:5173`.
- Cover full user-observable flows: multi-step interactions, nav/layout switching across real viewport sizes, and anything that persists across a reload (`localStorage`-backed state). Don't add an e2e case for something a unit test already pins down cheaper and faster (e.g. a single disabled-button state).
- Use Playwright's own locators (`getByRole`, `getByText`) the same way the unit tests use Testing Library's — assert on visible text/attributes, not internal state.
- Pull expected content (race/class names, pairing summaries) from `src/data/dndData.js` directly rather than hardcoding strings, so specs don't drift from the data.
- Locally, Playwright drives the machine's installed Chrome (`channel: 'chrome'`) so there's no separate browser download; CI installs its own Chromium via `npx playwright install --with-deps chromium`.

## Before opening a PR

CI (`.github/workflows/ci.yml`) runs `npm test` (lint + unit + e2e), then `npm run build` on every PR, and `main` requires this to pass. Run both locally before pushing.
