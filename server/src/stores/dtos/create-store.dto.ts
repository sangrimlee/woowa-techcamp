import { OmitType } from '@nestjs/swagger';
import { Store } from '../entities';

export class CreateStoreDto extends OmitType(Store, ['id', 'createdAt', 'updatedAt']) {}
