import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards';
import { CategoryService } from '../providers';

@ApiTags('Category 관련 API')
@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ description: '모든 카테고리 가져오기' })
  @Get('/')
  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();
    return categories;
  }
}
