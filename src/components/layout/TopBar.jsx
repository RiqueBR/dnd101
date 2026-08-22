import styled from 'styled-components';
import { MobileThemeToggleButton } from '../ThemeToggle.jsx';
import { MOBILE_TABS } from '../../data/navigation.js';

const TopBarWrap = styled.div`
  grid-area: topbar;
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

  @media (min-width: 769px) {
    display: none;
  }
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

export function TopBar({ theme, toggleTheme, tab }) {
  const { heading: head, subheading: sub } = MOBILE_TABS.find((t) => t.id === tab);

  return (
    <TopBarWrap>
      <div>
        <Title>{head}</Title>
        <Sub>{sub}</Sub>
      </div>
      <MobileThemeToggleButton onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'grimoire'
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>}
      </MobileThemeToggleButton>
    </TopBarWrap>
  );
}
