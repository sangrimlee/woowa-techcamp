import React from 'react';
import { css } from 'styled-components';
import { useRouter } from 'lib/router';
import { PAGE_URL } from 'constants/url.constant';
import { useCartContext } from 'contexts/CartContext';
import CartList from './CartList';
import Button from 'components/common/Button';
import OrderModal from 'components/modal/OrderModal';
import useToggle from 'hooks/useToggle';
import * as Styled from './Cart.styled';
import useTimer from 'hooks/useTimer';

export default function Cart() {
  const { navigate } = useRouter();
  const { totalPrice } = useCartContext('Cart');
  const [isOpenOrderModal, toggleOrderModal] = useToggle();

  const onClearCart = () => {
    navigate(PAGE_URL.WELCOME);
  };

  return (
    <Styled.Container>
      <Styled.HeadingContainer>
        <h2>장바구니</h2>
      </Styled.HeadingContainer>
      <CartList />
      <TimeoutMessage />
      <Styled.BottomContainer>
        <Styled.TotalPrice>총 금액: {totalPrice.toLocaleString()}원</Styled.TotalPrice>
        <Button type="button" size="xl" onClick={toggleOrderModal} disabled={totalPrice === 0}>
          구매하기
        </Button>
        <Button
          type="button"
          size="xl"
          variant="error"
          css={css`
            --button-py: 1.125rem;
          `}
          onClick={onClearCart}
        >
          취소하기
        </Button>
      </Styled.BottomContainer>
      {isOpenOrderModal && <OrderModal onClose={toggleOrderModal} />}
    </Styled.Container>
  );
}

function TimeoutMessage() {
  const { navigate } = useRouter();
  const time = useTimer({
    callback: () => navigate(PAGE_URL.WELCOME, true),
    second: 30,
    isListen: true,
  });

  return (
    <React.Fragment>
      {time <= 10 && <Styled.Timer>{time}초 뒤에 자동으로 창이 꺼집니다.</Styled.Timer>}
    </React.Fragment>
  );
}
