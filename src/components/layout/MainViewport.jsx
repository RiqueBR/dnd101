import styled from 'styled-components';
import { fadeIn } from '../../styles/keyframes.js';
import {
  RacesSection,
  ClassesSection,
  AbilityScoresSection,
  RoundsSection,
  SpellsSection,
  ActionsSection,
  PairingSection,
} from '../desktop/Sections.jsx';

const SECTIONS = {
  races: RacesSection,
  classes: ClassesSection,
  abilities: AbilityScoresSection,
  rounds: RoundsSection,
  spells: SpellsSection,
  actions: ActionsSection,
  pairings: PairingSection,
};

const Main = styled.div`
  grid-area: main;
  overflow-y: auto;
  padding: 32px 36px;
  min-width: 0;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar) transparent;
  animation: ${fadeIn} 0.25s ease;

  @media (max-width: 768px) {
    display: none;
  }

  @supports not (scrollbar-color: auto) {
    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: var(--scrollbar); border-radius: 3px; }
  }
`;

export function MainViewport({ section }) {
  const Section = SECTIONS[section] || RacesSection;

  return (
    <Main key={section}>
      <Section />
    </Main>
  );
}
