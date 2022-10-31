import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities';
import { CreateStoreDto, UpdateStoreDto } from './dtos';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRespository: Repository<Store>,
  ) {}

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    const newStore = await this.storeRespository.save(this.storeRespository.create(createStoreDto));
    return newStore;
  }

  async updateStore(storeId: string, updateStoreDto: UpdateStoreDto) {
    await this.storeRespository.update(storeId, updateStoreDto);
  }
}
