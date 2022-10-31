import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'src/users/entities';

export class SignInDto extends PickType(User, ['email']) {
  @ApiProperty({ description: '이메일 사용자 비밀번호' })
  @IsString()
  password: string;
}
