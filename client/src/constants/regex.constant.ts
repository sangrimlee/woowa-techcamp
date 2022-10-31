export const EMAIL_REGEX =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

export const USER_NAME_REGEX = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,16}$/;

export const STORE_NAME_REGEX = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,24}$/;

export const BRANCH_NAME_REGEX = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{0,24}$/;
