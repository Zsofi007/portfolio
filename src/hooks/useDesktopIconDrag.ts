import { useIconLayoutStore } from '@/store/iconLayoutStore';
import { clampIconPosition } from '@/utils/clampIconPosition';
import { blockedSlotsForRect, posToSlot, nearestFreeSlot, slotToPos } from '@/utils/iconGrid';
import { useCallback, useRef } from 'react';

const DRAG_THRESHOLD_SQ = 36;

type UseDesktopIconDragOptions = {
  appId: string;
  onOpen: () => void;
};

export function useDesktopIconDrag({ appId, onOpen }: UseDesktopIconDragOptions) {
  const setPosition = useIconLayoutStore((s) => s.setPosition);
  const ctxRef = useRef<{
    startClientX: number;
    startClientY: number;
    originX: number;
    originY: number;
    dragging: boolean;
  } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      const pos = useIconLayoutStore.getState().positions[appId];
      if (!pos) return;
      e.preventDefault();
      ctxRef.current = {
        startClientX: e.clientX,
        startClientY: e.clientY,
        originX: pos.x,
        originY: pos.y,
        dragging: false,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [appId],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const dx = e.clientX - ctx.startClientX;
      const dy = e.clientY - ctx.startClientY;
      if (!ctx.dragging && dx * dx + dy * dy > DRAG_THRESHOLD_SQ) {
        ctx.dragging = true;
      }
      if (!ctx.dragging) return;
      const next = clampIconPosition(
        ctx.originX + dx,
        ctx.originY + dy,
        window.innerWidth,
        window.innerHeight,
      );
      const positions = useIconLayoutStore.getState().positions;
      const occupied = new Set<string>();
      for (const [id, pos] of Object.entries(positions)) {
        if (id === appId) continue;
        const s = posToSlot(pos.x, pos.y);
        occupied.add(`${s.col},${s.row}`);
      }
      const widget = document.querySelector<HTMLElement>('[data-desktop-obstacle="featured-project"]');
      if (widget) {
        const r = widget.getBoundingClientRect();
        for (const s of blockedSlotsForRect({ left: r.left, top: r.top, right: r.right, bottom: r.bottom }, window.innerWidth, window.innerHeight)) {
          occupied.add(`${s.col},${s.row}`);
        }
      }
      const target = posToSlot(next.x, next.y);
      const free = nearestFreeSlot(target, occupied, window.innerWidth, window.innerHeight);
      const placed = slotToPos(free);
      setPosition(appId, placed.x, placed.y);
    },
    [appId, setPosition],
  );

  const endPointer = useCallback(
    (e: React.PointerEvent) => {
      const ctx = ctxRef.current;
      ctxRef.current = null;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      if (ctx && !ctx.dragging) onOpen();
    },
    [onOpen],
  );

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: endPointer,
    onPointerCancel: endPointer,
    cursorClass: 'cursor-grab active:cursor-grabbing touch-none select-none',
  };
}
