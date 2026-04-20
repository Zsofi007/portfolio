import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi2';

const THUMB = 52;
const PAD = 6;

type SlideToUnlockProps = { onUnlock: () => void };

export function SlideToUnlock({ onUnlock }: SlideToUnlockProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const xRef = useRef(0);
  const [maxX, setMaxX] = useState(0);
  const drag = useRef<{ startPointer: number; startX: number } | null>(null);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      setMaxX(Math.max(0, w - THUMB - PAD * 2));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const clamp = useCallback((v: number) => Math.min(Math.max(v, 0), maxX), [maxX]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    drag.current = { startPointer: e.clientX, startX: xRef.current };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const next = clamp(d.startX + e.clientX - d.startPointer);
    xRef.current = next;
    setX(next);
  };

  const endPointer = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if (!d) return;
    const current = xRef.current;
    const threshold = maxX > 0 ? maxX * 0.88 : 1;
    if (current >= threshold) onUnlock();
    xRef.current = 0;
    setX(0);
  };

  const ratio = maxX > 0 ? x / maxX : 0;

  return (
    <div className="w-full max-w-sm touch-none select-none">
      <button
        type="button"
        className="sr-only"
        onClick={onUnlock}
      >
        Unlock portfolio (keyboard shortcut)
      </button>
      <div
        ref={trackRef}
        className="relative h-14 w-full overflow-hidden rounded-full border border-white/15 bg-zinc-800/90 shadow-inner"
        style={{ boxShadow: 'inset 0 1px 3px rgb(0 0 0 / 0.5)' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="animate-pulse text-sm font-normal tracking-[0.2em] text-white/45">
            slide to unlock
          </span>
        </div>
        <div
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(ratio * 100)}
          aria-label="Slide to unlock"
          tabIndex={0}
          className="absolute top-1 flex h-[calc(100%-8px)] w-[52px] cursor-grab items-center justify-center rounded-full border border-white/30 bg-gradient-to-b from-white to-zinc-200 px-1 active:cursor-grabbing"
          style={{ left: PAD, transform: `translateX(${x}px)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onUnlock();
            }
          }}
        >
          <span className="flex text-zinc-500" aria-hidden>
            <HiChevronRight className="-mr-2 h-6 w-6" />
            <HiChevronRight className="-mr-2 h-6 w-6" />
            <HiChevronRight className="h-6 w-6" />
          </span>
        </div>
      </div>
    </div>
  );
}
