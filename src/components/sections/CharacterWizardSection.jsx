import { Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DND_DATA } from '../../data/dndData.js';
import { synergyLabels, synergyColors } from '../../styles/tokens.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Grid, Stack } from '../ui/Grid.jsx';
import { Card, CardHeaderRow, CardTitle, CardTagline, IconBadge, Surface } from '../ui/Card.jsx';
import { Label, StatBadge, Chip, AccentChip, DifficultyBadge } from '../ui/Badge.jsx';
import { DetailPanel } from '../ui/DetailPanel.jsx';
import { SynergyResult } from '../ui/SynergyResult.jsx';

const STEPS = [
  { id: 'race', label: 'Race' },
  { id: 'class', label: 'Class' },
  { id: 'review', label: 'Review' },
];

// Detail overlay: a fixed-width side panel next to the grid on wide
// containers, a centered popup with a backdrop on narrow ones. Purely
// CSS-driven via @container so the same markup serves both layouts — no
// device detection or JS breakpoint fork.
const DETAIL_BREAKPOINT_PX = 640;
const DETAIL_BREAKPOINT = `${DETAIL_BREAKPOINT_PX}px`;

const StepperRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const StepperItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 0;
  min-width: 44px;
  cursor: ${(p) => (p.disabled ? 'default' : 'pointer')};
  opacity: ${(p) => (p.disabled ? 0.4 : 1)};
  -webkit-tap-highlight-color: transparent;
`;

const StepperCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
  background: ${(p) => (p.$done || p.$current ? 'var(--accent-subtle)' : 'var(--surface2)')};
  border: 2px solid ${(p) => (p.$done || p.$current ? 'var(--accent)' : 'var(--border)')};
  color: ${(p) => (p.$done || p.$current ? 'var(--accent)' : 'var(--text-muted)')};
`;

const StepperLabel = styled.div`
  font-size: 11px;
  font-family: var(--font-heading);
  letter-spacing: 0.03em;
  white-space: nowrap;
  color: ${(p) => (p.$current ? 'var(--accent)' : 'var(--text-muted)')};
  font-weight: ${(p) => (p.$current ? 700 : 400)};
`;

const StepperConnector = styled.div`
  flex: 1;
  height: 2px;
  margin: 16px 6px 0;
  background: ${(p) => (p.$done ? 'var(--accent)' : 'var(--border)')};
`;

const StepTracker = ({ steps, currentIndex, reachable, onJump }) => (
  <StepperRow>
    {steps.map((s, i) => {
      const done = i < currentIndex;
      const current = i === currentIndex;
      const clickable = reachable(s.id);
      return (
        <Fragment key={s.id}>
          <StepperItem type="button" disabled={!clickable} aria-label={`${s.label} step`} onClick={() => clickable && onJump(s.id)}>
            <StepperCircle $done={done} $current={current}>{done ? '✓' : i + 1}</StepperCircle>
            <StepperLabel $current={current}>{s.label}</StepperLabel>
          </StepperItem>
          {i < steps.length - 1 && <StepperConnector $done={i < currentIndex} />}
        </Fragment>
      );
    })}
  </StepperRow>
);

const WizardBody = styled.div`
  container-type: inline-size;
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const CardColumn = styled.div`
  flex: 1;
  min-width: 0;
`;

const DetailOverlay = styled.div`
  display: ${(p) => (p.$open ? 'block' : 'none')};
  width: 300px;
  flex-shrink: 0;

  @container (max-width: ${DETAIL_BREAKPOINT}) {
    display: ${(p) => (p.$open ? 'flex' : 'none')};
    position: fixed;
    inset: 0;
    width: auto;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.55);
    padding: 20px;
    z-index: 50;
  }
`;

const DetailBox = styled.div`
  width: 100%;

  @container (max-width: ${DETAIL_BREAKPOINT}) {
    width: min(440px, 92vw);
    max-height: 80vh;
    overflow-y: auto;
  }
`;

const StatRow = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const TraitLine = styled.div`
  font-size: 11.5px;
  line-height: 1.55;
`;

const TraitName = styled.span`
  font-weight: 600;
  color: var(--accent);
  font-family: var(--font-heading);
`;

const TraitDesc = styled.span`
  color: var(--text-muted);
`;

const SelectButton = styled.button`
  margin-top: 14px;
  width: 100%;
  min-height: 42px;
  border-radius: 7px;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  color: var(--accent);
`;

const Placeholder = styled(Surface)`
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
  font-size: 14px;
  padding: 50px 24px;
