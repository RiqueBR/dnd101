import styled from 'styled-components';
import { MRaces, MClasses, MPair, MRules, MSpells } from '../mobile/MobileScreens.jsx';

const SCREENS = {
  races: MRaces,
  classes: MClasses,
  pair: MPair,
  rules: MRules,
  spells: MSpells,
};

const ScrollArea = styled.div`
  grid-area: content;
  overflow-y: auto;
  padding: 16px 14px calc(env(safe-area-inset-bottom) + 88px);
  scrollbar-width: none;

  @media (min-width: 769px) {
    display: none;
  }

  @supports not (scrollbar-width: none) {
    &::-webkit-scrollbar { width: 0; }
  }
`;

export function ScreenViewport({ tab }) {
  const Screen = SCREENS[tab];

  return (
    <ScrollArea key={tab}>
      <Screen />
    </ScrollArea>
  );
}
