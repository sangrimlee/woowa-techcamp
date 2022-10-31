export enum ErrorCode {
  U001 = 'U001', // 이미 존재하는 이메일
  A001 = 'A001', // 로그인 실패 이메일 존재 X
  A002 = 'A002', // 로그인 실패 비밀번호 일치 X
  UP001 = 'UP001', // "지원하지 않는 파일 확장자.",
  UP002 = 'UP002', // "파일 크기(5MB)를 초과",
  UP003 = 'UP003', // "파일 개수(10개)를 초과",
  UNKNOWN = 'UNKNOWN',
}

export interface ErrorResponse {
  errorCode?: ErrorCode;
  message?: string;
  errors?: string[];
}
