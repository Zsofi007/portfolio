import { getDesktopAppById } from '@/features/desktop-system/desktopApps';
import { readSession, setupAutoPersist, writeSession } from '@/store/appSession';
import { createWindowActions } from '@/store/appWindowActions';
import { MAX_RECENTS, computeOpenWindows, type AppState, type PersistedSessionV1 } from '@/store/appStoreTypes';
import { create } from 'zustand';

export const useAppStore = create<AppState>((set, get) => {
  const win = createWindowActions(
    set as unknown as (
      partial: AppState | Partial<AppState> | ((s: AppState) => AppState | Partial<AppState>),
      replace?: boolean,
    ) => void,
    get,
  );

  const addRecent = (appId: string) =>
    set((s) => ({ recents: [appId, ...s.recents.filter((x) => x !== appId)].slice(0, MAX_RECENTS) }));

  const openApp = (appId: string) => {
    const app = getDesktopAppById(appId);
    if (!app) return null;
    addRecent(appId);
    return win.openWindow({ appId: app.id, title: app.label });
  };

  const closeApp = (appId: string) => {
    const hit = Object.values(get().windows).find((w) => w.appId === appId);
    if (hit) win.closeWindow(hit.id);
  };

  const focusApp = (appId: string) => {
    const hit = Object.values(get().windows).find((w) => w.appId === appId);
    if (hit) win.focusWindow(hit.id);
  };

  const restoreSession = () => {
    const snap = readSession();
    if (!snap) return;
    const active = snap.activeWindowId && snap.windows[snap.activeWindowId] ? snap.activeWindowId : null;
    const stack = snap.stack.filter((id) => Boolean(snap.windows[id]));
    set({
      windows: snap.windows,
      stack,
      activeWindowId: active,
      recents: snap.recents,
      openWindows: computeOpenWindows(snap.windows, stack),
    });
  };

  const persistSession = () => {
    const { windows, stack, activeWindowId, recents } = get();
    const payload: PersistedSessionV1 = { v: 1, windows, stack, activeWindowId, recents };
    writeSession(payload);
  };

  setupAutoPersist(persistSession);

  return {
    windows: {},
    stack: [],
    activeWindowId: null,
    recents: [],
    openWindows: [],

    openApp,
    closeApp,
    focusApp,

    addRecent,
    restoreSession,
    persistSession,

    ...win,
  };
});

