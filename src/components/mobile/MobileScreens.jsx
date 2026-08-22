import { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { DND_DATA } from '../../data/dndData.js';
import { slideIn } from '../../styles/keyframes.js';
import { schoolColors, rollTypeMeta, actionTypeColors, synergyLabels, synergyColors, dieShapes, difficultyColors } from '../../styles/tokens.js';

/* ── shared bits (M- prefixed to avoid collisions) ── */
const StatWrap = styled.span`
  display: inline-flex;
  gap: 4px;
  align-items: baseline;
  padding: 3px 9px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--accent);
  font-family: monospace;
`;

const StatLabel = styled.span`
  color: var(--text-muted);
  font-size: 10px;
`;

const MStat = ({ stat, value }) => (
  <StatWrap><StatLabel>{stat}</StatLabel>+{value}</StatWrap>
);

const MLabel = styled.div`
  font-family: var(--font-heading);
  color: var(--accent);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 18px 0 9px;
`;

const ChipWrap = styled.span`
  padding: 3px 9px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 700;
  background: ${(p) => (p.$solid ? `${p.$color}22` : 'var(--surface2)')};
  color: ${(p) => (p.$solid ? p.$color : 'var(--text-muted)')};
  border: 1px solid ${(p) => (p.$solid ? `${p.$color}44` : 'var(--border)')};
  white-space: nowrap;
`;

const MChip = ({ children, color, solid }) => <ChipWrap $color={color} $solid={solid}>{children}</ChipWrap>;

const DieWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 66px;
`;

const DieShape = styled.div`
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, var(--dice-fill-top), var(--dice-fill-bot));
  border: 2px solid var(--dice-color);
  clip-path: ${(p) => p.$shape};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 14px;
  color: var(--dice-color);
`;

const DieLabel = styled.div`
  font-size: 10px;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.3;
`;

const MDie = ({ sides, label }) => (
  <DieWrap>
    <DieShape $shape={dieShapes[sides]}>d{sides}</DieShape>
    {label && <DieLabel>{label}</DieLabel>}
  </DieWrap>
);

/* row used by race + class lists */
const RowButton = styled.button`
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  min-height: 72px;
  padding: 13px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid ${(p) => p.$color};
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
`;

const RowBadge = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 9px;
  background: ${(p) => p.$color}1f;
  border: 1px solid ${(p) => p.$color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 15px;
  color: ${(p) => p.$color};
  flex-shrink: 0;
`;

const RowContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const RowTitle = styled.div`
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
`;

const RowSub = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 1px;
`;

const RowChips = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 7px;
`;

const RowChevron = styled.span`
  color: var(--text-muted);
  font-size: 20px;
  flex-shrink: 0;
`;

const MRow = ({ color, badge, title, sub, chips, onClick }) => (
  <RowButton onClick={onClick} $color={color}>
    <RowBadge $color={color}>{badge}</RowBadge>
    <RowContent>
      <RowTitle>{title}</RowTitle>
      <RowSub>{sub}</RowSub>
      <RowChips>{chips}</RowChips>
    </RowContent>
    <RowChevron>›</RowChevron>
  </RowButton>
);

/* full-screen detail sheet */
const Sheet = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.22s ease;
`;

const SheetHead = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  padding: calc(env(safe-area-inset-top) + 8px) 8px 8px;
  background: var(--bar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--bar-border);
  flex-shrink: 0;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 44px;
  padding: 0 12px 0 4px;
  background: none;
  border: none;
  color: var(--accent);
  font-size: 15px;
  font-family: var(--font-heading);
  cursor: pointer;
`;

const SheetBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 18px 16px calc(env(safe-area-inset-bottom) + 28px);
  scrollbar-width: none;

  @supports not (scrollbar-width: none) {
    &::-webkit-scrollbar { width: 0; }
  }
`;

const SheetHeader = styled.div`
  border-bottom: 2px solid ${(p) => p.$color};
  padding-bottom: 12px;
  margin-bottom: 4px;
`;

const SheetTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 26px;
  font-weight: 800;
  color: var(--text);
  margin: 0;
  letter-spacing: 0.02em;
`;

