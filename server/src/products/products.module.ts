import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { Product, ProductOption } from './entities';
import { ProductsController, ProductOptionsController } from './controllers';
import { ProductOptionsService, ProductsService } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductOption]), CategoriesModule],
  exports: [TypeOrmModule],
  controllers: [ProductsController, ProductOptionsController],
  providers: [ProductsService, ProductOptionsService],
})
export class ProductsModule {}
