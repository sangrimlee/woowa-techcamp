import styled from 'styled-components';
import Skeleton from 'components/common/Skeleton';

export const SkeletonWrapper = styled.div`
  height: 5.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  column-gap: 1rem;
`;

export const UserImageSkeleton = styled(Skeleton)`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 9999px;
`;

export const ThumbnailSkeleton = styled(Skeleton)`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 0.125rem;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TitleSkeleton = styled(Skeleton)`
  height: 1.25rem;
  width: 40%;
  margin-bottom: 0.5rem;
`;

export const MessageSkeleton = styled(Skeleton)`
  height: 1.375rem;
  width: 60%;
`;
