import { useEffect, useState } from 'react';

interface UseTimerProps {
  callback: () => void;
  second?: number;
  isListen?: boolean;
}

const useTimer = ({ callback, second = 5, isListen = false }: UseTimerProps) => {
  const [time, setTime] = useState<number>(second);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      callback();
    }

    const resetTime = () => {
      setTime(second);
    };
    if (isListen) {
      window.addEventListener('pointerdown', resetTime);
    }
    return () => {
      if (isListen) {
        window.removeEventListener('pointerdown', resetTime);
      }
    };
  }, [time, callback, second, isListen]);

  return time;
};

export default useTimer;
