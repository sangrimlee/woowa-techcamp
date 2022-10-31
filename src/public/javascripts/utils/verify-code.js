export function createVerifyCode() {
  return Math.random().toString(10).substring(2, 6);
}

export function sendVerifyCode(setValue, onSend, ms = 2000) {
  if (!alert('인증번호가 발송되었습니다.')) {
    setTimeout(() => {
      setValue(createVerifyCode());
      onSend();
    }, ms);
  }
}
