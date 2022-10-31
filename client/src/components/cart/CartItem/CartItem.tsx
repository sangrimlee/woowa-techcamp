import React, { useCallback } from 'react';
import { CartProduct, useCartContext } from 'contexts/CartContext';
import * as Styled from './CartItem.styled';
import NumberInput from 'components/common/NumberInput';
import Icon from 'components/common/Icon';

interface CartItemProps {
  uniqueID: string;
  cartProduct: CartProduct;
}

export default function CartItem({
  uniqueID,
  cartProduct: { product, selectedOptions, totalOptionPrice, orderCount },
}: CartItemProps) {
  const { changeOrderCount, deleteCartProduct } = useCartContext('CartItem');

  const onChangeOrderCount = useCallback(
    (value: number) => {
      changeOrderCount(uniqueID, value);
    },
    [uniqueID, changeOrderCount],
  );

  const onDeleteCartProduct = useCallback(() => {
    deleteCartProduct(uniqueID);
  }, [uniqueID, deleteCartProduct]);

  return (
    <Styled.Container>
      <Styled.ThumbnailContainer>
        <img src={product.thumbnail} alt={product.name} />
      </Styled.ThumbnailContainer>
      <Styled.ContentContainer>
        <h3>{product.name}</h3>
        <span>{selectedOptions.map(({ choice }) => choice.name).join(' / ')}</span>
        <strong>{((product.price + totalOptionPrice) * orderCount).toLocaleString()}원</strong>
        <NumberInput value={orderCount} onChange={onChangeOrderCount} size="md" />
      </Styled.ContentContainer>
      <Styled.DeleteButton onClick={onDeleteCartProduct}>
        <Icon icon="CloseIcon" size="20" />
      </Styled.DeleteButton>
    </Styled.Container>
  );
}
