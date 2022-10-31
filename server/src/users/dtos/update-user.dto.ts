import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../entities';

export class UpdateUserDto extends PartialType(PickType(User, ['name'])) {}
