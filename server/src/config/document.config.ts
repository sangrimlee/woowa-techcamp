import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { ACCESS_TOKEN_COOKIE_KEY } from 'src/auth/constants';

export const SWAGGER_AUTHENTICATION_NAME = 'Authentication';

export const doucmentConfig = new DocumentBuilder()
  .setTitle('우아한 키오스크')
  .setDescription('우아한 키오스크 API 문서입니다.')
  .setVersion('0.0.1')
  .addServer('/api')
  .addCookieAuth(
    ACCESS_TOKEN_COOKIE_KEY,
    {
      type: 'apiKey',
      in: 'cookie',
      name: ACCESS_TOKEN_COOKIE_KEY,
    },
    SWAGGER_AUTHENTICATION_NAME,
  )
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  customSiteTitle: '우아한 키오스크 API Documentation',
  swaggerOptions: {
    withCredentials: true,
  },
};
