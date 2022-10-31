import { STATUS_CODE } from '../constants/status-code.constant';

export function exceptionHandler(error, req, res, next) {
  if (error.statusCode) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
}
