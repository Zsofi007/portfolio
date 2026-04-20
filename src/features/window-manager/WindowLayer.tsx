import { closeWindowWithFocus } from '@/features/window-manager/closeWindowWithFocus';
import { WindowFrame } from '@/features/window-manager/WindowFrame';
import { useShellUiStore } from '@/store/shellUiStore';
import { useAppStore } from '@/store/appStore';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const BASE_Z = 40;

export function WindowLayer() {
  const stack = useAppStore((s) => s.stack);
  const windows = useAppStore((s) => s.windows);
  const activeWindowId = useAppStore((s) => s.activeWindowId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (useShellUiStore.getState().contextMenu) {
        useShellUiStore.getState().closeContextMenu();
        e.preventDefault();
        return;
      }
      const id = useAppStore.getState().activeWindowId;
      if (id) closeWindowWithFocus(id);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none absolute inset-0">
      <div className="pointer-events-none relative h-full w-full">
        <AnimatePresence>
          {stack
            .filter((id) => {
              const w = windows[id];
              return Boolean(w && w.chromeState !== 'minimized');
            })
            .map((id) => (
              <WindowFrame
                key={id}
                windowId={id}
                zIndex={BASE_Z + stack.indexOf(id)}
                isActive={activeWindowId === id}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
