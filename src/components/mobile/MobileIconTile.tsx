import { AppIconGlyph } from '@/components/icons/AppIconGlyph';
import { SiriLauncherIcon } from '@/components/mobile/SiriLauncherIcon';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import { getMobileIosAppIconSrc } from '@/features/mobile/mobileIosIcons';
import type { MobileIconVisualWeight } from '@/features/mobile/mobileIconVisualWeight';
import type { DesktopApp } from '@/types/desktop-app';

type MobileIconTileProps = {
  app: DesktopApp;
  onOpen: () => void;
  visualWeight?: MobileIconVisualWeight;
  spotlight?: boolean;
};

const weightRing: Record<MobileIconVisualWeight, string> = {
  primary: 'shadow-[0_4px_18px_rgb(0_0_0/0.35)]',
  secondary: 'opacity-90',
  default: '',
};

export function MobileIconTile({
  app,
  onOpen,
  visualWeight = 'default',
  spotlight = false,
}: MobileIconTileProps) {
  const clearSpotlight = useGuidancePrefsStore((s) => s.clearSpotlight);
  const mobileIcon = getMobileIosAppIconSrc(app.id);
  const icon = mobileIcon ?? app.icon;
  const isSiri = app.kind === 'siri' || app.id === 'siri';

  const onFocus = () => {
    const sid = useGuidancePrefsStore.getState().spotlightAppId;
    if (sid && sid !== app.id) clearSpotlight();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  const ariaLabel = spotlight ? `Open ${app.label} (suggested starting point)` : `Open ${app.label}`;

  return (
    <button
      type="button"
      data-desktop-icon={app.id}
      aria-label={ariaLabel}
      className={
        'flex flex-col items-center gap-1 rounded-2xl p-2 outline-none transition active:scale-95 ' +
        'hover:bg-white/15 hover:backdrop-blur-sm focus-visible:bg-white/15 focus-visible:backdrop-blur-sm ' +
        'focus-visible:ring-2 focus-visible:ring-white/80 ' +
        weightRing[visualWeight] +
        (spotlight ? ' guided-mobile-icon-spotlight' : '')
      }
      onClick={onOpen}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    >
      <span
        aria-hidden
        className={
          'flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-[22%] ' +
          (isSiri || mobileIcon
            ? 'shadow-[0_6px_16px_rgb(0_0_0/0.45)]'
            : 'border-0 bg-transparent text-lg font-bold text-white shadow-[0_4px_14px_rgb(0_0_0/0.35)]')
        }
      >
        {isSiri ? (
          <SiriLauncherIcon />
        ) : (
          <AppIconGlyph
            icon={icon}
            imgClassName={
              mobileIcon ? 'h-12 w-12 rounded-[22%] object-contain' : 'h-11 w-11 object-contain'
            }
            textClassName="text-lg font-bold text-white drop-shadow-[0_1px_2px_rgb(0_0_0/0.75)]"
          />
        )}
      </span>
      <span className="max-w-[4.5rem] truncate text-center font-sans text-[11px] font-medium text-white/90">
        {app.label}
      </span>
    </button>
  );
}
