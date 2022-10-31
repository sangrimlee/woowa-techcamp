import { Product } from './product';

export enum PaymentMethod {
  Cash = 'Cash',
  CreditCard = 'CreditCard',
}

export interface OrderChoice {
  name: string;
  choice: string;
}

export interface OrderToProductData {
  id: string;
  orderId: string;
  productId: string;
  orderCount: number;
  orderChocies: OrderChoice[];
  product: Product;
}

export interface OrderData {
  id: string;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  paidAmount: number;
  orderDate: string;
  orderNumber: number;
  orderToProducts: OrderToProductData[];
}
