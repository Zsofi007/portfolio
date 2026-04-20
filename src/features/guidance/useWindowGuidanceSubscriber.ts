import { useAppStore } from '@/store/appStore';
import { useEffect } from 'react';
import { FlowService } from '@/services/flowService';
import { useGuidancePrefsStore } from './guidancePrefsStore';
import { useShellUiStore } from '@/store/shellUiStore';

/**
 * On each new window record, clears spotlight and emits contextual flow toasts.
 */
export function useWindowGuidanceSubscriber(): void {
  useEffect(() => {
    let snapTipShown = false;
    return useAppStore.subscribe((s, prev) => {
      for (const [id, w] of Object.entries(s.windows)) {
        if (!prev.windows[id]) {
          useGuidancePrefsStore.getState().clearSpotlight();
          FlowService.onAppOpened(w.appId);
          if (!snapTipShown) {
            snapTipShown = true;
            window.setTimeout(
              () => useShellUiStore.getState().pushToast('Tip: drag a window to the left/right edge to snap it.'),
              900,
            );
          }
        }
      }
    });
  }, []);
}
