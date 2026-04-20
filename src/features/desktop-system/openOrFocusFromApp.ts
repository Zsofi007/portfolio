import type { DesktopApp } from '@/types/desktop-app';
import { useAppStore } from '@/store/appStore';

export function openOrFocusFromApp(app: DesktopApp): void {
  useAppStore.getState().openApp(app.id);
}
