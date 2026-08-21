import { useEffect, useState } from 'react';
import {
  RacesSection,
  ClassesSection,
  AbilityScoresSection,
  RoundsSection,
  SpellsSection,
  ActionsSection,
  PairingSection,
} from './Sections.jsx';

const NAV = [
  { id: 'races', label: 'Races', icon: '◈' },
  { id: 'classes', label: 'Classes', icon: '⚔' },
  { id: 'pairings', label: 'Race + Class', icon: '◎' },
  { id: 'abilities', label: 'Ability Scores', icon: '◉' },
  { id: 'actions', label: 'Actions', icon: '◆' },
  { id: 'spells', label: 'Spells', icon: '✦' },
  { id: 'rounds', label: 'Anatomy of a Round', icon: '⦿', highlight: true },
];

const SECTIONS = {
  races: RacesSection,
  classes: ClassesSection,
  abilities: AbilityScoresSection,
  rounds: RoundsSection,
  spells: SpellsSection,
  actions: ActionsSection,
  pairings: PairingSection,
};

export function DesktopApp({ theme, toggleTheme }) {
  const [section, setSection] = useState(() => localStorage.getItem('dnd101-section') || 'races');

  useEffect(() => { localStorage.setItem('dnd101-section', section); }, [section]);

  const Section = SECTIONS[section] || RacesSection;

  return (
    <>
      <div id="sidebar">
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--sidebar-border)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 900, color: 'var(--text)', letterSpacing: '0.06em', lineHeight: 1.1 }}>
                D&D
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 2 }}>
                101
              </div>
            </div>
            <button id="theme-toggle" onClick={toggleTheme} aria-label={theme === 'grimoire' ? 'Switch to light theme' : 'Switch to dark theme'} title={theme === 'grimoire' ? 'Light mode' : 'Dark mode'}>
              {theme === 'grimoire' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.4 }}>
            A beginner's reference to Dungeons & Dragons 5th Edition
          </div>
        </div>

        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {NAV.map(item => {
            const active = section === item.id;
            const isHighlight = item.highlight;
            return (
              <button key={item.id} onClick={() => setSection(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '9px 12px', borderRadius: 6,
                marginBottom: 2,
                marginTop: isHighlight ? 10 : 0,
                background: active ? 'var(--accent-subtle)' : 'transparent',
                border: isHighlight
                  ? `1.5px dashed ${active ? 'var(--accent)' : 'var(--accent-border)'}`
                  : `1px solid ${active ? 'var(--accent-border)' : 'transparent'}`,
                color: active ? 'var(--accent)' : isHighlight ? 'var(--accent)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left',
                fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.04em',
                fontWeight: active ? 700 : isHighlight ? 600 : 400
              }}>
                <span style={{ fontSize: 13, width: 16, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--sidebar-border)' }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
            Based on D&D 5th Edition (5e) core rules. Content is educational.
          </div>
        </div>
      </div>

      <div id="main" style={{ animation: 'fadeIn 0.25s ease' }} key={section}>
        <Section />
      </div>
    </>
  );
}
