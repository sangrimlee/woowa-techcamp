import styled from 'styled-components';

export const RegionSelectLayout = styled.div`
  padding: 1.125rem 1.25rem;
  padding-top: 2rem;
  text-align: center;
  background-color: ${({ theme }) => theme.color.bg.front};
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 1.375rem;
`;

export const DisplayTextWrapper = styled.div`
  margin: 0.5rem 0rem;
  text-align: center;
`;

export const DisplayText = styled.p`
  color: ${({ theme }) => theme.color.grey[500]};
`;

export const RegionWrapper = styled.div`
  margin-top: 2.125rem;
  display: flex;
  gap: 1rem;
`;

export const Region = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 2rem;
  padding: 1.5rem 1rem;
  font-size: 1.125rem;
  font-weight: 500;
  border-radius: 0.5rem;
  background-color: ${({ selected, theme }) => (selected ? theme.color.primary : 'transparent')};
  box-shadow: ${({ selected, theme }) =>
    `inset 0 0 0 1px ${selected ? 'transparent' : theme.color.grey[400]}`};
  color: ${({ selected, theme }) => (selected ? theme.color.white : theme.color.grey[400])};

  cursor: pointer;
`;

export const AddButton = styled(Region)`
  justify-content: center;
  background-color: transparent;
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.color.grey[400]};
  color: ${({ theme }) => theme.color.grey[400]};
  cursor: pointer;
`;
