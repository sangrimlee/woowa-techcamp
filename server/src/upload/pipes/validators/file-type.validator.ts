import { FileValidator } from '@nestjs/common';
import { ErrorCode } from 'src/common/exceptions/enums';

interface FileTypeValidationOptions {
  fileType: string | RegExp;
}

export class FileTypeValidator extends FileValidator<FileTypeValidationOptions> {
  constructor(validationOptions: FileTypeValidationOptions) {
    super(validationOptions);
  }

  isValidFile(file: Express.Multer.File) {
    const fileType = this.validationOptions.fileType;
    if (!file.mimetype) {
      return false;
    }
    return Boolean(file.mimetype.match(fileType));
  }

  isValid(files: Express.Multer.File | Express.Multer.File[]) {
    if (Array.isArray(files)) {
      return files.every((file) => this.isValidFile(file));
    }
    return this.isValidFile(files);
  }

  buildErrorMessage(): ErrorCode {
    return ErrorCode.UP001;
  }
}
