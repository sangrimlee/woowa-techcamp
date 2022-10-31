import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, UseAuthGuard } from 'src/auth/decorators';
import { CategoriesService } from './categories.service';
import { User } from 'src/users/entities';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@ApiTags('카테고리 관련 API')
@UseAuthGuard()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ description: '카테고리의 제품 가져오기' })
  @Get()
  async getAllCategories(@AuthUser() user: User) {
    const categories = await this.categoriesService.getAllCategories(user);
    return {
      statusCode: HttpStatus.OK,
      data: categories,
    };
  }

  @ApiOperation({ description: '새로운 카테고리 생성' })
  @Post()
  async createCategory(@AuthUser() user: User, @Body() createCategoryDto: CreateCategoryDto) {
    await this.categoriesService.createCategory(user, createCategoryDto);
    return {
      statusCode: HttpStatus.CREATED,
    };
  }

  @ApiOperation({ description: '특정 카테고리 제품 가져오기' })
  @Get('/:id')
  async getCategory(@AuthUser() user: User, @Param('id') categoryId: string) {
    const categories = await this.categoriesService.getCategory(user, categoryId);
    return {
      statusCode: HttpStatus.OK,
      data: categories,
    };
  }

  @ApiOperation({ description: '기존 카테고리 수정' })
  @Patch('/:id')
  async updateCategory(
    @AuthUser() user: User,
    @Param('id') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.categoriesService.updateCategory(user, categoryId, updateCategoryDto);
    return {
      statusCode: HttpStatus.OK,
    };
  }

  @ApiOperation({ description: '카테고리 삭제' })
  @Delete('/:id')
  async deleteCategory(@AuthUser() user: User, @Param('id') categoryId: string) {
    await this.categoriesService.deleteCategory(user, categoryId);
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
