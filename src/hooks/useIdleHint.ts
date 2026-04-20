import { useShellUiStore } from '@/store/shellUiStore';
import { useEffect, useRef } from 'react';

type UseIdleHintOptions = {
  delayMs?: number;
  message?: string;
};

export function useIdleHint(opts: UseIdleHintOptions = {}) {
  const { delayMs = 5000, message = 'Try opening Projects.' } = opts;
  const firedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const reset = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        if (firedRef.current) return;
        firedRef.current = true;
        useShellUiStore.getState().pushToast(message);
      }, delayMs);
    };

    const onAny = () => {
      if (firedRef.current) return;
      reset();
    };

    reset();
    document.addEventListener('pointerdown', onAny, { passive: true });
    document.addEventListener('keydown', onAny);
    document.addEventListener('pointermove', onAny, { passive: true });

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      document.removeEventListener('pointerdown', onAny);
      document.removeEventListener('keydown', onAny);
      document.removeEventListener('pointermove', onAny);
    };
  }, [delayMs, message]);
}

