import React from 'react';
import * as Styled from './AuthInput.styled';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  errorMessage?: string;
}

export default function AuthInput({ id, label, errorMessage, ...inputProps }: AuthInputProps) {
  return (
    <Styled.Container>
      <Styled.Label htmlFor={id}>{label}</Styled.Label>
      <Styled.Input id={id} $isError={!!errorMessage} {...inputProps} />
      {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
    </Styled.Container>
  );
}
