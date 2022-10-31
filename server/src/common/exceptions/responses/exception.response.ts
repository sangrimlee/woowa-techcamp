import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ErrorCode } from '../enums';

export class ExceptionResponse {
  @ApiProperty({ enum: ErrorCode, description: '발생한 에러 코드' })
  errorCode: ErrorCode;

  @ApiProperty({ description: '발생한 에러 메시지' })
  message: string;

  @ApiPropertyOptional({ description: '발생한 에러들' })
  errors?: string[];
}
