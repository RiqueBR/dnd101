import styled from 'styled-components';
import { fadeIn } from '../../styles/keyframes.js';
import { Surface } from './Card.jsx';
import { Label, StatBadge } from './Badge.jsx';
import { Stack } from './Grid.jsx';

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
  color: var(--text);
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
  color: var(--text);
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

export const SynergyBar = ({ score, color }) => (
  <SynergyBarWrap>
    {[1, 2, 3, 4, 5].map((i) => <SynergySegment key={i} $filled={i <= score} $color={color} />)}
  </SynergyBarWrap>
);

// Race + class synergy result: names, synergy meter, summary, highlights, and
// the race's stat bonuses. Shared by PairingSection and the Character Wizard's
// review step so both render the exact same pairing breakdown.
export const SynergyResult = ({ raceObj, classObj, result, synColor, synLabel }) => (
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
);
