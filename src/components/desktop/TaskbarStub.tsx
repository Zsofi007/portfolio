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
import { useThemeStore } from '@/store/themeStore';
import { useMemo } from 'react';
type TaskbarStubProps = { onReturnHome: () => void };

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
  const themeMode = useThemeStore((s) => s.mode);
  const cycleThemeMode = useThemeStore((s) => s.cycleMode);

  const searchShortcut = useMemo(() => {
    const isMac = navigator.platform.toLowerCase().includes('mac');
    return isMac ? '⌘K' : 'Ctrl+K';
  }, []);
  return (
    <div
      role="toolbar"
      aria-label="Open windows and desktop layout"
      className={
        'z-50 flex min-h-12 w-full shrink-0 items-center gap-2 border-t px-2 py-1 font-retro ' +
        'border-[var(--ui-border-soft)] bg-[var(--ui-glass)] shadow-[var(--ui-shadow-md)] backdrop-blur-[12px]'
      }
    >
      <button
        type="button"
        aria-label="Return to welcome screen"
        title="Home"
        className={
          'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border bg-white/55 text-retro-ink ui-pressable ' +
          'outline-none hover:bg-white/70 focus-visible:outline focus-visible:outline-2'
        }
        style={{ borderColor: 'var(--ui-border-soft)', outlineColor: 'var(--ui-focus)', color: 'var(--ui-text)' }}
        onClick={onReturnHome}
      >
        <AppIconGlyph icon="/xp-icons/ie-home.png" imgClassName="h-6 w-6 object-contain" />
      </button>
      <button
        type="button"
        aria-label={`Search (Command palette). Shortcut: ${searchShortcut}`}
        title={`Search (${searchShortcut})`}
        className={
          'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border bg-white/55 ui-pressable ' +
          'outline-none hover:bg-white/70 focus-visible:outline focus-visible:outline-2'
        }
        style={{ borderColor: 'var(--ui-border-soft)', outlineColor: 'var(--ui-focus)', color: 'var(--ui-text)' }}
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
          const iconClassName = `h-6 w-6 object-contain${isActive ? ' brightness-100' : ' brightness-90'}`;

          const btn = (
            <button
              key={id}
              type="button"
              aria-label={isMin ? `${label}, minimized` : label}
              aria-current={isActive ? 'true' : undefined}
              className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border text-lg font-bold outline-none ui-pressable ${
                isActive ? 'bg-white/80' : 'bg-white/40 hover:bg-white/55'
              } ${isMin ? 'opacity-65' : ''}`}
              style={{ borderColor: 'var(--ui-border-soft)', outlineColor: 'var(--ui-focus)', color: 'var(--ui-text)' }}
              onClick={() => focusWindow(id)}
            >
              <span aria-hidden className="flex h-full w-full items-center justify-center select-none">
                <AppIconGlyph
                  icon={glyph}
                  imgClassName={iconClassName}
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
            'shrink-0 cursor-pointer rounded-md border bg-white/55 px-2 py-1 text-base font-normal ui-pressable ' +
            'hover:bg-white/70 focus-visible:outline focus-visible:outline-2'
          }
          style={{ borderColor: 'var(--ui-border-soft)', outlineColor: 'var(--ui-focus)', color: 'var(--ui-text)' }}
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
        className={`shrink-0 cursor-pointer rounded-md border px-2 py-1 font-retro text-base outline-none ui-pressable bg-[color:var(--ui-glass-strong)] hover:bg-[color:var(--ui-glass)] ${guidedMode ? 'brightness-110' : ''}`}
        style={{ borderColor: 'var(--ui-border-soft)', outlineColor: 'var(--ui-focus)', color: 'var(--ui-text)' }}
        onClick={() => setGuidedMode(!guidedMode)}
      >
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className={`h-2 w-2 rounded-full border ${guidedMode ? 'opacity-100' : 'opacity-35'}`}
            style={{ background: guidedMode ? 'var(--ui-cta-bg)' : 'transparent', borderColor: 'var(--ui-border-soft)' }}
          />
          Guided
        </span>
      </button>
      <button
        type="button"
        aria-label={`Theme: ${themeMode}. Click to change.`}
        title={`Theme: ${themeMode}`}
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border bg-[color:var(--ui-glass-strong)] ui-pressable hover:bg-[color:var(--ui-glass)] focus-visible:outline focus-visible:outline-2"
        style={{ borderColor: 'var(--ui-border-soft)', outlineColor: 'var(--ui-focus)', color: 'var(--ui-text)' }}
        onClick={() => cycleThemeMode()}
      >
        <AppIconGlyph
          icon={themeMode === 'dark' ? 'fa:FaMoon' : themeMode === 'light' ? 'fa:FaSun' : 'fa:FaDesktop'}
          imgClassName="h-5 w-5 object-contain"
          textClassName="text-lg"
        />
      </button>
      <TaskbarClock />
    </div>
  );
}
