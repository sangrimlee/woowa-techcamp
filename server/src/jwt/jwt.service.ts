import * as jwt from 'jsonwebtoken';
import ms, { StringValue } from 'ms';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  getExpiresIn(): number {
    const expiresIn = this.configService.get<StringValue>('JWT_EXPIRES_IN');
    return ms(expiresIn);
  }

  getSecretKey(): string {
    const secretKey = this.configService.get<string>('JWT_SECRET_KEY');
    return secretKey;
  }

  sign(payload: string | object | Buffer) {
    const secretKey = this.getSecretKey();
    const expiresIn = this.getExpiresIn();
    return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
  }

  verify<T extends object = any>(token: string) {
    const secretKey = this.getSecretKey();
    return jwt.verify(token, secretKey) as T;
  }
}
