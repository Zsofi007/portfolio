import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type TooltipPlacement = 'top' | 'bottom';

type TooltipProps = {
  content: string;
  children: ReactNode;
  placement?: TooltipPlacement;
  /** Optional extra class for the wrapper (rare). */
  className?: string;
};

type FixedPos = { left: number; top: number };

const MARGIN_PX = 8;
const GAP_PX = 8;

export function Tooltip({ content, children, placement = 'top', className }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<FixedPos | null>(null);

  const canUseDom = typeof window !== 'undefined' && typeof document !== 'undefined';

  const tooltipClassName = useMemo(() => {
    return (
      'pointer-events-none fixed z-[250] w-max max-w-[15rem] ' +
      'rounded-sm border border-black/60 bg-[#ffffe8] px-2 py-1 font-retro text-base leading-tight text-retro-ink ' +
      'shadow-[var(--ui-shadow-sm)]'
    );
  }, []);

  const compute = () => {
    const anchor = anchorRef.current;
    const tip = tipRef.current;
    if (!anchor || !tip) return;

    const a = anchor.getBoundingClientRect();
    const t = tip.getBoundingClientRect();

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const idealLeft = a.left + a.width / 2 - t.width / 2;
    const left = Math.max(MARGIN_PX, Math.min(vw - MARGIN_PX - t.width, idealLeft));

    const preferTop = placement === 'top';
    const topWhenAbove = a.top - GAP_PX - t.height;
    const topWhenBelow = a.bottom + GAP_PX;

    const fitsAbove = topWhenAbove >= MARGIN_PX;
    const fitsBelow = topWhenBelow + t.height <= vh - MARGIN_PX;

    const top = preferTop
      ? fitsAbove
        ? topWhenAbove
        : topWhenBelow
      : fitsBelow
        ? topWhenBelow
        : topWhenAbove;

    setPos({ left, top });
  };

  useLayoutEffect(() => {
    if (!canUseDom) return;
    if (!open) return;
    // First pass: portal renders, then measure & clamp.
    compute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, content, placement, canUseDom]);

  useEffect(() => {
    if (!canUseDom) return;
    if (!open) return;

    const onAny = () => compute();
    window.addEventListener('resize', onAny);
    window.addEventListener('scroll', onAny, true);
    return () => {
      window.removeEventListener('resize', onAny);
      window.removeEventListener('scroll', onAny, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, canUseDom]);

  return (
    <span
      ref={anchorRef}
      className={`inline-flex ${className ?? ''}`.trim()}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={() => setOpen(false)}
      aria-describedby={open ? id : undefined}
    >
      {children}
      {open && canUseDom
        ? createPortal(
            <span
              ref={tipRef}
              id={id}
              role="tooltip"
              className={tooltipClassName}
              style={pos ? { left: pos.left, top: pos.top } : { left: -9999, top: -9999 }}
            >
              {content}
            </span>,
            document.body
          )
        : null}
    </span>
  );
}

