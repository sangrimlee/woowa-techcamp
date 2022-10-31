import React, { useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { myChatListValue } from 'recoil/selectors/chat.selector';
import ChatItem from '../ChatItem';

export default function MyChatList() {
  const myChatList = useRecoilValue(myChatListValue);
  const refresh = useRecoilRefresher_UNSTABLE(myChatListValue);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ul>
      {myChatList.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </ul>
  );
}
