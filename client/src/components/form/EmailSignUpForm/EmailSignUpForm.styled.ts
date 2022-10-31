import styled from 'styled-components';

export const FormSection = styled.section`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  padding: 1rem;
  transition: opacity 0.3s ease-in;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
`;

export const Heading = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const PasswordValidatorList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  padding: 1rem 0.5rem 0.25rem;
`;

export const PasswordValidatorItem = styled.li<{ isValid?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  column-gap: 0.5rem;

  color: ${({ isValid, theme }) => (isValid ? theme.color.primary : theme.color.grey[300])};
`;
