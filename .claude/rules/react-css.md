# React & CSS conventions

Plain JS React 19 (no TypeScript), no routing/state-management library, no CSS framework, no CSS Modules. Styling is CSS-in-JS via [styled-components](https://styled-components.com). Keep it that way. The app doesn't need anything else.

## Components

- Function components + hooks only. No class components.
- Top-level screen/section components (`DesktopApp`, `MobileApp`, `Sections.jsx` exports) use a named `function` declaration: `export function ComponentName(props) {}`.
- Small presentational subcomponents grouped in one file (e.g. `Cards.jsx`) can be concise named arrow-function exports: `export const Label = ({ children }) => (...)`.
- Destructure props directly in the function signature rather than accessing `props.x` in the body.
- oxlint (`.oxlintrc.json`, react + oxc plugins) enforces rules-of-hooks and flags files that mix component exports with non-component exports. Run `npm run lint` before a PR.

## Styling model

All styling is `styled-components`. No inline `style={{}}` attributes — if you find yourself reaching for one, there's almost always a styled component or a prop-driven template literal that expresses it instead.

1. **Design tokens** live in `src/styles/tokens.js`: `themeTokens.grimoire` / `themeTokens.scroll` (the two theme palettes) plus shared, content-derived color maps (`schoolColors`, `actionTypeColors`, `difficultyColors`, etc.) that would otherwise be duplicated between the desktop and mobile component trees. This file is the single source of truth — don't hand-duplicate a color map in a component when it already exists here, and don't inline a new theme color in a component; add it to `themeTokens` instead.
2. **Global styles** live in `src/styles/GlobalStyle.js`, a `createGlobalStyle` component rendered once in `main.jsx`. It generates the `html[data-theme="grimoire"]` / `html[data-theme="scroll"]` CSS custom property blocks from `tokens.js`, plus the box-sizing reset and the few selectors owned by `index.html` rather than any React component (`#root`, `body`, base `a` styling). Theme switching still works by flipping `data-theme` on `<html>` (see `useTheme.js`) — components reference tokens via `var(--accent)`, `var(--surface)`, `var(--text-muted)`, etc., not via `ThemeProvider`, so toggling a theme is a CSS-variable cascade rather than a React re-render.
3. **Shared keyframe animations** live in `src/styles/keyframes.js` (`fadeIn`, `slideIn`), built with styled-components' `keyframes` helper and referenced from any styled component's `animation:` property.
4. **Component-specific presentation** is a `styled.div`/`styled.button`/etc. defined near the component that uses it (top of the same file, or immediately above the component for one-offs). Reference theme values via `var(--token)` inside the template literal exactly as you would in the old inline-style objects.
5. **Dynamic, per-instance values** (selection state, a race's accent color, hover-driven variants) are passed as transient props (`$color`, `$active`, `$selected`, …) and interpolated in the template literal: `` background: ${p => p.$active ? 'var(--accent-subtle)' : 'transparent'}; ``. The `$` prefix keeps styled-components from forwarding the prop to the DOM node. Prefer real CSS (`&:hover`, `&:focus`) over JS-tracked hover state where the interaction is purely visual.

Exception: content-derived, intentionally theme-independent colors (a race's accent color, a difficulty-badge color keyed off a fixed palette) can stay as literal hex values passed through a `$color` prop, since they aren't meant to shift with the theme. Centralize the map itself in `tokens.js` even so.

When a new visual need doesn't fit an existing `--token`, add the token to `themeTokens` in `src/styles/tokens.js` (both `grimoire` and `scroll`) rather than hardcoding a color in a component.

## Layout & responsiveness

- Flexbox/grid only. No layout framework.
- The desktop/mobile split happens at a single 768px breakpoint via the `useMediaQuery` hook (`src/hooks/useMediaQuery.js`), consumed in `App.jsx` to pick `DesktopApp` vs `MobileApp`. Reuse this hook for any new responsive behavior instead of introducing ad hoc `matchMedia` calls or a second breakpoint.
