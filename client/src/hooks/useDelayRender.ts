import { useState, useRef, useCallback } from 'react';

interface Options {
  enterDelay?: number;
  exitDelay?: number;
}

export default function useDelayedRender(
  active = false,
  { enterDelay = 0, exitDelay = 0 }: Options
) {
  const [, force] = useState<number>(0);
  const mounted = useRef(active);
  const rendered = useRef(false);
  const renderTimer = useRef<NodeJS.Timeout | null>(null);
  const unmountTimer = useRef<NodeJS.Timeout | null>(null);
  const prevActive = useRef(active);

  const recalculate = useCallback(() => {
    if (prevActive.current) {
      mounted.current = true;
      if (unmountTimer.current) clearTimeout(unmountTimer.current);

      if (enterDelay <= 0) {
        rendered.current = true;
      } else {
        if (renderTimer.current) return;
        renderTimer.current = setTimeout(() => {
          rendered.current = true;
          renderTimer.current = null;
          force((prev) => prev + 1);
        }, enterDelay);
      }
    } else {
      rendered.current = false;

      if (exitDelay <= 0) {
        mounted.current = false;
      } else {
        if (unmountTimer.current) return;

        unmountTimer.current = setTimeout(() => {
          mounted.current = false;
          unmountTimer.current = null;
          force((prev) => prev + 1);
        }, exitDelay);
      }
    }
  }, [enterDelay, exitDelay]);

  if (active !== prevActive.current) {
    prevActive.current = active;
    recalculate();
  }

  return {
    mounted: mounted.current,
    rendered: rendered.current,
  };
}
