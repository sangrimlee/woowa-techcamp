import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';

interface RejectedFallbackProps {
  errorMessage?: string;
  onRefresh?: () => void;
}

export default function RejectedFallback({ errorMessage, onRefresh }: RejectedFallbackProps) {
  const onClickRefreshButton = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <RejectedFallbackWrapper>
      <RejectedFallbackHeading>
        {errorMessage ? errorMessage : '일시적인 오류가 발생하였습니다.'}
      </RejectedFallbackHeading>
      <Button size="md" onClick={onClickRefreshButton}>
        새로고침
      </Button>
    </RejectedFallbackWrapper>
  );
}

const RejectedFallbackWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RejectedFallbackHeading = styled.strong`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.color.grey[700]};
  margin-bottom: 1rem;
`;
