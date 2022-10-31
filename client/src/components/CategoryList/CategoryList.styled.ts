import styled from 'styled-components';

export const CategoryList = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const CategoryItem = styled.li<{ $selected: boolean }>`
  width: 7rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1.125rem;
  font-size: 0.875rem;
  margin: 0.5rem 1rem;
  border-radius: 0.5rem;

  img {
    width: 4rem;
    height: 4rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.grey[200]};
  }

  background-color: ${({ $selected, theme }) =>
    $selected ? theme.color.grey[200] : 'transparent'};

  cursor: pointer;
`;
