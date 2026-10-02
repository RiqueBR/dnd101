import styled from 'styled-components';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Surface } from '../ui/Card.jsx';

const ConstructionBox = styled(Surface)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 48px 24px;
  border-style: dashed;
`;

const ConstructionIcon = styled.div`
  font-size: 28px;
`;

const ConstructionTitle = styled.div`
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0.04em;
`;

const ConstructionDesc = styled.p`
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 420px;
  margin: 0;
`;

export const EncountersSection = () => (
  <div>
    <SectionHeader title="Encounters" subtitle="Tools for building and running combat encounters." />
    <ConstructionBox>
      <ConstructionIcon>🚧</ConstructionIcon>
      <ConstructionTitle>Under Construction</ConstructionTitle>
      <ConstructionDesc>This section is still being built. Check back soon for encounter-building tools.</ConstructionDesc>
    </ConstructionBox>
  </div>
);
