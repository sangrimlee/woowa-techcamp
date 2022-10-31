import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import AuthLayout from 'layouts/AuthLayout';
import { GITHUB_SIGN_IN_URL, PAGE_URL } from 'constants/url.constant';

export default function SignInPage() {
  const navigate = useNavigate();

  const onClickGithubSignInButton = () => {
    window.location.href = GITHUB_SIGN_IN_URL;
  };
  return (
    <AuthLayout title="로그인">
      <AuthLayout.Title>
        안녕하세요! <br />
        다양한 방법으로 로그인해주세요.
      </AuthLayout.Title>
      <Button withIcon size="xl" variant="primary" onClick={() => navigate(PAGE_URL.EMAIL_SIGN_IN)}>
        <Icon icon="MailIcon" size={28} />
        이메일 로그인
      </Button>
      <Button withIcon size="xl" variant="github" onClick={onClickGithubSignInButton}>
        <Icon icon="GithubIcon" size={28} />
        GitHub 계정으로 로그인
      </Button>
    </AuthLayout>
  );
}