const SheetSub = styled.div`
  font-size: 13px;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 3px;
`;

const MDetail = ({ title, sub, color, onBack, children }) => createPortal(
  <Sheet>
    <SheetHead>
      <BackButton onClick={onBack}>‹ Back</BackButton>
    </SheetHead>
    <SheetBody>
      <SheetHeader $color={color}>
        <SheetTitle>{title}</SheetTitle>
        <SheetSub>{sub}</SheetSub>
      </SheetHeader>
      {children}
    </SheetBody>
  </Sheet>,
  document.body,
);

const CardWrap = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: ${(p) => (p.$color ? `3px solid ${p.$color}` : '1px solid var(--border)')};
  border-radius: 9px;
  padding: 12px 14px;
`;

const MCard = ({ children, color }) => <CardWrap $color={color}>{children}</CardWrap>;

const Paragraph = styled.p`
  font-size: ${(p) => p.$size || '15px'};
  line-height: 1.65;
  color: var(--text);
  margin: ${(p) => p.$m ?? '14px 0 0'};
`;

const MiniLabel = styled.div`
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.07em;
`;

const MiniLabelSpaced = styled(MiniLabel)`
  margin-bottom: 3px;
`;

const MiniValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
`;

const RoleText = styled.div`
  font-size: 14px;
  color: var(--text);
`;

const Strong = styled.strong`
  color: var(--text);
`;

const HeadingStrong = styled(Strong)`
  font-family: var(--font-heading);
`;

const Flex1 = styled.div`
  flex: 1;
`;

const SizeSpeedRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const SubRaceStatRow = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 6px;
`;

const ResultWrap = styled.div`
  margin-top: 22px;
`;

const ExtraNote = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 7px;
`;

const StatRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const CardName = styled.div`
  font-family: var(--font-heading);
  font-size: ${(p) => p.$size || '14px'};
  font-weight: 700;
  color: ${(p) => p.$color || 'var(--text)'};
  margin-bottom: ${(p) => p.$mb ?? '3px'};
`;

const CardDesc = styled.div`
  font-size: ${(p) => p.$size || '13px'};
  color: var(--text-muted);
  line-height: ${(p) => p.$lh || 1.55};
  margin-top: ${(p) => p.$mt || 0};
`;

const Grid = styled.div`
  display: grid;
  gap: ${(p) => p.$gap || '8px'};
  margin-top: ${(p) => p.$mt || 0};
  padding-bottom: ${(p) => p.$pb || 0};
`;

const HScroll = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 2px 14px 2px 0;
  margin: 0 -14px 0 0;
  margin-top: ${(p) => p.$mt || 0};
  scrollbar-width: none;

  @supports not (scrollbar-width: none) {
    &::-webkit-scrollbar { display: none; }
  }
`;

const ChipRow = styled.div`
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  padding-bottom: 8px;
`;

const NamedChip = styled.span`
  padding: 7px 14px;
  border-radius: 7px;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  font-size: 13px;
  font-family: var(--font-heading);
