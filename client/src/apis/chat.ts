import { API_URL } from 'constants/url.constant';
import { Chat } from 'types/chat';
import { query } from 'utils/api.util';

export async function requestGetMyChatList() {
  const data = await query<Chat[]>(API_URL.MY_CHATS);
  return data;
}
