import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseAuthGuard } from 'src/auth/decorators';
import { ProductOptionsService } from '../providers';
import { CreateProductOptionDto, UpdateProductOptionDto } from '../dtos';

@ApiTags('제품 옵션 관련 API')
@UseAuthGuard()
@Controller('product-options')
export class ProductOptionsController {
  constructor(private readonly productOptionsService: ProductOptionsService) {}

  @ApiOperation({ description: '새로운 제품 옵션 추가' })
  @Post()
  async createProductOption(@Body() createProductOptionDto: CreateProductOptionDto) {
    const newProductOption = await this.productOptionsService.createProductOption(
      createProductOptionDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      data: newProductOption,
    };
  }

  @ApiOperation({ description: '기존 제품 옵션 수정' })
  @Patch('/:id')
  async updateProductOption(
    @Param('id') productOptionId: string,
    @Body() updateProductOptionDto: UpdateProductOptionDto,
  ) {
    await this.productOptionsService.updateProductOption(productOptionId, updateProductOptionDto);
    return {
      statusCode: HttpStatus.OK,
    };
  }

  @ApiOperation({ description: '기존 제품 옵션 삭제' })
  @Delete('/:id')
  async deleteProductOption(@Param('id') productOptionId: string) {
    await this.productOptionsService.deleteProductOption(productOptionId);
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
