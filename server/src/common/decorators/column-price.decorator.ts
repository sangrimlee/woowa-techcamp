import { Column } from 'typeorm';
import { applyDecorators } from '@nestjs/common';
import { TransformDeciaml } from '../transformers';

export function ColumnPrice() {
  return applyDecorators(
    Column({
      type: 'decimal',
      precision: 10,
      scale: 0,
      transformer: new TransformDeciaml(),
    }),
  );
}
