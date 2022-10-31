import { User } from 'src/users/entities';
import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto extends PickType(User, ['email']) {
  @IsString()
  password: string;
}
