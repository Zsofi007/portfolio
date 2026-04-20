import type { WindowRecord } from '@/types/window';

export type WindowMap = Record<string, WindowRecord>;

export type PersistedSessionV1 = {
  v: 1;
  windows: WindowMap;
  stack: string[];
  activeWindowId: string | null;
  recents: string[];
};

export const STORAGE_KEY = 'portfolio.session.v1';
export const MAX_RECENTS = 8;

export type AppState = {
  windows: WindowMap;
  stack: string[];
  activeWindowId: string | null;
  recents: string[];
  openWindows: WindowRecord[];

  openApp: (appId: string) => string | null;
  closeApp: (appId: string) => void;
  focusApp: (appId: string) => void;

  openWindow: (p: { appId: string; title: string }) => string;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  moveWindow: (id: string, next: import('@/types/geometry').WindowBounds) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  closeAllWindows: () => void;

  addRecent: (appId: string) => void;
  restoreSession: () => void;
  persistSession: () => void;
};

export function computeOpenWindows(windows: WindowMap, stack: string[]): WindowRecord[] {
  return stack.map((id) => windows[id]).filter(Boolean);
}

