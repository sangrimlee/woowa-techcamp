import React from 'react';
import Portal from '../Portal';
import Icon from 'components/common/Icon';
import {
  ModalBackdrop,
  ModalCloseButton,
  BaseModal,
  ModalContent,
  ModalSize,
  ModalSubtitle,
  ModalTitle,
} from './Modal.styled';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  size?: ModalSize;
}

function Modal({ children, onClose, size = 'lg' }: ModalProps) {
  return (
    <Portal>
      <BaseModal $size={size}>
        <ModalBackdrop onClick={onClose} />
        <ModalContent>
          <ModalCloseButton onClick={onClose}>
            <Icon icon="CloseIcon" size="32" />
          </ModalCloseButton>
          {children}
        </ModalContent>
      </BaseModal>
    </Portal>
  );
}

Modal.Title = ModalTitle;
Modal.Subtitle = ModalSubtitle;

export default Modal;
