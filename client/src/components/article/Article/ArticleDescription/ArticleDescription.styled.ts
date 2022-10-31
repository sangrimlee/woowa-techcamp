import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0 1rem 6rem;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
`;

export const Content = styled.p`
  padding: 1rem 0;
`;

export const CategoryWrapper = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.grey[500]};
`;

export const SellerWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey[200]};
  > p {
    font-weight: 700;
  }
`;

export const SellerProfileImage = styled.div`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 9999px;
  overflow: hidden;
  & > img {
    object-fit: cover;
  }
`;

export const SellerInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.125rem;
  strong {
  }

  span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.grey[500]};
  }
`;
