import styled from 'styled-components';

// Responsive card/tile grid: fills as many `$min`-wide columns as fit, and
// collapses to a single column on its own without any breakpoint logic.
export const Grid = styled.div`
  container-type: inline-size;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${(p) => p.$min || '240px'}, 1fr));
  gap: ${(p) => p.$gap || '12px'};
  margin-bottom: ${(p) => p.$mb || 0};
`;

// Single-column stack of gapped items (Q&A cards, trait lists, etc.).
export const Stack = styled.div`
  display: grid;
  gap: ${(p) => p.$gap || '8px'};
  margin-bottom: ${(p) => p.$mb || 0};
`;
