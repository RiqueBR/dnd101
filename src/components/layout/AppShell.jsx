import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { fadeIn } from '../../styles/keyframes.js';
import { NAV_SECTIONS } from '../../data/navigation.js';
import { Nav, RulesTabBar } from './Nav.jsx';
import { Header } from './Header.jsx';
import { CharacterWizardSection } from '../sections/CharacterWizardSection.jsx';
import { AbilityScoresSection } from '../sections/AbilityScoresSection.jsx';
import { ActionsSection } from '../sections/ActionsSection.jsx';
import { RoundsSection } from '../sections/RoundsSection.jsx';
import { SpellsSection } from '../sections/SpellsSection.jsx';

const SECTION_COMPONENTS = {
  builder: CharacterWizardSection,
  abilities: AbilityScoresSection,
  actions: ActionsSection,
  rounds: RoundsSection,
  spells: SpellsSection,
};

const RULES_GROUP = NAV_SECTIONS.find((s) => s.id === 'rules');
const RULES_CHILD_IDS = RULES_GROUP.children.map((c) => c.id);

const Shell = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// On wide layouts this is a real sidebar column wrapping Header + Nav; on
// narrow layouts `display: contents` un-nests them so Shell's flexbox can
// reposition Header (top bar) and Nav (bottom bar) around Main independently,
// all from the same DOM tree.
const SidebarCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  min-width: 220px;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border);
  overflow-y: auto;

  @media (max-width: 768px) {
    display: contents;
  }
`;

const Main = styled.div`
  flex: 1;
  overflow-y: auto;
  min-width: 0;
  min-height: 0;
  container-type: inline-size;
  padding: clamp(1rem, 4cqi, 2rem) clamp(1rem, 4cqi, 2.25rem);
  animation: ${fadeIn} 0.25s ease;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar) transparent;

  @supports not (scrollbar-color: auto) {
    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: var(--scrollbar); border-radius: 3px; }
  }

  @media (max-width: 768px) {
    order: 1;
    padding: 16px 14px calc(env(safe-area-inset-bottom) + 88px);
  }
`;

export function AppShell({ theme, toggleTheme }) {
  const isNarrow = useMediaQuery('(max-width: 768px)');
  const [activeSection, setActiveSection] = useState(() => localStorage.getItem('dnd101-section') || 'builder');
  const [activeRulesTab, setActiveRulesTab] = useState('abilities');

  useEffect(() => {
    localStorage.setItem('dnd101-section', activeSection);
  }, [activeSection]);

  const isRulesChild = RULES_CHILD_IDS.includes(activeSection);

  const handleSelect = (id) => {
    if (id === 'rules') {
      setActiveSection(activeRulesTab);
      return;
    }
    setActiveSection(id);
    if (RULES_CHILD_IDS.includes(id)) setActiveRulesTab(id);
  };

  const Section = SECTION_COMPONENTS[activeSection] || CharacterWizardSection;
  const activeNavId = isNarrow && isRulesChild ? 'rules' : activeSection;

  return (
    <Shell>
      <SidebarCol>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Nav activeId={activeNavId} onSelect={handleSelect} isNarrow={isNarrow} />
      </SidebarCol>
      <Main key={activeSection}>
        {isNarrow && isRulesChild && <RulesTabBar activeId={activeSection} onSelect={setActiveSection} />}
        <Section />
      </Main>
    </Shell>
  );
}
