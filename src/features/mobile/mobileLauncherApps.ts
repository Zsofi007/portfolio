import { DESKTOP_GRID_APPS } from '@/features/desktop-system/desktopGridApps';
import type { DesktopApp } from '@/types/desktop-app';

/** Mobile home screen: same grid as desktop with Siri replacing Terminal. */
export function getMobileLauncherApps(): DesktopApp[] {
  return DESKTOP_GRID_APPS.map((app) =>
    app.id === 'terminal'
      ? { id: 'siri', label: 'Siri', kind: 'siri', icon: '' }
      : app,
  );
}
