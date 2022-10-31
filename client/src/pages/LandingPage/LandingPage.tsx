import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';

export default function LandingPage() {
  return (
    <Container>
      <Icon icon="LoadingIcon" size="64" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
