import React from 'react';
import * as Styled from './ArticlePendingFallback.styled';

export default function ArticlePendingFallback() {
  return (
    <div>
      <Styled.ThumbnailSkeleton />
      <Styled.TitleSkeleton />
      <Styled.CategorySkeleton />
      <Styled.FirstContentSkeleton />
      <Styled.SecondContentSkeleton />
      <Styled.CategorySkeleton />
    </div>
  );
}
