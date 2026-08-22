// Display metadata for spells, shared by the desktop and mobile spell screens.

export const SCHOOL_COLORS = {
  Evocation: '#c8743a',
  Abjuration: '#4a6fa5',
  Conjuration: '#4a7a2a',
  Illusion: '#6b3a8b',
  Enchantment: '#8b3a6b',
  Necromancy: '#3a6b5a',
  Divination: '#8b7a1a',
  Transmutation: '#5a7a8b',
};

export const SPELL_SCHOOLS = ['All', ...Object.keys(SCHOOL_COLORS)];

export const SPELL_LEVEL_LABELS = ['Cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];

export const ROLL_TYPE_META = {
  attack: { label: 'Attack Roll', color: '#c8743a' },
  save: { label: 'Save vs DC', color: '#8b3a3a' },
  heal: { label: 'Healing', color: '#4a7a2a' },
  auto: { label: 'Auto-Hit', color: '#6b3a8b' },
  conditional: { label: 'Conditional', color: '#8b7a1a' },
  buff: { label: 'Buff', color: '#4a6fa5' },
  utility: { label: 'Utility', color: '#5a7a8b' },
};
