import { Request } from 'express';
import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ACCESS_TOKEN_COOKIE_KEY } from '../constants';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request?.cookies[ACCESS_TOKEN_COOKIE_KEY];
    const user = await this.authService.validateAccessToken(accessToken);
    request['user'] = user;
    return true;
  }
}
