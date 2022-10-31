import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoresService } from 'src/stores/stores.service';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly storesService: StoresService,
  ) {}

  async findUserById(userId: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'name', 'email'],
    });

    return user;
  }

  async findUserByIdOrFail(userId: string): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new HttpException(
        {
          message: '해당하는 사용자가 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  async createUser({ email, name, password, ...createStoreDto }: CreateUserDto) {
    const isEmailExist = await this.findUserByEmail(email);
    if (isEmailExist) {
      throw new HttpException(
        {
          message: '이미 사용중인 이메일입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const store = await this.storesService.createStore(createStoreDto);

    await this.usersRepository.save(
      this.usersRepository.create({
        email,
        name,
        password,
        store,
      }),
    );
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    await this.findUserByIdOrFail(userId);
    await this.usersRepository.update(userId, updateUserDto);
  }

  async deleteUser(userId: string) {
    await this.findUserByIdOrFail(userId);
    await this.usersRepository.delete(userId);
  }
}
