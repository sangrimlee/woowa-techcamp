import { useContext } from 'react';
import { ModalContext } from 'contexts/ModalContext';

export function useModalContext() {
  const { modalState, setModalState } = useContext(ModalContext);

  if (!modalState || !setModalState) {
    throw new Error(`Modal Provider를 찾지 못했습니다.`);
  }
  return { modalState, setModalState };
}
