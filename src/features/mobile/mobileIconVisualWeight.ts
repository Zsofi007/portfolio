export type MobileIconVisualWeight = 'primary' | 'secondary' | 'default';

export function mobileIconVisualWeight(appId: string): MobileIconVisualWeight {
  if (appId === 'about' || appId === 'folder-projects') return 'primary';
  if (appId === 'folder-system') return 'secondary';
  return 'default';
}
