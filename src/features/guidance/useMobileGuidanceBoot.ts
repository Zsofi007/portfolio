import { useShellUiStore } from '@/store/shellUiStore';
import { useEffect, useRef } from 'react';
import { useGuidancePrefsStore } from './guidancePrefsStore';
import { getMobileWelcomeSeen, setMobileWelcomeSeen } from './onboardingFlags';

export function useMobileGuidanceBoot(): void {
  const hydrated = useGuidancePrefsStore((s) => s.hydrated);
  const guidedMode = useGuidancePrefsStore((s) => s.guidedMode);
  const setSpotlightApp = useGuidancePrefsStore((s) => s.setSpotlightApp);
  const ran = useRef(false);

  useEffect(() => {
    if (!hydrated || ran.current) return;
    ran.current = true;
    if (!guidedMode) return;
    if (getMobileWelcomeSeen()) return;

    setMobileWelcomeSeen();
    setSpotlightApp('about');
    useShellUiStore.getState().pushToast('Welcome. Tap About.txt or Projects to begin.');
  }, [hydrated, guidedMode, setSpotlightApp]);
}
