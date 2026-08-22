/*
 * Design tokens: single source of truth for both themes' CSS custom
 * properties (consumed by GlobalStyle.js) and for content-derived color
 * maps shared between the desktop and mobile experiences.
 */

export const themeTokens = {
  grimoire: {
    bg: '#080808',
    surface: '#111118',
    surface2: '#18181f',
    border: '#26262f',
    borderHover: '#3a3a48',
    text: '#e8e0d2',
    textMuted: '#7a7488',
    accent: '#c8a96e',
    accentSubtle: '#c8a96e18',
    accentBorder: '#c8a96e44',
    fontHeading: "'Cinzel', serif",
    fontBody: "'Crimson Pro', Georgia, serif",
    sidebarBg: '#0d0d12',
    sidebarBorder: '#1e1e28',
    barBg: '#0d0d12f2',
    barBorder: '#1e1e28',
    scrollbar: '#26262f',
    diceColor: '#e8c47a',
    diceFillTop: 'rgba(232, 196, 122, 0.35)',
    diceFillBot: 'rgba(232, 196, 122, 0.12)',
    colorScheme: 'dark',
  },
  scroll: {
    bg: '#f0e8d8',
    surface: '#fdf8f0',
    surface2: '#f5edd8',
    border: '#d8c8a8',
    borderHover: '#b89870',
    text: '#241810',
    textMuted: '#7a5c40',
    accent: '#8b4010',
    accentSubtle: '#8b401018',
    accentBorder: '#8b401044',
    fontHeading: "'Cinzel', serif",
    fontBody: "'Crimson Pro', Georgia, serif",
    sidebarBg: '#e8dcc8',
    sidebarBorder: '#cfc0a0',
    barBg: '#e8dcc8f2',
    barBorder: '#cfc0a0',
    scrollbar: '#d0c0a0',
    diceColor: '#8b4010',
    diceFillTop: 'rgba(139, 64, 16, 0.28)',
    diceFillBot: 'rgba(139, 64, 16, 0.08)',
    colorScheme: 'light',
  },
};

// Content-derived, intentionally theme-independent palettes (see react-css.md).
export const difficultyColors = { Beginner: '#4a7a2a', Intermediate: '#8b7a1a', Advanced: '#8b3a3a' };

export const schoolColors = {
  Evocation: '#c8743a',
  Abjuration: '#4a6fa5',
  Conjuration: '#4a7a2a',
  Illusion: '#6b3a8b',
  Enchantment: '#8b3a6b',
  Necromancy: '#3a6b5a',
  Divination: '#8b7a1a',
  Transmutation: '#5a7a8b',
};

export const rollTypeMeta = {
  attack: { label: 'Attack Roll', color: '#c8743a' },
  save: { label: 'Save vs DC', color: '#8b3a3a' },
  heal: { label: 'Healing', color: '#4a7a2a' },
  auto: { label: 'Auto-Hit', color: '#6b3a8b' },
  conditional: { label: 'Conditional', color: '#8b7a1a' },
  buff: { label: 'Buff', color: '#4a6fa5' },
  utility: { label: 'Utility', color: '#5a7a8b' },
};

export const actionTypeColors = {
  Action: '#c8743a',
  'Bonus Action': '#4a6fa5',
  Reaction: '#8b3a3a',
  Free: '#4a7a2a',
  'Action / Bonus / Reaction': '#6b3a8b',
};

// Indexed 0-5 by a pairing's synergy score; index 0 is unused padding.
export const synergyLabels = ['', 'Poor fit', 'Below average', 'Decent match', 'Strong synergy', 'Excellent match'];
export const synergyColors = ['', '#8b3a3a', '#8b6a1a', '#6b7a3a', '#3a7a6b', '#4a6fa5'];

// clip-path polygons keyed by die side count, shared by the desktop and mobile dice illustrations.
export const dieShapes = {
  4: 'polygon(50% 0%, 100% 100%, 0% 100%)',
  6: 'inset(0)',
  8: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  10: 'polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)',
  12: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
  20: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)',
};
