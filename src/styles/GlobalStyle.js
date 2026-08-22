import { createGlobalStyle, css } from 'styled-components';
import { themeTokens } from './tokens.js';

const kebab = (key) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const cssVars = (tokens) => css`
  ${Object.entries(tokens)
    .filter(([key]) => key !== 'colorScheme')
    .map(([key, value]) => `--${kebab(key)}: ${value};`)
    .join('\n')}
  color-scheme: ${tokens.colorScheme};
`;

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  html { font-size: 16px; -webkit-text-size-adjust: 100%; }
  button { font-family: inherit; }

  html[data-theme='grimoire'] {
    ${cssVars(themeTokens.grimoire)}
  }

  html[data-theme='scroll'] {
    ${cssVars(themeTokens.scroll)}
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
  }
  a { color: var(--accent); }
  a:hover { color: var(--text); }

  /*
   * #root lays out the app's atomic regions (Sidebar, MainViewport, TopBar,
   * ScreenViewport, TabBar) as named grid areas. Each region places itself
   * via its own \`grid-area\` and hides itself via its own media query, so
   * this breakpoint only needs to describe which areas are active.
   */
  #root {
    display: grid;
    height: 100dvh;
    width: 100%;
    overflow: hidden;
    overscroll-behavior: none;
    grid-template-columns: 220px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "sidebar main";
  }

  @media (max-width: 768px) {
    #root {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      grid-template-areas:
        "topbar"
        "content";
    }
  }
`;
