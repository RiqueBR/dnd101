import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { DND_DATA } from '../../data/dndData.js';
import { fadeIn } from '../../styles/keyframes.js';
import { schoolColors, rollTypeMeta, actionTypeColors, synergyLabels, synergyColors, dieShapes } from '../../styles/tokens.js';
import { Label, StatBadge, RaceCard, ClassCard, DetailPanel } from './Cards.jsx';

const HeaderWrap = styled.div`
  margin-bottom: 24px;
`;

const HeaderTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  letter-spacing: 0.05em;
`;

const HeaderSubtitle = styled.p`
  font-size: 13px;
  color: var(--text-muted);
  margin: 6px 0 0;
  line-height: 1.6;
  max-width: 680px;
`;

const HeaderRule = styled.div`
  height: 1px;
  background: linear-gradient(to right, var(--accent), transparent);
  margin-top: 12px;
`;

export const SectionHeader = ({ title, subtitle }) => (
  <HeaderWrap>
    <HeaderTitle>{title}</HeaderTitle>
    <HeaderSubtitle>{subtitle}</HeaderSubtitle>
    <HeaderRule />
  </HeaderWrap>
);

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 12px;
`;

// ── Races ─────────────────────────────────────────────
export const RacesSection = () => {
  const { races } = DND_DATA;
  const [selected, setSelected] = useState(null);
  const toggle = (r) => setSelected((prev) => (prev?.id === r.id ? null : r));
  return (
    <div>
      <SectionHeader title="Races" subtitle="Your race defines your ancestry, giving you stat bonuses, innate traits, and a physical and cultural identity. Choose one that fits your character concept." />
      {selected && <DetailPanel item={selected} type="race" onClose={() => setSelected(null)} />}
      <CardGrid>
        {races.map((r) => <RaceCard key={r.id} race={r} onClick={toggle} isSelected={selected?.id === r.id} />)}
      </CardGrid>
    </div>
  );
};

// ── Classes ────────────────────────────────────────────
export const ClassesSection = () => {
  const { classes } = DND_DATA;
  const [selected, setSelected] = useState(null);
  const toggle = (c) => setSelected((prev) => (prev?.id === c.id ? null : c));
  return (
    <div>
      <SectionHeader title="Classes" subtitle="Your class is your adventuring profession. It shapes your abilities, combat style, and role in the party. Each class rewards a different style of play." />
      {selected && <DetailPanel item={selected} type="class" onClose={() => setSelected(null)} />}
      <CardGrid>
        {classes.map((c) => <ClassCard key={c.id} cls={c} onClick={toggle} isSelected={selected?.id === c.id} />)}
      </CardGrid>
    </div>
  );
};

// ── Ability Scores ────────────────────────────────────
const ModifierBox = styled.div`
  margin-bottom: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px 18px;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.7;
`;

const ModifierFormula = styled.span`
  font-family: monospace;
  color: var(--accent);
`;

const AbilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
`;

const AbilityCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 3px solid ${(p) => p.$color};
  border-radius: 8px;
  padding: 20px 22px;
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
  color: ${(p) => p.$color};
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

const UsesBlock = styled.div`
  margin-bottom: 12px;
`;

const UseRow = styled.div`
  display: flex;
  gap: 7px;
  margin-bottom: 4px;
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

