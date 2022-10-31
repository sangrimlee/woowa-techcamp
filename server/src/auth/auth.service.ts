import axios from 'axios';
import { CookieOptions } from 'express';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from 'src/common/exceptions';
import { ErrorCode } from 'src/common/exceptions/enums';
import { SignInDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { CreateGithubUserDto } from 'src/users/dtos/create-github-user.dto';
import { ProviderEnum } from 'src/users/enums';
import {
  GithubAccessTokenResponse,
  GithubUserEmailResponse,
  GithubUserResponse,
  TokenPayload,
} from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {}

  async validateUser({ email, password }: SignInDto) {
    const user = await this.userService.findUserDetailByEmail(email);
    if (!user) {
      throw new CustomException(HttpStatus.UNAUTHORIZED, ErrorCode.A001);
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      throw new CustomException(HttpStatus.UNAUTHORIZED, ErrorCode.A002);
    }
    const accessToken = await this.createAccessToken(user.id);
    return accessToken;
  }

  async createAccessToken(userId: string) {
    const payload = {
      userId,
      sub: 'access_token',
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const accessTokenExpiresIn = this.configService.get<number>('JWT_EXPIRES_IN');
    const accessTokenCookieOption: CookieOptions = {
      httpOnly: true,
      maxAge: accessTokenExpiresIn,
    };

    return { accessToken, accessTokenCookieOption };
  }

  async verifyAccessToken(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(accessToken, {
        ignoreExpiration: false,
      });
      return payload;
    } catch (error) {
      // ✨ JWT 관련 발생 에러 로직 추가
      if (error.name === 'JsonWebTokenError') {
        throw new CustomException(HttpStatus.UNAUTHORIZED, ErrorCode.A003);
      }
      if (error.name === 'TokenExpiredError') {
        throw new CustomException(HttpStatus.UNAUTHORIZED, ErrorCode.A004);
      }
      throw new CustomException(HttpStatus.UNAUTHORIZED, ErrorCode.V001);
    }
  }

  async validateGithubCode(code: string) {
    const GITHUB_CLIENT_ID = this.configService.get<string>('GITHUB_CLIENT_ID');
    const GITHUB_CLIENT_SECRET = this.configService.get<string>('GITHUB_CLIENT_SECRET');

    const { data } = await axios.get<GithubAccessTokenResponse>(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&code=${code}&client_secret=${GITHUB_CLIENT_SECRET}`,
      {
        headers: { Accept: 'application/json' },
      }
    );
    const { access_token } = data;

    if (!access_token) {
      throw new CustomException(HttpStatus.UNAUTHORIZED, ErrorCode.A005);
    }
    return access_token;
  }

  async getGithubUserByAccessToken(access_token: string) {
    try {
      const { data } = await axios.get<GithubUserResponse>(`https://api.github.com/user`, {
        headers: { Authorization: `token ${access_token}`, Accept: 'application/json' },
      });
      return data;
    } catch (error) {
      throw new CustomException(HttpStatus.UNAUTHORIZED, ErrorCode.A006);
    }
  }

  async getGithubUserEmailByAccessToken(access_token: string) {
    try {
      const { data: emails } = await axios.get<GithubUserEmailResponse[]>(
        `https://api.github.com/user/emails`,
        {
          headers: { Authorization: `token ${access_token}`, Accept: 'application/json' },
        }
      );
      const primaryEmail = emails.find((email) => email.primary).email;
      return primaryEmail ?? emails[0].email;
    } catch (error) {
      throw new CustomException(HttpStatus.UNAUTHORIZED, ErrorCode.A006);
    }
  }

  async validateGithubUser({ email, username, provider, providerUserId }: CreateGithubUserDto) {
    try {
      const user = await this.userService.findByUserProvider(provider, providerUserId);

      if (!!user) {
        return await this.createAccessToken(user.id);
      }

      const newUser = await this.userService.createSocialUser({
        username,
        email,
        provider: ProviderEnum.GITHUB,
        providerUserId,
      });
      return await this.createAccessToken(newUser.id);
    } catch (error) {
      throw new CustomException(HttpStatus.BAD_REQUEST, ErrorCode.V001);
    }
  }
}
