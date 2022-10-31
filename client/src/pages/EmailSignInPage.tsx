import React from 'react';
import AuthLayout from 'layouts/AuthLayout';
import SignInForm from 'components/form/EmailSignInForm';

export default function EmailSignInPage() {
  return (
    <AuthLayout title="이메일 로그인">
      <AuthLayout.Title>
        안녕하세요!
        <br />
        이메일 주소로 로그인해주세요.
      </AuthLayout.Title>
      <SignInForm />
    </AuthLayout>
  );
}
