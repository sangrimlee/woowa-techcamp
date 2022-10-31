import React from 'react';
import { Router, Routes, Route } from './lib/router';
import { useUserContext } from 'contexts/UserContext';
import { PAGE_URL } from 'constants/url.constant';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import StorePage from 'pages/StorePage';
import WelcomePage from 'pages/WelcomePage';
import KioskPage from 'pages/KioskPage';
import RecieptPage from 'pages/ReceiptPage';
import AdminPage from 'pages/AdminPage';
import LandingPage from 'pages/LandingPage';

export default function App() {
  const { isLoading, isLoggedIn } = useUserContext();

  if (isLoading) {
    return <LandingPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path={PAGE_URL.MAIN}>
          <MainPage />
        </Route>
        <Route path={PAGE_URL.LOGIN}>{!isLoggedIn && <LoginPage />}</Route>
        <Route path={PAGE_URL.REGISTER}>{!isLoggedIn && <RegisterPage />}</Route>
        <Route path={PAGE_URL.STORE}>{isLoggedIn && <StorePage />}</Route>
        <Route path={PAGE_URL.WELCOME}>{isLoggedIn && <WelcomePage />}</Route>
        <Route path={PAGE_URL.KIOSK}>{isLoggedIn && <KioskPage />}</Route>
        <Route path={PAGE_URL.RECEIPT}>{isLoggedIn && <RecieptPage />}</Route>
        <Route path={PAGE_URL.ADMIN}>{isLoggedIn && <AdminPage />}</Route>
      </Routes>
    </Router>
  );
}
