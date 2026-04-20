import { ICON_ROW_APPS } from '@/features/desktop-system/iconRow';
import { CORE_SYSTEM_APPS } from '@/features/desktop-system/systemApps';
import type { DesktopApp } from '@/types/desktop-app';

const about = CORE_SYSTEM_APPS.find((a) => a.id === 'about');
if (!about) {
  throw new Error('desktopGridApps: missing about in CORE_SYSTEM_APPS');
}

/** Desktop home grid: intro first, then folders and terminal (visual journey order). */
export const DESKTOP_GRID_APPS: DesktopApp[] = [about, ...ICON_ROW_APPS];
