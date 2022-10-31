import React from 'react';
import Header from 'components/common/Header';
import { AuthLayoutWrapper, AuthLayoutTitle } from './AuthLayout.styled';

interface SignInLayoutProps {
  title?: string;
  children?: React.ReactNode;
}

function AuthLayout({ title, children }: SignInLayoutProps) {
  return (
    <>
      <Header>
        <Header.Background />
        <Header.Inner>
          <Header.BackwardButton />
        </Header.Inner>
        <Header.Title>{title}</Header.Title>
      </Header>
      <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
    </>
  );
}

export default Object.assign(AuthLayout, {
  Title: AuthLayoutTitle,
});
