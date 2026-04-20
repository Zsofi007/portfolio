import { MobileNotificationRows } from '@/components/mobile/MobileNotificationRows';
import { useMobileNotificationStore } from '@/store/mobileNotificationStore';
import { useWallpaperStore } from '@/store/wallpaperStore';
import { useEffect, useRef, useState } from 'react';

const CLEAR_MS = 200;

type MobileNotificationPanelProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNotificationPanel({ open, onClose }: MobileNotificationPanelProps) {
  const items = useMobileNotificationStore((s) => s.items);
  const dismiss = useMobileNotificationStore((s) => s.dismiss);
  const clearAll = useMobileNotificationStore((s) => s.clearAll);
  const cycleWallpaper = useWallpaperStore((s) => s.cycleWallpaper);
  const addNote = useMobileNotificationStore((s) => s.add);

  const [exitingIds, setExitingIds] = useState<Set<string>>(() => new Set());
  const [listFading, setListFading] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!open) {
      setExitingIds(new Set());
      setListFading(false);
    }
  }, [open]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    },
    [],
  );

  const queueTimer = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      fn();
      timers.current = timers.current.filter((t) => t !== id);
    }, ms);
    timers.current.push(id);
  };

  if (!open) return null;

  const onWallpaperRow = () => {
    cycleWallpaper();
    addNote({
      id: `wallpaper-${Date.now()}`,
      title: 'Wallpaper',
      body: 'Background updated.',
    });
  };

  const onClearOne = (id: string) => {
    setExitingIds((prev) => new Set(prev).add(id));
    queueTimer(() => {
      dismiss(id);
      setExitingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, CLEAR_MS);
  };

  const onClearAll = () => {
    if (items.length === 0) return;
    setListFading(true);
    queueTimer(() => {
      clearAll();
      setListFading(false);
      setExitingIds(new Set());
    }, CLEAR_MS);
  };

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Notifications">
      <button
        type="button"
        aria-label="Close notifications"
        className="absolute inset-0 border-0 bg-black/35 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={
          'absolute bottom-0 left-0 right-0 z-10 flex max-h-[min(72dvh,520px)] flex-col overflow-hidden ' +
          'rounded-t-[1.35rem] bg-[#f2f2f7]/[0.97] shadow-[0_-12px_48px_rgb(0_0_0/0.35)]'
        }
      >
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <h2 className="m-0 font-sans text-[17px] font-semibold tracking-tight text-black">Notifications</h2>
          {items.length > 0 ? (
            <button
              type="button"
              className="rounded-full px-3 py-1 font-sans text-[15px] font-medium text-[#007aff] transition-opacity duration-200 disabled:opacity-40"
              disabled={listFading}
              onClick={onClearAll}
            >
              Clear All
            </button>
          ) : null}
        </div>
        <div className="max-h-[min(52dvh,420px)] overflow-y-auto px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1">
          <button
            type="button"
            className={
              'mb-3 flex w-full items-center justify-between rounded-2xl border border-black/5 ' +
              'bg-white px-4 py-3 text-left font-sans shadow-sm outline-none ' +
              'active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#007aff]'
            }
            onClick={onWallpaperRow}
          >
            <div>
              <p className="m-0 text-[15px] font-semibold text-black">Change wallpaper</p>
              <p className="m-0 mt-0.5 text-[13px] text-black/55">Cycles your home screen background</p>
            </div>
            <span className="text-xl" aria-hidden>
              🖼
            </span>
          </button>
          <MobileNotificationRows
            items={items}
            exitingIds={exitingIds}
            listFading={listFading}
            onClearOne={onClearOne}
          />
        </div>
      </div>
    </div>
  );
}
