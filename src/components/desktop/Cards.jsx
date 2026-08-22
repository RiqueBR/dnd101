import styled from 'styled-components';
import { difficultyColors } from '../../styles/tokens.js';

export const Label = styled.div`
  font-family: var(--font-heading);
  color: var(--accent);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
  margin-top: 4px;
`;

const StatBadgeWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--accent);
  font-family: monospace;
  letter-spacing: 0.05em;
`;

const StatName = styled.span`
  color: var(--text-muted);
  font-size: 10px;
`;

export const StatBadge = ({ stat, value }) => (
  <StatBadgeWrap>
    <StatName>{stat}</StatName>
    <span>+{value}</span>
  </StatBadgeWrap>
);

const DifficultyWrap = styled.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: ${(p) => p.$color}28;
  color: ${(p) => p.$color};
  border: 1px solid ${(p) => p.$color}44;
`;

export const DifficultyBadge = ({ level }) => (
  <DifficultyWrap $color={difficultyColors[level] || '#888'}>{level}</DifficultyWrap>
);

const CardWrap = styled.div`
  background: var(--surface);
  border: 1px solid ${(p) => (p.$selected ? 'var(--accent)' : 'var(--border)')};
  border-top: 3px solid ${(p) => (p.$selected ? 'var(--accent)' : p.$color)};
  border-radius: 8px;
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(p) => (p.$selected ? 'var(--accent)' : 'var(--border-hover)')};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${(p) => p.$color}1a;
  }
`;

const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const CardName = styled.div`
  font-size: 15px;
  font-weight: 700;
  font-family: var(--font-heading);
  color: var(--text);
  letter-spacing: 0.04em;
`;

const CardTagline = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
  font-style: italic;
`;

const RaceIconBadge = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 6px;
  background: ${(p) => p.$color}1a;
  border: 1px solid ${(p) => p.$color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 11px;
  color: ${(p) => p.$color};
  flex-shrink: 0;
`;

