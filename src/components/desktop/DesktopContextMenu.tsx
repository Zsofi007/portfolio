import { getDesktopAppById } from '@/features/desktop-system/desktopApps';
import { openOrFocusFromApp } from '@/features/desktop-system/openOrFocusFromApp';
import { useShellUiStore } from '@/store/shellUiStore';
import { useWallpaperStore } from '@/store/wallpaperStore';
import { useEffect, useMemo, useRef, useState } from 'react';

const item =
  'block w-full cursor-default border-0 bg-transparent px-3 py-2 text-left font-retro text-lg text-retro-ink ' +
  'hover:bg-xp-teal hover:text-white focus-visible:bg-xp-teal focus-visible:text-white focus-visible:outline-none';

export function DesktopContextMenu() {
  const menu = useShellUiStore((s) => s.contextMenu);
  const close = useShellUiStore((s) => s.closeContextMenu);
  const pushToast = useShellUiStore((s) => s.pushToast);
  const cycle = useWallpaperStore((s) => s.cycleWallpaper);
  const toggleSound = useShellUiStore((s) => s.toggleSound);
  const [activeIndex, setActiveIndex] = useState(0);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const run = (fn: () => void) => {
    fn();
    close();
  };

  const actions = useMemo(
    () => [
      {
        label: 'Open Terminal',
        onSelect: () => {
          const t = getDesktopAppById('terminal');
          if (t) openOrFocusFromApp(t);
        },
      },
      { label: 'Change wallpaper', onSelect: () => cycle() },
      { label: 'What is this?', onSelect: () => pushToast('A portfolio disguised as an operating system.') },
    ],
    [cycle, pushToast, toggleSound]
  );

  useEffect(() => {
    if (!menu) return;
    setActiveIndex(0);
    const t = window.setTimeout(() => btnRefs.current[0]?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [menu]);

  const clampIndex = (n: number) => {
    const max = actions.length - 1;
    return Math.max(0, Math.min(max, n));
  };

  const moveActive = (next: number) => {
    const idx = clampIndex(next);
    setActiveIndex(idx);
    btnRefs.current[idx]?.focus();
  };

  if (!menu) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className="fixed inset-0 z-[199] cursor-default bg-black/20"
        onClick={close}
        onKeyDown={(e) => {
          if (e.key === 'Escape') close();
        }}
      />
      <div
        role="menu"
        aria-label="Desktop actions"
        tabIndex={-1}
        className="fixed z-[200] min-w-[12rem] border-2 border-black bg-xp-panel/95 py-1 shadow-[var(--ui-shadow-md)] backdrop-blur-[2px]"
        style={{ left: menu.x, top: menu.y }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            close();
            return;
          }
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            moveActive(activeIndex + 1);
            return;
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            moveActive(activeIndex - 1);
            return;
          }
          if (e.key === 'Home') {
            e.preventDefault();
            moveActive(0);
            return;
          }
          if (e.key === 'End') {
            e.preventDefault();
            moveActive(actions.length - 1);
          }
        }}
      >
        {actions.map((a, idx) => (
          <button
            key={a.label}
            ref={(el) => {
              btnRefs.current[idx] = el;
            }}
            type="button"
            role="menuitem"
            tabIndex={idx === activeIndex ? 0 : -1}
            className={item}
            onMouseEnter={() => setActiveIndex(idx)}
            onClick={() => run(a.onSelect)}
          >
            {a.label}
          </button>
        ))}
      </div>
    </>
  );
}
