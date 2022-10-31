import { PickType } from '@nestjs/swagger';
import { Category } from '../entities';

export class CreateCategoryDto extends PickType(Category, ['name']) {}
