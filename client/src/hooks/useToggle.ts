import { useCallback, useState } from 'react';

type UseToggleReturns = [boolean, () => void];

export default function useToggle(initialValue = false): UseToggleReturns {
  const [state, setState] = useState<boolean>(initialValue);
  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, [setState]);

  return [state, toggle];
}