`;

/* ── Races ── */
export const MRaces = () => {
  const { races } = DND_DATA;
  const [sel, setSel] = useState(null);
  if (sel) return (
    <MDetail title={sel.name} sub={sel.tagline} color={sel.color} onBack={() => setSel(null)}>
      <Paragraph>{sel.description}</Paragraph>
      <MLabel>Ability Bonuses</MLabel>
      <StatRow>{Object.entries(sel.statBonuses).map(([s, v]) => <MStat key={s} stat={s} value={v} />)}</StatRow>
      {sel.extraBonuses && <ExtraNote>{sel.extraBonuses}</ExtraNote>}
      <SizeSpeedRow>
        <MCard><MiniLabel>Size</MiniLabel><MiniValue>{sel.size}</MiniValue></MCard>
        <MCard><MiniLabel>Speed</MiniLabel><MiniValue>{sel.speed} ft</MiniValue></MCard>
      </SizeSpeedRow>
      {sel.subRaces && <>
        <MLabel>Subraces</MLabel>
        <Grid>{sel.subRaces.map((sr) => (
          <MCard key={sr.name} color={sel.color}>
            <CardName $mb="6px">{sr.name}</CardName>
            <SubRaceStatRow>{Object.entries(sr.bonuses).map(([s, v]) => <MStat key={s} stat={s} value={v} />)}</SubRaceStatRow>
            <CardDesc $size="12.5px">{sr.extra}</CardDesc>
          </MCard>))}</Grid>
      </>}
      <MLabel>Racial Traits</MLabel>
      <Grid>{sel.traits.map((t) => (
        <MCard key={t.name}>
          <CardName>{t.name}</CardName>
          <CardDesc>{t.desc}</CardDesc>
        </MCard>))}</Grid>
      <MLabel>Pairs Well With</MLabel>
      <ChipRow>{sel.bestClasses.map((c) => <NamedChip key={c}>{c}</NamedChip>)}</ChipRow>
    </MDetail>
  );
  return (
    <Grid $gap="9px">
      {races.map((r) => (
        <MRow key={r.id} color={r.color} badge={r.icon} title={r.name} sub={r.tagline} onClick={() => setSel(r)}
          chips={Object.entries(r.statBonuses).slice(0, 3).map(([s, v]) => <MStat key={s} stat={s} value={v} />)} />
      ))}
    </Grid>
  );
};

/* ── Classes ── */
const InfoGridTwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 14px;
`;

const FeatureBadge = styled.span`
  min-width: 30px;
  height: 30px;
  border-radius: 6px;
  background: ${(p) => p.$color}1f;
  border: 1px solid ${(p) => p.$color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: ${(p) => p.$color};
  font-family: monospace;
`;

const FeatureRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 5px;
`;

const FeatureName = styled.span`
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
`;

export const MClasses = () => {
  const { classes } = DND_DATA;
  const [sel, setSel] = useState(null);
  if (sel) return (
    <MDetail title={sel.name} sub={sel.tagline} color={sel.color} onBack={() => setSel(null)}>
      <Paragraph>{sel.description}</Paragraph>
      <InfoGridTwoCol>
        {[['Hit Die', sel.hitDie], ['Primary', sel.primaryAbility.join(', ')], ['Saves', sel.savingThrows.join(', ')], ['Difficulty', sel.difficulty]].map(([l, v]) => (
          <MCard key={l}><MiniLabelSpaced>{l}</MiniLabelSpaced><MiniValue>{v}</MiniValue></MCard>))}
      </InfoGridTwoCol>
      <MLabel>Party Role</MLabel>
      <MCard color={sel.color}><RoleText>{sel.role}</RoleText></MCard>
      <MLabel>Proficiencies</MLabel>
      <MCard>
        <CardDesc $size="13px" $lh={1.6}><Strong>Armor: </Strong>{sel.armorProf}</CardDesc>
        <CardDesc $size="13px" $lh={1.6} $mt="4px"><Strong>Weapons: </Strong>{sel.weaponProf}</CardDesc>
      </MCard>
      <MLabel>Key Features: Levels 1-5</MLabel>
      <Grid $pb="8px">{sel.keyFeatures.map((f) => (
        <MCard key={f.name}>
          <FeatureRow>
            <FeatureBadge $color={sel.color}>{f.level}</FeatureBadge>
            <FeatureName>{f.name}</FeatureName>
          </FeatureRow>
          <CardDesc>{f.desc}</CardDesc>
        </MCard>))}</Grid>
    </MDetail>
  );
  return (
    <Grid $gap="9px">
      {classes.map((c) => (
        <MRow key={c.id} color={c.color} badge={c.icon} title={c.name} sub={c.tagline} onClick={() => setSel(c)}
          chips={<><MChip color={c.color} solid>HD {c.hitDie}</MChip>{c.primaryAbility.map((a) => <MChip key={a} color={c.color} solid>{a}</MChip>)}<MChip color={difficultyColors[c.difficulty]} solid>{c.difficulty}</MChip></>} />
      ))}
    </Grid>
  );
};

/* ── Pairing ── */
const PickerButton = styled.button`
  min-height: 44px;
  padding: 9px 15px;
  border-radius: 8px;
  flex-shrink: 0;
  background: ${(p) => (p.$active ? `${p.$color}28` : 'var(--surface)')};
  border: 1.5px solid ${(p) => (p.$active ? p.$color : 'var(--border)')};
  color: ${(p) => (p.$active ? p.$color : 'var(--text-muted)')};
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const PairResultBox = styled.div`
  background: var(--surface);
  border: 1px solid ${(p) => p.$color}66;
  border-top: 3px solid ${(p) => p.$color};
  border-radius: 10px;
  padding: 18px 16px;
`;

