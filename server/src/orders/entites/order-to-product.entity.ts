import { Column, Entity, ManyToOne } from 'typeorm';
import CoreEntity from 'src/common/entities/core.entity';
import { Order } from './order.entity';
import { Product } from 'src/products/entities';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OrderToProduct extends CoreEntity {
  @Column()
  orderId: string;

  @Column()
  productId: string;

  @ManyToOne(() => Order, (order) => order.orderToProducts)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderToProducts)
  product: Product;

  @ApiProperty()
  @IsInt()
  @Column()
  orderCount: number;

  @ApiProperty({ isArray: true, type: () => OrderChoice })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderChoice)
  @Column({ type: 'json' })
  orderChocies: typeof OrderChoice[];
}

export class OrderChoice {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  choice: string;
}
