import { ICON_ROW_APPS } from '@/features/desktop-system/iconRow';
import { CORE_SYSTEM_APPS } from '@/features/desktop-system/systemApps';
import { PROJECT_DESKTOP_APPS } from '@/features/projects/registry';
import type { DesktopApp } from '@/types/desktop-app';

const SIRI_APP: DesktopApp = {
  id: 'siri',
  label: 'Siri',
  kind: 'siri',
  icon: '',
};

const FLAPPY_APP: DesktopApp = {
  id: 'flappy',
  label: 'Flappy',
  kind: 'flappy',
  icon: '/flappy-bird-icon.svg',
};

const MESSAGES_APP: DesktopApp = { id: 'messages', label: 'Messages', kind: 'messages', icon: '/ios-icons/messages.png' };
const NOTES_APP: DesktopApp = { id: 'notes', label: 'Notes', kind: 'notes', icon: '/ios-icons/notes.png' };
const STATS_APP: DesktopApp = { id: 'stats', label: 'Stats', kind: 'stats', icon: '/ios-icons/stats.png' };
const MUSIC_APP: DesktopApp = { id: 'music', label: 'Music', kind: 'music', icon: '/ios-icons/music.png' };

const byId: Record<string, DesktopApp> = {};
for (const a of [...CORE_SYSTEM_APPS, ...PROJECT_DESKTOP_APPS, ...ICON_ROW_APPS]) {
  if (!byId[a.id]) byId[a.id] = a;
}
byId.siri = SIRI_APP;
byId.flappy = FLAPPY_APP;
byId.messages = MESSAGES_APP;
byId.notes = NOTES_APP;
byId.stats = STATS_APP;
byId.music = MUSIC_APP;

export function getDesktopAppById(id: string): DesktopApp | undefined {
  return byId[id];
}

export function getAllDesktopApps(): DesktopApp[] {
  return Object.values(byId);
}
