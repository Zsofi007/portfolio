import type { DesktopApp } from '@/types/desktop-app';

/** Built-in apps that can appear inside folders or standalone */
export const CORE_SYSTEM_APPS: DesktopApp[] = [
  { id: 'about', label: 'About.txt', kind: 'about', icon: '/xp-icons/notepad.png' },
  { id: 'resume', label: 'Resume.pdf', kind: 'resume', icon: '/xp-icons/xps-document.png' },
  { id: 'contact', label: 'Contact.exe', kind: 'contact', icon: '/xp-icons/email.png' },
  { id: 'system', label: 'Developer Specs', kind: 'system', icon: '/xp-icons/system-information.png' },
];
