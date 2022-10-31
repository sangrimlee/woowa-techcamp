import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from 'pages/SignInPage';
import GetStartedPage from 'pages/GetStartedPage';
import EmailSignInPage from 'pages/EmailSignInPage';

import EmailSignUpPage from 'pages/EmailSignUpPage';
import { PAGE_URL } from 'constants/url.constant';

export default function NotLoggedInRoutes() {
  return (
    <Routes>
      <Route path={PAGE_URL.GET_STARTED} element={<GetStartedPage />} />
      <Route path={PAGE_URL.SIGN_IN} element={<SignInPage />} />
      <Route path={PAGE_URL.EMAIL_SIGN_IN} element={<EmailSignInPage />} />
      <Route path={PAGE_URL.EMAIL_SIGN_UP} element={<EmailSignUpPage />} />
      <Route path="*" element={<Navigate to={PAGE_URL.GET_STARTED} replace />} />
    </Routes>
  );
}
