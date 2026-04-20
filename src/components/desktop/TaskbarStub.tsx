import { TaskbarClock } from '@/components/desktop/TaskbarClock';
import { Recents } from '@/components/system/Recents';
import { AppIconGlyph } from '@/components/icons/AppIconGlyph';
import { Tooltip } from '@/components/system/Tooltip';
import { getAppTooltipCopy } from '@/data/tooltips';
import { getDesktopAppById } from '@/features/desktop-system/desktopApps';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import { useIconLayoutStore } from '@/store/iconLayoutStore';
import { useAppStore } from '@/store/appStore';
import { useShellUiStore } from '@/store/shellUiStore';
import { useMemo } from 'react';

type TaskbarStubProps = {
  onReturnHome: () => void;
};

export function TaskbarStub({ onReturnHome }: TaskbarStubProps) {
  const stack = useAppStore((s) => s.stack);
  const windows = useAppStore((s) => s.windows);
  const activeWindowId = useAppStore((s) => s.activeWindowId);
  const focusWindow = useAppStore((s) => s.focusWindow);
  const iconLayoutDirty = useIconLayoutStore((s) => s.isDirty);
  const resetIconPositions = useIconLayoutStore((s) => s.resetPositions);
  const guidedMode = useGuidancePrefsStore((s) => s.guidedMode);
  const setGuidedMode = useGuidancePrefsStore((s) => s.setGuidedMode);
  const openCommandPalette = useShellUiStore((s) => s.openCommandPalette);

  const searchShortcut = useMemo(() => {
    const isMac = navigator.platform.toLowerCase().includes('mac');
    return isMac ? '⌘K' : 'Ctrl+K';
  }, []);

  return (
    <div
      role="toolbar"
      aria-label="Open windows and desktop layout"
      className={
        'z-50 flex min-h-12 w-full shrink-0 items-center gap-2 border-t-2 border-white px-2 py-1 ' +
        'bg-gradient-to-b from-retro-taskbar-top to-retro-taskbar-mid font-retro'
      }
    >
      <button
        type="button"
        aria-label="Return to welcome screen"
        title="Home"
        className={
          'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border-2 border-black/25 bg-xp-panel ' +
          'text-retro-ink outline-none hover:bg-white focus-visible:outline focus-visible:outline-2 ' +
          'focus-visible:outline-black'
        }
        onClick={onReturnHome}
      >
        <AppIconGlyph icon="/xp-icons/ie-home.png" imgClassName="h-6 w-6 object-contain" />
      </button>
      <button
        type="button"
        aria-label={`Search (Command palette). Shortcut: ${searchShortcut}`}
        title={`Search (${searchShortcut})`}
        className={
          'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border-2 border-black/25 bg-xp-panel ' +
          'text-retro-ink outline-none hover:bg-white focus-visible:outline focus-visible:outline-2 ' +
          'focus-visible:outline-black'
        }
        onClick={openCommandPalette}
      >
        <AppIconGlyph icon="fa:FaSearch" imgClassName="h-5 w-5 object-contain" textClassName="text-lg" />
      </button>
      <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
        {stack.map((id) => {
          const w = windows[id];
          if (!w) return null;
          const app = getDesktopAppById(w.appId);
          const isMin = w.chromeState === 'minimized';
          const isActive = activeWindowId === id && !isMin;
          const label = app?.label ?? w.title;
          const glyph = app?.icon ?? w.title.slice(0, 1).toUpperCase();
          const tip = app ? getAppTooltipCopy(app.id) : undefined;
          const taskbarTip = tip ? `${label} → ${tip}` : label;

          const btn = (
            <button
              key={id}
              type="button"
              aria-label={isMin ? `${label}, minimized` : label}
              aria-current={isActive ? 'true' : undefined}
              className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border-2 border-black/30 text-lg font-bold text-retro-ink outline-none transition ${
                isActive
                  ? 'bg-retro-titlebar-mid text-white ring-2 ring-black'
                  : 'bg-xp-panel hover:bg-white'
              } ${isMin ? 'opacity-70' : ''}`}
              onClick={() => focusWindow(id)}
            >
              <span aria-hidden className="flex h-full w-full items-center justify-center select-none">
                <AppIconGlyph
                  icon={glyph}
                  imgClassName="h-6 w-6 object-contain"
                  textClassName="text-lg font-bold"
                />
              </span>
            </button>
          );
          return <Tooltip content={taskbarTip}>{btn}</Tooltip>;
        })}
      </div>
      <Recents max={5} />
      {iconLayoutDirty && (
        <button
          type="button"
          className={
            'shrink-0 cursor-pointer border-2 border-black/30 bg-xp-panel px-2 py-1 text-base font-normal text-retro-ink ' +
            'hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-black'
          }
          onClick={() => resetIconPositions()}
        >
          Reset icons
        </button>
      )}
      <button
        type="button"
        aria-pressed={guidedMode}
        aria-label={guidedMode ? 'Guided mode on' : 'Guided mode off'}
        title={guidedMode ? 'Guided mode on' : 'Guided mode off'}
        className={
          'shrink-0 cursor-pointer border-2 border-black/30 px-2 py-1 font-retro text-base outline-none ' +
          (guidedMode
            ? 'bg-retro-titlebar-mid text-white hover:bg-retro-titlebar-deep focus-visible:ring-2 focus-visible:ring-black'
            : 'bg-xp-panel text-retro-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-black')
        }
        onClick={() => setGuidedMode(!guidedMode)}
      >
        Guided
      </button>
      <TaskbarClock />
    </div>
  );
}
