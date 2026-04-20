import type { ReactNode } from 'react';

type DesktopSurfaceProps = {
  children: ReactNode;
  onContextMenu?: (e: React.MouseEvent<HTMLElement>) => void;
};

export function DesktopSurface({ children, onContextMenu }: DesktopSurfaceProps) {
  return (
    <main
      id="desktop-surface"
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden"
      onContextMenu={onContextMenu}
    >
      {children}
    </main>
  );
}
