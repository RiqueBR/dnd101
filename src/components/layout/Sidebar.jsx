import styled from 'styled-components';
import { ThemeToggleButton } from '../ThemeToggle.jsx';
import { DESKTOP_NAV } from '../../data/navigation.js';

const SidebarWrap = styled.div`
  grid-area: sidebar;
  width: 220px;
  min-width: 220px;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 24px 20px 20px;
  border-bottom: 1px solid var(--sidebar-border);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const Brand = styled.div`
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 900;
  color: var(--text);
  letter-spacing: 0.06em;
  line-height: 1.1;
`;

const BrandSub = styled.div`
  font-family: var(--font-heading);
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-top: 2px;
`;

const Tagline = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 8px;
  line-height: 1.4;
`;

const Nav = styled.nav`
  padding: 12px 10px;
  flex: 1;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 12px;
  border-radius: 6px;
  margin-bottom: 2px;
  margin-top: ${(p) => (p.$highlight ? '10px' : 0)};
  background: ${(p) => (p.$active ? 'var(--accent-subtle)' : 'transparent')};
  border: ${(p) => (p.$highlight
    ? `1.5px dashed ${p.$active ? 'var(--accent)' : 'var(--accent-border)'}`
    : `1px solid ${p.$active ? 'var(--accent-border)' : 'transparent'}`)};
  color: ${(p) => (p.$active ? 'var(--accent)' : p.$highlight ? 'var(--accent)' : 'var(--text-muted)')};
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  font-family: var(--font-heading);
  font-size: 12px;
  letter-spacing: 0.04em;
  font-weight: ${(p) => (p.$active ? 700 : p.$highlight ? 600 : 400)};
`;

const NavIcon = styled.span`
  font-size: 13px;
  width: 16px;
  text-align: center;
  flex-shrink: 0;
`;

const SidebarFooter = styled.div`
  padding: 14px 16px;
  border-top: 1px solid var(--sidebar-border);
`;

const FooterText = styled.div`
  font-size: 10px;
  color: var(--text-muted);
  line-height: 1.6;
  font-style: italic;
`;

export function Sidebar({ theme, toggleTheme, section, onSelectSection }) {
  return (
    <SidebarWrap>
      <SidebarHeader>
        <HeaderRow>
          <div>
            <Brand>D&D</Brand>
            <BrandSub>101</BrandSub>
          </div>
          <ThemeToggleButton onClick={toggleTheme} aria-label={theme === 'grimoire' ? 'Switch to light theme' : 'Switch to dark theme'} title={theme === 'grimoire' ? 'Light mode' : 'Dark mode'}>
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
          </ThemeToggleButton>
        </HeaderRow>
        <Tagline>A beginner's reference to Dungeons & Dragons 5th Edition</Tagline>
      </SidebarHeader>

      <Nav>
        {DESKTOP_NAV.map((item) => {
          const active = section === item.id;
          return (
            <NavButton key={item.id} onClick={() => onSelectSection(item.id)} $active={active} $highlight={item.highlight}>
              <NavIcon>{item.icon}</NavIcon>
              {item.label}
            </NavButton>
          );
        })}
      </Nav>

      <SidebarFooter>
        <FooterText>Based on D&D 5th Edition (5e) core rules. Content is educational.</FooterText>
      </SidebarFooter>
    </SidebarWrap>
  );
}
