import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import Button from 'components/common/Button';
import GetStartedLayout from 'layouts/GetStartedLayout';
import { currentUserValue } from 'recoil/selectors/user.selector';
import { PAGE_URL } from 'constants/url.constant';
import useMutation from 'hooks/useMutation';
import { requestEmailSignIn } from 'apis/auth';

export default function GetStartedPage() {
  const navigate = useNavigate();
  const login = useRecoilRefresher_UNSTABLE(currentUserValue);
  const { mutate, isLoading } = useMutation(requestEmailSignIn, {
    onFailure: (error) => {
      alert(error);
    },
    onSuccess: () => {
      login();
      navigate(PAGE_URL.HOME);
    },
  });

  const signInTestUser = async () => {
    await mutate({
      email: 'test@test.com',
      password: 'testpassword1!',
    });
  };

  return (
    <GetStartedLayout>
      <SignInButtonWrapper>
        <Button
          size="xl"
          variant="default"
          fullWidth
          onClick={signInTestUser}
          isLoading={isLoading}
        >
          테스트 사용자로 시작하기
        </Button>
        <Button size="xl" fullWidth onClick={() => navigate(PAGE_URL.EMAIL_SIGN_UP)}>
          시작하기
        </Button>
      </SignInButtonWrapper>
      <SignInParagraph>
        이미 계정이 있나요?
        <Link to={PAGE_URL.SIGN_IN}>로그인</Link>
      </SignInParagraph>
    </GetStartedLayout>
  );
}

export const SignInParagraph = styled.p`
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.color.grey[600]};

  & > a {
    margin-left: 0.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.color.primary};
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SignInButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
