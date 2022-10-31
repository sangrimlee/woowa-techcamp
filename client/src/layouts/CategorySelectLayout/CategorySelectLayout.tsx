import React from 'react';
import Header from 'components/common/Header';
import * as Styled from './CategorySelectLayout.styled';
import CategoryList from 'components/CategoryList';
import { useModalContext } from 'hooks/useModalContext';
import AsyncBoundary from 'components/boundary/AsyncBoundary';
import CategryListPendingFallback from 'components/boundary/CategryListPendingFallback';

export default function CategorySelectLayout() {
  const { modalState, setModalState } = useModalContext();

  return (
    <>
      <Header>
        <Header.Title>카테고리</Header.Title>
        <Header.IconButton
          icon="ChevronLeftIcon"
          onClick={() => setModalState({ ...modalState, categorySelect: false })}
        />
      </Header>
      <AsyncBoundary pendingFallback={<CategryListPendingFallback />}>
        <Styled.CategorySelectLayout>
          <CategoryList />
        </Styled.CategorySelectLayout>
      </AsyncBoundary>
    </>
  );
}
