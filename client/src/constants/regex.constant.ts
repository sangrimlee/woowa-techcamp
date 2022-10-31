export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-z0-9 !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{10,}$/i;
export const USERNAME_REGEX = /^.{2,40}$/;
export const PASSWORD_ENGLISH_REGEX = /(?=.*[a-z])/i;
export const PASSWORD_NUMBER_REGEX = /(?=.*[0-9])/;
export const PASSWORD_SPECIAL_REGEX =
  /^(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-z0-9 !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/i;
export const PASSWORD_LENGTH_REGEX = /^.{10,}$/;

export const PASSOWRD_REGEX_LIST = [
  {
    regex: PASSWORD_NUMBER_REGEX,
    label: '숫자 포함',
  },
  {
    regex: PASSWORD_ENGLISH_REGEX,
    label: '영 대,소문자 포함',
  },
  {
    regex: PASSWORD_SPECIAL_REGEX,
    label: '특수문자 포함 (@$!%*?& 등)',
  },
  {
    regex: PASSWORD_LENGTH_REGEX,
    label: '10자리 이상 입력',
  },
];
