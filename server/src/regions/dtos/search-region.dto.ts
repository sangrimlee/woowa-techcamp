import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PagintaionDto } from 'src/common/dtos';

export class SearchRegionDto extends PagintaionDto {
  @ApiProperty({ description: '동네 검색 키워드' })
  @IsString()
  keyword: string;
}
