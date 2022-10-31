import { GetArticlesParam } from 'types/param';
import { getURLParams } from 'utils/api.util';

export const PAGE_URL = {
  HOME: '/',
  GET_STARTED: '/get-started',
  SIGN_IN: '/auth/sign-in',
  EMAIL_SIGN_IN: '/auth/sign-in/email',
  EMAIL_SIGN_UP: '/auth/sign-up',
  MY_PAGE: '/mypage',
  MY_LIKES: '/mypage/liked',
  MY_ARTICLES: '/mypage/articles',
  MY_CHATS: '/mypage/chats',
  ARTICLE: '/articles/:id',
  ARTICLE_BY_ID: (id: string | number) => `/articles/${id}`,
  WRITE_ARTICLE: '/write',
  EDIT_ARITCLE: '/edit/:id',
  EDIT_ARTICLE_BY_ID: (id: string | number) => `/edit/${id}`,
} as const;

export const GITHUB_SIGN_IN_URL = '/api/auth/github';

export const API_URL = {
  MY_PROFILE: '/users/my',
  EMAIL_SIGN_IN: '/auth/sign-in',
  EMAIL_SIGN_UP: '/users',
  SIGN_OUT: '/auth/sign-out',
  ARTICLES: (getArticlesParam: GetArticlesParam) => `/articles?${getURLParams(getArticlesParam)}`,
  IS_EMAIL_AVAILABLE: (email: string) => `/users/available/email?email=${email}`,
  GET_ARTICLE_BY_ID: (id: string | number) => `/articles/${id}`,
  LIKE_ARTICLE: (id: string | number) => `/articles/${id}/like`,
  DISLIKE_ARTICLE: (id: string | number) => `/articles/${id}/dislike`,
  CHANGE_ARITLCE_STATUS: (id: string | number) => `/articles/${id}/status`,
  CREATE_ARTICLE: '/articles',
  EDIT_ARTICLE: (id: string | number) => `/articles/${id}`,
  DELETE_ARTICLE: (id: string | number) => `/articles/${id}`,
  UPLOAD_IMAGE: '/upload/image',
  UPLOAD_IMAGES: '/upload/images',
  MY_ARTICLES: '/users/my/articles',
  MY_LIKES: '/users/my/likes',
  MY_CHATS: 'users/my/chats',
};
