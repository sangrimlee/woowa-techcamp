import React from 'react';
import BottomNavigation from 'components/BottomNavigation/BottomNavigation';
import MyLikeListLayout from 'layouts/MyLikeListLayout/MyLikeListLayout';

export default function LikeListPage() {
  return (
    <MyLikeListLayout title="관심목록">
      <BottomNavigation />
    </MyLikeListLayout>
  );
}
