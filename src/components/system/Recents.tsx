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
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border bg-white/40 ui-pressable outline-none hover:bg-white/55 focus-visible:outline focus-visible:outline-2"
            style={{ borderColor: 'var(--ui-border-soft)', outlineColor: 'var(--ui-focus)', color: 'var(--ui-text)' }}
            aria-label={`Open recent: ${label}`}
            onClick={() => openApp(id)}
          >
            <AppIconGlyph icon={icon} imgClassName="h-6 w-6 object-contain" textClassName="text-base font-bold" />
          </button>
        );
      })}
    </div>
  );
}

