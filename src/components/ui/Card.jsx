import styled, { css } from 'styled-components';

// Generic surface: the shared background/border/radius every content box in
// the app sits on (info boxes, list rows, detail panels, clickable cards).
export const Surface = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: ${(p) => p.$padding || '14px 16px'};
  ${(p) => p.$accent && css`
    border-${p.$side || 'top'}: 3px solid ${p.$accent};
  `}
`;

// Clickable, selectable variant used for race/class cards and similar list items.
export const Card = styled(Surface)`
  container-type: inline-size;
  cursor: pointer;
  transition: all 0.2s ease;
  border-color: ${(p) => (p.$selected ? 'var(--accent)' : 'var(--border)')};
  border-${(p) => p.$side || 'top'}-color: ${(p) => (p.$selected ? 'var(--accent)' : p.$accent)};

  &:hover {
    border-color: ${(p) => (p.$selected ? 'var(--accent)' : 'var(--border-hover)')};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${(p) => p.$accent}1a;
  }
`;

export const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 10px;
`;

export const CardTitle = styled.div`
  font-size: clamp(0.875rem, 3cqi, 0.9375rem);
  font-weight: 700;
  font-family: var(--font-heading);
  color: var(--text);
  letter-spacing: 0.04em;
`;

export const CardTagline = styled.div`
  font-size: 0.6875rem;
  color: var(--text-muted);
  margin-top: 2px;
  font-style: italic;
`;

export const IconBadge = styled.div`
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
  font-size: 13px;
  color: ${(p) => p.$color};
  flex-shrink: 0;
`;
