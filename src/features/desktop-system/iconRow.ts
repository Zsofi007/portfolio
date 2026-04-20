import type { DesktopApp } from '@/types/desktop-app';

/** Top-level desktop icons (folders + quick launch) */
export const ICON_ROW_APPS: DesktopApp[] = [
  {
    id: 'folder-projects',
    label: 'Projects',
    kind: 'folder',
    icon: '/xp-icons/folder-closed.png',
    childAppIds: ['project-itinerai', 'project-saas-dashboard'],
  },
  { id: 'minesweeper', label: 'Minesweeper', kind: 'minesweeper', icon: 'fa:FaBomb' },
  {
    id: 'folder-system',
    label: 'Me',
    kind: 'folder',
    icon: '/xp-icons/search-for-people.png',
    childAppIds: ['resume', 'contact', 'system'],
  },
  { id: 'terminal', label: 'Terminal', kind: 'terminal', icon: '/xp-icons/command-prompt.png' },
];
