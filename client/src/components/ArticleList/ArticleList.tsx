import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  articlesPageState,
  articlesQuery,
  articlesState,
} from 'recoil/selectors/articles.selector';
import * as Styled from './ArticleList.styled';
import ArticleItem from 'components/common/ArticleItem/ArticleItem';
import { useInfinityScroll } from 'hooks/useInfinityScroll';
import AsyncBoundary from 'components/boundary/AsyncBoundary';
import ArticleListPendingFallback from 'components/boundary/ArticleListPendingFallback';

export default function ArticleList() {
  const { articles } = useRecoilValue(articlesState);

  return (
    <>
      <Styled.ArticleList>
        {articles.map((article) => {
          return <ArticleItem key={article.id} article={article} />;
        })}
      </Styled.ArticleList>
      <AsyncBoundary pendingFallback={<ArticleListPendingFallback />}>
        <>
          {articles.length === 0 && (
            <Styled.DisplayTextWrapper>게시된 물건이 없어요 !</Styled.DisplayTextWrapper>
          )}
        </>
        <ArticleListLoader />
      </AsyncBoundary>
    </>
  );
}

function ArticleListLoader() {
  const articleQuery = useRecoilValue(articlesQuery);
  const [{ articles, totalCount }, setArticles] = useRecoilState(articlesState);
  const [page, setPage] = useRecoilState(articlesPageState);

  const { observe, unobserve } = useInfinityScroll(() => onIntersect());
  const target = useRef<HTMLDivElement>(null);

  const onIntersect = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!target.current) return;
    observe(target.current);
  }, [observe]);

  useEffect(() => {
    if (totalCount === articles.length) {
      if (!target.current) return;
      unobserve(target.current);
    }
  }, [unobserve, articles, totalCount]);

  useEffect(() => {
    return () => {
      setPage(1);
      setArticles({
        articles: [],
        totalCount: 0,
      });
    };
  }, [setArticles, setPage]);

  useEffect(() => {
    setArticles({
      articles: [...articles, ...articleQuery.articles],
      totalCount: articleQuery.totalCount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleQuery]);

  return <div ref={target} style={{ height: '1rem' }}></div>;
}
