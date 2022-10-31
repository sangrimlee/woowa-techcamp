import { Response } from 'express';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
import { UseAuthGuard } from './decorators';
import { ACCESS_TOKEN_COOKIE_KEY } from './constants';

@ApiTags('인증 관련 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: '사용자 로그인 API' })
  @Post('/login')
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, cookieOptions } = await this.authService.login(email, password);
    response.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, cookieOptions);
    return {
      statusCode: HttpStatus.CREATED,
    };
  }

  @ApiOperation({ description: '사용자 로그아웃 API' })
  @UseAuthGuard()
  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
