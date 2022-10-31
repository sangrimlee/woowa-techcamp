import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';

export default function ArticleNotFoundFallback() {
  const navigate = useNavigate();

  return (
    <ArticleNotFoundWrapper>
      <ArticleNotFoundHeading>
        게시글이 이동되었거나
        <br />
        삭제되었습니다.
      </ArticleNotFoundHeading>
      <Button size="md" onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </ArticleNotFoundWrapper>
  );
}

const ArticleNotFoundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ArticleNotFoundHeading = styled.strong`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.color.grey[700]};
  margin-bottom: 1rem;
  text-align: center;
`;
