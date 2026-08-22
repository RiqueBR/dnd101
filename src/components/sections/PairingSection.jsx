import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { DND_DATA } from '../../data/dndData.js';
import { synergyLabels, synergyColors } from '../../styles/tokens.js';
import { fadeIn } from '../../styles/keyframes.js';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Stack } from '../ui/Grid.jsx';
import { Surface } from '../ui/Card.jsx';
import { Label, StatBadge } from '../ui/Badge.jsx';
import { PickerGroup, PickerButton } from '../ui/PickerButton.jsx';

const PickerLabel = styled.div`
  font-size: 11px;
  font-family: var(--font-heading);
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 9px;
`;

const ResultBox = styled(Surface)`
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

const HighlightRow = styled.div`
  display: flex;
  gap: 8px;
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

const Placeholder = styled(Surface)`
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
  font-size: 14px;
  padding: 50px 24px;
`;

const SynergyBar = ({ score, color }) => (
  <SynergyBarWrap>
    {[1, 2, 3, 4, 5].map((i) => <SynergySegment key={i} $filled={i <= score} $color={color} />)}
  </SynergyBarWrap>
);

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

      <div>
        <PickerLabel>Choose a Race</PickerLabel>
        <PickerGroup>
          {races.map((r) => (
            <PickerButton key={r.id} onClick={() => setSelRace(r.id)} $active={selRace === r.id} $color={r.color}>
              {r.icon} {r.name}
            </PickerButton>
          ))}
        </PickerGroup>
        <PickerLabel>Choose a Class</PickerLabel>
        <PickerGroup>
          {classes.map((c) => (
            <PickerButton key={c.id} onClick={() => setSelClass(c.id)} $active={selClass === c.id} $color={c.color}>
              {c.icon} {c.name}
            </PickerButton>
          ))}
        </PickerGroup>
      </div>

      {result && raceObj && classObj ? (
        <ResultBox $accent={synColor} $padding="22px 24px">
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
          <Stack $gap="7px" $mb="16px">
            {result.highlights.map((h, i) => (
              <HighlightRow key={i}>
                <HighlightBullet $color={synColor}>▸</HighlightBullet>
                <HighlightText>{h}</HighlightText>
              </HighlightRow>
            ))}
          </Stack>
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
