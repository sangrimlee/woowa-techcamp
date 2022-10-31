import request from './request';
import { API_URL } from 'constants/url.constant';

export interface LoginData {
  email: string;
  password: string;
}

export async function requestLogin(loginData: LoginData) {
  return request<LoginData>({
    url: API_URL.LOGIN,
    method: 'POST',
    data: loginData,
  });
}

export async function requestLogout() {
  return request({
    url: API_URL.LOGOUT,
    method: 'POST',
  });
}

export interface RegisterData extends LoginData {
  name: string;
  storeName: string;
  branchName: string;
}

export async function requestRegister(registerData: RegisterData) {
  return request<RegisterData>({
    url: API_URL.REGISTER,
    method: 'POST',
    data: registerData,
  });
}
