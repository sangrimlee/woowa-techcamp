import styled from 'styled-components';
import { SKELETON } from 'styles/keyframes';

export const CategorySelectLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 1.125rem 0.5rem;
  background-color: ${({ theme }) => theme.color.bg.front};
`;

export const CategorySkeleton = styled.div`
  width: 7rem;
  height: 7rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  border-radius: 0.5rem;

  box-shadow: 0 0 0 1px ${({ theme }) => theme.color.grey[200]};
  animation: ${SKELETON} 1s ease-in-out infinite;
  background-color: ${({ theme }) => theme.color.grey[200]};
`;
