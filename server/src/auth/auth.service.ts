import { Repository } from 'typeorm';
import { CookieOptions } from 'express';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities';
import { TokenPayload } from './interfaces';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'password'],
    });
    if (user) {
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return user;
      }
    }
    throw new HttpException({ message: 'LOGIN FAILED' }, HttpStatus.UNAUTHORIZED);
  }

  async login(email: string, password: string) {
    const { id } = await this.validateUser(email, password);
    const payload: TokenPayload = { userId: id, sub: 'access_token' };
    const accessToken = this.jwtService.sign(payload);
    const cookieOptions: CookieOptions = {
      httpOnly: this.configService.get<boolean>('COOKIE_OPTIONS_HTTP_ONLY'),
      secure: this.configService.get<boolean>('COOKIE_OPTIONS_SECURE'),
      maxAge: this.jwtService.getExpiresIn(),
    };
    return { accessToken, cookieOptions };
  }

  async validateAccessToken(accessToken: string) {
    try {
      const { userId } = this.jwtService.verify<TokenPayload>(accessToken);
      const user = await this.usersRepository.findOneOrFail({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException({ message: '유효하지 않은 토큰' }, HttpStatus.UNAUTHORIZED);
    }
  }
}
