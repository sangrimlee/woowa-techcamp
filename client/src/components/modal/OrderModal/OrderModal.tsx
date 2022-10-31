import React, { useState } from 'react';
import useToggle from 'hooks/useToggle';
import CashModal from '../CashModal';
import PaymentMethodModal from '../PaymentMethodModal';
import { OrderContext } from 'contexts/OrderContext';
import { PaymentMethod } from 'types';
import { requestCreateOrder } from 'api/order';
import { useCartContext } from 'contexts/CartContext';
import { useRouter } from 'lib/router';
import { PAGE_URL } from 'constants/url.constant';
import { createDateString } from 'utils/date.utils';
import LoadingModal from '../LoadingModal';
import { randomrange } from 'utils/random.util';

interface OrderModalProps {
  onClose: () => void;
}

export default function OrderModal({ onClose }: OrderModalProps) {
  const { navigate } = useRouter();
  const { totalPrice, cartProducts } = useCartContext('OrderModal');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [isOpenPaymentMethodModal, togglePaymentMethodModal] = useToggle(true);
  const [isOpenCashModal, toggleCashModal] = useToggle(false);
  const handleChangePaidAmount = (cashAmount: number) => () => {
    setPaidAmount((prev) => prev + cashAmount);
  };

  const order = async (paymentMethod: PaymentMethod) => {
    setIsLoading(true);
    const orderInfos = Object.values(cartProducts).map(
      ({ product, orderCount, selectedOptions }) => ({
        id: product.id,
        orderCount,
        orderChocies: selectedOptions.map(({ name, choice }) => ({
          name,
          choice: choice.name,
        })),
      }),
    );
    const { ok, data } = await requestCreateOrder({
      orderDate: createDateString(new Date()),
      paymentMethod,
      paidAmount: paymentMethod === PaymentMethod.CreditCard ? totalPrice : paidAmount,
      totalAmount: totalPrice,
      orderInfos,
    });
    if (ok && data) {
      setTimeout(() => {
        setIsLoading(false);
        navigate(`${PAGE_URL.RECEIPT}?id=${data.order.id}`, true);
      }, randomrange(3000, 7000));
    } else {
      alert('결제에 실패하였습니다.');
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        onClose,
        isLoading,
        isOpenPaymentMethodModal,
        togglePaymentMethodModal,
        isOpenCashModal,
        toggleCashModal,
        paidAmount,
        handleChangePaidAmount,
      }}
    >
      {!isLoading && isOpenPaymentMethodModal && <PaymentMethodModal />}
      {!isLoading && isOpenCashModal && <CashModal />}
      {isLoading && <LoadingModal />}
    </OrderContext.Provider>
  );
}
