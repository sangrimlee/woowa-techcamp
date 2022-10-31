import React from 'react';
import { NavLink } from 'lib/router';
import { PAGE_URL } from 'constants/url.constant';
import * as Styled from './AdminPage.styled';

export default function AdminPage() {
  return (
    <Styled.MainContainer>
      <h1>지금은 준비중입니다.</h1>
      <NavLink href={PAGE_URL.STORE}>뒤로가기</NavLink>
    </Styled.MainContainer>
  );
}
