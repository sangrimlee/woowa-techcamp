import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ErrorResponseData, ResponseData } from 'types';
import instance from './instance';

interface RequestReturn<T> {
  ok: boolean;
  data?: T;
  message?: string;
}

export default async function request<D = unknown, R = undefined>(
  config: AxiosRequestConfig<D>,
): Promise<RequestReturn<R>> {
  try {
    const { data } = await instance.request<ResponseData<R>>(config);
    return {
      ok: true,
      data: data.data,
    };
  } catch (e) {
    const error = e as Error | AxiosError<ErrorResponseData>;
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response?.data;
      const message = Array.isArray(errorData.message) ? errorData.message[0] : errorData.message;
      return {
        ok: false,
        message,
      };
    } else {
      return {
        ok: false,
      };
    }
  }
}
