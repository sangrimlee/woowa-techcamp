import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

export const Input = styled.input<{ $isError?: boolean }>`
  ${({ $isError, theme }) => css`
    --shadow-color: ${$isError ? theme.colors.error : theme.colors.gray[200]};
    --focus-shadow-color: ${$isError ? theme.colors.error : theme.colors.primary};
  `}

  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 0.25rem;
  box-shadow: inset 0 0 0 1px var(--shadow-color);

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px var(--focus-shadow-color);
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`;
