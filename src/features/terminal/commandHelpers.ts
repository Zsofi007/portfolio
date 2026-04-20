import { getDesktopAppById } from '@/features/desktop-system/desktopApps';
import { openDesktopApp } from '@/features/guidance/openDesktopApp';

export function openAppByIdMessage(id: string): string[] {
  const app = getDesktopAppById(id);
  if (!app) return [`No app registered for "${id}".`];
  openDesktopApp(id);
  return [`Opening ${app.label}…`];
}
