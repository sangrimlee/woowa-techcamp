import React from 'react';
import MyChatList from 'components/chat/MyChatList';
import MyChatPageLayout from 'layouts/MyChatPageLayout';
import AsyncBoundary from 'components/boundary/AsyncBoundary';
import ChatListPendingFallback from 'components/boundary/ChatListPendingFallback';

export default function ChatPage() {
  return (
    <MyChatPageLayout>
      <AsyncBoundary pendingFallback={<ChatListPendingFallback />}>
        <MyChatList />
      </AsyncBoundary>
    </MyChatPageLayout>
  );
}
