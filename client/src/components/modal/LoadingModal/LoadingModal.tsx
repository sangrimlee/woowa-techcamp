import Icon from 'components/common/Icon';
import React from 'react';
import Portal from '../Portal';
import * as Styled from './LoadingModal.styled';

export default function LoadingModal() {
  return (
    <Portal>
      <Styled.Container>
        <Styled.InnerContainer>
          <h4>
            결제 진행중입니다.
            <br />
            잠시만 기다려주세요.
          </h4>
          <Icon icon="LoadingIcon" size="92" />
        </Styled.InnerContainer>
      </Styled.Container>
    </Portal>
  );
}
