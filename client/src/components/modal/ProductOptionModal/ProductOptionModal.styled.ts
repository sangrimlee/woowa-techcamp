import styled from 'styled-components';

export const ProductContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const ProductThumbnail = styled.div`
  width: 16rem;
  height: 16rem;
  margin-right: 2rem;
  border-radius: 0.25rem;
  overflow: hidden;

  & > img {
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  & > h2 {
    font-size: 1.375rem;
    margin-bottom: 0.25rem;
  }
  & > strong {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

export const ProductOptionName = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 0.5rem;
`;

export const OptionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  margin-top: 1rem;
`;

export const RadioOptionsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 0.75rem;
  row-gap: 1rem;
`;

export const CheckboxOptionsContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 1rem;
  margin-top: 6rem;
`;
