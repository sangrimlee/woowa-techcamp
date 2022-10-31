import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
