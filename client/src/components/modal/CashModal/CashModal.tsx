import React from 'react';
import Modal from '../Modal';
import Button from 'components/common/Button';
import SquareButton from 'components/common/SquareButton';
import { useCartContext } from 'contexts/CartContext';
import { useOrderContext } from 'contexts/OrderContext';
import * as Styled from './CashModal.styled';
import { PaymentMethod } from 'types';

export default function CashModal() {
  const { totalPrice } = useCartContext('CashModal');
  const { order, isOpenCashModal, toggleCashModal, paidAmount, handleChangePaidAmount } =
    useOrderContext('CashModal');
  const CASH_UNITS = [100, 500, 1000, 5000, 10000, 50000];

  return (
    <Modal open={isOpenCashModal} onClose={toggleCashModal} size="md">
      <Modal.Title>현금 투입</Modal.Title>
      <Styled.ButtonContainer>
        {CASH_UNITS.map((cash) => (
          <SquareButton
            variant="default"
            size="md"
            key={`cash-modal-btn-${cash}`}
            onClick={handleChangePaidAmount(cash)}
          >
            {cash.toLocaleString()}원
          </SquareButton>
        ))}
      </Styled.ButtonContainer>
      <Styled.PriceContainer>
        <strong>총 금액: {totalPrice.toLocaleString()}원</strong>
        <strong>투입 금액: {paidAmount.toLocaleString()}원</strong>
      </Styled.PriceContainer>
      <Styled.FooterContainer>
        <Button variant="error" fullWidth onClick={toggleCashModal}>
          취소하기
        </Button>
        <Button
          fullWidth
          disabled={paidAmount < totalPrice}
          onClick={() => order(PaymentMethod.Cash)}
        >
          결제하기
        </Button>
      </Styled.FooterContainer>
    </Modal>
  );
}
