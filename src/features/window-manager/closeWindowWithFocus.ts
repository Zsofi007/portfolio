import { useAppStore } from '@/store/appStore';

export function closeWindowWithFocus(id: string): void {
  const snap = useAppStore.getState();
  const w = snap.windows[id];
  const appId = w?.appId;
  snap.closeWindow(id);
  if (!appId) return;
  requestAnimationFrame(() => {
    document.querySelector<HTMLElement>(`[data-desktop-icon="${appId}"]`)?.focus();
  });
}
