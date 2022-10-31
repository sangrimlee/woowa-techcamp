import { NavLink } from 'lib/router';
import React from 'react';
import * as Styled from './AuthLayout.styled';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  footer?: {
    description: string;
    label: string;
    href: string;
  };
}

function AuthLayout({ title, footer, children }: AuthLayoutProps) {
  return (
    <Styled.AuthLayoutContainer>
      <Styled.AuthLayoutInner>
        <Styled.AuthLayoutTitle>{title}</Styled.AuthLayoutTitle>
        {children}
        {footer && (
          <Styled.AuthLayoutFooter>
            {footer.description} <NavLink href={footer.href}>{footer.label}</NavLink>
          </Styled.AuthLayoutFooter>
        )}
      </Styled.AuthLayoutInner>
    </Styled.AuthLayoutContainer>
  );
}

AuthLayout.Form = Styled.AuthLayoutForm;

export default AuthLayout;
