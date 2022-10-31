import React from 'react';
import Modal from '../Modal';
import Icon from 'components/common/Icon';
import SquareButton from 'components/common/SquareButton';
import { PaymentMethod } from 'types';
import { useOrderContext } from 'contexts/OrderContext';
import * as Styled from './PaymentMethodModal.styled';

export default function PaymentMethodModal() {
  const { order, onClose, isOpenPaymentMethodModal, togglePaymentMethodModal, toggleCashModal } =
    useOrderContext('PaymentMethodModal');

  const onClickCreditCard = async () => {
    await order(PaymentMethod.CreditCard);
  };

  const onClickCash = () => {
    toggleCashModal();
  };

  return (
    <Modal
      open={isOpenPaymentMethodModal}
      onClose={() => {
        togglePaymentMethodModal();
        onClose();
      }}
      size="md"
    >
      <Modal.Title>결제 수단 선택</Modal.Title>
      <Styled.ButtonContaienr>
        <SquareButton onClick={onClickCash}>
          <Icon icon="CoinIcon" size="64" />
          <span>현금 결제</span>
        </SquareButton>
        <SquareButton onClick={onClickCreditCard}>
          <Icon icon="CreditCardIcon" size="64" />
          <span>카드 결제</span>
        </SquareButton>
      </Styled.ButtonContaienr>
    </Modal>
  );
}
