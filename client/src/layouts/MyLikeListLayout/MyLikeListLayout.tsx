import React, { useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import Header from 'components/common/Header';
import Scrollable from 'components/common/Scrollable';
import * as Styled from './MyLikeListLayout.styled';
import { myLikeListQuery } from 'recoil/selectors/user.selector';
import ArticleItem from 'components/common/ArticleItem';
import AsyncBoundary from 'components/boundary/AsyncBoundary';
import ArticleListPendingFallback from 'components/boundary/ArticleListPendingFallback';

interface MyLikeListLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function MyLikeListLayout({ title, children }: MyLikeListLayoutProps) {
  return (
    <>
      <Header>
        <Header.Inner>
          <Styled.Title>{title}</Styled.Title>
        </Header.Inner>
      </Header>
      <Scrollable headerHeight="7rem">
        <AsyncBoundary pendingFallback={<ArticleListPendingFallback />}>
          <MyArticleList />
        </AsyncBoundary>
      </Scrollable>
      {children}
    </>
  );
}

function MyArticleList() {
  const myLikeList = useRecoilValue(myLikeListQuery);
  const refresh = useRecoilRefresher_UNSTABLE(myLikeListQuery);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <Styled.MyLikeListLayout>
      <ul>
        {myLikeList.map((article) => {
          return <ArticleItem key={article.id} article={article} />;
        })}
        {myLikeList.length === 0 && (
          <Styled.DisplayTextWrapper>좋아요 한 물건이 없어요 !</Styled.DisplayTextWrapper>
        )}
      </ul>
    </Styled.MyLikeListLayout>
  );
}
