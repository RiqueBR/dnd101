import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MobileThemeToggleButton } from '../ThemeToggle.jsx';
import { MRaces, MClasses, MPair, MRules, MSpells } from './MobileScreens.jsx';

const TABS = [
  { id: 'races', label: 'Races', icon: '◈' },
  { id: 'classes', label: 'Classes', icon: '⚔' },
  { id: 'pair', label: 'Pair', icon: '◎' },
  { id: 'rules', label: 'Rules', icon: '⦿' },
  { id: 'spells', label: 'Spells', icon: '✦' },
];

const HEADS = {
  races: ['Races', 'Ancestry, traits and bonuses'],
  classes: ['Classes', 'Your adventuring profession'],
  pair: ['Race + Class', 'Find a combo that works'],
  rules: ['Rules', 'Stats, actions and turn order'],
  spells: ['Spells', 'What to cast and what to roll'],
};

const SCREENS = {
  races: MRaces,
  classes: MClasses,
  pair: MPair,
  rules: MRules,
  spells: MSpells,
};

const MobileShell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  overscroll-behavior: none;
`;

const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: calc(env(safe-area-inset-top) + 12px) 16px 12px;
  background: var(--bar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--bar-border);
  flex-shrink: 0;
`;

const Title = styled.div`
  font-family: var(--font-heading);
  font-size: 1.1875rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: var(--text);
  line-height: 1.1;
`;

const Sub = styled.div`
  font-size: 0.6875rem;
  color: var(--text-muted);
  margin-top: 1px;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 14px calc(env(safe-area-inset-bottom) + 88px);
  scrollbar-width: none;

  @supports not (scrollbar-width: none) {
    &::-webkit-scrollbar { width: 0; }
  }
`;

const TabBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  padding: 6px 6px calc(env(safe-area-inset-bottom) + 6px);
  background: var(--bar-bg);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--bar-border);
`;

const TabButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  min-height: 52px;
  border: none;
  border-radius: 9px;
  background: ${(p) => (p.$active ? 'var(--accent-subtle)' : 'transparent')};
  color: ${(p) => (p.$active ? 'var(--accent)' : 'var(--text-muted)')};
  font-family: var(--font-heading);
  font-size: 0.65625rem;
  letter-spacing: 0.02em;
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s, color 0.15s;
`;

const TabIcon = styled.span`
  font-size: 1.0625rem;
  line-height: 1;
`;

export function MobileApp({ theme, toggleTheme }) {
  const [tab, setTab] = useState(() => localStorage.getItem('dnd101m-tab') || 'races');
  useEffect(() => { localStorage.setItem('dnd101m-tab', tab); }, [tab]);

  const [head, sub] = HEADS[tab];
  const Screen = SCREENS[tab];

  return (
    <MobileShell>
      <TopBar>
        <div>
          <Title>{head}</Title>
          <Sub>{sub}</Sub>
        </div>
        <MobileThemeToggleButton onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'grimoire'
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>}
        </MobileThemeToggleButton>
      </TopBar>

      <ScrollArea key={tab}>
        <Screen />
      </ScrollArea>

      <TabBar>
        {TABS.map((t) => (
          <TabButton key={t.id} $active={tab === t.id} onClick={() => setTab(t.id)}>
            <TabIcon>{t.icon}</TabIcon>{t.label}
          </TabButton>
        ))}
      </TabBar>
    </MobileShell>
  );
}
