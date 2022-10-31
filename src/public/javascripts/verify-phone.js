import { disableFormInput, handleFormInputEvent } from './form-input.js';
import {
  preprocessPhoneNumber,
  preprocessVerifyCode,
} from './utils/preprocess.js';
import { validatePhoneNumber, validateVerifyCode } from './utils/validate.js';
import { sendVerifyCode } from './utils/verify-code.js';

function init() {
  const $form = document.querySelector('form.verify-phone-form');
  const $phoneInput = $form.querySelector('.phone-input');
  const $verifyCodeWrapper = $form.querySelector('.verify-code-wrap');
  const $verifyCodeInput = $form.querySelector('.verify-code-input');
  const $sendCodeBtn = $form.querySelector('.send-code-btn');
  const $resendCodeBtn = document.querySelector('.resend-code-btn');
  const $inputList = [$phoneInput, $verifyCodeInput];
  const $headerBtn = document.querySelector('#header-btn');

  handleFormInputEvent($phoneInput, {
    preprocess: preprocessPhoneNumber,
    validate: validatePhoneNumber,
    onValidate: (isValid) => {
      $sendCodeBtn.disabled = !isValid;
    },
    errorMessage: '올바른 전화번호 형식이 아닙니다.',
  });

  const { setValue: setVerifyCodeInput } = handleFormInputEvent(
    $verifyCodeInput,
    {
      preprocess: preprocessVerifyCode,
      validate: validateVerifyCode,
      errorMessage: '인증번호는 4자리의 숫자로 이루어져있습니다.',
    },
  );

  $sendCodeBtn.addEventListener('click', () => {
    disableFormInput($phoneInput);
    $sendCodeBtn.remove();
    $verifyCodeWrapper.classList.remove('hidden');
    sendVerifyCode(setVerifyCodeInput, () => {
      $headerBtn.disabled = false;
    });
  });

  $resendCodeBtn.addEventListener('click', () => {
    sendVerifyCode(setVerifyCodeInput, () => {
      $headerBtn.disabled = false;
    });
  });

  $form.addEventListener('input', () => {
    const isAllValid = $inputList.every(($inputElement) =>
      $inputElement.classList.contains('is-valid'),
    );
    $headerBtn.disabled = !isAllValid;
  });

  $headerBtn.addEventListener('click', () => {
    window.location.replace('/auth/sign-up/additional-info');
  });

  $form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

init();
