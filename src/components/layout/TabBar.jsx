import styled from 'styled-components';
import { MOBILE_TABS } from '../../data/navigation.js';

const TabBarWrap = styled.nav`
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

  @media (min-width: 769px) {
    display: none;
  }
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

export function TabBar({ tab, onSelectTab }) {
  return (
    <TabBarWrap>
      {MOBILE_TABS.map((t) => (
        <TabButton key={t.id} $active={tab === t.id} onClick={() => onSelectTab(t.id)}>
          <TabIcon>{t.icon}</TabIcon>{t.label}
        </TabButton>
      ))}
    </TabBarWrap>
  );
}
