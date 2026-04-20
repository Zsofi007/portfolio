import { useShellUiStore } from '@/store/shellUiStore';
import { useGuidancePrefsStore } from './guidancePrefsStore';
import { getHints, patchHints } from './onboardingFlags';

/** One-time tip after the user first opens any app from the launcher (desktop or mobile). */
export function maybePushFirstLaunchHint(): void {
  if (!useGuidancePrefsStore.getState().guidedMode) return;
  if (getHints().firstLaunchHintDone) return;
  patchHints({ firstLaunchHintDone: true });
  useShellUiStore
    .getState()
    .pushToast('Tip: click an app, or press Enter when its icon is focused. Try the Terminal for shortcuts.');
}
