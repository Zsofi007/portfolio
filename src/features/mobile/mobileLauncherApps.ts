import { DESKTOP_GRID_APPS } from '@/features/desktop-system/desktopGridApps';
import type { DesktopApp } from '@/types/desktop-app';

/** Mobile home screen: same grid as desktop (excluding Siri + Minesweeper). */
export function getMobileLauncherApps(): DesktopApp[] {
  const base = DESKTOP_GRID_APPS.filter((app) => app.id !== 'siri' && app.id !== 'minesweeper' && app.id !== 'terminal');
  return [
    ...base,
    {
      id: 'flappy',
      label: 'Flappy',
      kind: 'flappy',
      icon: '/flappy-bird-icon.svg',
    },
  ];
}
