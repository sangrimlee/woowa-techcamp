import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';

export default function PendingFallback() {
  return (
    <PendingFallbackWrapper>
      <Icon icon="LogoIcon" size={144} />
      <Icon icon="LoadingIcon" size={32} />
    </PendingFallbackWrapper>
  );
}

export const PendingFallbackWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  color: ${({ theme }) => theme.color.primary};
`;