const PairNamesRow = styled.div`
  font-family: var(--font-heading);
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 11px;
  line-height: 1.3;
`;

const PairName = styled.span`
  color: ${(p) => p.$color};
`;

const PairPlus = styled.span`
  color: var(--text-muted);
  margin: 0 7px;
`;

const SynergyRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 6px;
`;

const SynergySegment = styled.div`
  flex: 1;
  height: 7px;
  border-radius: 4px;
  background: ${(p) => (p.$filled ? p.$color : 'var(--surface2)')};
  border: 1px solid ${(p) => (p.$filled ? p.$color : 'var(--border)')};
`;

const SynergyLabelText = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${(p) => p.$color};
  font-family: var(--font-heading);
  margin-bottom: 13px;
`;

const PairSummary = styled.p`
  font-size: 14.5px;
  color: var(--text);
  line-height: 1.65;
  margin: 0 0 4px;
`;

const HighlightRow = styled.div`
  display: flex;
  gap: 9px;
  align-items: flex-start;
`;

const HighlightBullet = styled.span`
  color: ${(p) => p.$color};
  font-size: 11px;
  margin-top: 4px;
`;

const HighlightText = styled.span`
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.55;
`;

const PairPlaceholder = styled.div`
  background: var(--surface);
  border: 1px dashed var(--border);
  border-radius: 10px;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
  font-size: 14px;
`;

export const MPair = () => {
  const { races, classes, pairings } = DND_DATA;
  const [r, setR] = useState(null);
  const [c, setC] = useState(null);
  const res = r && c ? (pairings[r] || {})[c] : null;
  const ro = races.find((x) => x.id === r);
  const co = classes.find((x) => x.id === c);
  const sc = res ? synergyColors[res.synergy] : '';
  const picker = (items, val, set) => (
    <HScroll>
      {items.map((i) => (
        <PickerButton key={i.id} onClick={() => set(i.id)} $active={val === i.id} $color={i.color}>{i.name}</PickerButton>
      ))}
    </HScroll>
  );
  return (
    <div>
      <MLabel>1. Pick a Race</MLabel>
      {picker(races, r, setR)}
      <MLabel>2. Pick a Class</MLabel>
      {picker(classes, c, setC)}
      <ResultWrap>
        {res && ro && co ? (
          <PairResultBox $color={sc}>
            <PairNamesRow>
              <PairName $color={ro.color}>{ro.name}</PairName>
              <PairPlus>+</PairPlus>
              <PairName $color={co.color}>{co.name}</PairName>
            </PairNamesRow>
            <SynergyRow>
              {[1, 2, 3, 4, 5].map((i) => <SynergySegment key={i} $filled={i <= res.synergy} $color={sc} />)}
            </SynergyRow>
            <SynergyLabelText $color={sc}>{synergyLabels[res.synergy]}</SynergyLabelText>
            <PairSummary>{res.summary}</PairSummary>
            <MLabel>Highlights</MLabel>
            <Grid>{res.highlights.map((h, i) => (
              <HighlightRow key={i}>
                <HighlightBullet $color={sc}>▸</HighlightBullet>
                <HighlightText>{h}</HighlightText>
              </HighlightRow>))}</Grid>
            <MLabel>{ro.name} Bonuses</MLabel>
            <StatRow>{Object.entries(ro.statBonuses).map(([s, v]) => <MStat key={s} stat={s} value={v} />)}</StatRow>
          </PairResultBox>
        ) : (
          <PairPlaceholder>
            {!r && !c ? 'Pick a race and a class to see how well they work together' : !r ? 'Now pick a race' : 'Now pick a class'}
          </PairPlaceholder>
        )}
      </ResultWrap>
    </div>
  );
};

