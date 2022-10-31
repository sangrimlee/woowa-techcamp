import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Article } from '../entities';

export class CreateArticleDto extends PickType(Article, [
  'title',
  'content',
  'price',
  'isDiscountable',
  'thumbnail',
  'images',
]) {
  @ApiProperty({ description: '해당하는 카테고리 ID' })
  @IsInt()
  categoryId: number;

  @ApiProperty({ description: '해당 지역 ID' })
  @IsInt()
  regionId: number;
}
