import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  id?: string;
  children: React.ReactNode;
}

export default function Portal({ id = 'modal', children }: PortalProps) {
  const modalElement = document.getElementById(id);

  if (!modalElement) {
    throw new Error("Can't find #modal Element");
  }

  return ReactDOM.createPortal(children, modalElement);
}
