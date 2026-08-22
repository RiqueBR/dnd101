import { useState } from 'react';
import styled from 'styled-components';
import { DND_DATA } from '../../data/dndData.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Grid, Stack } from '../ui/Grid.jsx';
import { Card, CardHeaderRow, CardTitle, CardTagline, IconBadge, Surface } from '../ui/Card.jsx';
import { Label, Chip, AccentChip, DifficultyBadge } from '../ui/Badge.jsx';
import { DetailPanel } from '../ui/DetailPanel.jsx';

const ClassBadgeRow = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const RoleText = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 10px;
  font-style: italic;
`;

const TraitsBlock = styled.div`
  border-top: 1px solid var(--border);
  padding-top: 10px;
`;

const FeatureRow = styled.div`
  margin-bottom: 5px;
  display: flex;
  gap: 6px;
  align-items: baseline;
`;

const FeatureLevel = styled.span`
  font-size: 9px;
  color: var(--text-muted);
  font-family: monospace;
  flex-shrink: 0;
`;

const FeatureName = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  font-family: var(--font-heading);
`;

const StatGridLabel = styled.div`
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 3px;
`;

const StatGridValue = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
`;

const Strong = styled.strong`
  color: var(--text);
`;

const FeatureCard = styled(Surface)`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const LevelBadge = styled.div`
  min-width: 30px;
  height: 30px;
  border-radius: 4px;
  background: ${(p) => p.$color}1a;
  border: 1px solid ${(p) => p.$color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: ${(p) => p.$color};
  font-family: monospace;
  flex-shrink: 0;
`;

const FeatureDesc = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.55;
`;

const ClassCard = ({ cls, onClick, isSelected }) => (
  <Card onClick={() => onClick(cls)} $selected={isSelected} $accent={cls.color}>
    <CardHeaderRow>
      <div>
        <CardTitle>{cls.name}</CardTitle>
        <CardTagline>{cls.tagline}</CardTagline>
      </div>
      <IconBadge $color={cls.color}>{cls.icon}</IconBadge>
    </CardHeaderRow>
    <ClassBadgeRow>
      <Chip>HD: {cls.hitDie}</Chip>
      {cls.primaryAbility.map((a) => <AccentChip key={a}>{a}</AccentChip>)}
      <DifficultyBadge level={cls.difficulty} />
    </ClassBadgeRow>
    <RoleText>{cls.role}</RoleText>
    <TraitsBlock>
      {cls.keyFeatures.slice(0, 2).map((f) => (
        <FeatureRow key={f.name}>
          <FeatureLevel>Lv.{f.level}</FeatureLevel>
          <FeatureName>{f.name}</FeatureName>
        </FeatureRow>
      ))}
    </TraitsBlock>
  </Card>
);

export const ClassesSection = () => {
  const { classes } = DND_DATA;
  const [selected, setSelected] = useState(null);
  const toggle = (c) => setSelected((prev) => (prev?.id === c.id ? null : c));

  return (
    <div>
      <SectionHeader title="Classes" subtitle="Your class is your adventuring profession. It shapes your abilities, combat style, and role in the party. Each class rewards a different style of play." />
      {selected && (
        <DetailPanel title={selected.name} tagline={selected.tagline} color={selected.color} description={selected.description} onClose={() => setSelected(null)}>
          <Grid $min="150px" $gap="8px">
            {[['Hit Die', selected.hitDie], ['Primary Stat', selected.primaryAbility.join(', ')], ['Saving Throws', selected.savingThrows.join(', ')], ['Difficulty', selected.difficulty], ['Role', selected.role]].map(([label, value]) => (
              <Surface key={label} $padding="9px 12px">
                <StatGridLabel>{label}</StatGridLabel>
                <StatGridValue>{value}</StatGridValue>
              </Surface>
            ))}
          </Grid>
          <Label>Proficiencies</Label>
          <Surface $padding="11px 14px">
            <div><Strong>Armor: </Strong>{selected.armorProf}</div>
            <div><Strong>Weapons: </Strong>{selected.weaponProf}</div>
          </Surface>
          <Label>Key Features (Levels 1-5)</Label>
          <Stack $gap="7px">
            {selected.keyFeatures.map((f) => (
              <FeatureCard key={f.name} $padding="11px 14px">
                <LevelBadge $color={selected.color}>{f.level}</LevelBadge>
                <div>
                  <FeatureName>{f.name}</FeatureName>
                  <FeatureDesc>{f.desc}</FeatureDesc>
                </div>
              </FeatureCard>
            ))}
          </Stack>
        </DetailPanel>
      )}
      <Grid $min="270px">
        {classes.map((c) => <ClassCard key={c.id} cls={c} onClick={toggle} isSelected={selected?.id === c.id} />)}
      </Grid>
    </div>
  );
};
