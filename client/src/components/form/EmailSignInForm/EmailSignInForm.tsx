import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import Button from 'components/common/Button';
import AuthInput from 'components/common/AuthInput';
import useMutation from 'hooks/useMutation';
import { requestEmailSignIn } from 'apis/auth';
import { currentUserValue } from 'recoil/selectors/user.selector';
import { EmailSignInSchema, EMAIL_SIGN_IN_SCHEMA } from 'constants/schema.constant';
import * as Styled from './EmailSignInForm.styled';

export default function EmailSignInForm() {
  const login = useRecoilRefresher_UNSTABLE(currentUserValue);
  const { mutate, isLoading } = useMutation<EmailSignInSchema>(requestEmailSignIn, {
    onFailure: (error) => {
      alert(error);
    },
    onSuccess: () => {
      login();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isValid, isDirty, errors },
  } = useForm<EmailSignInSchema>({
    mode: 'onChange',
    resolver: yupResolver(EMAIL_SIGN_IN_SCHEMA),
  });

  return (
    <Styled.Form onSubmit={handleSubmit(mutate)}>
      <AuthInput
        id="email"
        type="email"
        placeholder="이메일을 입력하세요."
        errorMessage={errors.email?.message}
        autoComplete="off"
        autoFocus
        {...register('email')}
      />
      <AuthInput
        id="password"
        type="password"
        placeholder="비밀번호를 입력하세요."
        errorMessage={errors.password?.message}
        autoComplete="off"
        {...register('password')}
      />
      <Button type="submit" size="xl" disabled={!isValid || !isDirty} isLoading={isLoading}>
        로그인
      </Button>
    </Styled.Form>
  );
}
