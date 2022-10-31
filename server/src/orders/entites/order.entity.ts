import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../enums';
import { ColumnPrice, IsDateString, IsPrice } from 'src/common/decorators';
import { Store } from 'src/stores/entities';
import CoreEntity from 'src/common/entities/core.entity';
import { OrderToProduct } from './order-to-product.entity';

@Entity()
export class Order extends CoreEntity {
  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsPrice()
  @ColumnPrice()
  paidAmount: number;

  @ApiProperty()
  @IsPrice()
  @ColumnPrice()
  totalAmount: number;

  @ApiProperty()
  @IsDateString()
  @Column({
    type: 'date',
  })
  orderDate: string;

  @ApiProperty()
  @IsInt()
  @Column()
  orderNumber: number;

  @ManyToOne(() => Store, (store) => store.orders)
  store: Store;

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.order)
  orderToProducts: OrderToProduct[];
}
