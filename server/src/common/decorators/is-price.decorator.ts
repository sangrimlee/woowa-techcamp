import { applyDecorators } from '@nestjs/common';
import { IsInt, Max, Min } from 'class-validator';
import { MAX_PRICE } from '../constants/max-price.constant';

export function IsPrice() {
  return applyDecorators(IsInt(), Max(MAX_PRICE), Min(0));
}
