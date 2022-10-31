import { ErrorCode } from '../common/exceptions/enums/error-code.enum';
import { HttpStatus } from '@nestjs/common';
import { CustomException } from '../common/exceptions/custom.exception';
import { Region } from './entities/region.entity';
import { CreateUserRegionDto } from './dtos/create-user-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { UpdateUserRegionDto } from './dtos/update-user-region.dto';
import { UsersService } from 'src/users/users.service';
import { SearchRegionDto } from './dtos';

export class RegionsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>
  ) {}

  async findRegionByIdOrFail(id: number) {
    const region = await this.regionRepository.findOne({
      where: { id },
    });

    if (!region) {
      throw new CustomException(HttpStatus.BAD_REQUEST, ErrorCode.R001);
    }

    return region;
  }

  async createUserRegion(userId: string, { regionId }: CreateUserRegionDto) {
    const user = await this.usersService.findByUserId(userId);
    if (user.regions.length >= 2) {
      throw new CustomException(HttpStatus.BAD_REQUEST, ErrorCode.U002);
    }
    const region = await this.findRegionByIdOrFail(regionId);
    const newRegions = [...user.regions, region];
    this.usersService.updateUserRegions(user, newRegions);
  }

  async deleteUserRegion(userId: string, { regionId }: CreateUserRegionDto) {
    const user = await this.usersService.findByUserId(userId);

    if (user.regions.length <= 1) {
      throw new CustomException(HttpStatus.BAD_REQUEST, ErrorCode.U002);
    }

    const newRegions = user.regions.filter(({ id }) => id !== regionId);
    this.usersService.updateUserRegions(user, newRegions);
  }

  async updateUserRegion(userId: string, { regionIds }: UpdateUserRegionDto) {
    const user = await this.usersService.findByUserId(userId);
    const newRegions = await Promise.all(regionIds.map((id) => this.findRegionByIdOrFail(id)));

    if (newRegions.length === 0 || 2 < newRegions.length) {
      throw new CustomException(HttpStatus.BAD_REQUEST, ErrorCode.U002);
    }

    this.usersService.updateUserRegions(user, newRegions);
  }

  async findRegionsByKeyword({ keyword, page, per }: SearchRegionDto) {
    const findOptions: FindManyOptions<Region> = {
      where: {
        name: Like(`%${keyword}%`),
        deletedAt: null,
      },
      skip: (page - 1) * per,
      take: per,
    };
    const [results, totalCount] = await this.regionRepository.findAndCount(findOptions);

    return { regions: results, totalCount };
  }
}
