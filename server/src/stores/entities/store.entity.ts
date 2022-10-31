import { Column, Entity, OneToMany } from 'typeorm';
import CoreEntity from 'src/common/entities/core.entity';
import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from 'src/categories/entities';
import { Order } from 'src/orders/entites';

@Entity()
export class Store extends CoreEntity {
  @ApiProperty()
  @IsString()
  @Length(2, 64)
  @Column({
    length: 64,
  })
  storeName: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(2, 64)
  @IsOptional()
  @Column({
    nullable: true,
    length: 64,
  })
  branchName?: string;

  @OneToMany(() => Category, (category) => category.store)
  categories: Category[];

  @OneToMany(() => Order, (order) => order.store)
  orders: Order[];
}
