import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './SideModal.styled';

export default function SideModal({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) {
      setTimeout(() => {
        if (!ref.current) return;
        ref.current.style.animation = 'none';
      }, 300);
    }
    setOpened(true);
  }, [opened]);

  return <Styled.SideModal ref={ref}>{children}</Styled.SideModal>;
}
