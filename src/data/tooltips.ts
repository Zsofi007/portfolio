export type TooltipCopyByAppId = Partial<Record<string, string>>;

export const APP_TOOLTIP_COPY: TooltipCopyByAppId = {
  about: 'The “read me first” file.',
  'folder-projects': 'The good stuff.',
  'folder-system': 'Me, myself, and my files.',
  terminal: 'For people who like typing.',
  resume: 'Yes, this is actually important.',
  contact: 'I do read these.',
  system: 'Specs, stats, and vibes.',
  minesweeper: 'Classic chaos, carefully engineered.',
  siri: 'Not actually Siri. Mostly.',
};

export function getAppTooltipCopy(appId: string): string | undefined {
  return APP_TOOLTIP_COPY[appId];
}

