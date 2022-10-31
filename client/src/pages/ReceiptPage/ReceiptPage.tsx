import React, { useEffect, useState } from 'react';
import { useRouter } from 'lib/router';
import useTimer from 'hooks/useTimer';
import useQueryString from 'hooks/useQueryString';
import Button from 'components/common/Button';
import { PAGE_URL } from 'constants/url.constant';
import { OrderData, PaymentMethod } from 'types';
import { requestGetOrder } from 'api/order';
import * as Styled from './ReceiptPage.styled';

export default function ReceiptPage() {
  const { navigate } = useRouter();
  const query = useQueryString('id');
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    if (!query) {
      navigate('/welcome', true);
    } else {
      (async () => {
        const { ok, data } = await requestGetOrder(query);
        if (ok && data) {
          setOrder(data);
        } else {
          navigate(PAGE_URL.WELCOME, true);
        }
      })();
    }
  }, [navigate, query]);

  if (!order) {
    return null;
  }

  return (
    <Styled.ReceiptPageContainer>
      <h1>주문이 완료되었습니다.</h1>
      <h2>주문번호 {order.orderNumber}번</h2>
      <Styled.OrderList>
        {order.orderToProducts.map(({ id, product, orderChocies, orderCount }) => (
          <li key={`order-${id}-${product.id}`}>
            <Styled.OrderItem>
              <Styled.OrderItemThumbnailContainer>
                <img src={product.thumbnail} alt={product.name} />
              </Styled.OrderItemThumbnailContainer>
              <Styled.OrderItemContentContainer>
                <h3>{product.name}</h3>
                <span className="order-choice">
                  {orderChocies?.map(({ choice }) => choice).join(' / ')}
                </span>
                <span className="order-count">개수: {orderCount}</span>
              </Styled.OrderItemContentContainer>
            </Styled.OrderItem>
          </li>
        ))}
      </Styled.OrderList>
      <Styled.OrderDetailContainer>
        <strong>
          결제수단: {order.paymentMethod === PaymentMethod.CreditCard ? '카드결제' : '현금결제'}
        </strong>
        <strong>총 금액: {order.totalAmount.toLocaleString()}원</strong>
        <strong>투입금액: {order.paidAmount.toLocaleString()}원</strong>
        {order.totalAmount < order.paidAmount && (
          <strong>거스름 돈: {(order.paidAmount - order.totalAmount).toLocaleString()}원</strong>
        )}
      </Styled.OrderDetailContainer>
      <Styled.OrderFooterContainer>
        <TimeoutMessage />
        <Button type="button" size="xl" onClick={() => navigate(PAGE_URL.WELCOME, true)} fullWidth>
          주문 완료 하기
        </Button>
      </Styled.OrderFooterContainer>
    </Styled.ReceiptPageContainer>
  );
}

function TimeoutMessage() {
  const { navigate } = useRouter();
  const time = useTimer({
    callback: () => navigate(PAGE_URL.WELCOME, true),
    second: 10,
  });
  return <span>이 화면은 {time}초 뒤에 자동으로 사라집니다.</span>;
}
