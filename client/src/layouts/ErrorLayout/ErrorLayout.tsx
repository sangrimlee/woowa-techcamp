import React from 'react';
import Icon from 'components/common/Icon';
import * as Styled from './ErrorLayout.styled';
import Button from 'components/common/Button';

export default function ErrorLayout() {
  return (
    <Styled.MainWrapper>
      <Styled.IconWrapper>
        <Icon icon="LogoIcon" size={150} />
      </Styled.IconWrapper>
      <Styled.Title>서비스 이용에 불편을 드려 죄송합니다</Styled.Title>
      <Styled.ParagraphWrapper>
        <span>기술적인 문제가 발생한 것 같습니다</span>
        <span>서비스를 다시 이용해주세요</span>
        <Button
          fullWidth
          onClick={() => {
            window.location.reload();
          }}
        >
          새로고침
        </Button>
      </Styled.ParagraphWrapper>
    </Styled.MainWrapper>
  );
}
