import React from 'react';
import styled from 'styled-components';

interface ScrollableProps {
  children?: React.ReactNode;
  headerHeight?: string;
}

export default function Scrollable({ children, headerHeight = '3.5rem' }: ScrollableProps) {
  return (
    <ScrollableWrapper className="scrollable" $headerHeight={headerHeight}>
      {children}
    </ScrollableWrapper>
  );
}

const ScrollableWrapper = styled.main<{ $headerHeight: string }>`
  height: calc(100% - ${({ $headerHeight }) => $headerHeight});
  overflow-y: auto;
  overflow-x: hidden;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
