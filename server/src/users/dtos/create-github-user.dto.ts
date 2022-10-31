import { PickType } from '@nestjs/swagger';
import { User } from '../entities';

export class CreateGithubUserDto extends PickType(User, [
  'email',
  'username',
  'provider',
  'providerUserId',
]) {}
