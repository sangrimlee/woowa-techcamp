import { mutation, query } from 'utils/api.util';
import { API_URL } from 'constants/url.constant';
import { EmailSignInSchema, EmailSignUpSchema } from 'constants/schema.constant';

export async function requestEmailSignIn({ email, password }: EmailSignInSchema) {
  const data = await mutation<EmailSignInSchema>({
    url: API_URL.EMAIL_SIGN_IN,
    method: 'POST',
    data: {
      email,
      password,
    },
  });
  return data;
}

export async function requestIsEmailAvailable(email: string) {
  const data = await query<{ isAvailable: boolean }>(API_URL.IS_EMAIL_AVAILABLE(email));
  return data;
}

type EmailSignUpBody = Omit<EmailSignUpSchema, 'confirmPassword'>;

export async function requestEmailSignUp({ email, username, password }: EmailSignUpBody) {
  const data = await mutation<EmailSignUpBody>({
    url: API_URL.EMAIL_SIGN_UP,
    method: 'POST',
    data: {
      email,
      password,
      username,
    },
  });
  return data;
}

export async function requestSignOut() {
  await mutation<undefined>({
    method: 'POST',
    url: '/auth/sign-out',
  });
}
