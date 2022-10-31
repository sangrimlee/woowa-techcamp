import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, UseAuthGuard } from 'src/auth/decorators';
import { User } from 'src/users/entities';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import { ProductsService } from '../providers';

@ApiTags('제품 관련 API')
@UseAuthGuard()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ description: '새로운 제품 생성' })
  @Post()
  async createProduct(@AuthUser() user: User, @Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.createProduct(user, createProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: product,
    };
  }

  @ApiOperation({ description: '기존 제품 수정' })
  @Patch('/:id')
  async updateProduct(
    @AuthUser() user: User,
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.updateProduct(user, productId, updateProductDto);
    return {
      statusCode: HttpStatus.OK,
    };
  }

  @ApiOperation({ description: '기존 제품 삭제' })
  @Delete('/:id')
  async deleteProduct(@AuthUser() user: User, @Param('id') productId: string) {
    await this.productsService.deleteProduct(user, productId);
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
