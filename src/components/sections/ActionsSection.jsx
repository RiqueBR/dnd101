import styled from 'styled-components';
import { DND_DATA } from '../../data/dndData.js';
import { actionTypeColors } from '../../styles/tokens.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Grid } from '../ui/Grid.jsx';
import { Surface } from '../ui/Card.jsx';
import { Chip } from '../ui/Badge.jsx';

const OverviewName = styled.div`
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  color: ${(p) => p.$color};
  margin-bottom: 5px;
`;

const OverviewDesc = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
`;

const CategoryBlock = styled.div`
  margin-bottom: 28px;
`;

const CategoryTitle = styled.h3`
  font-family: var(--font-heading);
  color: var(--accent);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 7px;
`;

const ActionCard = styled(Surface)`
  border-left: 3px solid ${(p) => p.$color};
`;

const ActionHeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 5px;
`;

const ActionName = styled.div`
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
`;

const ActionDesc = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 7px;
`;

const DiceBox = styled.div`
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 6px 9px;
  margin-bottom: 7px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
`;

const DiceLabel = styled.span`
  font-size: 9px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-right: 3px;
`;

const DiceNoteInline = styled.div`
  flex-basis: 100%;
  margin-top: 4px;
  font-size: 10.5px;
  color: var(--text-muted);
  line-height: 1.45;
`;

const ActionExample = styled.div`
  font-size: 11px;
  color: var(--accent);
  font-style: italic;
`;

const OVERVIEW = [
  ['Action', 'Your main turn activity. Attack, cast a spell, dash, or more.', '#c8743a'],
  ['Bonus Action', 'Some abilities, spells, or class features let you act again.', '#4a6fa5'],
  ['Reaction', "Triggered by specific events, even on other people's turns.", '#8b3a3a'],
];

const actionColorFor = (type) => {
  const matchedKey = Object.keys(actionTypeColors).find((k) => type.includes(k.split(' ')[0]));
  return actionTypeColors[type] || actionTypeColors[matchedKey] || '#888';
};

export const ActionsSection = () => {
  const { actions } = DND_DATA;
  return (
    <div>
      <SectionHeader title="Actions" subtitle="Every turn in combat, you get one Action, one Bonus Action, and one Reaction. Here's the full menu of what you can do, and when." />
      <Grid $min="200px" $gap="10px" $mb="24px">
        {OVERVIEW.map(([name, desc, color]) => (
          <Surface key={name} $accent={color} $side="top" $padding="12px 14px">
            <OverviewName $color={color}>{name}</OverviewName>
            <OverviewDesc>{desc}</OverviewDesc>
          </Surface>
        ))}
      </Grid>
      {actions.map((cat) => (
        <CategoryBlock key={cat.category}>
          <CategoryTitle>{cat.category}</CategoryTitle>
          <Grid $min="280px" $gap="9px">
            {cat.items.map((a) => {
              const color = actionColorFor(a.type);
              return (
                <ActionCard key={a.name} $color={color} $padding="11px 13px">
                  <ActionHeadRow>
                    <ActionName>{a.name}</ActionName>
                    <Chip $color={color} $solid>{a.type}</Chip>
                  </ActionHeadRow>
                  <ActionDesc>{a.desc}</ActionDesc>
                  {a.dice && (
                    <DiceBox>
                      <DiceLabel>Rolls:</DiceLabel>
                      {a.dice.map((d, i) => <Chip key={i} $color={color} $solid>{d}</Chip>)}
                      {a.diceNote && <DiceNoteInline>{a.diceNote}</DiceNoteInline>}
                    </DiceBox>
                  )}
                  <ActionExample>e.g. {a.example}</ActionExample>
                </ActionCard>
              );
            })}
          </Grid>
        </CategoryBlock>
      ))}
    </div>
  );
};
