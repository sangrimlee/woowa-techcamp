import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import CoreEntity from 'src/common/entities/core.entity';
import { Store } from 'src/stores/entities';
import { Product } from 'src/products/entities';

@Entity()
export class Category extends CoreEntity {
  @ApiProperty()
  @IsString()
  @Length(2, 64)
  @Column({
    length: 64,
  })
  name: string;

  @ManyToOne(() => Store, (store) => store.categories)
  store: Store;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
