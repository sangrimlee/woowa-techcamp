import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 1.5rem;
  padding: 1rem 0;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  row-gap: 0.5rem;

  margin-top: 1rem;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

export const FooterContainer = styled.div`
  display: flex;
  column-gap: 2rem;
  margin-top: 3rem;
`;
