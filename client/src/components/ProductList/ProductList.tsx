import React from 'react';
import { Product } from 'types';
import ProductItem from 'components/ProductItem';
import * as Styled from './ProductList.styled';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <Styled.ProductListContainer>
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </Styled.ProductListContainer>
  );
}
