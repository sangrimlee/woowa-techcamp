import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { IsArray, IsEnum, IsString, Length, ValidateNested } from 'class-validator';
import CoreEntity from 'src/common/entities/core.entity';
import { ProductOptionType } from '../enums';
import { IsPrice } from 'src/common/decorators';

@Entity()
export class ProductOption extends CoreEntity {
  @ApiProperty()
  @Length(2, 64)
  @Column({
    length: 64,
  })
  name: string;

  @ApiProperty({ enum: ProductOptionType })
  @IsEnum(ProductOptionType)
  @Column({
    type: 'enum',
    enum: ProductOptionType,
    default: ProductOptionType.Radio,
  })
  optionType: ProductOptionType;

  @ApiProperty({ isArray: true, type: () => ProductOptionChoice })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOptionChoice)
  @Column({ type: 'json' })
  choices: typeof ProductOptionChoice[];
}

export class ProductOptionChoice {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ default: 0 })
  @IsPrice()
  price = 0;
}
