import React from 'react';
import { useUserContext } from 'contexts/UserContext';
import * as Styled from './KioskHeader.styled';

export default function KioskHeader() {
  const { user } = useUserContext();

  return (
    <Styled.HeaderContainer>
      <Styled.HeadingContainer>
        <h1>{user?.store.storeName}</h1>
        <h2>{user?.store.branchName}</h2>
      </Styled.HeadingContainer>
    </Styled.HeaderContainer>
  );
}
