import request from './request';
import { API_URL } from 'constants/url.constant';
import { OrderData, OrderToProductData, PaymentMethod, OrderChoice } from 'types';

interface OrderInfo {
  id: string;

  orderCount: number;
  orderChocies: OrderChoice[];
}

interface CreateOrderRequestData {
  orderDate: string;
  paymentMethod: PaymentMethod;
  paidAmount: number;
  totalAmount: number;
  orderInfos: OrderInfo[];
}

interface CreateOrderResponseData {
  order: Omit<OrderData, 'orderToProducts'>;
  orderToProducts: OrderToProductData[];
}

export async function requestCreateOrder(data: CreateOrderRequestData) {
  return request<CreateOrderRequestData, CreateOrderResponseData>({
    url: API_URL.ORDERS,
    method: 'POST',
    data,
  });
}

export async function requestGetOrder(orderId: string) {
  return request<undefined, OrderData>({
    url: `${API_URL.ORDERS}/${orderId}`,
    method: 'GET',
  });
}
