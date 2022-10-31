import { useFormContext, useWatch } from 'react-hook-form';
import useMutation from './useMutation';
import { requestUploadImages, UploadImagesResponse } from 'apis/upload';
import { ArticleSchema } from 'constants/schema.constant';
import { IMAGE_IS_UPLOAIDING } from 'constants/upload.constant';

export default function useUploadImages() {
  const { setValue, control } = useFormContext<ArticleSchema>();
  const images = useWatch({ control, name: 'images' });

  const handleChangeUploadedImages = (newImages: string[]) => {
    const filteredImages = images.filter((image) => image !== IMAGE_IS_UPLOAIDING);
    setValue('images', [...filteredImages, ...newImages]);
  };

  const handleChangeSkeleton = (loadingItemNum: number) => {
    const loadingItems = new Array(loadingItemNum).fill(IMAGE_IS_UPLOAIDING);
    setValue('images', [...images, ...loadingItems]);
  };

  const onMutate = (files: File[]) => {
    handleChangeSkeleton(files.length);
  };

  const onSuccess = ({ success, fail }: UploadImagesResponse) => {
    const images = success.map(({ url }) => url);
    handleChangeUploadedImages(images);
    if (0 < fail.length) {
      const errorMessage = fail.map(({ message }) => message).join('\n');
      alert(errorMessage);
    }
  };

  const onFailure = (error: string) => {
    const filteredImages = images.filter((image) => image !== IMAGE_IS_UPLOAIDING);
    setValue('images', [...filteredImages]);
    alert(error);
  };

  const mutations = useMutation<UploadImagesResponse, File[]>(requestUploadImages, {
    onFailure,
    onSuccess,
    onMutate,
  });

  return { images, ...mutations };
}
