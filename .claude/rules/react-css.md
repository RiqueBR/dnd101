# React & CSS conventions

Plain JS React 19 (no TypeScript), no routing/state-management library, no CSS framework, no CSS-in-JS, no CSS Modules. Keep it that way. The app doesn't need any of them.

## Components

- Function components + hooks only. No class components.
- Top-level screen/section components (`DesktopApp`, `MobileApp`, `Sections.jsx` exports) use a named `function` declaration: `export function ComponentName(props) {}`.
- Small presentational subcomponents grouped in one file (e.g. `Cards.jsx`) can be concise named arrow-function exports: `export const Label = ({ children }) => (...)`.
- Destructure props directly in the function signature rather than accessing `props.x` in the body.
- oxlint (`.oxlintrc.json`, react + oxc plugins) enforces rules-of-hooks and flags files that mix component exports with non-component exports. Run `npm run lint` before a PR.

## Two-tier styling model

1. **Theme tokens + shared layout CSS** live in `src/index.css`. Both themes are defined as CSS custom properties under attribute selectors: `html[data-theme="grimoire"]` (dark) and `html[data-theme="scroll"]` (light). Structural/layout rules (sidebar, bars, grids shared across many components) go here as plain class selectors.
2. **Component-specific presentation** (one-off colors, spacing, hover/selection states) is written as inline `style={{}}` objects directly on the JSX element. This is the established pattern (see `Cards.jsx`), not an anti-pattern to "fix". Reference theme values via `var(--token)` (`var(--accent)`, `var(--surface)`, `var(--text-muted)`, etc.) instead of hardcoding colors, so the element re-themes automatically when the user toggles grimoire/scroll.

Exception: content-derived, intentionally theme-independent colors (a race's accent color, a difficulty-badge color keyed off a fixed palette) can stay as literal hex values, since they aren't meant to shift with the theme.

When a new visual need doesn't fit an existing `--token`, add the token to both theme blocks in `index.css` rather than hardcoding a color in a component.

## Layout & responsiveness

- Flexbox/grid only. No layout framework.
- The desktop/mobile split happens at a single 768px breakpoint, done entirely in CSS: `App.jsx` always mounts both `DesktopApp` and `MobileApp`, and `src/index.css` uses `@media (max-width: 768px)` / `@media (min-width: 769px)` to hide whichever shell doesn't apply. Reuse this same breakpoint and pattern (both trees mounted, CSS picks which one shows) for any new responsive behavior instead of introducing JS-based `matchMedia` logic or a second breakpoint.
