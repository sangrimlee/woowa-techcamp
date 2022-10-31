import React from 'react';
import { Product } from 'types';
import Icon from 'components/common/Icon';
import useToggle from 'hooks/useToggle';
import ProductOptionModal from 'components/modal/ProductOptionModal';
import * as Styled from './ProductItem.styled';

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const [isProductOptionModalOpen, toggleProductOptionModalOpen] = useToggle();

  return (
    <React.Fragment>
      <Styled.Container onClick={toggleProductOptionModalOpen}>
        {product.thumbnail && (
          <Styled.ThumbnailContainer>
            <img src={product.thumbnail} alt={product.name} />
          </Styled.ThumbnailContainer>
        )}
        <Styled.ContentContainer>
          <h3>{product.name}</h3>
          <strong>{product.price.toLocaleString()}원</strong>
        </Styled.ContentContainer>
        <ProductBadge productStatus={product.status} />
      </Styled.Container>
      {isProductOptionModalOpen && (
        <ProductOptionModal
          open={isProductOptionModalOpen}
          onClose={toggleProductOptionModalOpen}
          product={product}
        />
      )}
    </React.Fragment>
  );
}

interface ProductBadgeProps {
  productStatus: 'None' | 'Best' | 'New';
}

function ProductBadge({ productStatus }: ProductBadgeProps) {
  if (productStatus === 'None') {
    return null;
  }

  return (
    <Styled.BadgeContainer>
      <Styled.Badge>
        <Icon icon="BadgeIcon" size="48" />
        <span>{productStatus}</span>
      </Styled.Badge>
    </Styled.BadgeContainer>
  );
}
