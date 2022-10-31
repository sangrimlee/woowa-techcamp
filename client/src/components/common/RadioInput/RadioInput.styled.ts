import styled from 'styled-components';

export const Label = styled.label`
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  padding: 0.5rem 2rem 0.625rem;
  border-radius: 9999px;

  font-size: 1.125rem;
  font-weight: 500;
  line-height: 2rem;

  color: ${({ theme }) => theme.colors.gray[700]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    opacity: 0.75;
  }

  input:checked + & {
    opacity: 1;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
