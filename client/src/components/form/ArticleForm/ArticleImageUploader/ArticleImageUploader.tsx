import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Icon from 'components/common/Icon';
import useUploadImages from 'hooks/useUploadImages';
import { ArticleSchema } from 'constants/schema.constant';
import { IMAGE_IS_UPLOAIDING } from 'constants/upload.constant';
import * as Styled from './ArticleImageUploader.styled';

export default function ArticleImageUploader() {
  const { control } = useFormContext<ArticleSchema>();
  const images = useWatch({ control, name: 'images' });

  return (
    <Styled.ImageUploaderWrapper>
      <ImageUploadButton />
      <Styled.UploadedImageList>
        {images.map((image, index) => (
          <UploadImageItem key={`${image}-${index}`} image={image} />
        ))}
      </Styled.UploadedImageList>
    </Styled.ImageUploaderWrapper>
  );
}

interface UploadImageItemProps {
  image: string;
}

function UploadImageItem({ image }: UploadImageItemProps) {
  const { setValue, control } = useFormContext<ArticleSchema>();
  const images = useWatch({ control, name: 'images' });

  const setToThumbnail = () => {
    setValue('images', [image, ...images.filter((currentImage) => currentImage !== image)]);
  };

  const deleteImage = () => {
    setValue('images', [...images.filter((currentImage) => currentImage !== image)]);
  };

  return (
    <Styled.UploadedImageWrapper>
      <Styled.UploadedImageButton onClick={setToThumbnail} type="button">
        {image === IMAGE_IS_UPLOAIDING ? (
          <Icon icon="LoadingIcon" size={24} />
        ) : (
          <img src={image} />
        )}
      </Styled.UploadedImageButton>
      <Styled.UploadedImageDeleteButton onClick={deleteImage} type="button">
        <Icon icon="CloseOutlineIcon" size={20} />
      </Styled.UploadedImageDeleteButton>
    </Styled.UploadedImageWrapper>
  );
}

function ImageUploadButton() {
  const { images, mutate } = useUploadImages();

  const checkUploadable = (fileList: FileList | null) => {
    const files = Array.from(fileList ?? []);
    if (files.length === 0) return false;
    if (10 < images.length + files.length) {
      alert('이미지는 10개 이상 선택할 수 없습니다.');
      return false;
    }
    return files;
  };

  const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = checkUploadable(event.target.files);
    if (files) {
      await mutate(files);
    }
  };

  return (
    <div>
      <Styled.UploadButton htmlFor="article-images-upload">
        <Icon icon="CameraIcon" size={28} />
        <span>{images.length}/10</span>
      </Styled.UploadButton>
      <input
        id="article-images-upload"
        type="file"
        accept="image/png, image/jpeg"
        multiple
        hidden
        onChange={uploadImages}
        disabled={10 < images.length}
      />
    </div>
  );
}
