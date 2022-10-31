import React from 'react';
import * as Styled from './ArticleListPendingFallback.styled';

export default function ArticleListPendingFallback() {
  return (
    <>
      {new Array(3).fill(null).map((e, index) => (
        <Styled.ArticleSkeleton key={index}>
          <Styled.ImageSkeleton />
          <Styled.Wrapper>
            <Styled.TitleSkeleton />
            <Styled.ContentSkeleton />
          </Styled.Wrapper>
        </Styled.ArticleSkeleton>
      ))}
    </>
  );
}
