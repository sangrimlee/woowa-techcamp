import React from 'react';
import { getRandomValue } from 'utils/random.util';
import * as Styled from './ArticleCategoryPendingFallback.styled';

export default function ArticleCategoryPendingFallback() {
  return (
    <Styled.CategoryList>
      {new Array(7).fill(undefined).map((_, i) => (
        <Styled.CaetegoryItem key={i} style={{ width: `${getRandomValue(15, 25)}%` }} />
      ))}
    </Styled.CategoryList>
  );
}
