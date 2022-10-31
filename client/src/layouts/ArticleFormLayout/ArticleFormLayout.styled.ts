import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  height: 100%;
`;

export const SubmitButton = styled.button`
  padding: 0.25rem;
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.primary};
`;
