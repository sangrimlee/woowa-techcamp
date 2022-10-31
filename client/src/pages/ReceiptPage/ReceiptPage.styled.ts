import styled from 'styled-components';
import { FADE_IN } from 'styles/keyframes';

export const ReceiptPageContainer = styled.main`
  width: 100%;
  height: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: 10rem 2.5rem;
  display: flex;
  flex-direction: column;
  animation: ${FADE_IN} 0.25s ease-in;
  overflow-y: auto;

  & > h1 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
  }

  & > h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
`;

export const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

export const OrderItem = styled.div`
  display: flex;
`;

export const OrderItemThumbnailContainer = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 0.25rem;
  margin-right: 2rem;
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const OrderItemContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > h3 {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  & > .order-choice {
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.gray[500]};
    margin-bottom: 0.25rem;
  }

  & > .order-count {
    font-size: 1.125rem;
  }
`;

export const OrderDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 0.5rem;
  margin-top: 3rem;
  font-size: 1.375rem;
`;

export const OrderFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  row-gap: 3rem;

  & > span {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`;
