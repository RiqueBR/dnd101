// Nav/tab config shared by the desktop sidebar and mobile bottom-tab bar.
// Screen/section component wiring stays in DesktopApp.jsx / MobileApp.jsx
// since it needs direct references to the rendered components.

export const MOBILE_TABS = [
  { id: 'races', label: 'Races', icon: '◈', heading: 'Races', subheading: 'Ancestry, traits and bonuses' },
  { id: 'classes', label: 'Classes', icon: '⚔', heading: 'Classes', subheading: 'Your adventuring profession' },
  { id: 'pair', label: 'Pair', icon: '◎', heading: 'Race + Class', subheading: 'Find a combo that works' },
  { id: 'rules', label: 'Rules', icon: '⦿', heading: 'Rules', subheading: 'Stats, actions and turn order' },
  { id: 'spells', label: 'Spells', icon: '✦', heading: 'Spells', subheading: 'What to cast and what to roll' },
];

export const DESKTOP_NAV = [
  { id: 'races', label: 'Races', icon: '◈' },
  { id: 'classes', label: 'Classes', icon: '⚔' },
  { id: 'pairings', label: 'Race + Class', icon: '◎' },
  { id: 'abilities', label: 'Ability Scores', icon: '◉' },
  { id: 'actions', label: 'Actions', icon: '◆' },
  { id: 'spells', label: 'Spells', icon: '✦' },
  { id: 'rounds', label: 'Anatomy of a Round', icon: '⦿', highlight: true },
];
