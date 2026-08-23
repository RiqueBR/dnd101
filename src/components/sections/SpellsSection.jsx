import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { DND_DATA } from '../../data/dndData.js';
import { schoolColors, rollTypeMeta, spellSchools, spellLevelLabels } from '../../styles/tokens.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Grid } from '../ui/Grid.jsx';
import { Surface } from '../ui/Card.jsx';
import { Chip } from '../ui/Badge.jsx';
import { PickerGroup, PickerButton } from '../ui/PickerButton.jsx';

const DicePrimer = styled(Surface)`
  margin-bottom: 18px;
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.7;
`;

const ModifierStrong = styled.strong`
  color: var(--text);
  font-family: var(--font-heading);
`;

const InlineStrong = styled(ModifierStrong)`
  margin-left: 12px;
`;

const ItalicNote = styled.span`
  margin-left: 12px;
  font-style: italic;
`;

const SpellCard = styled(Surface).attrs({ as: 'button' })`
  display: block;
  width: 100%;
  text-align: left;
  container-type: inline-size;
  cursor: pointer;
  transition: border-color 0.15s;
  border: 1px solid ${(p) => (p.$open ? p.$color : 'var(--border)')};
  border-left: 3px solid ${(p) => p.$color};
`;

const SpellHeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
`;

const SpellName = styled.div`
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
`;

const SpellBadgeRow = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0;
`;

const SpellMetaRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 10px;
  color: var(--text-muted);
  flex-wrap: wrap;
`;

const MetaDot = styled.span`
  color: var(--border);
`;

const RollChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 7px;
`;

const SpellClasses = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: ${(p) => (p.$open ? '8px' : 0)};
`;

const SpellExpanded = styled.div`
  border-top: 1px solid var(--border);
  padding-top: 9px;
`;

const SpellDesc = styled.div`
  font-size: 12.5px;
  color: var(--text);
  line-height: 1.7;
  margin-bottom: 9px;
`;

const DiceNoteBox = styled.div`
  background: ${(p) => p.$color}12;
  border: 1px solid ${(p) => p.$color}33;
  border-radius: 5px;
  padding: 8px 11px;
  margin-bottom: ${(p) => (p.$hasUpcast ? '7px' : 0)};
`;

const DiceNoteTitle = styled.div`
  font-size: 9px;
  font-weight: 700;
  color: ${(p) => p.$color};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 4px;
  font-family: var(--font-heading);
`;

const DiceNoteText = styled.div`
  font-size: 11.5px;
  color: var(--text-muted);
  line-height: 1.55;
`;

const UpcastLine = styled.div`
  font-size: 11px;
  color: var(--accent);
  font-style: italic;
  margin-top: 4px;
`;

const UpcastLabel = styled.strong`
  font-style: normal;
`;

const SpellHint = styled.div`
  font-size: 10px;
  color: ${(p) => p.$color};
  margin-top: 4px;
  opacity: 0.8;
`;

export const SpellsSection = () => {
  const { spells } = DND_DATA;
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const filtered = useMemo(() => (filter === 'All' ? spells : spells.filter((s) => s.school === filter)), [filter, spells]);

  return (
    <div>
      <SectionHeader title="Spells" subtitle="Spells range from free, infinite-use cantrips to world-shaking 9th-level magic. Each one here shows you exactly what to roll." />

      <DicePrimer>
        <ModifierStrong>Spell Save DC:</ModifierStrong> 8 + your proficiency bonus + spellcasting modifier.
        <InlineStrong>Attack Roll:</InlineStrong> 1d20 + proficiency + spellcasting modifier.
        <ItalicNote>Spellcasting modifier = WIS for Cleric/Druid/Ranger, INT for Wizard/Artificer, CHA for Bard/Paladin/Sorcerer/Warlock.</ItalicNote>
      </DicePrimer>

      <PickerGroup>
        {spellSchools.map((s) => (
          <PickerButton key={s} onClick={() => setFilter(s)} $active={filter === s} $color={schoolColors[s]}>{s}</PickerButton>
        ))}
      </PickerGroup>

      <Grid $min="280px" $gap="10px">
        {filtered.map((spell) => {
          const c = schoolColors[spell.school] || '#888';
          const open = expanded === spell.name;
          const rollMeta = spell.roll ? rollTypeMeta[spell.roll.type] : null;
          return (
            <SpellCard key={spell.name} onClick={() => setExpanded(open ? null : spell.name)} $open={open} $color={c} $padding="13px 15px">
              <SpellHeadRow>
                <SpellName>{spell.name}</SpellName>
                <SpellBadgeRow>
                  <Chip $color={c} $solid>{spellLevelLabels[spell.level]}</Chip>
                  <Chip>{spell.school}</Chip>
                </SpellBadgeRow>
              </SpellHeadRow>
              <SpellMetaRow>
                <span>{spell.castingTime}</span><MetaDot>·</MetaDot>
                <span>{spell.range}</span><MetaDot>·</MetaDot>
                <span>{spell.duration}</span>
              </SpellMetaRow>
              {spell.roll && (
                <RollChipsRow>
                  {rollMeta && <Chip $color={rollMeta.color} $solid>{rollMeta.label}</Chip>}
                  {spell.roll.save && <Chip>{spell.roll.save} save</Chip>}
                  {spell.roll.attack && <Chip>{spell.roll.attack}</Chip>}
                  {spell.roll.damage && <Chip>{spell.roll.damage}</Chip>}
                  {spell.roll.healing && <Chip>{spell.roll.healing}</Chip>}
                </RollChipsRow>
              )}
              <SpellClasses $open={open}>{spell.classes.join(', ')}</SpellClasses>
              {open && (
                <SpellExpanded>
                  <SpellDesc>{spell.desc}</SpellDesc>
                  {spell.diceNote && (
                    <DiceNoteBox $color={c} $hasUpcast={!!spell.roll?.upcast}>
                      <DiceNoteTitle $color={c}>How to Roll</DiceNoteTitle>
                      <DiceNoteText>{spell.diceNote}</DiceNoteText>
                    </DiceNoteBox>
                  )}
                  {spell.roll?.upcast && (
                    <UpcastLine>
                      <UpcastLabel>Upcast: </UpcastLabel>{spell.roll.upcast}
                    </UpcastLine>
                  )}
                </SpellExpanded>
              )}
              {!open && <SpellHint $color={c}>Click for description ▾</SpellHint>}
            </SpellCard>
          );
        })}
      </Grid>
    </div>
  );
};
