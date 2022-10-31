import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteUserRegionDto {
  @ApiProperty({ description: '삭제할 동네 id' })
  @IsNumber()
  regionId: number;
}
