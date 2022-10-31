import styled from 'styled-components';

export const RegionSearchLayout = styled.div`
  padding: 0rem 1rem;
  background-color: ${({ theme }) => theme.color.bg.front};
`;

export const SearchInput = styled.input`
  flex: 1;
  background-color: transparent;
  padding: 0.675rem 0.625rem;

  &:focus {
    outline: none;
  }
`;

export const ResultList = styled.ul`
  display: flex;
  flex-direction: column;
  text-align: left;

  & :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.grey[300]};
  }
`;

export const ResultItem = styled.li`
  padding: 1.125rem 0;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export const DisplayTextWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.grey[500]};
`;
