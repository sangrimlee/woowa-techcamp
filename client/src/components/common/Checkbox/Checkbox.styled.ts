import styled from 'styled-components';

export const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  svg {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    padding: 0.125rem;
    color: transparent;
    border-radius: 0.25rem;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.color.grey[400]};
    background-color: transparent;
    transition: background-color 0.05s ease-in;
  }

  input:checked ~ svg {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary};
    box-shadow: none;
  }
`;
