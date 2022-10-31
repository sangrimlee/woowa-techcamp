import React, { useMemo } from 'react';
import useArticleQuery from 'hooks/useArticleQuery';

import * as Styled from './ArticleCarousel.styled';

export default function ArticleCarousel() {
  const { article } = useArticleQuery();

  const images = useMemo(() => [article.thumbnail, ...article.images], [article]);

  return (
    <Styled.ImageList>
      {images.map((image, index) => (
        <Styled.ImageItem key={`article-image-${index}`}>
          <img src={image} alt={`${article.title}의 사진 ${index + 1}`} />
        </Styled.ImageItem>
      ))}
      <Styled.ImageOverlay />
    </Styled.ImageList>
  );
}
