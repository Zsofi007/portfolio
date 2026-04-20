import { DESKTOP_GRID_APPS } from '@/features/desktop-system/desktopGridApps';
import { GRID_BASE_X, GRID_BASE_Y, GRID_STEP_Y } from '@/utils/iconGrid';

export type IconPosition = { x: number; y: number };

export function getDefaultIconPositions(): Record<string, IconPosition> {
  const out: Record<string, IconPosition> = {};
  DESKTOP_GRID_APPS.forEach((app, i) => {
    out[app.id] = { x: GRID_BASE_X, y: GRID_BASE_Y + i * GRID_STEP_Y };
  });
  return out;
}
