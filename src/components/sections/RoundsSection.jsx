import styled from 'styled-components';
import { DND_DATA } from '../../data/dndData.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Grid, Stack } from '../ui/Grid.jsx';
import { Surface } from '../ui/Card.jsx';
import { Label } from '../ui/Badge.jsx';
import { Die } from '../ui/Die.jsx';

const OverviewBox = styled(Surface)`
  margin-bottom: 22px;
`;

const OverviewText = styled.p`
  font-size: 14px;
  color: var(--text);
  line-height: 1.7;
  margin: 0;
`;

const InitiativeBox = styled(Surface)`
  border-left: 3px solid var(--accent);
  margin-bottom: 28px;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

const InitiativeBody = styled.div`
  flex: 1;
  min-width: 240px;
`;

const InitiativeTitle = styled.div`
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 5px;
`;

const InitiativeDesc = styled.p`
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 8px;
`;

const InitiativeDiceChip = styled.div`
  display: inline-block;
  padding: 4px 10px;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  border-radius: 4px;
  color: var(--accent);
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 7px;
`;

const InitiativeTip = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
`;

const TurnFlowWrap = styled.div`
  margin-bottom: 28px;
`;

const TurnStepBody = styled(Surface)`
  flex: 1;
  margin-bottom: 4px;
`;

const TurnStepRow = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 9px;
`;

const TurnStepColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const TurnStepNum = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent-subtle);
  border: 2px solid var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--accent);
  font-size: 14px;
`;

const TurnStepConnector = styled.div`
  width: 2px;
  flex: 1;
  background: var(--border);
  margin-top: 3px;
  min-height: 14px;
`;

const TurnStepName = styled.div`
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
`;

const TurnStepDesc = styled.div`
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.6;
`;

const ReactionsBox = styled(Surface)`
  border-color: #8b3a3a44;
  border-left: 3px solid #8b3a3a;
  margin-bottom: 28px;
`;

const MovementName = styled.div`
  font-family: var(--font-heading);
  font-size: 12.5px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 4px;
`;

const MovementDesc = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
`;

const QARow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: ${(p) => (p.$last ? 0 : '5px')};
`;

const QMarker = styled.span`
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
`;

const AMarker = styled(QMarker)`
  color: var(--text-muted);
`;

const QAQuestion = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
`;

const QAAnswer = styled.span`
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
`;

const DicePrimerBox = styled(Surface)`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const DICE_PRIMER = [
  [4, 'Daggers, healing', '#4a7a2a'],
  [6, 'Sneak Attack, Fireball', '#c8743a'],
  [8, 'Longsword, Cure Wounds', '#4a6fa5'],
  [10, 'Halberds, big spells', '#8b3a6b'],
  [12, 'Greataxe damage', '#8b3a3a'],
  [20, 'ATTACKS & CHECKS', undefined],
];

export const RoundsSection = () => {
  const { rounds } = DND_DATA;
  return (
    <div>
      <SectionHeader title="Anatomy of a Round" subtitle="Combat in D&D is structured: everyone takes a turn in order, then the round repeats. Here's exactly what happens, and what you can do on your turn." />

      <OverviewBox>
        <OverviewText>{rounds.overview}</OverviewText>
      </OverviewBox>

      <Label>Step 0: Rolling Initiative</Label>
      <InitiativeBox>
        <Die sides={20} label="Initiative" />
        <InitiativeBody>
          <InitiativeTitle>{rounds.initiative.title}</InitiativeTitle>
          <InitiativeDesc>{rounds.initiative.desc}</InitiativeDesc>
          <InitiativeDiceChip>{rounds.initiative.dice}</InitiativeDiceChip>
          <InitiativeTip>{rounds.initiative.tip}</InitiativeTip>
        </InitiativeBody>
      </InitiativeBox>

      <Label>On Your Turn: the 6 Steps</Label>
      <TurnFlowWrap>
        {rounds.turnFlow.map((step, i) => (
          <TurnStepRow key={step.step}>
            <TurnStepColumn>
              <TurnStepNum>{step.step}</TurnStepNum>
              {i < rounds.turnFlow.length - 1 && <TurnStepConnector />}
            </TurnStepColumn>
            <TurnStepBody $padding="12px 16px">
              <TurnStepName>{step.name}</TurnStepName>
              <TurnStepDesc>{step.desc}</TurnStepDesc>
            </TurnStepBody>
          </TurnStepRow>
        ))}
      </TurnFlowWrap>

      <Label>Reactions: the Off-Turn Exception</Label>
      <ReactionsBox>
        <OverviewText>{rounds.reactionsNote}</OverviewText>
      </ReactionsBox>

      <Label>Movement Rules</Label>
      <Grid $min="260px" $gap="10px" $mb="28px">
        {rounds.movementRules.map((rule) => (
          <Surface key={rule.name}>
            <MovementName>{rule.name}</MovementName>
            <MovementDesc>{rule.desc}</MovementDesc>
          </Surface>
        ))}
      </Grid>

      <Label>Common Questions</Label>
      <Stack $gap="8px" $mb="28px">
        {rounds.commonQuestions.map((qa, i) => (
          <Surface key={i} $padding="12px 15px">
            <QARow>
              <QMarker>Q.</QMarker>
              <QAQuestion>{qa.q}</QAQuestion>
            </QARow>
            <QARow $last>
              <AMarker>A.</AMarker>
              <QAAnswer>{qa.a}</QAAnswer>
            </QARow>
          </Surface>
        ))}
      </Stack>

      <Label>The Dice You'll Roll</Label>
      <DicePrimerBox $padding="16px 18px">
        {DICE_PRIMER.map(([sides, label, color]) => (
          <Die key={sides} sides={sides} label={label} color={color} />
        ))}
      </DicePrimerBox>
    </div>
  );
};
