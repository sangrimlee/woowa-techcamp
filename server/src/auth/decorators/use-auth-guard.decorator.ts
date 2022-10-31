import { ApiCookieAuth } from '@nestjs/swagger';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { SWAGGER_AUTHENTICATION_NAME } from 'src/config/document.config';
import { AuthGuard } from '../guards';

export function UseAuthGuard() {
  return applyDecorators(UseGuards(AuthGuard), ApiCookieAuth(SWAGGER_AUTHENTICATION_NAME));
}
