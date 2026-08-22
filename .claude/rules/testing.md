# Testing strategy (BDD-style)

Stack: Vitest + `@testing-library/react` + jsdom (see `src/test/setup.js`). Run with `npm test` (single run) or `npm run test:watch` while developing.

## Structure

- Co-locate tests next to the code they cover: `Foo.js(x)` → `Foo.test.js(x)` in the same directory (see `useTheme.test.js`, `Cards.test.jsx`, `dndData.test.js`).
- `describe(...)` names the unit under test (a hook, component, or data module).
- `it(...)` names a single observable behavior in plain language, phrased as **"does X when Y"** — describe what a consumer sees, not the internal steps. Bad: `it('sets state variable')`. Good: `it('defaults to grimoire when no data-theme attribute is set')`.
- Body follows arrange → act → assert, in that order, without needing comments to label the sections.
- If a test touches shared/global state (`localStorage`, `document.documentElement`, DOM attributes), reset it in `beforeEach`/`afterEach` — see `useTheme.test.js` for the pattern.

## What to test

- Hooks with real logic (`useTheme`, `useMediaQuery`): every branch of their behavior — defaults, transitions, persistence.
- Data modules (`dndData.js`): shape/invariants that the app relies on (e.g., every class has required fields), not the full content.
- Components with conditional rendering or interaction (selection state, hover-driven UI, empty states).

Skip dedicated tests for purely presentational leaf components with no logic or branching (e.g. `Label`, `StatBadge` in `Cards.jsx`) — add one only once they gain actual behavior.

## How to test components

Use Testing Library queries against rendered output (`getByRole`, `getByText`, etc.) and simulate real interaction (`fireEvent`/`userEvent`, wrapped in `act` for hooks). Assert on what the user/consumer would observe — visible text, DOM attributes, hook return values — not on internal component state or implementation details. No snapshot tests.

## Before opening a PR

CI (`.github/workflows/ci.yml`) runs `npm run lint`, `npm test`, then `npm run build` on every PR, and `main` requires this to pass. Run all three locally before pushing.
