import { DesktopLandingView } from '@/app/DesktopLandingView';
import { DesktopView } from '@/app/DesktopView';
import { MobileLandingView } from '@/app/MobileLandingView';
import { MobileShell } from '@/app/MobileShell';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAppStore } from '@/store/appStore';
import { applyResolvedThemeToDocument, useThemeStore } from '@/store/themeStore';
import { useCallback, useEffect, useState } from 'react';

export function AppShell() {
  const [view, setView] = useState<'landing' | 'desktop'>('landing');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const themeMode = useThemeStore((s) => s.mode);

  useEffect(() => {
    useGuidancePrefsStore.getState().hydrate();
    useAppStore.getState().restoreSession();
  }, []);

  useEffect(() => {
    const apply = () => applyResolvedThemeToDocument(useThemeStore.getState().getResolvedTheme());
    apply();
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (themeMode !== 'system' || !mq) return;
    const onChange = () => apply();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, [themeMode]);

  const goToLanding = useCallback(() => {
    useAppStore.getState().closeAllWindows();
    setView('landing');
  }, []);

  if (view === 'landing') {
    return isMobile ? (
      <MobileLandingView onEnter={() => setView('desktop')} />
    ) : (
      <DesktopLandingView onEnter={() => setView('desktop')} />
    );
  }

  return isMobile ? <MobileShell onLock={goToLanding} /> : <DesktopView onReturnHome={goToLanding} />;
}
