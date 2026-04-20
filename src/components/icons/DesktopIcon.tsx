import { AppIconGlyph } from '@/components/icons/AppIconGlyph';
import { Tooltip } from '@/components/system/Tooltip';
import { getAppTooltipCopy } from '@/data/tooltips';
import { openDesktopAppFromGuidance } from '@/features/guidance/openDesktopApp';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import { useDesktopIconDrag } from '@/hooks/useDesktopIconDrag';
import type { DesktopApp } from '@/types/desktop-app';
import { DESKTOP_ICON_LAYOUT_H, DESKTOP_ICON_LAYOUT_W } from '@/utils/iconMetrics';

export type DesktopIconVisualWeight = 'primary' | 'secondary' | 'default';

type DesktopIconProps = {
  app: DesktopApp;
  visualWeight?: DesktopIconVisualWeight;
  spotlight?: boolean;
};

const weightClass: Record<DesktopIconVisualWeight, string> = {
  primary: 'border-0 bg-transparent',
  secondary: 'border-0 bg-transparent opacity-95',
  default: 'border-0 bg-transparent',
};

export function DesktopIcon({ app, visualWeight = 'default', spotlight = false }: DesktopIconProps) {
  const clearSpotlight = useGuidancePrefsStore((s) => s.clearSpotlight);

  const open = () => openDesktopAppFromGuidance(app.id);
  const drag = useDesktopIconDrag({ appId: app.id, onOpen: open });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };

  const onFocus = () => {
    const sid = useGuidancePrefsStore.getState().spotlightAppId;
    if (sid && sid !== app.id) clearSpotlight();
  };

  const ariaLabel = spotlight ? `Open ${app.label} (suggested starting point)` : `Open ${app.label}`;
  const tip = getAppTooltipCopy(app.id);
  const isProjects = app.id === 'folder-projects';
  const prefersReducedMotion =
    typeof window !== 'undefined' ? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches : false;
  const projectsEmphasisClass =
    isProjects && !prefersReducedMotion
      ? 'shadow-[0_0_18px_rgb(255_255_255/0.14)] animate-pulse'
      : '';

  const btn = (
    <button
      type="button"
      data-desktop-icon={app.id}
      aria-label={ariaLabel}
      style={{ width: DESKTOP_ICON_LAYOUT_W, height: DESKTOP_ICON_LAYOUT_H }}
      className={
        'font-retro flex flex-col items-center justify-center gap-1 rounded-lg border-0 p-2 text-center ' +
        'outline-none transition hover:bg-white/15 hover:backdrop-blur-sm focus-visible:bg-white/15 focus-visible:backdrop-blur-sm ' +
        'focus-visible:ring-2 focus-visible:ring-white ' +
        'focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ' +
        weightClass[visualWeight] +
        (spotlight ? ' guided-desktop-icon-spotlight' : '') +
        (projectsEmphasisClass ? ` ${projectsEmphasisClass}` : '') +
        ' ' +
        drag.cursorClass
      }
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      onPointerCancel={drag.onPointerCancel}
      onContextMenu={(e) => e.stopPropagation()}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    >
      <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center text-2xl text-retro-titlebar-mid">
        <AppIconGlyph
          icon={app.icon}
          imgClassName="h-9 w-9 object-contain"
          textClassName="text-2xl text-retro-titlebar-mid"
        />
      </span>
      <span className="max-w-full truncate text-lg font-normal leading-tight text-white drop-shadow-[0_1px_3px_rgb(0_0_0/0.9)]">
        {app.label}
      </span>
    </button>
  );
  return tip ? <Tooltip content={tip}>{btn}</Tooltip> : btn;
}
