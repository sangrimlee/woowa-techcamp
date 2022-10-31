import { Injectable, CanActivate, ExecutionContext, Inject, HttpStatus } from '@nestjs/common';
import { CustomException } from 'src/common/exceptions';
import { ErrorCode } from 'src/common/exceptions/enums';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { ACCESS_TOKEN_COOKIE_KEY } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies[ACCESS_TOKEN_COOKIE_KEY];

    const { userId } = await this.authService.verifyAccessToken(accessToken);
    const user = await this.usersService.findByUserId(userId);
    if (!user) {
      throw new CustomException(HttpStatus.UNAUTHORIZED, ErrorCode.A007);
    }
    request.user = user;
    return true;
  }
}
