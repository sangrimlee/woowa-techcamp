import styled, { css } from 'styled-components';
import { SLIDE_UP } from 'styles/keyframes';

const ModalSizeStyles = {
  md: css`
    --modal-max-w: 32rem;
  `,
  lg: css`
    --modal-max-w: 48rem;
  `,
};

export type ModalSize = keyof typeof ModalSizeStyles;

interface BaseModalProps {
  $size: ModalSize;
}

export const BaseModal = styled.div<BaseModalProps>`
  ${({ $size }) => ModalSizeStyles[$size]};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex['modal-backdrop']};
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
`;

export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: var(--modal-max-w);
  padding: 2.5rem 2.5rem 3rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: ${({ theme }) => theme.zIndex.modal};
  animation: ${SLIDE_UP} 0.25s ease-in;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  padding: 0.25rem;
  border-radius: 9999px;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

export const ModalTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const ModalSubtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;
