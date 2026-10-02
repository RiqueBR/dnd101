import styled from 'styled-components';
import { dieShapes } from '../../styles/tokens.js';

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
  color: ${(p) => (p.$color ? 'var(--text)' : 'var(--dice-color)')};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
`;

const DieLabel = styled.div`
  font-size: 10px;
  color: var(--text-muted);
  text-align: center;
  max-width: 90px;
  line-height: 1.3;
`;

export const Die = ({ sides, label, color }) => (
  <DieWrap>
    <DieShape $color={color} $shape={dieShapes[sides] || dieShapes[20]}>d{sides}</DieShape>
    {label && <DieLabel>{label}</DieLabel>}
  </DieWrap>
);
