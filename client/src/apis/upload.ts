import { API_URL } from 'constants/url.constant';
import { ErrorResponse } from 'types/error';
import { mutation } from 'utils/api.util';

export interface UploadImagesResponse {
  success: { url: string }[];
  fail: ErrorResponse[];
}

export async function requestUploadImages(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });
  const data = await mutation<FormData, UploadImagesResponse>({
    url: API_URL.UPLOAD_IMAGES,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}
