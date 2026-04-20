import { getDesktopAppById } from '@/features/desktop-system/desktopApps';
import { openOrFocusFromApp } from '@/features/desktop-system/openOrFocusFromApp';
import { maybePushFirstLaunchHint } from './maybeFirstLaunchHint';

/** Open a registered desktop app by id. Returns false if unknown. */
export function openDesktopApp(appId: string): boolean {
  const app = getDesktopAppById(appId);
  if (!app) return false;
  openOrFocusFromApp(app);
  return true;
}

/** Desktop launcher: open app and show one-time first-launch hint when guided. */
export function openDesktopAppFromGuidance(appId: string): boolean {
  const ok = openDesktopApp(appId);
  if (!ok) return false;
  maybePushFirstLaunchHint();
  return true;
}
