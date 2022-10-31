import { IntersectionType, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateStoreDto } from 'src/stores/dtos';
import { IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/common/constants/regex.constants';

export class CreateUserDto extends IntersectionType(
  PickType(User, ['name', 'email']),
  CreateStoreDto,
) {
  @IsString()
  @Matches(PASSWORD_REGEX)
  password: string;
}
