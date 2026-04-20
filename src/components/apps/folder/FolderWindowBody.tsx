import { AppIconGlyph } from '@/components/icons/AppIconGlyph';
import { SiriLauncherIcon } from '@/components/mobile/SiriLauncherIcon';
import { Tooltip } from '@/components/system/Tooltip';
import { getAppTooltipCopy } from '@/data/tooltips';
import { openOrFocusFromApp } from '@/features/desktop-system/openOrFocusFromApp';
import { getDesktopAppById } from '@/features/desktop-system/desktopApps';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import { getMobileIosAppIconSrc } from '@/features/mobile/mobileIosIcons';
import { useMobileSheetNav } from '@/features/mobile/mobileSheetNavContext';
import { FEATURED_PROJECT_ID } from '@/features/projects/registry';
import type { AppChromeVariant } from '@/types/app-chrome';
import type { DesktopApp } from '@/types/desktop-app';
import { DESKTOP_ICON_LAYOUT_H, DESKTOP_ICON_LAYOUT_W } from '@/utils/iconMetrics';

type FolderWindowBodyProps = {
  folderAppId?: string;
  childAppIds: string[];
  variant?: AppChromeVariant;
};

export function FolderWindowBody({ folderAppId, childAppIds, variant = 'xp' }: FolderWindowBodyProps) {
  const sheetNav = useMobileSheetNav();
  const ios = variant === 'ios';
  const guided = useGuidancePrefsStore((s) => s.guidedMode);
  const showFeatured = guided && childAppIds.includes(FEATURED_PROJECT_ID);
  const isProjectsFolder = folderAppId === 'folder-projects';

  const open = (a: DesktopApp) => {
    if (sheetNav) sheetNav.pushChild(a);
    else openOrFocusFromApp(a);
  };

  return (
    <div
      className={
        ios
          ? 'flex min-h-0 flex-1 flex-col gap-4 overflow-auto bg-[#f2f2f7] p-4 font-sans text-black'
          : 'flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-4 pb-10 font-retro text-retro-ink'
      }
    >
      {isProjectsFolder ? (
        <div
          className={
            ios
              ? 'flex items-center justify-between gap-3 rounded-2xl border border-black/[0.08] bg-white px-4 py-3'
              : 'flex items-center justify-between gap-3 border-2 border-black/20 bg-xp-panel/95 px-3 py-2 shadow-[var(--ui-shadow-sm)] backdrop-blur-[1px]'
          }
        >
          <div className={ios ? 'text-[13px] text-black/60' : 'text-lg text-black/70'}>
            Want a quick snapshot of my skills and stack?
          </div>
          <button
            type="button"
            className={
              ios
                ? 'shrink-0 cursor-pointer rounded-xl bg-[#007aff] px-3 py-2 text-[13px] font-semibold text-white outline-none hover:bg-[#0066d6] focus-visible:ring-2 focus-visible:ring-[#007aff]'
                : 'shrink-0 cursor-pointer border-2 border-black bg-xp-teal px-3 py-1 text-base text-white ui-pressable hover:bg-xp-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-black'
            }
            aria-label="Open Developer Specs"
            onClick={() => {
              const sys = getDesktopAppById('system');
              if (sys) open(sys);
            }}
          >
            Open Developer Specs
          </button>
        </div>
      ) : null}
      <p className={ios ? 'm-0 text-[13px] font-medium text-black/45' : 'm-0 text-lg text-black/70'}>
        {ios ? 'Tap an app to open' : 'Open an item:'}
      </p>
      <ul className="m-0 flex list-none flex-wrap content-start gap-x-4 gap-y-3 p-0">
        {childAppIds.map((id) => {
          const app = getDesktopAppById(id);
          if (!app) return null;
          const iosSrc = ios ? getMobileIosAppIconSrc(app.id) : undefined;
          const isSiri = app.kind === 'siri' || app.id === 'siri';
          const featured = showFeatured && id === FEATURED_PROJECT_ID;
          const tip = getAppTooltipCopy(app.id);

          return (
            <li key={id} className="list-none shrink-0">
              <Tooltip content={tip ?? app.label}>
                <button
                  type="button"
                  aria-describedby={featured ? `folder-featured-${id}` : undefined}
                  style={ios ? undefined : { width: DESKTOP_ICON_LAYOUT_W, height: DESKTOP_ICON_LAYOUT_H }}
                  className={
                    ios
                      ? 'relative inline-flex max-w-full cursor-pointer flex-col items-center gap-1.5 rounded-2xl border-0 bg-transparent px-2 py-2 text-center outline-none transition ' +
                        'hover:bg-black/[0.1] hover:backdrop-blur-sm active:scale-[0.98] focus-visible:bg-black/[0.1] focus-visible:ring-2 focus-visible:ring-[#007aff] ' +
                        (featured ? 'shadow-[0_0_22px_rgb(0_122_255/0.28)]' : '')
                      : 'relative inline-flex max-w-full cursor-pointer flex-col items-center gap-1.5 rounded-lg border-0 bg-transparent px-2 py-2 text-center outline-none transition ' +
                        /* Cream `bg-xp-panel`: white/15 is nearly invisible — use a dark veil + blur like desktop tiles */
                        'hover:bg-black/[0.08] hover:backdrop-blur-sm active:scale-[0.98] focus-visible:bg-black/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ' +
                        (featured ? 'shadow-[0_0_18px_rgb(36_94_220/0.35)]' : '')
                  }
                  onClick={() => open(app)}
                >
                  <span
                    aria-hidden
                    className={
                      ios
                        ? 'flex h-14 w-14 shrink-0 items-center justify-center rounded-[22%] shadow-[0_4px_12px_rgb(0_0_0/0.12)]'
                        : 'flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden'
                    }
                  >
                    {ios && isSiri ? (
                      <SiriLauncherIcon />
                    ) : ios && iosSrc ? (
                      <img src={iosSrc} alt="" className="h-12 w-12 rounded-[22%] object-contain" />
                    ) : (
                      <AppIconGlyph
                        icon={app.icon}
                        imgClassName="h-10 w-10 object-contain"
                        textClassName="text-2xl"
                      />
                    )}
                  </span>
                  <span
                    className={
                      ios
                        ? 'max-w-[5.5rem] break-words text-center text-[13px] font-medium leading-tight text-black'
                        : 'max-w-full break-words text-center text-base leading-tight'
                    }
                  >
                    {app.label}
                  </span>
                  {featured ? (
                    <span
                      id={`folder-featured-${id}`}
                      className={
                        ios
                          ? 'absolute -right-1 -top-1 rounded-full bg-[#007aff] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white'
                          : 'absolute -right-1 -top-1 bg-xp-teal px-1.5 py-0.5 font-pixel text-[0.35rem] text-white shadow-[0_1px_3px_rgb(0_0_0/0.35)]'
                      }
                    >
                      Start here
                    </span>
                  ) : null}
                </button>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
