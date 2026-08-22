import styled from 'styled-components';
import { ThemeToggleButton } from '../ThemeToggle.jsx';

const Bar = styled.div`
  padding: 24px 20px 20px;
  border-bottom: 1px solid var(--sidebar-border);

  @media (max-width: 768px) {
    position: sticky;
    top: 0;
    z-index: 30;
    order: 0;
    padding: calc(env(safe-area-inset-top) + 12px) 16px 12px;
    background: var(--bar-bg);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--bar-border);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const Brand = styled.div`
  font-family: var(--font-heading);
  font-size: clamp(1.0625rem, 3cqi, 1.125rem);
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export function Header({ theme, toggleTheme }) {
  const isLight = theme === 'grimoire';
  return (
    <Bar>
      <Row>
        <div>
          <Brand>D&D</Brand>
          <BrandSub>101</BrandSub>
        </div>
        <ThemeToggleButton
          onClick={toggleTheme}
          aria-label={isLight ? 'Switch to light theme' : 'Switch to dark theme'}
          title={isLight ? 'Light mode' : 'Dark mode'}
        >
          {isLight ? <SunIcon /> : <MoonIcon />}
        </ThemeToggleButton>
      </Row>
      <Tagline>A beginner's reference to Dungeons & Dragons 5th Edition</Tagline>
    </Bar>
  );
}
