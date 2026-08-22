import styled from 'styled-components';
import { NAV_SECTIONS, flattenSections } from '../../data/navigation.js';

const RULES_GROUP = NAV_SECTIONS.find((s) => s.id === 'rules');

const List = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 12px 10px;
  overflow-y: auto;

  @media (max-width: 768px) {
    order: 2;
    flex: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 40;
    padding: 6px 6px calc(env(safe-area-inset-bottom) + 6px);
    background: var(--bar-bg);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--bar-border);
    overflow: visible;
  }
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
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    min-height: 52px;
    margin: 0;
    border: none;
    border-radius: 9px;
    font-size: 0.65625rem;
  }
`;

const NavIcon = styled.span`
  font-size: 13px;
  width: 16px;
  text-align: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 1.0625rem;
    width: auto;
    line-height: 1;
  }
`;

export function Nav({ activeId, onSelect, isNarrow }) {
  const items = isNarrow ? NAV_SECTIONS : flattenSections();
  return (
    <List>
      {items.map((item) => (
        <NavButton key={item.id} onClick={() => onSelect(item.id)} $active={activeId === item.id} $highlight={item.highlight}>
          <NavIcon>{item.icon}</NavIcon>
          {item.label}
        </NavButton>
      ))}
    </List>
  );
}

const RulesBar = styled.div`
  display: flex;
  gap: 4px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 4px;
  margin-bottom: 16px;
`;

const RulesTabButton = styled.button`
  flex: 1;
  min-height: 38px;
  border-radius: 6px;
  border: none;
  background: ${(p) => (p.$active ? 'var(--accent-subtle)' : 'transparent')};
  color: ${(p) => (p.$active ? 'var(--accent)' : 'var(--text-muted)')};
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

// In-content sub-nav shown on narrow viewports when the active section is one
// of the Rules group's children (Abilities/Actions/Rounds).
export function RulesTabBar({ activeId, onSelect }) {
  return (
    <RulesBar>
      {RULES_GROUP.children.map((child) => (
        <RulesTabButton key={child.id} onClick={() => onSelect(child.id)} $active={activeId === child.id}>
          {child.label}
        </RulesTabButton>
      ))}
    </RulesBar>
  );
}
