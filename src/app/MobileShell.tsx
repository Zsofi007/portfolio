import { Wallpaper } from '@/components/desktop/Wallpaper';
import { MobileAppSheet } from '@/components/mobile/MobileAppSheet';
import { MobileIconTile } from '@/components/mobile/MobileIconTile';
import { MobileNotificationPanel } from '@/components/mobile/MobileNotificationPanel';
import { MobileStatusBar } from '@/components/mobile/MobileStatusBar';
import { ToastRegion } from '@/components/ui/ToastRegion';
import { emitFlowNudgeForApp } from '@/features/guidance/flowNudges';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import { maybePushFirstLaunchHint } from '@/features/guidance/maybeFirstLaunchHint';
import { useMobileGuidanceBoot } from '@/features/guidance/useMobileGuidanceBoot';
import { getMobileLauncherApps } from '@/features/mobile/mobileLauncherApps';
import { mobileIconVisualWeight } from '@/features/mobile/mobileIconVisualWeight';
import { useLongPress } from '@/hooks/useLongPress';
import type { DesktopApp } from '@/types/desktop-app';
import { useMobileNotificationStore } from '@/store/mobileNotificationStore';
import { useWallpaperStore } from '@/store/wallpaperStore';
import { useEffect, useState } from 'react';

type MobileShellProps = {
  onLock: () => void;
};

export function MobileShell({ onLock }: MobileShellProps) {
  const [openApp, setOpenApp] = useState<DesktopApp | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const seed = useMobileNotificationStore((s) => s.seed);
  const items = useMobileNotificationStore((s) => s.items);
  const addNote = useMobileNotificationStore((s) => s.add);
  const cycleWallpaper = useWallpaperStore((s) => s.cycleWallpaper);
  const guidedMode = useGuidancePrefsStore((s) => s.guidedMode);
  const spotlightAppId = useGuidancePrefsStore((s) => s.spotlightAppId);

  useMobileGuidanceBoot();

  useEffect(() => {
    seed();
  }, [seed]);

  useEffect(() => {
    if (!openApp?.id) return;
    useGuidancePrefsStore.getState().clearSpotlight();
    emitFlowNudgeForApp(openApp.id);
  }, [openApp?.id]);

  const longPress = useLongPress(() => {
    cycleWallpaper();
    addNote({
      id: `wallpaper-${Date.now()}`,
      title: 'Wallpaper',
      body: 'Switched to the next background.',
    });
  });

  const closeSheet = () => {
    const id = openApp?.id;
    setOpenApp(null);
    if (!id) return;
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-desktop-icon="${id}"]`)?.focus();
    });
  };

  const lock = () => {
    setOpenApp(null);
    setNotificationsOpen(false);
    onLock();
  };

  const launcherApps = getMobileLauncherApps();

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden">
      <Wallpaper />
      <MobileNotificationPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <div
        className="relative z-10 flex min-h-0 flex-1 select-none flex-col [-webkit-touch-callout:none] [touch-callout:none]"
        style={{
          background:
            'linear-gradient(180deg, rgb(0 0 0 / 0.12) 0%, rgb(15 23 42 / 0.42) 55%, rgb(15 23 42 / 0.55) 100%)',
        }}
      >
        <MobileStatusBar
          notificationCount={items.length}
          notificationsOpen={notificationsOpen}
          onToggleNotifications={() => setNotificationsOpen((o) => !o)}
          onLock={lock}
        />
        <div className="flex min-h-0 flex-1 flex-col px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <p className="m-0 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
            Home
          </p>
          <nav aria-label="Applications" className="mt-4 flex flex-1 flex-col">
            <div className="mx-auto grid max-w-[20rem] grid-cols-4 gap-x-5 gap-y-7">
              {launcherApps.map((app) => (
                <MobileIconTile
                  key={app.id}
                  app={app}
                  visualWeight={mobileIconVisualWeight(app.id)}
                  spotlight={Boolean(guidedMode && spotlightAppId === app.id)}
                  onOpen={() => {
                    setNotificationsOpen(false);
                    maybePushFirstLaunchHint();
                    setOpenApp(app);
                  }}
                />
              ))}
            </div>
            <div
              {...longPress}
              onContextMenu={(e) => e.preventDefault()}
              className={
                'mt-6 flex min-h-[7rem] flex-1 flex-col items-center justify-center rounded-3xl ' +
                'border border-dashed border-white/25 bg-white/[0.06] px-4 py-5 touch-manipulation'
              }
            >
              <p className="m-0 text-center font-sans text-[13px] leading-relaxed text-white/55">
                Touch and hold here to change wallpaper
              </p>
            </div>
          </nav>
        </div>
      </div>
      <MobileAppSheet app={openApp} onClose={closeSheet} onLock={lock} />
      <ToastRegion />
    </div>
  );
}
