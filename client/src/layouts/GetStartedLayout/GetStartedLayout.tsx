import Icon from 'components/common/Icon';
import React from 'react';
import * as Styled from './GetStartedLayout.styled';

interface GetStartedLayoutProps {
  children?: React.ReactNode;
}

export default function GetStartedLayout({ children }: GetStartedLayoutProps) {
  return (
    <Styled.MainWrapper>
      <Styled.WelcomeWrapper>
        <Icon icon="LogoIcon" size={144} />
        <h1>우리 함께 무우마켓</h1>
        <p>
          무엇이든, 우리 함께 나누어요.
          <br />
          지금 내 동네에서 같이 시작해보아요!
        </p>
      </Styled.WelcomeWrapper>
      {children}
    </Styled.MainWrapper>
  );
}
