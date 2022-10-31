import { FileValidator } from '@nestjs/common';
import { ErrorCode } from 'src/common/exceptions/enums';

interface MaxFileSizeValidationOptions {
  maxSize: number;
}

export class MaxFileSizeValidator extends FileValidator<MaxFileSizeValidationOptions> {
  constructor(validationOptions: MaxFileSizeValidationOptions) {
    super(validationOptions);
  }

  isValidFile(file: Express.Multer.File) {
    const maxSize = this.validationOptions.maxSize;
    return file.size < maxSize;
  }

  isValid(files: Express.Multer.File | Express.Multer.File[]) {
    if (Array.isArray(files)) {
      return files.every((file) => this.isValidFile(file));
    }
    return this.isValidFile(files);
  }

  buildErrorMessage(): ErrorCode {
    return ErrorCode.UP002;
  }
}
