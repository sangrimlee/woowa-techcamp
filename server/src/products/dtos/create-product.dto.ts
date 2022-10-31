import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Product } from '../entities';

export class CreateProductDto extends PickType(Product, [
  'name',
  'price',
  'thumbnail',
  'status',
  'soldout',
]) {
  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty({ isArray: true })
  @IsArray()
  @IsString({ each: true })
  productOptionIds: string[];
}
