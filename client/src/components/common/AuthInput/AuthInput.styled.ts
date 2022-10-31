import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  --input-shadow-color: ${({ theme, hasError }) =>
    hasError ? theme.color.error : theme.color.grey[300]};
  font-size: 1rem;
  padding: 0.875rem 1.125rem;
  border-radius: 0.5rem;
  box-shadow: inset 0 0 0 1px var(--input-shadow-color);
  background: none;
  outline: none;

  &:focus {
    --input-shadow-color: ${({ theme, hasError }) =>
      hasError ? theme.color.error : theme.color.grey[700]};
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 0.375rem;
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.error};
`;