const SkillChip = styled.span`
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 11px;
  background: ${(p) => p.$color}1a;
  border: 1px solid ${(p) => p.$color}33;
  color: ${(p) => p.$color};
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
      <AbilityGrid>
        {abilityScores.map((score) => (
          <AbilityCard key={score.id} $color={score.color}>
            <AbilityCardHead>
              <AbilityIcon $color={score.color}>{score.abbr}</AbilityIcon>
              <div>
                <AbilityName>{score.name}</AbilityName>
                <AbilityKind>Ability Score</AbilityKind>
              </div>
            </AbilityCardHead>
            <AbilityDescription>{score.description}</AbilityDescription>
            <Label>What It Affects</Label>
            <UsesBlock>
              {score.uses.map((u, i) => (
                <UseRow key={i}>
                  <UseBullet $color={score.color}>▸</UseBullet>
                  <UseText>{u}</UseText>
                </UseRow>
              ))}
            </UsesBlock>
            {score.skills.length > 0 && <>
              <Label>Associated Skills</Label>
              <SkillsRow>
                {score.skills.map((s) => <SkillChip key={s} $color={score.color}>{s}</SkillChip>)}
              </SkillsRow>
            </>}
            <SavingThrowBlock>
              <Label>Saving Throw</Label>
              <SavingThrowText>{score.savingThrow}</SavingThrowText>
            </SavingThrowBlock>
          </AbilityCard>
        ))}
      </AbilityGrid>
    </div>
  );
};

// ── Spells ─────────────────────────────────────────────
const LEVEL_LABELS = ['Cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];
const SCHOOLS = ['All', 'Evocation', 'Abjuration', 'Conjuration', 'Illusion', 'Enchantment', 'Necromancy', 'Divination', 'Transmutation'];

const DicePrimer = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 13px 17px;
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

const FilterRow = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid ${(p) => (p.$active ? (p.$color || 'var(--accent)') : 'var(--border)')};
  background: ${(p) => (p.$active ? (p.$color ? `${p.$color}22` : 'var(--accent-subtle)') : 'var(--surface)')};
  color: ${(p) => (p.$active ? (p.$color || 'var(--accent)') : 'var(--text-muted)')};
  font-family: var(--font-heading);
  letter-spacing: 0.03em;
  transition: all 0.15s;
`;

const SpellGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 10px;
`;

const SpellCard = styled.div`
  background: var(--surface);
  border: 1px solid ${(p) => (p.$open ? p.$color : 'var(--border)')};
  border-left: 3px solid ${(p) => p.$color};
  border-radius: 8px;
  padding: 13px 15px;
  cursor: pointer;
  transition: border-color 0.15s;
`;

const SpellHeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
  margin-left: 8px;
`;

const LevelChip = styled.span`
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 9px;
  font-weight: 700;
  background: ${(p) => p.$color}22;
  color: ${(p) => p.$color};
  border: 1px solid ${(p) => p.$color}33;
`;

const SchoolChip = styled.span`
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 9px;
  font-weight: 600;
  background: var(--surface2);
  color: var(--text-muted);
  border: 1px solid var(--border);
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

const RollTypeChip = styled.span`
  padding: 2px 7px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 700;
  background: ${(p) => p.$color}22;
  color: ${(p) => p.$color};
  border: 1px solid ${(p) => p.$color}44;
  font-family: var(--font-heading);
  letter-spacing: 0.04em;
