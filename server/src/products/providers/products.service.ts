import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities';
import { User } from 'src/users/entities';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductOptionsService } from './product-options.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly productOptionsService: ProductOptionsService,
  ) {}

  async findByIdOrFail(user: User, productId: string) {
    const product = await this.productsRepository.findOne({
      where: {
        id: productId,
        category: {
          store: {
            id: user.store.id,
          },
        },
      },
      relations: ['category', 'productOptions'],
    });
    if (!product) {
      throw new HttpException({ message: '해당 제품을 찾을 수 없습니다.' }, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async createProduct(
    user: User,
    { categoryId, productOptionIds, ...createProductDto }: CreateProductDto,
  ) {
    const category = await this.categoriesService.checkPermission(user, categoryId);
    const productOptions = await this.productOptionsService.findByIds(productOptionIds);
    const newProduct = await this.productsRepository.save(
      this.productsRepository.create({
        ...createProductDto,
        category,
        productOptions,
      }),
    );
    return newProduct;
  }

  async updateProduct(
    user: User,
    productId: string,
    { categoryId, productOptionIds, ...updateProductDto }: UpdateProductDto,
  ) {
    const product = await this.findByIdOrFail(user, productId);
    if (categoryId) {
      product.category = await this.categoriesService.checkPermission(user, categoryId);
    }
    if (productOptionIds) {
      product.productOptions = await this.productOptionsService.findByIds(productOptionIds);
    }
    await this.productsRepository.save(product);
    await this.productsRepository.update(productId, updateProductDto);
  }

  async deleteProduct(user: User, productId: string) {
    await this.findByIdOrFail(user, productId);
    await this.productsRepository.delete(productId);
  }
}
