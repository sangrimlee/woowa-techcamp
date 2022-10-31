import React, { createContext, useState } from 'react';

interface ModalStateType {
  regionSelect: boolean;
  regionSearch: boolean;
  categorySelect: boolean;
}

const modalInitialState: ModalStateType = {
  regionSelect: false,
  regionSearch: false,
  categorySelect: false,
};

interface ModalContextType {
  modalState: ModalStateType | null;
  setModalState: React.Dispatch<React.SetStateAction<ModalStateType>> | null;
}

export const ModalContext = createContext<ModalContextType>({
  modalState: null,
  setModalState: null,
});

export function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState(modalInitialState);
  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>{children}</ModalContext.Provider>
  );
}