`;

const RollValueChip = styled.span`
  padding: 2px 7px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 700;
  background: var(--surface2);
  color: var(--text-muted);
  border: 1px solid var(--border);
  font-family: monospace;
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

      <FilterRow>
        {SCHOOLS.map((s) => {
          const active = filter === s;
          const c = schoolColors[s];
          return <FilterButton key={s} onClick={() => setFilter(s)} $active={active} $color={c}>{s}</FilterButton>;
        })}
      </FilterRow>
      <SpellGrid>
        {filtered.map((spell) => {
          const c = schoolColors[spell.school] || '#888';
          const open = expanded === spell.name;
          const rollMeta = spell.roll ? rollTypeMeta[spell.roll.type] : null;
          return (
            <SpellCard key={spell.name} onClick={() => setExpanded(open ? null : spell.name)} $open={open} $color={c}>
              <SpellHeadRow>
                <SpellName>{spell.name}</SpellName>
                <SpellBadgeRow>
                  <LevelChip $color={c}>{LEVEL_LABELS[spell.level]}</LevelChip>
                  <SchoolChip>{spell.school}</SchoolChip>
                </SpellBadgeRow>
              </SpellHeadRow>
              <SpellMetaRow>
                <span>{spell.castingTime}</span><MetaDot>·</MetaDot>
                <span>{spell.range}</span><MetaDot>·</MetaDot>
                <span>{spell.duration}</span>
              </SpellMetaRow>
              {spell.roll && (
                <RollChipsRow>
                  {rollMeta && <RollTypeChip $color={rollMeta.color}>{rollMeta.label}</RollTypeChip>}
                  {spell.roll.save && <RollValueChip>{spell.roll.save} save</RollValueChip>}
                  {spell.roll.attack && <RollValueChip>{spell.roll.attack}</RollValueChip>}
                  {spell.roll.damage && <RollValueChip>{spell.roll.damage}</RollValueChip>}
                  {spell.roll.healing && <RollValueChip>{spell.roll.healing}</RollValueChip>}
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
      </SpellGrid>
    </div>
  );
};

// ── Actions ────────────────────────────────────────────
const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 24px;
`;

const OverviewCard = styled.div`
  background: var(--surface);
  border: 1px solid ${(p) => p.$color}44;
  border-top: 2px solid ${(p) => p.$color};
  border-radius: 6px;
  padding: 12px 14px;
`;

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

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 9px;
`;

const ActionCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid ${(p) => p.$color};
  border-radius: 6px;
  padding: 11px 13px;
`;

const ActionHeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const ActionName = styled.div`
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
`;

const ActionTypeChip = styled.span`
  padding: 1px 7px;
  border-radius: 3px;
  font-size: 9px;
  font-weight: 700;
  background: ${(p) => p.$color}22;
  color: ${(p) => p.$color};
  border: 1px solid ${(p) => p.$color}33;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 8px;
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

const DiceChip = styled.span`
  padding: 2px 7px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 700;
  background: ${(p) => p.$color}22;
  color: ${(p) => p.$color};
  border: 1px solid ${(p) => p.$color}44;
  font-family: monospace;
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

export const ActionsSection = () => {
  const { actions } = DND_DATA;
  return (
    <div>
      <SectionHeader title="Actions" subtitle="Every turn in combat, you get one Action, one Bonus Action, and one Reaction. Here's the full menu of what you can do, and when." />
      <OverviewGrid>
        {[['Action', 'Your main turn activity. Attack, cast a spell, dash, or more.', '#c8743a'],
          ['Bonus Action', 'Some abilities, spells, or class features let you act again.', '#4a6fa5'],
          ['Reaction', 'Triggered by specific events, even on other people\'s turns.', '#8b3a3a'],
        ].map(([name, desc, color]) => (
          <OverviewCard key={name} $color={color}>
            <OverviewName $color={color}>{name}</OverviewName>
            <OverviewDesc>{desc}</OverviewDesc>
          </OverviewCard>
        ))}
      </OverviewGrid>
      {actions.map((cat) => (
        <CategoryBlock key={cat.category}>
          <CategoryTitle>{cat.category}</CategoryTitle>
          <ActionGrid>
            {cat.items.map((a) => {
              const typeKey = Object.keys(actionTypeColors).find((k) => a.type.includes(k.split(' ')[0])) || 'Action';
              const color = actionTypeColors[a.type] || actionTypeColors[typeKey] || '#888';
              return (
                <ActionCard key={a.name} $color={color}>
                  <ActionHeadRow>
                    <ActionName>{a.name}</ActionName>
                    <ActionTypeChip $color={color}>{a.type}</ActionTypeChip>
                  </ActionHeadRow>
                  <ActionDesc>{a.desc}</ActionDesc>
                  {a.dice && (
                    <DiceBox>
                      <DiceLabel>Rolls:</DiceLabel>
                      {a.dice.map((d, i) => <DiceChip key={i} $color={color}>{d}</DiceChip>)}
                      {a.diceNote && <DiceNoteInline>{a.diceNote}</DiceNoteInline>}
                    </DiceBox>
                  )}
                  <ActionExample>e.g. {a.example}</ActionExample>
                </ActionCard>
              );
            })}
          </ActionGrid>
        </CategoryBlock>
      ))}
    </div>
  );
};

// ── Rounds / Turn Structure ─────────────────────────
const DieWrap = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const DieShape = styled.div`
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, ${(p) => (p.$color ? `${p.$color}55` : 'var(--dice-fill-top)')} 0%, ${(p) => (p.$color ? `${p.$color}22` : 'var(--dice-fill-bot)')} 100%);
  border: 2px solid ${(p) => p.$color || 'var(--dice-color)'};
  clip-path: ${(p) => p.$shape};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 14px;
  color: ${(p) => p.$color || 'var(--dice-color)'};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
`;

const DieLabel = styled.div`
  font-size: 10px;
  color: var(--text-muted);
  text-align: center;
  max-width: 90px;
  line-height: 1.3;
`;

const Die = ({ sides, label, color }) => (
  <DieWrap>
    <DieShape $color={color} $shape={dieShapes[sides] || dieShapes[20]}>d{sides}</DieShape>
    {label && <DieLabel>{label}</DieLabel>}
  </DieWrap>
);

const OverviewBox = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 18px 22px;
  margin-bottom: 22px;
`;

const OverviewText = styled.p`
  font-size: 14px;
  color: var(--text);
  line-height: 1.7;
  margin: 0;
`;

const InitiativeBox = styled.div`
  background: var(--surface);
  border: 1px solid var(--accent-border);
  border-left: 3px solid var(--accent);
  border-radius: 8px;
  padding: 18px 22px;
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
  position: relative;
  margin-bottom: 28px;
`;

const TurnStepRow = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 9px;
  position: relative;
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

const TurnStepBody = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px 16px;
  flex: 1;
  margin-bottom: 4px;
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

const ReactionsBox = styled.div`
  background: var(--surface);
  border: 1px solid #8b3a3a44;
  border-left: 3px solid #8b3a3a;
  border-radius: 8px;
  padding: 14px 18px;
  margin-bottom: 28px;
`;

const MovementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
  margin-bottom: 28px;
`;

const MovementCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 11px 14px;
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

const QAGrid = styled.div`
  display: grid;
  gap: 8px;
`;

const QACard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px 15px;
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

const DicePrimerBox = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px 18px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

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
            <TurnStepBody>
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
      <MovementGrid>
        {rounds.movementRules.map((rule) => (
          <MovementCard key={rule.name}>
            <MovementName>{rule.name}</MovementName>
            <MovementDesc>{rule.desc}</MovementDesc>
          </MovementCard>
        ))}
      </MovementGrid>

      <Label>Common Questions</Label>
      <QAGrid>
        {rounds.commonQuestions.map((qa, i) => (
          <QACard key={i}>
            <QARow>
              <QMarker>Q.</QMarker>
              <QAQuestion>{qa.q}</QAQuestion>
            </QARow>
            <QARow $last>
              <AMarker>A.</AMarker>
              <QAAnswer>{qa.a}</QAAnswer>
            </QARow>
          </QACard>
        ))}
      </QAGrid>

      <Label>The Dice You'll Roll</Label>
      <DicePrimerBox>
        <Die sides={4} label="Daggers, healing" color="#4a7a2a" />
        <Die sides={6} label="Sneak Attack, Fireball" color="#c8743a" />
        <Die sides={8} label="Longsword, Cure Wounds" color="#4a6fa5" />
        <Die sides={10} label="Halberds, big spells" color="#8b3a6b" />
        <Die sides={12} label="Greataxe damage" color="#8b3a3a" />
        <Die sides={20} label="ATTACKS & CHECKS" color="var(--accent)" />
      </DicePrimerBox>
    </div>
  );
};

// ── Pairings ───────────────────────────────────────────
const SynergyBarWrap = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const SynergySegment = styled.div`
  width: 28px;
  height: 6px;
  border-radius: 3px;
  background: ${(p) => (p.$filled ? p.$color : 'var(--surface2)')};
  border: 1px solid ${(p) => (p.$filled ? p.$color : 'var(--border)')};
  transition: all 0.3s;
`;

const SynergyBar = ({ score, color }) => (
  <SynergyBarWrap>
    {[1, 2, 3, 4, 5].map((i) => <SynergySegment key={i} $filled={i <= score} $color={color} />)}
  </SynergyBarWrap>
);

const PickerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 22px;
`;

const PickerLabel = styled.div`
  font-size: 11px;
  font-family: var(--font-heading);
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 9px;
`;

const PickerButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`;

const PickerButton = styled.button`
  background: ${(p) => (p.$selected ? `${p.$color}28` : 'var(--surface)')};
  border: 1px solid ${(p) => (p.$selected ? p.$color : 'var(--border)')};
  border-radius: 6px;
  padding: 9px 5px;
  cursor: pointer;
  color: ${(p) => (p.$selected ? p.$color : 'var(--text-muted)')};
  font-size: 11px;
  font-family: var(--font-heading);
  transition: all 0.15s;
  text-align: center;
  line-height: 1.3;
`;

const PickerIcon = styled.div`
  font-size: ${(p) => (p.$small ? '9px' : '14px')};
  margin-bottom: 2px;
  opacity: ${(p) => (p.$small ? 0.7 : 1)};
`;

const ResultBox = styled.div`
  background: var(--surface);
  border: 1px solid ${(p) => p.$color}55;
  border-top: 3px solid ${(p) => p.$color};
  border-radius: 8px;
  padding: 22px 24px;
  animation: ${fadeIn} 0.25s ease;
`;

const ResultNamesRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 14px;
  flex-wrap: wrap;
`;

const ResultName = styled.span`
  font-family: var(--font-heading);
  font-size: 20px;
  color: ${(p) => p.$color};
`;

const ResultPlus = styled.span`
  color: var(--text-muted);
  font-size: 16px;
`;

const ResultSynergyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
`;

const ResultSynergyLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${(p) => p.$color};
  font-family: var(--font-heading);
`;

const ResultSummary = styled.p`
  font-size: 14px;
  color: var(--text);
  line-height: 1.7;
  margin-bottom: 16px;
`;

const HighlightsBlock = styled.div`
  margin-bottom: 16px;
`;

const HighlightRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 7px;
  align-items: flex-start;
`;

const HighlightBullet = styled.span`
  color: ${(p) => p.$color};
  flex-shrink: 0;
  margin-top: 3px;
  font-size: 10px;
`;

const HighlightText = styled.span`
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
`;

const ResultBonusBlock = styled.div`
  border-top: 1px solid var(--border);
  padding-top: 12px;
`;

const ResultBonusIntro = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 7px;
`;

const ResultBonusRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Placeholder = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 50px 24px;
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
  font-size: 14px;
`;

export const PairingSection = () => {
  const { races, classes, pairings } = DND_DATA;
  const [selRace, setSelRace] = useState(null);
  const [selClass, setSelClass] = useState(null);

  const result = useMemo(() => {
    if (!selRace || !selClass) return null;
    return (pairings[selRace] || {})[selClass] || null;
  }, [selRace, selClass, pairings]);

  const raceObj = races.find((r) => r.id === selRace);
  const classObj = classes.find((c) => c.id === selClass);
  const synColor = result ? synergyColors[result.synergy] : '';
  const synLabel = result ? synergyLabels[result.synergy] : '';

  return (
    <div>
      <SectionHeader title="Race + Class Pairings" subtitle="Some race and class combinations have natural stat synergy. Others are unconventional but work great for roleplay. Pick both to see a detailed breakdown." />

      <PickerGrid>
        <div>
          <PickerLabel>Choose a Race</PickerLabel>
          <PickerButtonGrid>
            {races.map((r) => (
              <PickerButton key={r.id} onClick={() => setSelRace(r.id)} $selected={selRace === r.id} $color={r.color}>
                <PickerIcon $small>{r.icon}</PickerIcon>
                {r.name}
              </PickerButton>
            ))}
          </PickerButtonGrid>
        </div>
        <div>
          <PickerLabel>Choose a Class</PickerLabel>
          <PickerButtonGrid>
            {classes.map((c) => (
              <PickerButton key={c.id} onClick={() => setSelClass(c.id)} $selected={selClass === c.id} $color={c.color}>
                <PickerIcon>{c.icon}</PickerIcon>
                {c.name}
              </PickerButton>
            ))}
          </PickerButtonGrid>
        </div>
      </PickerGrid>

      {result && raceObj && classObj ? (
        <ResultBox $color={synColor}>
          <ResultNamesRow>
            <ResultName $color={raceObj.color}>{raceObj.name}</ResultName>
            <ResultPlus>+</ResultPlus>
            <ResultName $color={classObj.color}>{classObj.name}</ResultName>
          </ResultNamesRow>
          <ResultSynergyRow>
            <SynergyBar score={result.synergy} color={synColor} />
            <ResultSynergyLabel $color={synColor}>{synLabel}</ResultSynergyLabel>
          </ResultSynergyRow>
          <ResultSummary>{result.summary}</ResultSummary>
          <Label>Key Highlights</Label>
          <HighlightsBlock>
            {result.highlights.map((h, i) => (
              <HighlightRow key={i}>
                <HighlightBullet $color={synColor}>▸</HighlightBullet>
                <HighlightText>{h}</HighlightText>
              </HighlightRow>
            ))}
          </HighlightsBlock>
          <ResultBonusBlock>
            <ResultBonusIntro>{raceObj.name} brings these stat bonuses:</ResultBonusIntro>
            <ResultBonusRow>
              {Object.entries(raceObj.statBonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
            </ResultBonusRow>
          </ResultBonusBlock>
        </ResultBox>
      ) : (
        <Placeholder>
          {!selRace && !selClass ? 'Select a race and class above to see their synergy' :
            !selRace ? 'Now select a race to complete the pairing' :
              'Now select a class to see the pairing result'}
        </Placeholder>
      )}
    </div>
  );
};
