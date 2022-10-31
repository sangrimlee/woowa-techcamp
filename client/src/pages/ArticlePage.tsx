import React from 'react';
import ArticleLayout from 'layouts/ArticleLayout';
import ArticleCarousel from 'components/article/Article/ArticleCarousel';
import ArticleDescription from 'components/article/Article/ArticleDescription';
import ArticleFooter from 'components/article/Article/ArticleFooter';
import AsyncBoundary from 'components/boundary/AsyncBoundary';
import ArticleRejectedFallback from 'components/boundary/ArticleRejectedFallback';
import ArticlePendingFallback from 'components/boundary/ArticlePendingFallback';

export default function ArticlePage() {
  return (
    <AsyncBoundary
      rejectedFallback={<ArticleRejectedFallback />}
      pendingFallback={<ArticlePendingFallback />}
    >
      <ArticleLayout>
        <ArticleCarousel />
        <ArticleDescription />
        <ArticleFooter />
      </ArticleLayout>
    </AsyncBoundary>
  );
}
