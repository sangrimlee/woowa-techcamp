import { selector } from 'recoil';
import { Chat } from 'types/chat';
import { requestGetMyChatList } from 'apis/chat';

export const myChatListValue = selector<Chat[]>({
  key: 'MyChatListValue',
  get: async () => {
    const data = await requestGetMyChatList();
    return data;
  },
});
