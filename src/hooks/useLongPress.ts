import { useCallback, useRef } from 'react';

type Options = { ms?: number; moveTolerance?: number };

export function useLongPress(onLongPress: () => void, { ms = 650, moveTolerance = 14 }: Options = {}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const originRef = useRef<{ x: number; y: number } | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    originRef.current = null;
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      originRef.current = { x: e.clientX, y: e.clientY };
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        originRef.current = null;
        onLongPress();
      }, ms);
    },
    [ms, onLongPress],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (timerRef.current === null || !originRef.current) return;
      const dx = e.clientX - originRef.current.x;
      const dy = e.clientY - originRef.current.y;
      if (dx * dx + dy * dy > moveTolerance * moveTolerance) clearTimer();
    },
    [clearTimer, moveTolerance],
  );

  const end = useCallback(() => clearTimer(), [clearTimer]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: end,
    onPointerCancel: end,
    onPointerLeave: end,
  };
}
