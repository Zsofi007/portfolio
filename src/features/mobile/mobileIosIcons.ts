/**
 * Retro iOS-style launcher assets in `public/ios-icons/`.
 * Siri uses a CSS orb in `SiriLauncherIcon` (no PNG in the pack).
 * Lock / “return home” uses `MobileLockIcon` (SVG), not an app icon.
 */

const BY_APP_ID: Record<string, string> = {
  'folder-projects': '/ios-icons/safari.png',
  /** Same “Search for people” asset as desktop XP (`public/xp-icons/search-for-people.png`). */
  'folder-system': '/xp-icons/search-for-people.png',
  about: '/ios-icons/notes-app.png',
  resume: '/ios-icons/books.png',
  contact: '/ios-icons/contacts.png',
  system: '/ios-icons/stocks.png',
  'project-itinerai': '/ios-icons/app-store.png',
  'project-saas-dashboard': '/ios-icons/podcasts.png',
};

export function getMobileIosAppIconSrc(appId: string): string | undefined {
  return BY_APP_ID[appId];
}