/* ── Spells ── */
const SpellFilterButton = styled.button`
  min-height: 40px;
  padding: 8px 14px;
  border-radius: 7px;
  flex-shrink: 0;
  background: ${(p) => (p.$active ? (p.$hasColor ? `${p.$color}22` : 'var(--accent-subtle)') : 'var(--surface)')};
  border: 1px solid ${(p) => (p.$active ? p.$color : 'var(--border)')};
  color: ${(p) => (p.$active ? p.$color : 'var(--text-muted)')};
  font-family: var(--font-heading);
  font-size: 13px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const SpellCard = styled.div`
  background: var(--surface);
  border: 1px solid ${(p) => (p.$open ? p.$color : 'var(--border)')};
  border-left: 3px solid ${(p) => p.$color};
  border-radius: 10px;
  padding: 13px 14px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const SpellHeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
`;

const SpellName = styled.div`
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
`;

const SpellMeta = styled.div`
  font-size: 11.5px;
  color: var(--text-muted);
  margin-top: 5px;
`;

const RollChipsRow = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const SpellExpanded = styled.div`
  border-top: 1px solid var(--border);
  margin-top: 11px;
  padding-top: 10px;
`;

const SpellDesc = styled.div`
  font-size: 13.5px;
  color: var(--text);
  line-height: 1.65;
`;

const DiceNoteBox = styled.div`
  background: ${(p) => p.$color}14;
  border: 1px solid ${(p) => p.$color}33;
  border-radius: 7px;
  padding: 10px 12px;
  margin-top: 10px;
`;

const DiceNoteTitle = styled.div`
  font-size: 9.5px;
  font-weight: 700;
  color: ${(p) => p.$color};
  letter-spacing: 0.11em;
  text-transform: uppercase;
  font-family: var(--font-heading);
  margin-bottom: 5px;
`;

const DiceNoteText = styled.div`
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.55;
`;

const UpcastLine = styled.div`
  font-size: 12.5px;
  color: var(--accent);
  margin-top: 9px;
`;

const SpellClasses = styled.div`
  font-size: 11.5px;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 9px;
`;

const SpellHint = styled.div`
  font-size: 11px;
  color: ${(p) => p.$color};
  margin-top: 7px;
  opacity: 0.8;
