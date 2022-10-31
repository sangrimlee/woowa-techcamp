import { PickType } from '@nestjs/swagger';
import { ProductOption } from '../entities';

export class CreateProductOptionDto extends PickType(ProductOption, [
  'name',
  'optionType',
  'choices',
]) {}
