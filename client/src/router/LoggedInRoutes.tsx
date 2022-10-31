import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MyPage from 'pages/MyPage';
import MyChatPage from 'pages/MyChatPage';
import HomePage from 'pages/HomePage';
import LikeListPage from 'pages/LikeListPage';
import ArticlePage from 'pages/ArticlePage';
import WriteArticlePage from 'pages/WriteArticlePage';
import EditArticlePage from 'pages/EditArticlePage';
import MyArticleListPage from 'pages/MyArticleListPage';
import { PAGE_URL } from 'constants/url.constant';

export default function LoggedInRoutes() {
  return (
    <Routes>
      <Route path={PAGE_URL.HOME} element={<HomePage />} />
      <Route path={PAGE_URL.MY_PAGE} element={<MyPage />} />
      <Route path={PAGE_URL.MY_ARTICLES} element={<MyArticleListPage />} />
      <Route path={PAGE_URL.MY_CHATS} element={<MyChatPage />} />
      <Route path={PAGE_URL.MY_LIKES} element={<LikeListPage />} />
      <Route path={PAGE_URL.ARTICLE} element={<ArticlePage />} />
      <Route path={PAGE_URL.WRITE_ARTICLE} element={<WriteArticlePage />} />
      <Route path={PAGE_URL.EDIT_ARITCLE} element={<EditArticlePage />} />
      <Route path="*" element={<Navigate to={PAGE_URL.HOME} replace />} />
    </Routes>
  );
}
