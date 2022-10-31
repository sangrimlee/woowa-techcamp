import React from 'react';
import { css } from 'styled-components';
import useForm from 'hooks/useForm';
import Button from 'components/common/Button';
import AuthLayout from 'layouts/AuthLayout';
import AuthInput from 'components/common/AuthInput';
import { LoginValidation } from 'constants/validation.constant';
import { LoginData, requestLogin } from 'api/auth';
import { useRouter } from 'lib/router';
import { useUserContext } from 'contexts/UserContext';
import { PAGE_URL } from 'constants/url.constant';
import * as Styled from './LoginPage.styled';

export default function LoginPage() {
  const { login } = useUserContext();
  const { navigate } = useRouter();
  const { errors, handleSubmit, handleChange } = useForm<LoginData>({
    validations: LoginValidation,
  });

  const onSubmit = async (data: LoginData) => {
    const { ok } = await requestLogin(data);
    if (ok) {
      await login();
      navigate(PAGE_URL.STORE);
    }
  };

  return (
    <AuthLayout
      title="로그인"
      footer={{ description: '계정이 없으신가요?', label: '회원가입', href: PAGE_URL.REGISTER }}
    >
      <AuthLayout.Form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          id="email"
          label="이메일"
          name="email"
          type="email"
          onChange={handleChange('email')}
          placeholder="예) example@woowa.com"
          errorMessage={errors.email}
          autoFocus
        />
        <AuthInput
          id="password"
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          onChange={handleChange('password')}
        />
        <Button
          type="submit"
          css={css`
            margin-top: 1.5rem;
          `}
          fullWidth
        >
          로그인
        </Button>
      </AuthLayout.Form>
      <Styled.TestUser>
        <h3>테스트 유저</h3>
        <p>testuser@woowa.com</p>
        <p>testpassword1!</p>
      </Styled.TestUser>
    </AuthLayout>
  );
}
