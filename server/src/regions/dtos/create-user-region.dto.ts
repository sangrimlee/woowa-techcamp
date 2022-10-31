import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserRegionDto {
  @ApiProperty({ description: '추가할 동네 id' })
  @IsNumber()
  regionId: number;
}
