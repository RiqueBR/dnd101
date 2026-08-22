import { useState } from 'react';
import styled from 'styled-components';
import { DND_DATA } from '../../data/dndData.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Grid } from '../ui/Grid.jsx';
import { Card, CardHeaderRow, CardTitle, CardTagline, IconBadge, Surface } from '../ui/Card.jsx';
import { Label, StatBadge, AccentChip } from '../ui/Badge.jsx';
import { DetailPanel } from '../ui/DetailPanel.jsx';

const StatRow = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 8px;
  align-items: center;
`;

const ExtraBonusText = styled.span`
  font-size: 10px;
  color: var(--text-muted);
  font-style: italic;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
  font-size: 11px;
  color: var(--text-muted);
`;

const TraitsBlock = styled.div`
  border-top: 1px solid var(--border);
  padding-top: 10px;
`;

const TraitRow = styled.div`
  margin-bottom: 5px;
`;

const TraitName = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  font-family: var(--font-heading);
`;

const TraitDesc = styled.span`
  font-size: 11px;
  color: var(--text-muted);
`;

const MoreTraitsNote = styled.div`
  font-size: 10px;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 3px;
`;

const SubRaceName = styled.div`
  font-weight: 700;
  font-size: 12px;
  font-family: var(--font-heading);
  color: var(--text);
  margin-bottom: 5px;
`;

const SubRaceExtra = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
`;

const TraitCardName = styled.div`
  font-weight: 700;
  font-size: 12px;
  font-family: var(--font-heading);
  color: var(--text);
  margin-bottom: 3px;
`;

const TraitCardDesc = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
`;

const BestClassesRow = styled.div`
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
`;

const RaceCard = ({ race, onClick, isSelected }) => (
  <Card onClick={() => onClick(race)} $selected={isSelected} $accent={race.color}>
    <CardHeaderRow>
      <div>
        <CardTitle>{race.name}</CardTitle>
        <CardTagline>{race.tagline}</CardTagline>
      </div>
      <IconBadge $color={race.color}>{race.icon}</IconBadge>
    </CardHeaderRow>
    <StatRow>
      {Object.entries(race.statBonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
      {race.extraBonuses && <ExtraBonusText>{race.extraBonuses}</ExtraBonusText>}
    </StatRow>
    <MetaRow>
      <span>Size: {race.size}</span><span>Speed: {race.speed} ft</span>
    </MetaRow>
    <TraitsBlock>
      {race.traits.slice(0, 2).map((t) => (
        <TraitRow key={t.name}>
          <TraitName>{t.name}. </TraitName>
          <TraitDesc>{t.desc}</TraitDesc>
        </TraitRow>
      ))}
      {race.traits.length > 2 && <MoreTraitsNote>+{race.traits.length - 2} more traits, click to expand</MoreTraitsNote>}
    </TraitsBlock>
  </Card>
);

export const RacesSection = () => {
  const { races } = DND_DATA;
  const [selected, setSelected] = useState(null);
  const toggle = (r) => setSelected((prev) => (prev?.id === r.id ? null : r));

  return (
    <div>
      <SectionHeader title="Races" subtitle="Your race defines your ancestry, giving you stat bonuses, innate traits, and a physical and cultural identity. Choose one that fits your character concept." />
      {selected && (
        <DetailPanel title={selected.name} tagline={selected.tagline} color={selected.color} description={selected.description} onClose={() => setSelected(null)}>
          <Label>Ability Score Bonuses</Label>
          <StatRow>
            {Object.entries(selected.statBonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
          </StatRow>
          {selected.subRaces && (
            <>
              <Label>Subraces</Label>
              <Grid $min="180px" $gap="8px">
                {selected.subRaces.map((sr) => (
                  <Surface key={sr.name} $padding="10px 12px">
                    <SubRaceName>{sr.name}</SubRaceName>
                    <StatRow>
                      {Object.entries(sr.bonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
                    </StatRow>
                    <SubRaceExtra>{sr.extra}</SubRaceExtra>
                  </Surface>
                ))}
              </Grid>
            </>
          )}
          <Label>Racial Traits</Label>
          <Grid $min="220px" $gap="7px">
            {selected.traits.map((t) => (
              <Surface key={t.name} $padding="10px 14px">
                <TraitCardName>{t.name}</TraitCardName>
                <TraitCardDesc>{t.desc}</TraitCardDesc>
              </Surface>
            ))}
          </Grid>
          <Label>Best Class Pairings</Label>
          <BestClassesRow>
            {selected.bestClasses.map((c) => <AccentChip key={c}>{c}</AccentChip>)}
          </BestClassesRow>
        </DetailPanel>
      )}
      <Grid $min="270px">
        {races.map((r) => <RaceCard key={r.id} race={r} onClick={toggle} isSelected={selected?.id === r.id} />)}
      </Grid>
    </div>
  );
};