`;

const CardExtraBonusText = styled.span`
  font-size: 10px;
  color: var(--text-muted);
  font-style: italic;
`;

const CardMetaRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
  font-size: 11px;
  color: var(--text-muted);
`;

const CardTraitsBlock = styled.div`
  border-top: 1px solid var(--border);
  padding-top: 10px;
`;

const CardTraitRow = styled.div`
  margin-bottom: 5px;
`;

const CardTraitName = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  font-family: var(--font-heading);
`;

const CardTraitDesc = styled.span`
  font-size: 11px;
  color: var(--text-muted);
`;

const CardMoreTraitsNote = styled.div`
  font-size: 10px;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 3px;
`;

const CardClassBadgeRow = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const CardRoleText = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 10px;
  font-style: italic;
`;

const CardFeatureRow = styled.div`
  margin-bottom: 5px;
  display: flex;
  gap: 6px;
  align-items: baseline;
`;

const CardFeatureLevel = styled.span`
  font-size: 9px;
  color: var(--text-muted);
  font-family: monospace;
  flex-shrink: 0;
`;

const CardFeatureName = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  font-family: var(--font-heading);
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
      {race.extraBonuses && <CardExtraBonusText>{race.extraBonuses}</CardExtraBonusText>}
    </StatRow>
    <CardMetaRow>
      <span>Size: {race.size}</span><span>Speed: {race.speed} ft</span>
    </CardMetaRow>
    <CardTraitsBlock>
      {race.traits.slice(0, 2).map((t) => (
        <CardTraitRow key={t.name}>
          <CardTraitName>{t.name}. </CardTraitName>
          <CardTraitDesc>{t.desc}</CardTraitDesc>
        </CardTraitRow>
      ))}
      {race.traits.length > 2 && <CardMoreTraitsNote>+{race.traits.length - 2} more traits, click to expand</CardMoreTraitsNote>}
    </CardTraitsBlock>
  </Card>
);

const ClassCard = ({ cls, onClick, isSelected }) => (
  <Card onClick={() => onClick(cls)} $selected={isSelected} $accent={cls.color}>
    <CardHeaderRow>
      <div>
        <CardTitle>{cls.name}</CardTitle>
        <CardTagline>{cls.tagline}</CardTagline>
      </div>
      <IconBadge $color={cls.color}>{cls.icon}</IconBadge>
    </CardHeaderRow>
    <CardClassBadgeRow>
      <Chip>HD: {cls.hitDie}</Chip>
      {cls.primaryAbility.map((a) => <AccentChip key={a}>{a}</AccentChip>)}
      <DifficultyBadge level={cls.difficulty} />
    </CardClassBadgeRow>
    <CardRoleText>{cls.role}</CardRoleText>
    <CardTraitsBlock>
      {cls.keyFeatures.slice(0, 2).map((f) => (
        <CardFeatureRow key={f.name}>
          <CardFeatureLevel>Lv.{f.level}</CardFeatureLevel>
          <CardFeatureName>{f.name}</CardFeatureName>
        </CardFeatureRow>
      ))}
    </CardTraitsBlock>
  </Card>
);

const RaceDetailBody = ({ race }) => (
  <>
    <Label>Ability Score Bonuses</Label>
    <StatRow>
      {Object.entries(race.statBonuses).map(([s, v]) => <StatBadge key={s} stat={s} value={v} />)}
    </StatRow>
    <Label>Traits</Label>
    <Stack $gap="6px">
      {race.traits.map((t) => (
        <TraitLine key={t.name}><TraitName>{t.name}. </TraitName><TraitDesc>{t.desc}</TraitDesc></TraitLine>
      ))}
    </Stack>
  </>
);

const ClassDetailBody = ({ cls }) => (
  <>
    <StatRow>
      <Chip>HD: {cls.hitDie}</Chip>
      {cls.primaryAbility.map((a) => <AccentChip key={a}>{a}</AccentChip>)}
    </StatRow>
    <Label>Key Features (Lv. 1)</Label>
    <Stack $gap="6px">
      {cls.keyFeatures.filter((f) => f.level === 1).map((f) => (
        <TraitLine key={f.name}><TraitName>{f.name}. </TraitName><TraitDesc>{f.desc}</TraitDesc></TraitLine>
      ))}
    </Stack>
  </>
);

