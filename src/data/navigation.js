// Single nav tree consumed by Nav.jsx at every viewport size.
// Wide layouts flatten this into 5 direct destinations; narrow layouts show
// the 3 top-level entries and fold a `children` group's items into an
// in-content sub-tab bar. See flattenSections() for the flattening helper.

export const NAV_SECTIONS = [
  { id: 'builder', label: 'Character Builder', icon: '✎' },
  {
    id: 'rules',
    label: 'Rules',
    icon: '⦿',
    children: [
      { id: 'abilities', label: 'Ability Scores', icon: '◉' },
      { id: 'actions', label: 'Actions', icon: '◆' },
      { id: 'rounds', label: 'Anatomy of a Round', icon: '⦿', highlight: true },
    ],
  },
  { id: 'spells', label: 'Spells', icon: '✦' },
  { id: 'encounters', label: 'Encounters', icon: '⚔' },
];

// Every leaf section, in nav order, as it appears on wide (sidebar) layouts.
export const flattenSections = (sections = NAV_SECTIONS) =>
  sections.flatMap((item) => (item.children ? item.children : [item]));
