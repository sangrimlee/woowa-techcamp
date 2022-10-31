import { Article } from 'types/article';
import { User } from 'types/user';
import { query } from 'utils/api.util';
import { API_URL } from 'constants/url.constant';

export async function requestMyProfile() {
  const data = await query<User>(API_URL.MY_PROFILE);
  return data;
}

export async function requestMyArticles() {
  const data = await query<Article[]>(API_URL.MY_ARTICLES);
  return data;
}

export async function requestMyLikes() {
  const data = await query<Article[]>(API_URL.MY_LIKES);
  return data;
}
