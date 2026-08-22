import styled from 'styled-components';
import { fadeIn } from '../../styles/keyframes.js';
import { Surface } from './Card.jsx';

const DetailWrap = styled(Surface)`
  container-type: inline-size;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.25s ease;
`;

const DetailHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;

const DetailTitle = styled.h2`
  margin: 0;
  font-family: var(--font-heading);
  color: var(--text);
  font-size: clamp(1.125rem, 4cqi, 1.25rem);
`;

const DetailTagline = styled.p`
  margin: 4px 0 0;
  color: var(--text-muted);
  font-style: italic;
  font-size: 13px;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text-muted);
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 12px;
  font-family: var(--font-heading);
`;

const DetailDescription = styled.p`
  color: var(--text);
  line-height: 1.7;
  font-size: 13px;
  margin-bottom: 16px;
`;

// Shared inline "expand above the grid" detail shell for any selectable card
// (race, class, ...). Body content is section-specific and passed as children.
export const DetailPanel = ({ title, tagline, color, description, onClose, children }) => (
  <DetailWrap $accent={color} $padding="clamp(16px, 4cqi, 24px)">
    <DetailHeaderRow>
      <div>
        <DetailTitle>{title}</DetailTitle>
        {tagline && <DetailTagline>{tagline}</DetailTagline>}
      </div>
      <CloseButton onClick={onClose}>✕ Close</CloseButton>
    </DetailHeaderRow>
    {description && <DetailDescription>{description}</DetailDescription>}
    {children}
  </DetailWrap>
);
