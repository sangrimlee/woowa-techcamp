import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article, Category, UserViewArticle } from './entities';
import { ArticlesController, CategoryController } from './controllers';
import { ArticlesService, CategoryService } from './providers';
import { RegionsModule } from 'src/regions/regions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Article, UserViewArticle]), RegionsModule],
  providers: [CategoryService, ArticlesService],
  controllers: [CategoryController, ArticlesController],
  exports: [ArticlesService],
})
export class ArticlesModule {}
