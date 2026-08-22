import styled from 'styled-components';

const HeaderWrap = styled.div`
  margin-bottom: 24px;
`;

const HeaderTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 4cqi, 1.375rem);
  font-weight: 700;
  color: var(--text);
  margin: 0;
  letter-spacing: 0.05em;
`;

const HeaderSubtitle = styled.p`
  font-size: 13px;
  color: var(--text-muted);
  margin: 6px 0 0;
  line-height: 1.6;
  max-width: 680px;
`;

const HeaderRule = styled.div`
  height: 1px;
  background: linear-gradient(to right, var(--accent), transparent);
  margin-top: 12px;
`;

export const SectionHeader = ({ title, subtitle }) => (
  <HeaderWrap>
    <HeaderTitle>{title}</HeaderTitle>
    <HeaderSubtitle>{subtitle}</HeaderSubtitle>
    <HeaderRule />
  </HeaderWrap>
);
