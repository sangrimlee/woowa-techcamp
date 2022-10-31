import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { User } from 'src/users/entities';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getAllCategories(user: User) {
    const categories = await this.categoriesRepository.find({
      where: {
        store: { id: user.store.id },
      },
      relations: {
        products: true,
      },
      order: {
        createdAt: 'asc',
      },
    });
    return categories;
  }

  async getCategory(user: User, categoryId: string) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id: categoryId,
        store: { id: user.store.id },
      },
      relations: {
        products: true,
      },
    });
    return category;
  }

  async findByIdOrFail(categoryId: string) {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
      relations: {
        store: true,
      },
    });
    if (!category) {
      throw new HttpException({ message: '카테고리를 찾을 수 없습니다.' }, HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async checkIsExistCategoryName(user: User, categoryName: string) {
    const isExist = await this.categoriesRepository.findOne({
      where: {
        name: categoryName,
        store: {
          id: user.store.id,
        },
      },
    });
    if (isExist) {
      throw new HttpException({ message: '이미 존재하는 카테고리입니다.' }, HttpStatus.BAD_REQUEST);
    }
  }

  async checkPermission(user: User, categoryId: string) {
    const category = await this.findByIdOrFail(categoryId);
    if (user.store.id !== category.store.id) {
      throw new HttpException({ message: '권한이 없습니다.' }, HttpStatus.FORBIDDEN);
    }
    return category;
  }

  async createCategory(user: User, createCategoryDto: CreateCategoryDto) {
    await this.checkIsExistCategoryName(user, createCategoryDto.name);
    const newCategory = this.categoriesRepository.create({
      ...createCategoryDto,
      store: {
        id: user.store.id,
      },
    });
    await this.categoriesRepository.save(newCategory);
  }

  async updateCategory(user: User, categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    if (updateCategoryDto.name) {
      await this.checkIsExistCategoryName(user, updateCategoryDto.name);
    }
    await this.checkPermission(user, categoryId);
    await this.categoriesRepository.update(categoryId, updateCategoryDto);
  }

  async deleteCategory(user: User, categoryId: string) {
    await this.checkPermission(user, categoryId);
    await this.categoriesRepository.delete(categoryId);
  }
}
