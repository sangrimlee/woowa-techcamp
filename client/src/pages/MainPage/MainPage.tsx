import React from 'react';
import { PAGE_URL } from 'constants/url.constant';
import { useUserContext } from 'contexts/UserContext';
import * as Styled from './MainPage.styled';

export default function MainPage() {
  const { isLoggedIn } = useUserContext();
  return (
    <Styled.MainPageContainer>
      <Styled.Title>
        우리 가게에 맞는 <br />
        <strong>서비스</strong>를 시작해보세요.
      </Styled.Title>
      <Styled.GetStarted href={isLoggedIn ? PAGE_URL.STORE : PAGE_URL.LOGIN}>
        지금 시작하기
      </Styled.GetStarted>
    </Styled.MainPageContainer>
  );
}