export const CharacterWizardSection = () => {
  const { races, classes, pairings } = DND_DATA;
  const [step, setStep] = useState('race');
  const [raceId, setRaceId] = useState(null);
  const [classId, setClassId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [isOverlayModal, setIsOverlayModal] = useState(false);
  const wizardBodyRef = useRef(null);
  const headerAreaRef = useRef(null);
  const cardColumnRef = useRef(null);
  const detailBoxRef = useRef(null);

  const list = step === 'race' ? races : classes;
  const viewItem = step !== 'review' ? list.find((i) => i.id === viewId) : null;

  // Mirrors the `@container (max-width: ${DETAIL_BREAKPOINT})` rule below in
  // JS so the detail view's ARIA/focus handling matches whichever layout
  // (inline side panel vs. full-screen modal) it's actually rendered as.
  useEffect(() => {
    const el = wizardBodyRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => {
      setIsOverlayModal(entry.contentRect.width <= DETAIL_BREAKPOINT_PX);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!viewItem) return;
    const previouslyFocused = document.activeElement;
    detailBoxRef.current?.focus();

    const handleKey = (e) => { if (e.key === 'Escape') setViewId(null); };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
      previouslyFocused?.focus?.();
    };
  }, [viewItem]);

  // When the detail view is rendered as a full-screen modal, everything
  // behind it is fully hidden but would otherwise stay reachable by
  // keyboard/screen reader. Make it inert for as long as the modal is open.
  useEffect(() => {
    if (!viewItem || !isOverlayModal) return;
    const targets = [document.getElementById('app-sidebar'), headerAreaRef.current, cardColumnRef.current].filter(Boolean);
    targets.forEach((el) => { el.inert = true; });
    return () => targets.forEach((el) => { el.inert = false; });
  }, [viewItem, isOverlayModal]);

  const stepReachable = (id) => id === 'race' || (id === 'class' && raceId) || (id === 'review' && raceId && classId);

  const handleStepClick = (id) => {
    if (!stepReachable(id)) return;
    setStep(id);
    setViewId(null);
  };

  const openView = (item) => setViewId((prev) => (prev === item.id ? null : item.id));

  const confirmSelection = (item) => {
    if (step === 'race') {
      setRaceId(item.id);
      setViewId(null);
      setStep('class');
    } else if (step === 'class') {
      setClassId(item.id);
      setViewId(null);
      setStep('review');
    }
  };

  const raceObj = races.find((r) => r.id === raceId);
  const classObj = classes.find((c) => c.id === classId);
  const result = raceId && classId ? (pairings[raceId] || {})[classId] : null;
  const synColor = result ? synergyColors[result.synergy] : '';
  const synLabel = result ? synergyLabels[result.synergy] : '';

  const currentIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div>
      <div ref={headerAreaRef}>
        <SectionHeader title="Character Builder" subtitle="A guided walk through building a character: pick a race, pick a class, then see how the two pair together." />

        <StepTracker steps={STEPS} currentIndex={currentIndex} reachable={stepReachable} onJump={handleStepClick} />
      </div>

      {step === 'review' ? (
        result && raceObj && classObj ? (
          <SynergyResult raceObj={raceObj} classObj={classObj} result={result} synColor={synColor} synLabel={synLabel} />
        ) : (
          <Placeholder>No pairing write-up yet for {raceObj?.name} + {classObj?.name} — the combo still works, it just isn't documented here.</Placeholder>
        )
      ) : (
        <WizardBody ref={wizardBodyRef}>
          <CardColumn ref={cardColumnRef}>
            <Grid $min="240px">
              {step === 'race'
                ? races.map((r) => <RaceCard key={r.id} race={r} onClick={openView} isSelected={raceId === r.id} />)
                : classes.map((c) => <ClassCard key={c.id} cls={c} onClick={openView} isSelected={classId === c.id} />)}
            </Grid>
          </CardColumn>
          <DetailOverlay $open={!!viewItem} onClick={() => setViewId(null)}>
            {viewItem && (
              <DetailBox
                ref={detailBoxRef}
                tabIndex={-1}
                role={isOverlayModal ? 'dialog' : undefined}
                aria-modal={isOverlayModal || undefined}
                aria-label={isOverlayModal ? `${viewItem.name} details` : undefined}
                onClick={(e) => e.stopPropagation()}
              >
                <DetailPanel title={viewItem.name} tagline={viewItem.tagline} color={viewItem.color} description={viewItem.description} onClose={() => setViewId(null)}>
                  {step === 'race' ? <RaceDetailBody race={viewItem} /> : <ClassDetailBody cls={viewItem} />}
                </DetailPanel>
                <SelectButton onClick={() => confirmSelection(viewItem)}>Select {viewItem.name} ›</SelectButton>
              </DetailBox>
            )}
          </DetailOverlay>
        </WizardBody>
      )}
    </div>
  );
};
