import { useLiveClock } from '@/hooks/useLiveClock';
import { ClockPopover } from '@/components/system/ClockPopover';
import { useEffect, useId, useRef, useState } from 'react';

export function TaskbarClock() {
  const now = useLiveClock(60_000);
  const popoverId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const datePart = now.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timePart = now.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-label="Clock"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        className="font-sans shrink-0 cursor-pointer rounded-md px-2 py-1 text-right text-[13px] leading-tight tabular-nums outline-none ui-pressable hover:bg-white/20 focus-visible:outline focus-visible:outline-2"
        style={{
          borderColor: 'var(--ui-border-soft)',
          outlineColor: 'var(--ui-focus)',
          color: 'var(--ui-text-muted)',
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <time dateTime={now.toISOString()}>
          {datePart} · {timePart}
        </time>
      </button>
      {open ? <ClockPopover id={popoverId} dateLabel={datePart} timeLabel={timePart} /> : null}
    </div>
  );
}
