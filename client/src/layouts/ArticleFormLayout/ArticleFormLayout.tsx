import React from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import Header from 'components/common/Header';
import Scrollable from 'components/common/Scrollable';
import { ArticleSchema } from 'constants/schema.constant';
import * as Styled from './ArticleFormLayout.styled';

interface AritcleFormLayout {
  children?: React.ReactNode;
  title?: string;
  onSubmit: (data: ArticleSchema) => void | Promise<void>;
  onClose: () => void;
}

export default function AritcleFormLayout({
  title,
  children,
  onSubmit,
  onClose,
}: AritcleFormLayout) {
  const { handleSubmit } = useFormContext<ArticleSchema>();

  const createAlertMessage = (errors: FieldErrors<ArticleSchema>) => {
    const errorMessages = Object.values(errors).map(({ message }) => message ?? '');
    const alertMessage = Array.from(new Set<string>(errorMessages)).join('\n');
    return alertMessage;
  };

  const onError = (errors: FieldErrors<ArticleSchema>) => {
    const alertMessage = createAlertMessage(errors);
    alert(alertMessage);
  };

  return (
    <Styled.Form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off" noValidate>
      <Header>
        <Header.Background />
        <Header.Inner>
          <Header.IconButton type="button" icon="CloseOutlineIcon" onClick={onClose} />
        </Header.Inner>
        <Header.Title>{title}</Header.Title>
        <Header.Inner>
          <Styled.SubmitButton type="submit">확인</Styled.SubmitButton>
        </Header.Inner>
      </Header>
      <Scrollable>{children}</Scrollable>
    </Styled.Form>
  );
}
