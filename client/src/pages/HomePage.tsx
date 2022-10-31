import React from 'react';
import BottomNavigation from 'components/BottomNavigation/BottomNavigation';
import HomePageLayout from 'layouts/HomePageLayout';
import CreateArticleButton from 'components/common/CreateArticleButton';
import ArticleList from 'components/ArticleList';

export default function HomePage() {
  return (
    <HomePageLayout>
      <ArticleList />
      <BottomNavigation />
      <CreateArticleButton />
    </HomePageLayout>
  );
}
