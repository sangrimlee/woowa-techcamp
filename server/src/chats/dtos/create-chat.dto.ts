import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ description: 'Article의 ID' })
  @IsInt()
  @IsPositive()
  articleId: number;
}
