import { requestCheckEmail } from './api/check-email.js';
import { requestSignUp } from './api/sign-up.js';
import { handleFormInputEvent, disableFormInput } from './form-input.js';
import { preprocessBirthday } from './utils/preprocess.js';
import {
  validateDateString,
  validateEmail,
  validateNickname,
  validatePassword,
} from './utils/validate.js';

function init() {
  const $form = document.querySelector('form.additional-info-form');
  const $additionalInputWrapper = $form.querySelector('.additional-input-wrap');
  const $emailInput = $form.querySelector('.email-input');
  const $nicknameInput = $form.querySelector('.nickname-input');
  const $passwordInput = $form.querySelector('.password-input');
  const $birthdayInput = $form.querySelector('.birthday-input');
  const $checkEmailDuplicateButton = $form.querySelector(
    '.check-duplicate-btn',
  );
  const $formErrorMessage = $form.querySelector('.form-error-message');

  const $headerBtn = document.querySelector('#header-btn');
  const $inputList = [
    $emailInput,
    $nicknameInput,
    $passwordInput,
    $birthdayInput,
  ];

  const { getValue: getEmailValue } = handleFormInputEvent($emailInput, {
    validate: validateEmail,
    errorMessage: '올바른 이메일 형식이 아닙니다.',
    onValidate: (isValid) => {
      $checkEmailDuplicateButton.disabled = !isValid;
    },
  });

  const { getValue: getNicknameValue } = handleFormInputEvent($nicknameInput, {
    validate: validateNickname,
    errorMessage: '2자 이상, 16자 이하 영문, 한글, 숫자만 포함해야합니다.',
  });

  const { getValue: getPasswordValue } = handleFormInputEvent($passwordInput, {
    validate: validatePassword,
    errorMessage:
      '10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야합니다.',
  });

  const { getValue: getBirthdayValue } = handleFormInputEvent($birthdayInput, {
    preprocess: preprocessBirthday,
    validate: validateDateString,
    errorMessage: '올바른 날짜 형식이 아닙니다.',
  });

  $checkEmailDuplicateButton.addEventListener('click', async (event) => {
    const { ok, errorMessage } = await requestCheckEmail(getEmailValue());
    $formErrorMessage.classList.toggle('hidden', ok);
    if (ok) {
      $additionalInputWrapper.classList.remove('hidden');
      disableFormInput($emailInput);
      event.target.disabled = true;
      $formErrorMessage.textContent = '';
    } else {
      $formErrorMessage.textContent = errorMessage;
    }
  });

  $form.addEventListener('input', () => {
    const isAllValid = $inputList.every(($inputElement) =>
      $inputElement.classList.contains('is-valid'),
    );
    $headerBtn.disabled = !isAllValid;
  });

  $form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  $headerBtn.addEventListener('click', async () => {
    const { ok, errorMessage } = await requestSignUp(
      getEmailValue(),
      getPasswordValue(),
      getNicknameValue(),
      getBirthdayValue(),
    );
    $formErrorMessage.classList.toggle('hidden', ok);
    if (ok) {
      window.location.replace('/sign-in');
    } else {
      $formErrorMessage.textContent = errorMessage;
    }
  });
}

init();
