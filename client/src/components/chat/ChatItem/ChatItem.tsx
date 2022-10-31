import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserValue } from 'recoil/selectors/user.selector';
import { Chat } from 'types/chat';
import { elapsedTime } from 'utils/date.util';
import * as Styled from './ChatItem.styled';

interface ChatItemProps {
  chat: Chat;
}

export default function ChatItem({ chat }: ChatItemProps) {
  const { user } = useRecoilValue(currentUserValue);

  const sender = useMemo(
    () => (user?.id === chat.buyer.id ? chat.article.seller : chat.buyer),
    [user?.id, chat]
  );

  return (
    <Styled.ChatItemWrapper>
      <Styled.UserImageWrapper>
        <img
          src="https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_80-0443429487fdc2277fc8f9dd1eca6fb8b678862f593e21222ba9f6592b99ad14.png"
          alt={`${sender.username}님의 프로필 이미지`}
        />
      </Styled.UserImageWrapper>
      <Styled.ContentWrapper>
        <Styled.ChatInfoWrapper>
          <strong>{sender.username}</strong>
          <span>
            {' ∙ '}
            {elapsedTime(chat.updatedAt)}
          </span>
        </Styled.ChatInfoWrapper>
        <Styled.LastMessagge $isEmpty={!chat.lastMessage}>
          {chat.lastMessage ?? '메시지가 없습니다.'}
        </Styled.LastMessagge>
      </Styled.ContentWrapper>
      <Styled.ArticleImageWrapper>
        <img src={chat.article.thumbnail} alt={`${chat.article.title}의 썸네일`} />
      </Styled.ArticleImageWrapper>
    </Styled.ChatItemWrapper>
  );
}
