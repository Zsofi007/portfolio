import { useShellUiStore } from '@/store/shellUiStore';
import { useGuidancePrefsStore } from './guidancePrefsStore';

const NUDGES: Partial<Record<string, string>> = {
  about: 'Nice. When you are ready, open Projects to see work.',
  'folder-projects': 'Pick a project to preview, or type projects in the Terminal.',
};

const PROJECT_CONTACT_NUDGE =
  'Want to collaborate? Open Contact.exe from the Me folder, or type contact in the Terminal.';

/** Dedupe nudge lines per full page session (in-memory). */
const sessionShown = new Set<string>();

export function emitFlowNudgeForApp(appId: string): void {
  if (!useGuidancePrefsStore.getState().guidedMode) return;
  let line = NUDGES[appId];
  const dedupeKey = appId.startsWith('project-') ? 'project-any' : appId;
  if (!line && appId.startsWith('project-')) line = PROJECT_CONTACT_NUDGE;
  if (!line || sessionShown.has(dedupeKey)) return;
  sessionShown.add(dedupeKey);
  window.setTimeout(() => useShellUiStore.getState().pushToast(line!), 520);
}
