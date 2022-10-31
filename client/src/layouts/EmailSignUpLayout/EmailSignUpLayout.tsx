import React, { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/common/Header';
import * as Styled from './EmailSignUpLayout.styled';

interface EmailSignUpState {
  step: number;
  setNextStep: () => void;
  setPrevStep: () => void;
}

const EmailSignUpContext = createContext<EmailSignUpState | null>(null);

interface WithChildrenProps {
  children?: React.ReactNode;
}

function EmailSignUpProvider({ children }: WithChildrenProps) {
  const [step, setStep] = useState<number>(0);

  const setNextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, 2));
  }, []);

  const setPrevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <EmailSignUpContext.Provider value={{ step, setNextStep, setPrevStep }}>
      {children}
    </EmailSignUpContext.Provider>
  );
}

export function useEmailSignUpContext(component: string) {
  const context = useContext(EmailSignUpContext);
  if (!context) {
    throw new Error(`<${component} /> is not child component of <EmailSignUpProvider/>`);
  }
  return context;
}

export default function EmailSignUpLayout({ children }: WithChildrenProps) {
  return (
    <EmailSignUpProvider>
      <EmailSignUpHeader />
      <Indicator />
      <Slider>{children}</Slider>
    </EmailSignUpProvider>
  );
}

function Slider({ children }: WithChildrenProps) {
  const { step } = useEmailSignUpContext('Slider');
  return <Styled.Slider step={step}>{children}</Styled.Slider>;
}

function Indicator() {
  const { step } = useEmailSignUpContext('Indicator');

  return (
    <Styled.IndicatorWrapper>
      <Styled.StepIndicatorWrapper>
        <Styled.StepIndicator isActive={step === 0}>1. 이메일 입력</Styled.StepIndicator>
        <Styled.Indicator>
          <Styled.ActiveIndicator step={step} />
        </Styled.Indicator>
      </Styled.StepIndicatorWrapper>
      <Styled.StepIndicatorWrapper>
        <Styled.StepIndicator isActive={step === 1}>2. 정보 입력</Styled.StepIndicator>
        <Styled.Indicator />
      </Styled.StepIndicatorWrapper>
      <Styled.StepIndicatorWrapper>
        <Styled.StepIndicator isActive={step === 2}>3. 비밀번호 입력</Styled.StepIndicator>
        <Styled.Indicator />
      </Styled.StepIndicatorWrapper>
    </Styled.IndicatorWrapper>
  );
}

function EmailSignUpHeader() {
  const navigate = useNavigate();
  const { step, setPrevStep } = useEmailSignUpContext('EmailSignUpHeader');

  const handlePrevButton = () => {
    if (step === 0) {
      return navigate(-1);
    }
    setPrevStep();
  };

  return (
    <Header>
      <Header.Background />
      <Header.Inner>
        <Header.IconButton icon="ChevronLeftIcon" onClick={handlePrevButton} />
      </Header.Inner>
    </Header>
  );
}
