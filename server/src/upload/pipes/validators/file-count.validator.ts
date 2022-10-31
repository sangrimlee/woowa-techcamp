import { FileValidator } from '@nestjs/common';
import { ErrorCode } from 'src/common/exceptions/enums';

interface FileCountValidationOptions {
  fileCount: number;
}

export class FileCountValidator extends FileValidator<FileCountValidationOptions> {
  constructor(validationOptions: FileCountValidationOptions) {
    super(validationOptions);
  }

  isValid(files: Express.Multer.File[]) {
    const fileCount = this.validationOptions.fileCount;
    return files.length <= fileCount;
  }

  buildErrorMessage(): ErrorCode {
    return ErrorCode.UP003;
  }
}
