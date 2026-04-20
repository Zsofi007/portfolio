import { AppIconGlyph } from '@/components/icons/AppIconGlyph';
import { getDesktopAppById } from '@/features/desktop-system/desktopApps';
import { useAppStore } from '@/store/appStore';
import { useMemo } from 'react';

type RecentsProps = {
  max?: number;
};

export function Recents({ max = 5 }: RecentsProps) {
  const recentsRaw = useAppStore((s) => s.recents);
  const recents = useMemo(() => recentsRaw.slice(0, max), [max, recentsRaw]);
  const openApp = useAppStore((s) => s.openApp);

  if (recents.length === 0) return null;

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Recent apps">
      {recents.map((id) => {
        const app = getDesktopAppById(id);
        const label = app?.label ?? id;
        const icon = app?.icon ?? label.slice(0, 1).toUpperCase();
        return (
          <button
            key={id}
            type="button"
            className="flex h-8 w-8 items-center justify-center border-2 border-black/30 bg-xp-panel outline-none hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
            aria-label={`Open recent: ${label}`}
            onClick={() => openApp(id)}
          >
            <AppIconGlyph icon={icon} imgClassName="h-5 w-5 object-contain" textClassName="text-base font-bold" />
          </button>
        );
      })}
    </div>
  );
}

