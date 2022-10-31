import { HttpStatus, ParseFilePipe } from '@nestjs/common';
import { CustomException } from 'src/common/exceptions';
import { ErrorCode } from 'src/common/exceptions/enums';
import { IMAGE_FILE_REGEX, IMAGE_MAX_SIZE } from '../constants';
import { FileTypeValidator, MaxFileSizeValidator } from './validators';

export const ImageValidationPipe = new ParseFilePipe({
  validators: [
    new FileTypeValidator({
      fileType: IMAGE_FILE_REGEX,
    }),
    new MaxFileSizeValidator({
      maxSize: IMAGE_MAX_SIZE,
    }),
  ],
  exceptionFactory: (error: ErrorCode) => {
    return new CustomException(HttpStatus.BAD_REQUEST, error);
  },
});
