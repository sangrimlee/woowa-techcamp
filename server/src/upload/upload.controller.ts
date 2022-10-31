import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImage, ApiImages } from './decorators';
import { ImagesValidationPipe, ImageValidationPipe } from './pipes';
import { UploadImageResponse, UploadImagesResponse } from './responses';
import { UploadService } from './upload.service';

@ApiTags('업로드 관련 API')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ description: '단일 이미지 업로드' })
  @ApiCreatedResponse({ type: UploadImageResponse })
  @ApiImage('image')
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile(ImageValidationPipe) image: Express.Multer.File) {
    const url = await this.uploadService.uploadFile(image);
    return {
      url,
    };
  }

  @ApiOperation({ description: '여러 이미지 업로드' })
  @ApiCreatedResponse({ type: UploadImagesResponse })
  @ApiImages('images')
  @Post('images')
  @UseInterceptors(FilesInterceptor('images', 10))
  async uploadImages(@UploadedFiles(ImagesValidationPipe) images: Express.Multer.File[]) {
    const result = await this.uploadService.uploadFiles(images);
    return result;
  }
}
