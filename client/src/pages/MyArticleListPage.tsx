import React from 'react';
import BottomNavigation from 'components/BottomNavigation/BottomNavigation';
import MyArticleListLayout from 'layouts/MyArticleListLayout';

export default function MyArticleListPage() {
  return (
    <MyArticleListLayout title="판매목록">
      <BottomNavigation />
    </MyArticleListLayout>
  );
}
