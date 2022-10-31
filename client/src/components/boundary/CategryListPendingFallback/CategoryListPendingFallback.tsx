import React from 'react';
import * as Styled from './CategoryListPendingFallback.styled';

export default function CategoryListPendingFallback() {
  return (
    <Styled.CategorySelectLayout>
      {new Array(9).fill(null).map((e, index) => (
        <Styled.CategorySkeleton key={index} />
      ))}
    </Styled.CategorySelectLayout>
  );
}
