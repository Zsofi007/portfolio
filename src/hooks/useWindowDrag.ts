import { useAppStore } from '@/store/appStore';
import type { WindowBounds } from '@/types/geometry';
import { clampWindowPosition } from '@/utils/clampWindowPosition';
import { getSnapSide, getSnappedBounds } from '@/utils/windowSnap';
import { useCallback, useRef } from 'react';

type DragCtx = {
  startX: number;
  startY: number;
  orig: WindowBounds;
};

export function useWindowDrag(windowId: string, enabled: boolean) {
  const moveWindow = useAppStore((s) => s.moveWindow);
  const ctxRef = useRef<DragCtx | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled || e.button !== 0) return;
      const w = useAppStore.getState().windows[windowId];
      if (!w) return;
      e.preventDefault();
      ctxRef.current = { startX: e.clientX, startY: e.clientY, orig: w.bounds };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [enabled, windowId],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const dx = e.clientX - ctx.startX;
      const dy = e.clientY - ctx.startY;
      const next = clampWindowPosition(
        {
          ...ctx.orig,
          x: ctx.orig.x + dx,
          y: ctx.orig.y + dy,
        },
        window.innerWidth,
        window.innerHeight,
      );
      moveWindow(windowId, next);
    },
    [moveWindow, windowId],
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (ctxRef.current) {
      const snap = getSnapSide(e.clientX, window.innerWidth);
      if (snap) {
        const current = useAppStore.getState().windows[windowId];
        if (current?.chromeState === 'normal') {
          moveWindow(windowId, getSnappedBounds(snap, window.innerWidth, window.innerHeight, current.bounds));
        }
      }
      ctxRef.current = null;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  }, [moveWindow, windowId]);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp };
}
