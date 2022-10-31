import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from 'src/common/exceptions';
import { ErrorCode } from 'src/common/exceptions/enums';
import { Repository } from 'typeorm';
import { Category } from '../entities';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async findByIdOrFail(categoryId: number) {
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new CustomException(HttpStatus.NOT_FOUND, ErrorCode.C001);
    }
    return category;
  }

  async getAllCategories() {
    const categories = await this.categoryRepository.find();
    return categories;
  }
}
