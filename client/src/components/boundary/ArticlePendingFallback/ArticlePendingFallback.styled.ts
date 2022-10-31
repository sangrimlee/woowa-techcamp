import styled, { keyframes } from 'styled-components';
import { getRandomValue } from 'utils/random.util';

const skeletonAnimation = (start: number, end: number) => keyframes`
  from {
    transform: scaleX(${start});
    opacity: 0.95;
  }
  50%{
    transform: scaleX(${end});
    opacity: 1;
  }
  to{
    transform: scaleX(${start});
    opacity: 0.95;
  }
`;

const createRandomSkeletonAnimation = () => {
  const start = getRandomValue(0.3, 0.7);
  const end = Math.random() < 0.5 ? start + 0.1 : start - 0.1;
  return skeletonAnimation(start, end);
};

export const ThumbnailSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.color.grey[200]};
`;

export const TitleSkeleton = styled.div`
  height: 1.75rem;

  margin: 1.5rem 1rem 0.5rem;

  animation-name: ${createRandomSkeletonAnimation()};
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  background-color: ${({ theme }) => theme.color.grey[200]};
  transform-origin: left;
`;

export const CategorySkeleton = styled(TitleSkeleton)`
  height: 1rem;
  margin: 0 1rem 1rem;
  animation-name: ${createRandomSkeletonAnimation()};
`;

export const FirstContentSkeleton = styled(TitleSkeleton)`
  height: 2rem;
  margin: 0 1rem 0.5rem;
  animation-name: ${createRandomSkeletonAnimation()};
`;

export const SecondContentSkeleton = styled(FirstContentSkeleton)`
  margin: 0 1rem 1.25rem;
  animation-name: ${createRandomSkeletonAnimation()};
`;

export const CountSkeleton = styled(CategorySkeleton)`
  margin: 0 1rem;
  animation-name: ${createRandomSkeletonAnimation()};
`;
