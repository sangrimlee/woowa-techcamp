import React from 'react';
import KioskLayout from 'layouts/KioskLayout';
import KioskHeader from 'layouts/KioskLayout/KioskHeader';
import CategoryTab from 'components/CategoryTab';
import Cart from 'components/cart';
import CartProvider from 'contexts/CartContext';

export default function KioskPage() {
  return (
    <CartProvider>
      <KioskLayout>
        <KioskLayout.Content>
          <KioskHeader />
          <CategoryTab />
        </KioskLayout.Content>
        <KioskLayout.Sidebar>
          <Cart />
        </KioskLayout.Sidebar>
      </KioskLayout>
    </CartProvider>
  );
}
