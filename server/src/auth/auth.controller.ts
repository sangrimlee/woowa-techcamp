import { Response } from 'express';
import { Controller, Post, Body, Res, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos';
import { ACCESS_TOKEN_COOKIE_KEY } from './constants';
import { ConfigService } from '@nestjs/config';
import { ProviderEnum } from 'src/users/enums';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, accessTokenCookieOption } = await this.authService.validateUser(signInDto);
    res.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, accessTokenCookieOption);
  }

  @Post('/sign-out')
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
  }

  @Get('/github')
  signInGithub(@Res() res) {
    const GITHUB_CLIENT_ID = this.configService.get<string>('GITHUB_CLIENT_ID');
    const GITHUB_REDIRECT_URL = this.configService.get<string>('GITHUB_REDIRECT_URL');

    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}&scope=user`
    );
  }

  @Redirect('/', 301)
  @Get('/github/callback')
  async signInGithubCallback(@Query('code') code: string, @Res({ passthrough: true }) res) {
    const access_token = await this.authService.validateGithubCode(code);
    const github_user = await this.authService.getGithubUserByAccessToken(access_token);
    const email = await this.authService.getGithubUserEmailByAccessToken(access_token);
    const username = github_user.login;

    const { accessToken, accessTokenCookieOption } = await this.authService.validateGithubUser({
      email,
      username,
      provider: ProviderEnum.GITHUB,
      providerUserId: github_user.id,
    });

    res.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, accessTokenCookieOption);
  }
}
