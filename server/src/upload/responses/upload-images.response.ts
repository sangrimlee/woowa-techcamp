import { ApiProperty } from '@nestjs/swagger';
import { ExceptionResponse } from 'src/common/exceptions/responses';
import { UploadImageResponse } from './upload-image.response';

export class UploadImagesResponse {
  @ApiProperty({ description: '성공한 업로드된 URL', type: UploadImageResponse, isArray: true })
  success: UploadImageResponse[];

  @ApiProperty({
    description: '업로드에 실패한 경우의 Exception',
    type: ExceptionResponse,
    isArray: true,
  })
  fail: ExceptionResponse[];
}
