import styled from 'styled-components';

export const InputWrapper = styled.div`
  flex: 1;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;

  svg {
    color: ${({ theme }) => theme.color.grey[500]};
  }

  :focus-within {
    border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  }
  border-bottom: 1px solid ${({ theme }) => theme.color.grey[300]};
`;
export const SearchInput = styled.input`
  flex: 1;
  background-color: transparent;
  padding: 0.675rem 0.625rem;

  &:focus {
    outline: none;
  }
`;
