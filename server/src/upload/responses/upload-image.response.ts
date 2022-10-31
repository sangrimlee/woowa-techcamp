import { ApiProperty } from '@nestjs/swagger';

export class UploadImageResponse {
  @ApiProperty({ description: '업로드된 URL' })
  url: string;
}
