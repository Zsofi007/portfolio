import { DESKTOP_GRID_APPS } from '@/features/desktop-system/desktopGridApps';
import type { DesktopApp } from '@/types/desktop-app';

/** Mobile home screen: same grid as desktop (excluding Siri + Minesweeper). */
export function getMobileLauncherApps(): DesktopApp[] {
  const base = DESKTOP_GRID_APPS.filter((app) => app.id !== 'siri' && app.id !== 'minesweeper' && app.id !== 'terminal');
  return [
    ...base,
    { id: 'messages', label: 'Messages', kind: 'messages', icon: '/ios-icons/messages.png' },
    { id: 'notes', label: 'Notes', kind: 'notes', icon: '/ios-icons/notes.png' },
    { id: 'stats', label: 'Stats', kind: 'stats', icon: '/ios-icons/stats.png' },
    { id: 'music', label: 'Music', kind: 'music', icon: '/ios-icons/music.png' },
    {
      id: 'flappy',
      label: 'Flappy',
      kind: 'flappy',
      icon: '/flappy-bird-icon.svg',
    },
  ];
}
