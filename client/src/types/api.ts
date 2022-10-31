interface BaseResponse {
  statusCode: number;
}

export interface ResponseData<T> extends BaseResponse {
  data: T;
}

export interface ErrorResponseData extends BaseResponse {
  message?: string | string[];
}