const ClassIconBadge = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 6px;
  background: ${(p) => p.$color}1a;
  border: 1px solid ${(p) => p.$color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${(p) => p.$color};
  flex-shrink: 0;
`;

const StatRow = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const ExtraBonusText = styled.span`
  font-size: 10px;
  color: var(--text-muted);
  align-self: center;
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

export const RaceCard = ({ race, onClick, isSelected }) => (
  <CardWrap onClick={() => onClick(race)} $selected={isSelected} $color={race.color}>
    <CardHeaderRow>
      <div>
        <CardName>{race.name}</CardName>
        <CardTagline>{race.tagline}</CardTagline>
      </div>
      <RaceIconBadge $color={race.color}>{race.icon}</RaceIconBadge>
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
  </CardWrap>
);

const ClassBadgeRow = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const HDBadge = styled.span`
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-family: monospace;
`;

const AbilityBadge = styled.span`
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  font-family: monospace;
`;

const RoleText = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 10px;
  font-style: italic;
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

export const ClassCard = ({ cls, onClick, isSelected }) => (
  <CardWrap onClick={() => onClick(cls)} $selected={isSelected} $color={cls.color}>
    <CardHeaderRow>
      <div>
        <CardName>{cls.name}</CardName>
        <CardTagline>{cls.tagline}</CardTagline>
      </div>
      <ClassIconBadge $color={cls.color}>{cls.icon}</ClassIconBadge>
    </CardHeaderRow>
    <ClassBadgeRow>
      <HDBadge>HD: {cls.hitDie}</HDBadge>
      {cls.primaryAbility.map((a) => <AbilityBadge key={a}>{a}</AbilityBadge>)}
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
  </CardWrap>
);

const DetailWrap = styled.div`
  background: var(--surface);
  border: 1px solid var(--accent);
  border-top: 3px solid ${(p) => p.$color};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
`;

const DetailHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const DetailTitle = styled.h2`
  margin: 0;
  font-family: var(--font-heading);
  color: var(--text);
  font-size: 20px;
`;

const DetailTagline = styled.p`
  margin: 4px 0 0;
  color: var(--text-muted);
  font-style: italic;
  font-size: 13px;
`;

const CloseButton = styled.button`
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text-muted);
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 12px;
  font-family: var(--font-heading);
`;

const DetailDescription = styled.p`
  color: var(--text);
  line-height: 1.7;
  font-size: 13px;
  margin-bottom: 16px;
`;

const SubRaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
`;

const SubRaceCard = styled.div`
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px 12px;
`;

const SubRaceName = styled.div`
  font-weight: 700;
  font-size: 12px;
  font-family: var(--font-heading);
  color: var(--text);
  margin-bottom: 5px;
`;

const SubRaceStatRow = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 5px;
`;

const SubRaceExtra = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
`;

const TraitsGrid = styled.div`
  display: grid;
  gap: 7px;
  margin-bottom: 16px;
`;

const TraitCard = styled.div`
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px 14px;
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

const BestClassChip = styled.span`
  padding: 4px 12px;
  border-radius: 4px;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  font-size: 12px;
  font-family: var(--font-heading);
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
`;

const StatGridCard = styled.div`
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 9px 12px;
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

const ProficiencyCard = styled.div`
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 11px 14px;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 16px;
`;

const Strong = styled.strong`
  color: var(--text);
`;

const FeatureGrid = styled.div`
  display: grid;
  gap: 7px;
`;

const FeatureCard = styled.div`
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 11px 14px;
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

export const DetailPanel = ({ item, type, onClose }) => {
  if (!item) return null;
  const isRace = type === 'race';
  return (
    <DetailWrap $color={item.color}>
      <DetailHeaderRow>
        <div>
          <DetailTitle>{item.name}</DetailTitle>
          <DetailTagline>{item.tagline}</DetailTagline>
        </div>
        <CloseButton onClick={onClose}>✕ Close</CloseButton>
      </DetailHeaderRow>
      <DetailDescription>{item.description}</DetailDescription>

      {isRace ? (
        <>
          <Label>Ability Score Bonuses</Label>
          <StatRow>
            {Object.entries(item.statBonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
          </StatRow>
          {item.subRaces && <>
            <Label>Subraces</Label>
            <SubRaceGrid>
              {item.subRaces.map((sr) => (
                <SubRaceCard key={sr.name}>
                  <SubRaceName>{sr.name}</SubRaceName>
                  <SubRaceStatRow>
                    {Object.entries(sr.bonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
                  </SubRaceStatRow>
                  <SubRaceExtra>{sr.extra}</SubRaceExtra>
                </SubRaceCard>
              ))}
            </SubRaceGrid>
          </>}
          <Label>Racial Traits</Label>
          <TraitsGrid>
            {item.traits.map((t) => (
              <TraitCard key={t.name}>
                <TraitCardName>{t.name}</TraitCardName>
                <TraitCardDesc>{t.desc}</TraitCardDesc>
              </TraitCard>
            ))}
          </TraitsGrid>
          <Label>Best Class Pairings</Label>
          <BestClassesRow>
            {item.bestClasses.map((c) => <BestClassChip key={c}>{c}</BestClassChip>)}
          </BestClassesRow>
        </>
      ) : (
        <>
          <StatGrid>
            {[['Hit Die', item.hitDie], ['Primary Stat', item.primaryAbility.join(', ')], ['Saving Throws', item.savingThrows.join(', ')], ['Difficulty', item.difficulty], ['Role', item.role]].map(([label, value]) => (
              <StatGridCard key={label}>
                <StatGridLabel>{label}</StatGridLabel>
                <StatGridValue>{value}</StatGridValue>
              </StatGridCard>
            ))}
          </StatGrid>
          <Label>Proficiencies</Label>
          <ProficiencyCard>
            <div><Strong>Armor: </Strong>{item.armorProf}</div>
            <div><Strong>Weapons: </Strong>{item.weaponProf}</div>
          </ProficiencyCard>
          <Label>Key Features (Levels 1-5)</Label>
          <FeatureGrid>
            {item.keyFeatures.map((f) => (
              <FeatureCard key={f.name}>
                <LevelBadge $color={item.color}>{f.level}</LevelBadge>
                <div>
                  <TraitCardName>{f.name}</TraitCardName>
                  <TraitCardDesc>{f.desc}</TraitCardDesc>
                </div>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </>
      )}
    </DetailWrap>
  );
};
