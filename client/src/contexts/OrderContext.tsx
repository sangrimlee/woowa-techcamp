import { createContext, useContext } from 'react';
import { PaymentMethod } from 'types';

interface OrderContextObject {
  order: (paymentMethod: PaymentMethod) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
  isOpenPaymentMethodModal: boolean;
  togglePaymentMethodModal: () => void;
  isOpenCashModal: boolean;
  toggleCashModal: () => void;
  paidAmount: number;
  handleChangePaidAmount: (cashAmount: number) => () => void;
}

export const OrderContext = createContext<OrderContextObject | null>(null);

export function useOrderContext(component: string) {
  const context = useContext(OrderContext);
  if (context === null) {
    throw new Error(`<${component} /> is missing a parent <CartProvider /> component.`);
  }
  return context;
}
