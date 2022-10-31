import request from './request';
import { UserData } from 'types';
import { API_URL } from 'constants/url.constant';

export async function requestGetMyProfile() {
  return request<undefined, UserData>({
    url: API_URL.MY_PROFILE,
    method: 'GET',
  });
}
