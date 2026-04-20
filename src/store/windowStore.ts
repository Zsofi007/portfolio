import { pickActiveFromStack, withoutStackId } from '@/store/windowStackUtils';
import type { WindowBounds } from '@/types/geometry';
import type { WindowRecord } from '@/types/window';
import { getInitialWindowBoundsForApp } from '@/utils/defaultWindowBounds';
import { newId } from '@/utils/newId';
import { create } from 'zustand';

type WindowMap = Record<string, WindowRecord>;

export type WindowStore = {
  windows: WindowMap;
  stack: string[];
  activeWindowId: string | null;
  openWindow: (p: { appId: string; title: string }) => string;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  moveWindow: (id: string, next: WindowBounds) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  closeAllWindows: () => void;
};

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  stack: [],
  activeWindowId: null,

  openWindow: ({ appId, title }) => {
    const { windows, stack } = get();
    const existing = Object.values(windows).find((w) => w.appId === appId);
    if (existing) {
      if (existing.chromeState === 'minimized') get().restoreWindow(existing.id);
      get().focusWindow(existing.id);
      return existing.id;
    }
    const id = newId();
    const n = Object.keys(windows).length;
    const bounds = getInitialWindowBoundsForApp(appId, n);
    const rec: WindowRecord = {
      id,
      appId,
      title,
      bounds,
      chromeState: 'normal',
    };
    set({
      windows: { ...windows, [id]: rec },
      stack: [...withoutStackId(stack, id), id],
      activeWindowId: id,
    });
    return id;
  },

  closeWindow: (id) => {
    const { windows, stack } = get();
    if (!windows[id]) return;
    const nextW = { ...windows };
    delete nextW[id];
    const nextStack = withoutStackId(stack, id);
    set({
      windows: nextW,
      stack: nextStack,
      activeWindowId: pickActiveFromStack(nextStack, nextW),
    });
  },

  focusWindow: (id) => {
    const { windows } = get();
    const w = windows[id];
    if (!w) return;
    if (w.chromeState === 'minimized') get().restoreWindow(id);
    get().bringToFront(id);
    set({ activeWindowId: id });
  },

  bringToFront: (id) => {
    const { stack } = get();
    if (!stack.includes(id)) return;
    set({ stack: [...withoutStackId(stack, id), id] });
  },

  moveWindow: (id, nextBounds) => {
    const w = get().windows[id];
    if (!w || w.chromeState !== 'normal') return;
    set({ windows: { ...get().windows, [id]: { ...w, bounds: nextBounds } } });
  },

  minimizeWindow: (id) => {
    const { windows, stack } = get();
    const w = windows[id];
    if (!w) return;
    const nextW = { ...windows, [id]: { ...w, chromeState: 'minimized' as const } };
    set({
      windows: nextW,
      activeWindowId: pickActiveFromStack(stack, nextW),
    });
  },

  maximizeWindow: (id) => {
    const w = get().windows[id];
    if (!w || w.chromeState === 'minimized') return;
    if (w.chromeState === 'maximized') return;
    set({
      windows: {
        ...get().windows,
        [id]: {
          ...w,
          chromeState: 'maximized',
          preMaxBounds: w.bounds,
        },
      },
    });
  },

  restoreWindow: (id) => {
    const w = get().windows[id];
    if (!w) return;
    if (w.chromeState === 'minimized') {
      const { windows } = get();
      set({
        windows: { ...windows, [id]: { ...w, chromeState: 'normal' } },
        activeWindowId: id,
      });
      get().bringToFront(id);
      return;
    }
    if (w.chromeState === 'maximized' && w.preMaxBounds) {
      set({
        windows: {
          ...get().windows,
          [id]: {
            ...w,
            chromeState: 'normal',
            bounds: w.preMaxBounds,
            preMaxBounds: undefined,
          },
        },
      });
    }
  },

  closeAllWindows: () => set({ windows: {}, stack: [], activeWindowId: null }),
}));
