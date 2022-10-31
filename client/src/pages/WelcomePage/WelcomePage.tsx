import React from 'react';
import { useRouter } from 'lib/router';
import { useUserContext } from 'contexts/UserContext';
import Icon from 'components/common/Icon';
import SquareButton from 'components/common/SquareButton';
import { PAGE_URL } from 'constants/url.constant';
import * as Styled from './WelcomePage.styled';

export default function WelcomePage() {
  const { navigate } = useRouter();
  const { user } = useUserContext();

  const onClick = () => {
    navigate(PAGE_URL.KIOSK);
  };

  if (!user) {
    return null;
  }

  return (
    <Styled.WelcomePageContainer>
      <Styled.BranchName>{user.store.branchName}</Styled.BranchName>
      <Styled.StoreName>
        {user.store.storeName}에 <br />
        오신 것을 환영합니다.
      </Styled.StoreName>
      <Styled.WelcomeButtonContainer>
        <SquareButton onClick={onClick}>
          <Icon icon="StoreIcon" size="64" />
          <span>매장 식사</span>
        </SquareButton>
        <SquareButton onClick={onClick}>
          <Icon icon="EatIcon" size="64" />
          <span>포장 주문</span>
        </SquareButton>
      </Styled.WelcomeButtonContainer>
    </Styled.WelcomePageContainer>
  );
}
