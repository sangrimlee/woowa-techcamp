import React from 'react';
import { NavLink } from 'lib/router';
import { PAGE_URL } from 'constants/url.constant';
import * as Styled from './StorePage.styled';
import { useUserContext } from 'contexts/UserContext';

export default function StorePage() {
  const { logout } = useUserContext();

  return (
    <Styled.StorePageContainer>
      <NavLink href={PAGE_URL.ADMIN}>가게 관리하기</NavLink>
      <NavLink href={PAGE_URL.WELCOME}>가게 오픈하기</NavLink>
      <button onClick={logout}>로그아웃</button>
    </Styled.StorePageContainer>
  );
}
