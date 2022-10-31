import styled from 'styled-components';

export const CategorySelectorList = styled.ul`
  display: flex;
  column-gap: 0.5rem;
  margin: 0rem 0 1rem;
  padding: 0 1rem;

  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategorySelectorItem = styled.li`
  flex-shrink: 0;
  font-size: 0.875rem;
  line-height: 1.375rem;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.color.grey[400]};
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
  cursor: pointer;

  &.active {
    font-weight: 700;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary};
    box-shadow: none;
  }
`;
