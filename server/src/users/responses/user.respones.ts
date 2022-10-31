import { ApiProperty } from '@nestjs/swagger';
import { Region } from 'src/regions/entities';

export class UserResponse {
  @ApiProperty({ description: '아이디' })
  id: string;

  @ApiProperty({ description: '닉네임' })
  username: string;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '동네', isArray: true, type: Region })
  regions: Region[];
}
