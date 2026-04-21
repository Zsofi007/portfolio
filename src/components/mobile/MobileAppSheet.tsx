import { MobileLockIcon } from '@/components/mobile/MobileLockIcon';
import { WindowContentRouter } from '@/features/window-manager/WindowContentRouter';
import {
  MobileSheetNavProvider,
  type MobileSheetNavContextValue,
} from '@/features/mobile/mobileSheetNavContext';
import type { DesktopApp } from '@/types/desktop-app';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

type MobileAppSheetProps = {
  app: DesktopApp | null;
  onClose: () => void;
  onLock: () => void;
};

export function MobileAppSheet({ app, onClose, onLock }: MobileAppSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const open = Boolean(app);
  const [stack, setStack] = useState<DesktopApp[]>([]);
  const stackRef = useRef(stack);
  stackRef.current = stack;

  useEffect(() => {
    if (app) setStack([]);
  }, [app]);

  const pushChild = useCallback<MobileSheetNavContextValue['pushChild']>(
    (child) => {
      setStack((s) => {
        const base = s.length > 0 ? s : app ? [app] : [];
        return [...base, child];
      });
    },
    [app],
  );

  const navContextValue = useMemo<MobileSheetNavContextValue>(() => ({ pushChild }), [pushChild]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open, app?.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (stackRef.current.length > 0) {
        setStack((s) => s.slice(0, -1));
      } else {
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!app) return null;

  const active = stack.length > 0 ? stack[stack.length - 1] : app;

  const onBack = () => {
    if (stack.length > 0) setStack((s) => s.slice(0, -1));
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex min-h-0 flex-col font-sans">
      <button
        type="button"
        aria-label="Close app"
        className="absolute inset-0 border-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className={
          'relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden rounded-none bg-[#f2f2f7] ' +
          'shadow-[0_-8px_40px_rgb(0_0_0/0.45)]'
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="relative flex shrink-0 items-center justify-between gap-2 border-b border-black/[0.06] bg-white/90 px-2 py-2 backdrop-blur-xl">
          <button
            ref={closeRef}
            type="button"
            className="relative z-10 flex min-w-[4.5rem] items-center gap-0.5 rounded-lg px-2 py-1.5 text-[17px] font-medium text-[#007aff] outline-none hover:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-[#007aff]"
            onClick={onBack}
          >
            <span className="text-[22px] leading-none" aria-hidden>
              ‹
            </span>
            Back
          </button>
          <h2
            id={titleId}
            className={
              'pointer-events-none absolute left-1/2 top-1/2 z-0 max-w-[calc(100%-10.5rem)] -translate-x-1/2 -translate-y-1/2 truncate ' +
              'py-[1px] text-center text-[17px] font-semibold leading-[1.2] tracking-tight text-black'
            }
          >
            {active.label}
          </h2>
          <button
            type="button"
            aria-label="Lock and return to welcome screen"
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-black/70 outline-none hover:bg-black/[0.07] focus-visible:ring-2 focus-visible:ring-[#007aff]"
            onClick={onLock}
          >
            <MobileLockIcon className="h-6 w-6" />
          </button>
        </header>
        <MobileSheetNavProvider value={navContextValue}>
          <div className="flex min-h-0 flex-1 flex-col overflow-auto bg-[#f2f2f7]">
            <WindowContentRouter appId={active.id} loadPreview={true} variant="ios" />
          </div>
        </MobileSheetNavProvider>
      </div>
    </div>
  );
}
