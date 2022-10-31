import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';

export default function LoadingFallback() {
  return (
    <LoadingFallbackWrapper>
      <Icon icon="LoadingIcon" size={32} />
    </LoadingFallbackWrapper>
  );
}

const LoadingFallbackWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.primary};
`;