`;

export const MSpells = () => {
  const { spells } = DND_DATA;
  const [f, setF] = useState('All');
  const [open, setOpen] = useState(null);
  const list = useMemo(() => (f === 'All' ? spells : spells.filter((s) => s.school === f)), [f, spells]);
  return (
    <div>
      <MCard>
        <CardDesc $size="12.5px" $lh={1.6}>
          <HeadingStrong>Save DC</HeadingStrong> = 8 + proficiency + spell mod. <HeadingStrong>Attack</HeadingStrong> = 1d20 + proficiency + spell mod.
        </CardDesc>
      </MCard>
      <HScroll $mt="14px">
        {['All', ...Object.keys(schoolColors)].map((s) => {
          const a = f === s;
          const col = schoolColors[s] || 'var(--accent)';
          return <SpellFilterButton key={s} onClick={() => setF(s)} $active={a} $color={col} $hasColor={!!schoolColors[s]}>{s}</SpellFilterButton>;
        })}
      </HScroll>
      <Grid $gap="9px" $mt="14px">
        {list.map((sp) => {
          const col = schoolColors[sp.school];
          const o = open === sp.name;
          const rollLabel = sp.roll ? rollTypeMeta[sp.roll.type]?.label : null;
          return (
            <SpellCard key={sp.name} onClick={() => setOpen(o ? null : sp.name)} $open={o} $color={col}>
              <SpellHeadRow>
                <SpellName>{sp.name}</SpellName>
                <MChip color={col} solid>{['Cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'][sp.level]}</MChip>
              </SpellHeadRow>
              <SpellMeta>{sp.school} · {sp.castingTime} · {sp.range}</SpellMeta>
              {sp.roll && <RollChipsRow>
                <MChip color={col} solid>{rollLabel}</MChip>
                {sp.roll.save && <MChip>{sp.roll.save} save</MChip>}
                {sp.roll.attack && <MChip>{sp.roll.attack}</MChip>}
                {sp.roll.damage && <MChip>{sp.roll.damage}</MChip>}
                {sp.roll.healing && <MChip>{sp.roll.healing}</MChip>}
              </RollChipsRow>}
              {o ? (
                <SpellExpanded>
                  <SpellDesc>{sp.desc}</SpellDesc>
                  {sp.diceNote && <DiceNoteBox $color={col}>
                    <DiceNoteTitle $color={col}>How to Roll</DiceNoteTitle>
                    <DiceNoteText>{sp.diceNote}</DiceNoteText>
                  </DiceNoteBox>}
                  {sp.roll?.upcast && <UpcastLine><strong>Upcast: </strong><em>{sp.roll.upcast}</em></UpcastLine>}
                  <SpellClasses>{sp.classes.join(', ')}</SpellClasses>
                </SpellExpanded>
              ) : <SpellHint $color={col}>Tap for details ▾</SpellHint>}
            </SpellCard>
          );
        })}
      </Grid>
    </div>
  );
};

/* ── Rules tab: Abilities / Actions / Round ── */
const AbilityRow = styled.div`
  background: var(--surface);
  border: 1px solid ${(p) => (p.$open ? p.$color : 'var(--border)')};
  border-left: 3px solid ${(p) => p.$color};
  border-radius: 10px;
  padding: 13px 14px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const AbilityRowHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AbilityBadge = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 9px;
  background: ${(p) => p.$color}1f;
  border: 1px solid ${(p) => p.$color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 15px;
  color: ${(p) => p.$color};
  flex-shrink: 0;
`;

const AbilityHint = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
`;

const AbilityChevron = styled.span`
  color: var(--text-muted);
  font-size: 15px;
`;

const AbilityExpanded = styled.div`
  margin-top: 12px;
  border-top: 1px solid var(--border);
  padding-top: 11px;
`;

const UseRow = styled.div`
  display: flex;
  gap: 8px;
`;

const UseBullet = styled.span`
  color: ${(p) => p.$color};
  font-size: 10px;
  margin-top: 4px;
`;

const UseText = styled.span`
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
`;

const SavingThrowText = styled.div`
  font-size: 13px;
  color: var(--text-muted);
  font-style: italic;
  line-height: 1.55;
`;

const MAbilities = () => {
  const { abilityScores } = DND_DATA;
  const [open, setOpen] = useState(null);
  return (
    <div>
      <MCard>
        <CardDesc $size="12.5px" $lh={1.6}>
          <HeadingStrong>Modifier</HeadingStrong> = (score − 10) ÷ 2, rounded down. Score 10 → +0. Score 16 → +3.
        </CardDesc>
      </MCard>
      <Grid $gap="9px" $mt="14px">
        {abilityScores.map((s) => {
          const o = open === s.id;
          return (
            <AbilityRow key={s.id} onClick={() => setOpen(o ? null : s.id)} $open={o} $color={s.color}>
              <AbilityRowHead>
                <AbilityBadge $color={s.color}>{s.abbr}</AbilityBadge>
                <Flex1>
                  <RowTitle>{s.name}</RowTitle>
                  <AbilityHint>{o ? 'Tap to collapse' : 'Tap for details'}</AbilityHint>
                </Flex1>
                <AbilityChevron>{o ? '▴' : '▾'}</AbilityChevron>
              </AbilityRowHead>
              {o && <AbilityExpanded>
                <Paragraph $m="0">{s.description}</Paragraph>
                <MLabel>What It Affects</MLabel>
                <Grid $gap="6px">{s.uses.map((u, i) => (
                  <UseRow key={i}><UseBullet $color={s.color}>▸</UseBullet><UseText>{u}</UseText></UseRow>))}</Grid>
                {s.skills.length > 0 && <><MLabel>Skills</MLabel>
                  <StatRow>{s.skills.map((k) => <MChip key={k} color={s.color} solid>{k}</MChip>)}</StatRow></>}
                <MLabel>Saving Throw</MLabel>
                <SavingThrowText>{s.savingThrow}</SavingThrowText>
              </AbilityExpanded>}
            </AbilityRow>
          );
        })}
      </Grid>
    </div>
  );
};

const OverviewCard = styled.div`
  background: var(--surface);
  border: 1px solid ${(p) => p.$color}44;
  border-left: 3px solid ${(p) => p.$color};
  border-radius: 9px;
  padding: 11px 13px;
`;

const OverviewName = styled.div`
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  color: ${(p) => p.$color};
`;

const OverviewDesc = styled.div`
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-top: 3px;
`;

const ActionCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid ${(p) => p.$color};
  border-radius: 9px;
  padding: 12px 14px;
`;

const ActionHeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 6px;
`;

const ActionName = styled.div`
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
`;

const DiceBox = styled.div`
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 9px 11px;
  margin-top: 9px;
`;

const DiceRow = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  align-items: center;
`;

const DiceLabel = styled.span`
  font-size: 9.5px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.09em;
`;

const DiceChip = styled.span`
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 11.5px;
  font-weight: 700;
  background: ${(p) => p.$color}22;
  color: ${(p) => p.$color};
  border: 1px solid ${(p) => p.$color}44;
  font-family: monospace;
`;

const DiceNoteInline = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-top: 7px;
`;

const ActionExample = styled.div`
  font-size: 12px;
  color: var(--accent);
  font-style: italic;
  margin-top: 8px;
`;

const MActions = () => {
  const { actions } = DND_DATA;
  return (
    <div>
      <Grid $gap="8px">
        {[['Action', 'Your one main activity each turn.', '#c8743a'], ['Bonus Action', 'A secondary act, only if a feature grants one.', '#4a6fa5'], ['Reaction', 'One per round. Can trigger even off-turn.', '#8b3a3a']].map(([n, d, c]) => (
          <OverviewCard key={n} $color={c}>
            <OverviewName $color={c}>{n}</OverviewName>
            <OverviewDesc>{d}</OverviewDesc>
          </OverviewCard>))}
      </Grid>
      {actions.map((cat) => (
        <div key={cat.category}>
          <MLabel>{cat.category}</MLabel>
          <Grid $gap="9px">
            {cat.items.map((a) => {
              const col = actionTypeColors[a.type] || Object.entries(actionTypeColors).find(([k]) => a.type.startsWith(k.split(' ')[0]))?.[1] || '#888';
              return (
                <ActionCard key={a.name} $color={col}>
                  <ActionHeadRow>
                    <ActionName>{a.name}</ActionName>
                    <MChip color={col} solid>{a.type}</MChip>
                  </ActionHeadRow>
                  <CardDesc>{a.desc}</CardDesc>
                  {a.dice && <DiceBox>
                    <DiceRow>
                      <DiceLabel>Rolls</DiceLabel>
                      {a.dice.map((d, i) => <DiceChip key={i} $color={col}>{d}</DiceChip>)}
                    </DiceRow>
                    {a.diceNote && <DiceNoteInline>{a.diceNote}</DiceNoteInline>}
                  </DiceBox>}
                  <ActionExample>e.g. {a.example}</ActionExample>
                </ActionCard>
              );
            })}
          </Grid>
        </div>
      ))}
    </div>
  );
};

const InitiativeBox = styled.div`
  background: var(--surface);
  border: 1px solid var(--accent-border);
  border-left: 3px solid var(--accent);
  border-radius: 10px;
  padding: 15px 14px;
  display: flex;
  gap: 15px;
  align-items: flex-start;
`;

const InitiativeDiceChip = styled.div`
  display: inline-block;
  padding: 5px 11px;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  border-radius: 6px;
  color: var(--accent);
  font-family: monospace;
  font-size: 12.5px;
  font-weight: 700;
  margin-top: 9px;
`;

const TurnStepRow = styled.div`
  display: flex;
  gap: 13px;
`;

const TurnStepColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const TurnStepNum = styled.div`
  width: 34px;
  height: 34px;
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
  min-height: 12px;
`;

const TurnStepBody = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 11px 13px;
  flex: 1;
  margin-bottom: 9px;
`;

const TurnStepName = styled.div`
  font-family: var(--font-heading);
  font-size: 14.5px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
`;

const ReactionsBox = styled.div`
  background: var(--surface);
  border: 1px solid #8b3a3a44;
  border-left: 3px solid #8b3a3a;
  border-radius: 9px;
  padding: 12px 14px;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.65;
`;

const QRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
`;

const ARow = styled.div`
  display: flex;
  gap: 8px;
`;

const QMarker = styled.span`
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--accent);
  font-size: 13px;
`;

const AMarker = styled(QMarker)`
  color: var(--text-muted);
`;

const QText = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.5;
`;

const AText = styled.span`
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
`;

const DicePrimerBox = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px 10px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
`;

const MRound = () => {
  const { rounds } = DND_DATA;
  return (
    <div>
      <MCard><Paragraph $size="14px" $m="0">{rounds.overview}</Paragraph></MCard>
      <MLabel>Step 0: Initiative</MLabel>
      <InitiativeBox>
        <MDie sides={20} />
        <Flex1>
          <CardDesc $size="13px" $lh={1.6}>{rounds.initiative.desc}</CardDesc>
          <InitiativeDiceChip>{rounds.initiative.dice}</InitiativeDiceChip>
        </Flex1>
      </InitiativeBox>
      <MLabel>On Your Turn</MLabel>
      <div>
        {rounds.turnFlow.map((s, i) => (
          <TurnStepRow key={s.step}>
            <TurnStepColumn>
              <TurnStepNum>{s.step}</TurnStepNum>
              {i < rounds.turnFlow.length - 1 && <TurnStepConnector />}
            </TurnStepColumn>
            <TurnStepBody>
              <TurnStepName>{s.name}</TurnStepName>
              <CardDesc $size="13px" $lh={1.6}>{s.desc}</CardDesc>
            </TurnStepBody>
          </TurnStepRow>
        ))}
      </div>
      <MLabel>Reactions</MLabel>
      <ReactionsBox>{rounds.reactionsNote}</ReactionsBox>
      <MLabel>Movement</MLabel>
      <Grid $gap="8px">{rounds.movementRules.map((m) => (
        <MCard key={m.name}>
          <CardName $mb="3px" $color="var(--accent)" $size="13.5px">{m.name}</CardName>
          <CardDesc $size="12.5px">{m.desc}</CardDesc>
        </MCard>))}</Grid>
      <MLabel>Common Questions</MLabel>
      <Grid $gap="8px">{rounds.commonQuestions.map((qa, i) => (
        <MCard key={i}>
          <QRow><QMarker>Q.</QMarker><QText>{qa.q}</QText></QRow>
          <ARow><AMarker>A.</AMarker><AText>{qa.a}</AText></ARow>
        </MCard>))}</Grid>
      <MLabel>The Dice</MLabel>
      <DicePrimerBox>
        <MDie sides={4} label="Daggers" /><MDie sides={6} label="Sneak Attack" /><MDie sides={8} label="Longsword" />
        <MDie sides={10} label="Big spells" /><MDie sides={12} label="Greataxe" /><MDie sides={20} label="Everything" />
      </DicePrimerBox>
    </div>
  );
};

const RulesTabBar = styled.div`
  display: flex;
  gap: 4px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 4px;
  margin-bottom: 16px;
`;

const RulesTabButton = styled.button`
  flex: 1;
  min-height: 38px;
  border-radius: 6px;
  border: none;
  background: ${(p) => (p.$active ? 'var(--accent-subtle)' : 'transparent')};
  color: ${(p) => (p.$active ? 'var(--accent)' : 'var(--text-muted)')};
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

export const MRules = () => {
  const [tab, setTab] = useState('abilities');
  const tabs = [['abilities', 'Abilities'], ['actions', 'Actions'], ['round', 'The Round']];
  return (
    <div>
      <RulesTabBar>
        {tabs.map(([id, label]) => (
          <RulesTabButton key={id} onClick={() => setTab(id)} $active={tab === id}>{label}</RulesTabButton>
        ))}
      </RulesTabBar>
      {tab === 'abilities' ? <MAbilities /> : tab === 'actions' ? <MActions /> : <MRound />}
    </div>
  );
};
