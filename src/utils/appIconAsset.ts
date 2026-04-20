/** Desktop app `icon` values that are served from `public/` (see `public/xp-icons/`). */
export function isAppIconAsset(icon: string): boolean {
  return icon.startsWith('/');
}
