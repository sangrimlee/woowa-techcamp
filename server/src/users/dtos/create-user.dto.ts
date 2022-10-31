import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/common/constants/regex.constant';
import { User } from '../entities';

export class CreateUserDto extends PickType(User, ['email', 'username']) {
  @ApiProperty({ description: '사용자 비밀번호' })
  @IsString()
  @Matches(PASSWORD_REGEX)
  password: string;
}
