import styled from 'styled-components';
import { DND_DATA } from '../../data/dndData.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Grid, Stack } from '../ui/Grid.jsx';
import { Surface } from '../ui/Card.jsx';
import { Label, Chip } from '../ui/Badge.jsx';

const ModifierBox = styled(Surface)`
  margin-bottom: 18px;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.7;
`;

const ModifierFormula = styled.span`
  font-family: monospace;
  color: var(--accent);
`;

const ModifierStrong = styled.strong`
  color: var(--text);
  font-family: var(--font-heading);
`;

const AbilityCardHead = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
`;

const AbilityIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: ${(p) => p.$color}1a;
  border: 1px solid ${(p) => p.$color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 900;
  font-family: var(--font-heading);
  color: var(--text);
  flex-shrink: 0;
`;

const AbilityName = styled.div`
  font-family: var(--font-heading);
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
`;

const AbilityKind = styled.div`
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const AbilityDescription = styled.p`
  font-size: 13px;
  color: var(--text);
  line-height: 1.6;
  margin-bottom: 12px;
`;

const UseRow = styled.div`
  display: flex;
  gap: 7px;
  align-items: flex-start;
`;

const UseBullet = styled.span`
  color: ${(p) => p.$color};
  font-size: 9px;
  margin-top: 4px;
  flex-shrink: 0;
`;

const UseText = styled.span`
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
`;

const SkillsRow = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const SavingThrowBlock = styled.div`
  border-top: 1px solid var(--border);
  padding-top: 10px;
`;

const SavingThrowText = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  font-style: italic;
`;

export const AbilityScoresSection = () => {
  const { abilityScores } = DND_DATA;
  return (
    <div>
      <SectionHeader title="Ability Scores" subtitle="Six core numbers define every creature in D&D. They determine your strengths, weaknesses, and which skills and spells you excel at." />
      <ModifierBox>
        <ModifierStrong>How Modifiers Work: </ModifierStrong>
        Your score isn't used directly. You calculate a modifier: <ModifierFormula>(score − 10) ÷ 2, rounded down</ModifierFormula>. A score of 10 = +0. A score of 16 = +3. This modifier is what gets added to dice rolls.
      </ModifierBox>
      <Grid $min="300px" $gap="14px">
        {abilityScores.map((score) => (
          <Surface key={score.id} $padding="20px 22px" $accent={score.color}>
            <AbilityCardHead>
              <AbilityIcon $color={score.color}>{score.abbr}</AbilityIcon>
              <div>
                <AbilityName>{score.name}</AbilityName>
                <AbilityKind>Ability Score</AbilityKind>
              </div>
            </AbilityCardHead>
            <AbilityDescription>{score.description}</AbilityDescription>
            <Label>What It Affects</Label>
            <Stack $gap="4px" $mb="12px">
              {score.uses.map((u, i) => (
                <UseRow key={i}>
                  <UseBullet $color={score.color}>▸</UseBullet>
                  <UseText>{u}</UseText>
                </UseRow>
              ))}
            </Stack>
            {score.skills.length > 0 && (
              <>
                <Label>Associated Skills</Label>
                <SkillsRow>
                  {score.skills.map((s) => <Chip key={s} $color={score.color} $solid>{s}</Chip>)}
                </SkillsRow>
              </>
            )}
            <SavingThrowBlock>
              <Label>Saving Throw</Label>
              <SavingThrowText>{score.savingThrow}</SavingThrowText>
            </SavingThrowBlock>
          </Surface>
        ))}
      </Grid>
    </div>
  );
};
