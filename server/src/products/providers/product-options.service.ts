import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductOptionDto, UpdateProductOptionDto } from '../dtos';
import { ProductOption } from '../entities';

@Injectable()
export class ProductOptionsService {
  constructor(
    @InjectRepository(ProductOption)
    private readonly productOptionsRepository: Repository<ProductOption>,
  ) {}

  async findById(productOptionId: string): Promise<ProductOption | null> {
    const productOption = await this.productOptionsRepository.findOneBy({ id: productOptionId });
    return productOption;
  }

  async findByIdOrFail(productOptionId: string) {
    const productOption = await this.findById(productOptionId);
    if (!productOption) {
      throw new HttpException({ message: '해당하는 제품 옵션이 없습니다.' }, HttpStatus.NOT_FOUND);
    }
    return productOption;
  }

  async findByIds(productOptionIds: string[]) {
    const productOptions = await this.productOptionsRepository.find({
      where: productOptionIds.map((productOptionId) => ({ id: productOptionId })),
    });
    return productOptions;
  }

  async createProductOption(createProductOptionDto: CreateProductOptionDto) {
    const newProductOption = await this.productOptionsRepository.save(
      this.productOptionsRepository.create(createProductOptionDto),
    );
    return newProductOption;
  }

  async updateProductOption(
    productOptionId: string,
    updateProductOptionDto: UpdateProductOptionDto,
  ) {
    await this.findByIdOrFail(productOptionId);
    await this.productOptionsRepository.update(productOptionId, updateProductOptionDto);
  }

  async deleteProductOption(productOptionId: string) {
    await this.findByIdOrFail(productOptionId);
    await this.productOptionsRepository.delete(productOptionId);
  }
}
