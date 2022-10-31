import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { IsBoolean, IsEnum, IsOptional, IsUrl, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import CoreEntity from 'src/common/entities/core.entity';
import { Category } from 'src/categories/entities';
import { ProductStatus } from '../enums';
import { ProductOption } from './product-option.entity';
import { ColumnPrice, IsPrice } from 'src/common/decorators';
import { OrderToProduct } from 'src/orders/entites';

@Entity()
export class Product extends CoreEntity {
  @ApiProperty()
  @Length(2, 64)
  @Column({
    length: 64,
  })
  name: string;

  @ApiProperty()
  @IsPrice()
  @ColumnPrice()
  price: number;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  @Column({ nullable: true })
  thumbnail: string;

  @ApiPropertyOptional({ enum: ProductStatus, default: ProductStatus.None })
  @IsEnum(ProductStatus)
  @IsOptional()
  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.None })
  status: ProductStatus;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  @Column({ type: 'boolean', default: false })
  soldout: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.product)
  orderToProducts: OrderToProduct[];

  @ManyToMany(() => ProductOption, { eager: true })
  @JoinTable()
  productOptions: ProductOption[];
}
