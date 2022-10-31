import styled from 'styled-components';
import { SKELETON } from 'styles/keyframes';

export const CategorySelectLayout = styled.div`
  padding: 1.125rem 0.5rem;
  background-color: ${({ theme }) => theme.color.bg.front};
`;

export const CategorySkeleton = styled.div`
  width: 8rem;
  height: 7rem;

  box-shadow: 0 0 0 1px ${({ theme }) => theme.color.grey[200]};
  animation: ${SKELETON} 1s ease-in-out infinite;
  background-color: ${({ theme }) => theme.color.grey[200]};
`;
