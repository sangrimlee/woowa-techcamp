import { Response } from 'express';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ErrorCode } from '../enums';
import { ERROR_MESSAGE } from '../constants';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      errorCode: ErrorCode.V001,
      message: ERROR_MESSAGE[ErrorCode.V001],
      errors: exception.response.message,
    });
  }
}
