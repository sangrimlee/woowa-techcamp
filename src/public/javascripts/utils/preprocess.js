export function preprocessPhoneNumber(phoneNumber) {
  return phoneNumber
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/-{1,2}$/g, '');
}

export function preprocessVerifyCode(verifyCode) {
  return verifyCode.replace(/[^0-9]/g, '');
}

export function preprocessBirthday(birthday) {
  return birthday
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1.$2.$3')
    .replace(/\.{1,2}$/g, '');
}
