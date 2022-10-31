import styled from 'styled-components';

export const Checkbox = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.gray[700]};
  background-color: ${({ theme }) => theme.colors.gray[100]};

  transition: all 0.15s ease-in-out;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
  border-radius: 9999px;

  cursor: pointer;
  transition: opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.75;
  }

  input:checked + & > ${Checkbox} {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
  }

  & > span {
    font-size: 1.125rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`;
