import {
  BRANCH_NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  STORE_NAME_REGEX,
  USER_NAME_REGEX,
} from './regex.constant';

export const LoginValidation = {
  email: {
    pattern: EMAIL_REGEX,
    message: '이메일 주소를 정확히 입력해주세요.',
  },
} as const;

export const RegisterValidation = {
  email: LoginValidation.email,
  name: {
    pattern: USER_NAME_REGEX,
    message: '이름은 2자 이상 16자이하이어야 합니다.',
  },
  storeName: {
    pattern: STORE_NAME_REGEX,
    message: '매장명은 2자이상 24자이하이어야 합니다.',
  },
  branchName: {
    pattern: BRANCH_NAME_REGEX,
    message: '점포명은 24자 이하이어야 합니다.',
  },
  password: {
    pattern: PASSWORD_REGEX,
    message: '비밀번호는 영문, 숫자, 특수문자를 포함한 8-20자이어야 합니다.',
  },
} as const;
