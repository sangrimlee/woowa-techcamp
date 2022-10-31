import React, { forwardRef } from 'react';
import * as Styled from './AuthInput.styled';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  hideErrorMessage?: boolean;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ errorMessage, hideErrorMessage, ...inputProps }, ref) => {
    return (
      <Styled.Wrapper>
        <Styled.Input hasError={!!errorMessage} ref={ref} {...inputProps} />
        {!hideErrorMessage && errorMessage && (
          <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
        )}
      </Styled.Wrapper>
    );
  }
);

AuthInput.displayName = 'AuthInput';

export default AuthInput;
