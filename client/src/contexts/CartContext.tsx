import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SelectedOption } from 'hooks/useSelectProductOption';
import { createUniqueCartID, getSafeNumber } from 'utils/cart.util';
import { Product } from 'types';

export interface CartProduct {
  product: Product;
  orderCount: number;
  totalOptionPrice: number;
  selectedOptions: SelectedOption[];
}

export interface CartProducts {
  [key: string]: CartProduct;
}

export interface CartContextObject {
  cartProducts: CartProducts;
  totalPrice: number;
  addCartProduct: (newCartProduct: CartProduct) => void;
  changeOrderCount: (uniqueID: string, orderCount: number) => void;
  deleteCartProduct: (uniqueID: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextObject | null>(null);

export function useCartContext(component: string) {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error(`<${component} /> is missing a parent <CartProvider /> component.`);
  }
  return context;
}

interface Props {
  children: React.ReactNode;
}

function CartProvider({ children }: Props) {
  const [cartProducts, setCartProducts] = useState<CartProducts>({});
  const totalPrice = useMemo(
    () =>
      Object.values(cartProducts).reduce(
        (prev, { product, totalOptionPrice, orderCount }) =>
          (product.price + totalOptionPrice) * orderCount + prev,
        0,
      ),
    [cartProducts],
  );

  const addCartProduct = useCallback((newCartProduct: CartProduct) => {
    const uniqueID = createUniqueCartID(newCartProduct.product.id, newCartProduct.selectedOptions);
    setCartProducts((prevState) => ({
      ...prevState,
      [uniqueID]: {
        ...newCartProduct,
        orderCount: getSafeNumber(
          newCartProduct.orderCount + (prevState[uniqueID]?.orderCount || 0),
        ),
      },
    }));
  }, []);

  const changeOrderCount = useCallback((uniqueID: string, orderCount: number) => {
    setCartProducts((prevState) => ({
      ...prevState,
      [uniqueID]: {
        ...prevState[uniqueID],
        orderCount: getSafeNumber(orderCount),
      },
    }));
  }, []);

  const deleteCartProduct = useCallback((uniqueID: string) => {
    setCartProducts((prevState) => {
      delete prevState[uniqueID];
      return {
        ...prevState,
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartProducts(() => ({}));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addCartProduct,
        changeOrderCount,
        deleteCartProduct,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartContext.displayName = 'CartContext';

export default CartProvider;
