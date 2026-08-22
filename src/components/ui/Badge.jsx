import styled from 'styled-components';
import { difficultyColors } from '../../styles/tokens.js';

export const Label = styled.div`
  font-family: var(--font-heading);
  color: var(--accent);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 18px 0 8px;

  &:first-child {
    margin-top: 4px;
  }
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

// Generic pill: solid/tinted by $color when $solid, neutral outline otherwise.
export const Chip = styled.span`
  display: inline-block;
  padding: 2px 9px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  background: ${(p) => (p.$solid ? `${p.$color}22` : 'var(--surface2)')};
  color: ${(p) => (p.$solid ? p.$color : 'var(--text-muted)')};
  border: 1px solid ${(p) => (p.$solid ? `${p.$color}44` : 'var(--border)')};
`;

export const DifficultyBadge = ({ level }) => (
  <Chip $color={difficultyColors[level] || '#888'} $solid>{level}</Chip>
);

// Theme-accent-tinted pill, for badges that aren't tied to a content color
// (a class's primary ability, a race's best-class pairing, ...).
export const AccentChip = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-heading);
  white-space: nowrap;
`;
