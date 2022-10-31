export const API_URL = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/users',
  MY_PROFILE: '/users/my',
  CATEGOREIS: '/categories',
  ORDERS: '/orders',
} as const;

export const PAGE_URL = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  STORE: '/store',
  ADMIN: '/admin',
  KIOSK: '/kiosk',
  WELCOME: '/welcome',
  RECEIPT: '/receipt',
} as const;
