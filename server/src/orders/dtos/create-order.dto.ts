import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Product } from 'src/products/entities';
import { Order, OrderToProduct } from '../entites';

export class OrderInfoDto extends IntersectionType(
  PickType(Product, ['id']),
  PickType(OrderToProduct, ['orderCount', 'orderChocies']),
) {}

export class CreateOrderDto extends PickType(Order, [
  'paymentMethod',
  'paidAmount',
  'totalAmount',
  'orderDate',
]) {
  @ApiProperty({ isArray: true, type: OrderInfoDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderInfoDto)
  orderInfos: OrderInfoDto[];
}
