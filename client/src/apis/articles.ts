import { query } from 'utils/api.util';
import { API_URL } from 'constants/url.constant';
import { GetArticlesParam } from 'types/param';

export async function requestGetArticles(params: GetArticlesParam) {
  const data = await query(API_URL.ARTICLES({ ...params }));
  return data;
}
