import { openAppByIdMessage } from '@/features/terminal/commandHelpers';
import type { TerminalCommandFn } from '@/features/terminal/commandTypes';
import { PROJECT_ENTRIES } from '@/features/projects/registry';
import { getAllDesktopApps } from '@/features/desktop-system/desktopApps';

export const helpCommand: TerminalCommandFn = () => [
  'Commands:',
  '  help',
  '  about',
  '  me         (open Me folder)',
  '  projects   (open Projects folder)',
  '  contact',
  '  resume',
  '  specs      (open Developer Specs)',
  '  terminal',
  '  list       (project ids)',
  '  apps       (all app ids)',
  '  open <id|name>',
  '  github     (open GitHub portfolio)',
];

export const listCommand: TerminalCommandFn = () => [
  'Projects:',
  ...PROJECT_ENTRIES.map((p) => `  • ${p.id} — ${p.name}`),
];

export const openCommand: TerminalCommandFn = (args) => {
  const raw = args.join(' ').trim();
  if (!raw) return ['Usage: open <project-id | project name | app id>'];
  const q = raw.toLowerCase();
  const hit = PROJECT_ENTRIES.find(
    (p) =>
      p.id.toLowerCase() === q ||
      p.name.toLowerCase() === q ||
      p.id.toLowerCase().includes(q),
  );
  if (hit) return openAppByIdMessage(hit.id);
  return openAppByIdMessage(raw);
};

export const appsCommand: TerminalCommandFn = () => {
  const apps = getAllDesktopApps()
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));
  return ['Apps:', ...apps.map((a) => `  • ${a.id} — ${a.label}`)];
};

export const githubCommand: TerminalCommandFn = () => {
  const url = typeof import.meta.env.VITE_GITHUB_PORTFOLIO_URL === 'string' ? import.meta.env.VITE_GITHUB_PORTFOLIO_URL.trim() : '';
  if (!url) return ['No GitHub portfolio URL configured. Set VITE_GITHUB_PORTFOLIO_URL in .env'];
  window.open(url, '_blank', 'noopener,noreferrer');
  return ['Opening GitHub…'];
};
