import { useShellUiStore } from '@/store/shellUiStore';
import { useEffect, useRef } from 'react';
import { useGuidancePrefsStore } from './guidancePrefsStore';
import { getDesktopWelcomeSeen, setDesktopWelcomeSeen } from './onboardingFlags';

/**
 * One-time desktop welcome toast + About spotlight for first-time visitors (guided mode).
 */
export function useDesktopGuidanceBoot(): void {
  const hydrated = useGuidancePrefsStore((s) => s.hydrated);
  const guidedMode = useGuidancePrefsStore((s) => s.guidedMode);
  const setSpotlightApp = useGuidancePrefsStore((s) => s.setSpotlightApp);
  const ran = useRef(false);

  useEffect(() => {
    if (!hydrated || ran.current) return;
    ran.current = true;
    if (!guidedMode) return;
    if (getDesktopWelcomeSeen()) return;

    setDesktopWelcomeSeen();
    setSpotlightApp('about');
    useShellUiStore.getState().pushToast('Welcome. Start with About.txt, or open Projects to browse work.');
  }, [hydrated, guidedMode, setSpotlightApp]);
}
