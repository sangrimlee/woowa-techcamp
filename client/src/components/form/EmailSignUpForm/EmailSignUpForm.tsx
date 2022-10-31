import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import AuthInput from 'components/common/AuthInput';
import useMutation from 'hooks/useMutation';
import { currentUserState } from 'recoil/atoms/user.atom';
import { useEmailSignUpContext } from 'layouts/EmailSignUpLayout';
import { requestEmailSignUp, requestIsEmailAvailable } from 'apis/auth';
import { PASSOWRD_REGEX_LIST } from 'constants/regex.constant';
import { EmailSignUpSchema, EMAIL_SIGN_UP_SCHEMA } from 'constants/schema.constant';
import * as Styled from './EmailSignUpForm.styled';

function EmailForm() {
  const {
    register,
    getValues,
    formState: { errors, dirtyFields },
  } = useFormContext<EmailSignUpSchema>();
  const { setNextStep } = useEmailSignUpContext('EmailForm');

  const isEmailValid = useMemo(
    () => !errors.email?.message && dirtyFields.email,
    [errors.email, dirtyFields]
  );

  const onRequestIsEmailAvailable = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { isAvailable } = await requestIsEmailAvailable(getValues('email'));
      if (isAvailable) {
        setNextStep();
      } else {
        alert('이미 존재하는 이메일입니다.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생하였습니다.');
    }
  };

  return (
    <Styled.FormSection>
      <Styled.Heading>이메일을 입력해주세요.</Styled.Heading>
      <Styled.FormWrapper onSubmit={onRequestIsEmailAvailable}>
        <AuthInput
          type="email"
          placeholder="이메일"
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" disabled={!isEmailValid}>
          이메일 인증
        </Button>
      </Styled.FormWrapper>
    </Styled.FormSection>
  );
}

function UsernameForm() {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext<EmailSignUpSchema>();
  const { setNextStep } = useEmailSignUpContext('UsernameForm');

  const isUsernameValid = useMemo(
    () => !errors.username?.message && dirtyFields.username,
    [errors.username, dirtyFields]
  );

  const onNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNextStep();
  };

  return (
    <Styled.FormSection>
      <Styled.Heading>이름을 입력해주세요.</Styled.Heading>
      <Styled.FormWrapper onSubmit={onNext}>
        <AuthInput
          type="text"
          placeholder="이름"
          errorMessage={errors.username?.message}
          {...register('username')}
        />
        <Button type="submit" onClick={setNextStep} disabled={!isUsernameValid}>
          다음으로
        </Button>
      </Styled.FormWrapper>
    </Styled.FormSection>
  );
}

function PasswordForm() {
  const navigate = useNavigate();
  const login = useRecoilRefresher_UNSTABLE(currentUserState);
  const { isLoading, mutate } = useMutation(requestEmailSignUp, {
    onFailure: (error) => {
      alert(error);
    },
    onSuccess: () => {
      login();
      navigate('/', { replace: true });
    },
  });
  const {
    register,
    getValues,
    formState: { isValid, isDirty, errors },
  } = useFormContext<EmailSignUpSchema>();

  const onRequestEmailSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, username } = getValues();
    await mutate({ email, password, username });
  };

  return (
    <Styled.FormSection>
      <Styled.Heading>비밀번호를 입력해주세요.</Styled.Heading>
      <Styled.FormWrapper onSubmit={onRequestEmailSignUp}>
        <div>
          <AuthInput
            type="password"
            placeholder="비밀번호"
            errorMessage={errors.password?.message}
            hideErrorMessage
            {...register('password')}
          />
          <PasswordValidator />
        </div>
        <AuthInput
          type="password"
          placeholder="비밀번호 확인"
          errorMessage={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" disabled={!isValid || !isDirty} isLoading={isLoading}>
          회원가입
        </Button>
      </Styled.FormWrapper>
    </Styled.FormSection>
  );
}

function PasswordValidator() {
  const { watch } = useFormContext<EmailSignUpSchema>();

  return (
    <Styled.PasswordValidatorList>
      {PASSOWRD_REGEX_LIST.map(({ regex, label }) => (
        <Styled.PasswordValidatorItem
          key={`password-validator-${label}`}
          isValid={regex.test(watch('password', ''))}
        >
          <Icon icon="CheckIcon" size={16} />
          <span>{label}</span>
        </Styled.PasswordValidatorItem>
      ))}
    </Styled.PasswordValidatorList>
  );
}

export default function EmailSignUpForm() {
  const methods = useForm<EmailSignUpSchema>({
    mode: 'onChange',
    resolver: yupResolver(EMAIL_SIGN_UP_SCHEMA),
  });

  return (
    <FormProvider {...methods}>
      <EmailForm />
      <UsernameForm />
      <PasswordForm />
    </FormProvider>
  );
}
