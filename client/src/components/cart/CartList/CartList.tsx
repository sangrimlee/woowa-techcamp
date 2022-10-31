import React from 'react';
import { useCartContext } from 'contexts/CartContext';
import CartItem from '../CartItem';
import * as Styled from './CartList.styled';

export default function CartList() {
  const { cartProducts } = useCartContext('CartList');

  return (
    <Styled.ListContainer>
      {Object.entries(cartProducts).map(([key, cartProduct]) => (
        <li key={key}>
          <CartItem uniqueID={key} cartProduct={cartProduct} />
        </li>
      ))}
    </Styled.ListContainer>
  );
}
