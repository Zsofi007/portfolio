export type DesktopAppKind =
  | 'project'
  | 'about'
  | 'contact'
  | 'resume'
  | 'system'
  | 'terminal'
  | 'siri'
  | 'minesweeper'
  | 'folder';

export type DesktopApp = {
  id: string;
  label: string;
  kind: DesktopAppKind;
  /** Emoji / short glyph, or a path under `public/` (e.g. `/xp-icons/folder-closed.png`). */
  icon: string;
  /** When `kind` is `folder`, ids of apps shown inside the folder window */
  childAppIds?: string[];
};
