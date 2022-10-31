import * as path from 'path';
import * as S3 from 'aws-sdk/clients/s3';
import { randomUUID } from 'crypto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomException } from 'src/common/exceptions';
import { ErrorCode } from 'src/common/exceptions/enums';

@Injectable()
export class UploadService {
  s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: configService.get<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('AWS_S3_ACCESS_KEY'),
        secretAccessKey: configService.get<string>('AWS_S3_SECRET_KEY'),
      },
    });
  }

  createKey(file: Express.Multer.File) {
    const uuid = randomUUID();
    const fileFormat = path.extname(file.originalname);
    const bucketPath = this.configService.get<string>('AWS_S3_BUCKET_PATH');
    return path.join(bucketPath, `${uuid}${fileFormat}`);
  }

  createObjectURL(key: string) {
    const region = this.configService.get<string>('AWS_S3_REGION');
    const bucket = this.configService.get<string>('AWS_S3_BUCKET');
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const key = this.createKey(file);
      const bucket = this.configService.get<string>('AWS_S3_BUCKET');
      await this.s3
        .putObject({
          Key: key,
          Bucket: bucket,
          Body: file.buffer,
        })
        .promise();
      return this.createObjectURL(key);
    } catch (error) {
      throw new CustomException(
        HttpStatus.BAD_REQUEST,
        ErrorCode.UP004,
        `${file.originalname} 업로드에 실패하였습니다.`
      );
    }
  }

  async uploadFiles(files: Express.Multer.File[]) {
    const results = await Promise.allSettled(files.map((file) => this.uploadFile(file)));
    const fulfilled = results.filter(
      (result) => result.status === 'fulfilled'
    ) as PromiseFulfilledResult<string>[];

    const rejected = results.filter(
      (result) => result.status === 'rejected'
    ) as PromiseRejectedResult[];

    const success = fulfilled.map((fullfill) => ({ url: fullfill.value }));
    const fail = rejected.map((reject) => reject.reason?.response);
    return {
      success,
      fail,
    };
  }
}
