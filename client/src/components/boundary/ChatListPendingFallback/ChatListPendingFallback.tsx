import React from 'react';
import * as Styled from './ChatListPending.styled';

export default function ChatListPendingFallback() {
  return (
    <>
      <ChatItemSkeleton />
      <ChatItemSkeleton />
      <ChatItemSkeleton />
    </>
  );
}

function ChatItemSkeleton() {
  return (
    <Styled.SkeletonWrapper>
      <Styled.UserImageSkeleton />
      <Styled.ContentWrapper>
        <Styled.TitleSkeleton />
        <Styled.MessageSkeleton />
      </Styled.ContentWrapper>
      <Styled.ThumbnailSkeleton />
    </Styled.SkeletonWrapper>
  );
}
