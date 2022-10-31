import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class PagintaionDto {
  @ApiPropertyOptional({ description: '페이지 번호', default: 1, type: Number })
  @Type(() => Number)
  @IsPositive()
  page = 1;

  @ApiPropertyOptional({ description: '페이지별 보여질 아이템 개수', default: 20, type: Number })
  @Type(() => Number)
  @IsPositive()
  per = 20;
}
