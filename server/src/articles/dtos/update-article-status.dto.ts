import { PickType } from '@nestjs/swagger';
import { Article } from '../entities';

export class UpdateArticleStatusDto extends PickType(Article, ['status']) {}
