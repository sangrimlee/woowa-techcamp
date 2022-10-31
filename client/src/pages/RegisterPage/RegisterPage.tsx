import React from 'react';
import { css } from 'styled-components';
import useForm from 'hooks/useForm';
import AuthLayout from 'layouts/AuthLayout';
import AuthInput from 'components/common/AuthInput';
import { RegisterData, requestRegister } from 'api/auth';
import { RegisterValidation } from 'constants/validation.constant';
import { useRouter } from 'lib/router';
import { PAGE_URL } from 'constants/url.constant';
import Button from 'components/common/Button';

export default function RegisterPage() {
  const { navigate } = useRouter();
  const { errors, handleChange, handleSubmit } = useForm<RegisterData>({
    validations: RegisterValidation,
  });

  const onSubmit = async (data: RegisterData) => {
    const { ok } = await requestRegister(data);
    if (ok) {
      navigate(PAGE_URL.LOGIN);
    }
  };

  return (
    <AuthLayout
      title="회원가입"
      footer={{ description: '계정이 있으신가요?', label: '로그인', href: PAGE_URL.LOGIN }}
    >
      <AuthLayout.Form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          id="name"
          label="이름"
          name="name"
          type="text"
          placeholder="예) 홍길동"
          onChange={handleChange('name')}
          errorMessage={errors.name}
          autoFocus
        />
        <AuthInput
          id="store-name"
          label="매장명"
          name="storeName"
          type="text"
          placeholder="예) 매머드커피"
          onChange={handleChange('storeName')}
          errorMessage={errors.storeName}
        />
        <AuthInput
          id="branch-name"
          label="점포명"
          name="branchName"
          type="text"
          placeholder="예) 잠실루터회관점"
          onChange={handleChange('branchName')}
          errorMessage={errors.branchName}
        />
        <AuthInput
          id="email"
          label="이메일"
          name="email"
          type="email"
          placeholder="예) example@woowa.com"
          onChange={handleChange('email')}
          errorMessage={errors.email}
        />
        <AuthInput
          id="password"
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          onChange={handleChange('password')}
          errorMessage={errors.password}
        />
        <Button
          type="submit"
          css={css`
            margin-top: 1.5rem;
          `}
          fullWidth
        >
          회원가입
        </Button>
      </AuthLayout.Form>
    </AuthLayout>
  );
}
