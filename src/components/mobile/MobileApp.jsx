import { useEffect, useState } from 'react';
import { MRaces, MClasses, MPair, MRules, MSpells } from './MobileScreens.jsx';
import { MOBILE_TABS } from '../../data/navigation.js';

const SCREENS = {
  races: MRaces,
  classes: MClasses,
  pair: MPair,
  rules: MRules,
  spells: MSpells,
};

export function MobileApp({ theme, toggleTheme }) {
  const [tab, setTab] = useState(() => localStorage.getItem('dnd101m-tab') || 'races');
  useEffect(() => { localStorage.setItem('dnd101m-tab', tab); }, [tab]);

  const { heading: head, subheading: sub } = MOBILE_TABS.find(t => t.id === tab);
  const Screen = SCREENS[tab];

  return (
    <div className="mobile-shell">
      <div className="m-top">
        <div>
          <div className="m-title">{head}</div>
          <div className="m-sub">{sub}</div>
        </div>
        <button id="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'grimoire'
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>}
        </button>
      </div>

      <div className="m-scroll" key={tab}>
        <Screen />
      </div>

      <nav className="m-tabs">
        {MOBILE_TABS.map(t => (
          <button key={t.id} className={'m-tab' + (tab === t.id ? ' active' : '')} onClick={() => setTab(t.id)}>
            <span className="m-tab-ico">{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
