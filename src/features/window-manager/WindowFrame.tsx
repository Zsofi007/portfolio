import { TitleBar } from '@/components/window/TitleBar';
import { WindowControls } from '@/components/window/WindowControls';
import { closeWindowWithFocus } from '@/features/window-manager/closeWindowWithFocus';
import { WindowContentRouter } from '@/features/window-manager/WindowContentRouter';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useWindowDrag } from '@/hooks/useWindowDrag';
import { useAppStore } from '@/store/appStore';
import { motion, useReducedMotion } from 'framer-motion';
import { memo, useEffect, useId, useRef } from 'react';

type WindowFrameProps = {
  windowId: string;
  zIndex: number;
  isActive: boolean;
};

export const WindowFrame = memo(function WindowFrame({ windowId, zIndex, isActive }: WindowFrameProps) {
  const w = useAppStore((s) => s.windows[windowId]);
  const minimizeWindow = useAppStore((s) => s.minimizeWindow);
  const maximizeWindow = useAppStore((s) => s.maximizeWindow);
  const restoreWindow = useAppStore((s) => s.restoreWindow);
  const focusWindow = useAppStore((s) => s.focusWindow);
  const rootRef = useRef<HTMLDivElement>(null);
  const lastWRef = useRef<typeof w | null>(null);
  const reactId = useId();
  const titleId = `${reactId}-title`;
  const reducedMotion = useReducedMotion();

  if (w) lastWRef.current = w;
  const effectiveW = w ?? lastWRef.current;

  const dragEnabled = effectiveW?.chromeState === 'normal';
  const drag = useWindowDrag(windowId, Boolean(dragEnabled && effectiveW));

  const chromeState = effectiveW?.chromeState;
  useEffect(() => {
    if (!isActive || !effectiveW || chromeState === 'minimized') return;
    rootRef.current?.focus({ preventScroll: true });
  }, [isActive, effectiveW, chromeState]);

  useFocusTrap(rootRef, Boolean(isActive && effectiveW && chromeState !== 'minimized'));

  if (!effectiveW) return null;

  const isMax = effectiveW.chromeState === 'maximized';
  const positionClass = isMax ? 'fixed inset-x-3 top-3 bottom-14' : 'absolute';
  const style = isMax
    ? { zIndex }
    : {
        zIndex,
        left: effectiveW.bounds.x,
        top: effectiveW.bounds.y,
        width: effectiveW.bounds.width,
        height: effectiveW.bounds.height,
      };

  return (
    <motion.div
      ref={rootRef}
      role="dialog"
      aria-modal={isActive}
      aria-labelledby={titleId}
      tabIndex={-1}
      layout={false}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
      transition={reducedMotion ? { duration: 0.1 } : { duration: 0.16, ease: 'easeOut' }}
      className={`pointer-events-auto ${positionClass} flex flex-col overflow-hidden rounded-none border-2 border-[#5a5a5a] bg-xp-panel outline-none ${
        isActive ? 'ring-2 ring-black' : 'ring-1 ring-black/50'
      }`}
      style={style}
      onPointerDown={() => focusWindow(windowId)}
    >
      <TitleBar
        titleId={titleId}
        title={effectiveW.title}
        dragProps={dragEnabled ? drag : noopDrag}
        controls={
          <WindowControls
            isMaximized={isMax}
            onMinimize={() => minimizeWindow(windowId)}
            onMaximize={() => maximizeWindow(windowId)}
            onRestore={() => restoreWindow(windowId)}
            onClose={() => closeWindowWithFocus(windowId)}
          />
        }
      />
      <div
        className="flex min-h-0 flex-1 flex-col overflow-hidden border-t-2 border-black/15 text-sm text-retro-ink"
        inert={!isActive ? true : undefined}
      >
        <WindowContentRouter windowId={windowId} appId={effectiveW.appId} loadPreview={isActive} />
      </div>
    </motion.div>
  );
});

const noopDrag = {
  onPointerDown: () => {},
  onPointerMove: () => {},
  onPointerUp: () => {},
  onPointerCancel: () => {},
};
