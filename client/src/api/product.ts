import request from './request';
import { Category } from 'types';
import { API_URL } from 'constants/url.constant';

export async function requestGetAllCategories() {
  return request<undefined, Category[]>({
    url: API_URL.CATEGOREIS,
    method: 'GET',
  });
}
