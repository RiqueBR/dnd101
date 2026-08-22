import styled from 'styled-components';

// Wraps into rows when there's room; becomes a horizontally-scrollable strip
// when its own container is too narrow to wrap comfortably.
export const PickerGroup = styled.div`
  container-type: inline-size;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @container (max-width: 420px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const PickerButton = styled.button`
  flex-shrink: 0;
  padding: 6px 13px;
  min-height: 32px;
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 12px;
  letter-spacing: 0.03em;
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
  background: ${(p) => (p.$active ? (p.$color ? `${p.$color}28` : 'var(--accent-subtle)') : 'var(--surface)')};
  border: 1.5px solid ${(p) => (p.$active ? (p.$color || 'var(--accent)') : 'var(--border)')};
  color: ${(p) => (p.$active ? (p.$color || 'var(--accent)') : 'var(--text-muted)')};
`;
