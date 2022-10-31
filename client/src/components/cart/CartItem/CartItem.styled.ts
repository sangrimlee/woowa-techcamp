import styled from 'styled-components';
import { SLIDE_UP } from 'styles/keyframes';

export const Container = styled.div`
  position: relative;
  display: flex;

  animation: ${SLIDE_UP} 0.15s ease-in;
`;

export const ThumbnailContainer = styled.div`
  width: 7rem;
  height: 7rem;
  flex-shrink: 0;
  margin-right: 0.75rem;
  border-radius: 0.25rem;
  overflow: hidden;

  & > img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.125rem 1.5rem 0.125rem 0;
  row-gap: 0.125rem;

  & > h3 {
    font-size: 1rem;
  }
  & > span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray[500]};
  }
  & > strong {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0rem;
  padding: 0.25rem;
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.gray[700]};
  &:hover {
    color: ${({ theme }) => theme.colors.error};
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;
