import { requestSignIn } from './api/sign-in.js';

function validateFormInput(
  $element,
  errorMessage,
  validate = (value) => !!value,
) {
  const $input = $element.querySelector('input');
  const $formInputError = $element.querySelector('.form-input-error');
  const currentValue = $input.value;
  const isValid = validate(currentValue);
  $element.classList.toggle('is-error', !isValid);
  $formInputError.textContent = isValid ? '' : errorMessage;
  return [currentValue, isValid];
}

function init() {
  const $form = document.querySelector('.sign-in-form');
  const $emailInput = $form.querySelector('.email-input');
  const $passwordInput = $form.querySelector('.password-input');
  const $formErrorMessage = $form.querySelector('.form-error-message');

  $form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const [email, isEmailInputValid] = validateFormInput(
      $emailInput,
      '아이디 또는 이메일은 필수 입력값입니다.',
    );
    const [password, isPasswordInputValid] = validateFormInput(
      $passwordInput,
      '비밀번호는 필수 입력값입니다.',
    );

    if (!isEmailInputValid || !isPasswordInputValid) {
      return;
    }

    const { ok, errorMessage } = await requestSignIn(email, password);
    $formErrorMessage.classList.toggle('hidden', ok);
    if (ok) {
      window.location.replace('/');
    } else {
      $formErrorMessage.textContent = errorMessage;
    }
  });
}

init();
