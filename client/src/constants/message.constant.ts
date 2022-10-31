import { ErrorCode } from 'types/error';

export const VALIDATION_MESSAGE = {
  REQUIRED_FIELD: '필수 입력 정보입니다.',
  INVALID_EMAIL: '이메일 주소를 정확히 입력해주세요.',
  INVALID_USERNAME: '이름은 2-40자이어야합니다.',
  CONFIRM_PASSWORD: '비밀번호가 일치하지 않습니다.',
  MIN_IMAGES: '이미지는 최소 1장 업로드해야해요.',
  MAX_IMAGES: '이미지는 최대 10장까지 업로드 할 수 있어요.',
  TITLE_MAX_LENGTH: '제목은 최대 256자까지 쓸 수 있어요.',
  REQUIRED_MESSAGE: (field: string) => `${field} 필수 입력 항목이에요.`,
};

export const API_ERROR_MESSAGE: Record<ErrorCode, string> = {
  [ErrorCode.U001]: '이미 존재하는 이메일입니다.',
  [ErrorCode.A001]: '잘못된 로그인 정보입니다.',
  [ErrorCode.A002]: '잘못된 로그인 정보입니다.',
  [ErrorCode.UP001]: '지원하지 않는 파일 확장자입니다.',
  [ErrorCode.UP002]: '파일 크기(5MB)를 초과하였습니다.',
  [ErrorCode.UP003]: '파일 개수(10개)를 초과하였습니다.',
  [ErrorCode.UNKNOWN]: '알 수 없는 오류가 발생하였습니다.',
};
