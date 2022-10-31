import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt } from 'class-validator';

export class UpdateUserRegionDto {
  @ApiProperty({ description: '변경된 id 리스트' })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @IsInt({ each: true })
  regionIds: number[];
}
