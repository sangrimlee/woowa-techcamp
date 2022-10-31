import { ApiProperty } from '@nestjs/swagger';

export class IsAvailableResponse {
  @ApiProperty({ description: '사용 가능 여부' })
  isAvailable: boolean;
}
