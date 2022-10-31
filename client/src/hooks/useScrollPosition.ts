import { useEffect, useRef, useState } from 'react';

export default function useScrollPosition() {
  const element = useRef<HTMLElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    element.current = document.querySelector('main.scrollable');

    if (!element.current) {
      return;
    }

    const onChangeScrollPosition = () =>
      requestAnimationFrame(() => {
        if (element.current) {
          setScrollPosition(element.current.scrollTop);
        }
      });

    element.current.addEventListener('scroll', onChangeScrollPosition);

    return () => {
      if (element.current) {
        element.current.removeEventListener('scroll', onChangeScrollPosition);
      }
    };
  }, []);

  return scrollPosition;
}
