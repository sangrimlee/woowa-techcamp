import React from 'react';
import * as Styled from './Skeleton.styled';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Skeleton(props: SkeletonProps) {
  return <Styled.PulseSkeleton {...props} />;
}
