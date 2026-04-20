import { pickActiveFromStack, withoutStackId } from '@/store/windowStackUtils';
import { computeOpenWindows, type AppState, type WindowMap } from '@/store/appStoreTypes';
import type { WindowBounds } from '@/types/geometry';
import type { WindowRecord } from '@/types/window';
import { getInitialWindowBoundsForApp } from '@/utils/defaultWindowBounds';
import { newId } from '@/utils/newId';

type SetFn = (
  partial: AppState | Partial<AppState> | ((s: AppState) => AppState | Partial<AppState>),
  replace?: boolean,
) => void;
type GetFn = () => AppState;

export function createWindowActions(set: SetFn, get: GetFn) {
  const setWindowsAndStack = (windows: WindowMap, stack: string[], activeWindowId: string | null) =>
    set({ windows, stack, activeWindowId, openWindows: computeOpenWindows(windows, stack) });

  const openWindow = ({ appId, title }: { appId: string; title: string }) => {
    const { windows, stack } = get();
    const existing = Object.values(windows).find((w) => w.appId === appId);
    if (existing) {
      if (existing.chromeState === 'minimized') restoreWindow(existing.id);
      focusWindow(existing.id);
      return existing.id;
    }

    const id = newId();
    const n = Object.keys(windows).length;
    const bounds = getInitialWindowBoundsForApp(appId, n);
    const rec: WindowRecord = { id, appId, title, bounds, chromeState: 'normal' };
    const nextWindows = { ...windows, [id]: rec };
    const nextStack = [...withoutStackId(stack, id), id];
    setWindowsAndStack(nextWindows, nextStack, id);
    return id;
  };

  const closeWindow = (id: string) => {
    const { windows, stack } = get();
    if (!windows[id]) return;
    const nextW = { ...windows };
    delete nextW[id];
    const nextStack = withoutStackId(stack, id);
    setWindowsAndStack(nextW, nextStack, pickActiveFromStack(nextStack, nextW));
  };

  const bringToFront = (id: string) => {
    const { windows, stack } = get();
    if (!stack.includes(id)) return;
    const nextStack = [...withoutStackId(stack, id), id];
    set({ stack: nextStack, openWindows: computeOpenWindows(windows, nextStack) });
  };

  const focusWindow = (id: string) => {
    const { windows } = get();
    const w = windows[id];
    if (!w) return;
    if (w.chromeState === 'minimized') restoreWindow(id);
    bringToFront(id);
    set({ activeWindowId: id });
  };

  const moveWindow = (id: string, nextBounds: WindowBounds) => {
    const w = get().windows[id];
    if (!w || w.chromeState !== 'normal') return;
    const nextWindows = { ...get().windows, [id]: { ...w, bounds: nextBounds } };
    set({ windows: nextWindows, openWindows: computeOpenWindows(nextWindows, get().stack) });
  };

  const minimizeWindow = (id: string) => {
    const { windows, stack } = get();
    const w = windows[id];
    if (!w) return;
    const nextW = { ...windows, [id]: { ...w, chromeState: 'minimized' as const } };
    setWindowsAndStack(nextW, stack, pickActiveFromStack(stack, nextW));
  };

  const maximizeWindow = (id: string) => {
    const w = get().windows[id];
    if (!w || w.chromeState === 'minimized') return;
    if (w.chromeState === 'maximized') return;
    const nextWindows = {
      ...get().windows,
      [id]: { ...w, chromeState: 'maximized' as const, preMaxBounds: w.bounds },
    };
    set({ windows: nextWindows, openWindows: computeOpenWindows(nextWindows, get().stack) });
  };

  const restoreWindow = (id: string) => {
    const w = get().windows[id];
    if (!w) return;
    if (w.chromeState === 'minimized') {
      const nextWindows = { ...get().windows, [id]: { ...w, chromeState: 'normal' as const } };
      set({ windows: nextWindows, activeWindowId: id, openWindows: computeOpenWindows(nextWindows, get().stack) });
      bringToFront(id);
      return;
    }
    if (w.chromeState === 'maximized' && w.preMaxBounds) {
      const nextWindows = {
        ...get().windows,
        [id]: { ...w, chromeState: 'normal' as const, bounds: w.preMaxBounds, preMaxBounds: undefined },
      };
      set({ windows: nextWindows, openWindows: computeOpenWindows(nextWindows, get().stack) });
    }
  };

  return {
    openWindow,
    closeWindow,
    focusWindow,
    bringToFront,
    moveWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    closeAllWindows: () => setWindowsAndStack({}, [], null),
  };
}

