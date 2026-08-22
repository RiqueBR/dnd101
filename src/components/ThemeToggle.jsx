import styled from 'styled-components';

export const ThemeToggleButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--accent);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s;

  svg { width: 16px; height: 16px; }

  &:hover {
    border-color: var(--accent);
    background: var(--accent-subtle);
  }
`;

export const MobileThemeToggleButton = styled(ThemeToggleButton)`
  width: 40px;
  height: 40px;
  border-radius: 9px;

  svg { width: 18px; height: 18px; }
`;
