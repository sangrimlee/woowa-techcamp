import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './enums';
import { ERROR_MESSAGE } from './constants';

export class CustomException extends HttpException {
  constructor(statusCode: HttpStatus, errorCode: ErrorCode, message?: string) {
    super(
      {
        errorCode,
        message: message ?? ERROR_MESSAGE[errorCode],
      },
      statusCode
    );
  }
}
