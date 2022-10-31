import * as yup from 'yup';
import { VALIDATION_MESSAGE } from './message.constant';
import { PASSWORD_REGEX, USERNAME_REGEX } from './regex.constant';

export const EMAIL_SIGN_IN_SCHEMA = yup.object({
  email: yup
    .string()
    .email(VALIDATION_MESSAGE.INVALID_EMAIL)
    .required(VALIDATION_MESSAGE.REQUIRED_FIELD),
  password: yup.string().required(VALIDATION_MESSAGE.REQUIRED_FIELD),
});

export type EmailSignInSchema = yup.InferType<typeof EMAIL_SIGN_IN_SCHEMA>;

export const EMAIL_SIGN_UP_SCHEMA = yup.object({
  username: yup
    .string()
    .matches(USERNAME_REGEX, VALIDATION_MESSAGE.INVALID_USERNAME)
    .required(VALIDATION_MESSAGE.REQUIRED_FIELD),
  email: yup
    .string()
    .email(VALIDATION_MESSAGE.INVALID_EMAIL)
    .required(VALIDATION_MESSAGE.REQUIRED_FIELD),
  password: yup.string().matches(PASSWORD_REGEX).required(VALIDATION_MESSAGE.REQUIRED_FIELD),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], VALIDATION_MESSAGE.CONFIRM_PASSWORD)
    .required(VALIDATION_MESSAGE.REQUIRED_FIELD),
});

export type EmailSignUpSchema = yup.InferType<typeof EMAIL_SIGN_UP_SCHEMA>;

export const ARTICLE_SCHEMA = yup.object({
  title: yup
    .string()
    .max(256, VALIDATION_MESSAGE.TITLE_MAX_LENGTH)
    .required(VALIDATION_MESSAGE.REQUIRED_MESSAGE('제목은')),
  content: yup.string().required(VALIDATION_MESSAGE.REQUIRED_MESSAGE('내용은')),
  categoryId: yup.number().required(VALIDATION_MESSAGE.REQUIRED_MESSAGE('카테고리는')),
  categoryName: yup.string().required(VALIDATION_MESSAGE.REQUIRED_MESSAGE('카테고리는')),
  price: yup.string(),
  isDiscountable: yup.boolean().default(false),
  images: yup
    .array()
    .of(yup.string().url().required())
    .min(1, VALIDATION_MESSAGE.MIN_IMAGES)
    .max(10)
    .required(),
});

export type ArticleSchema = yup.InferType<typeof ARTICLE_SCHEMA>;
