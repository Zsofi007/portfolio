import { useShellUiStore } from '@/store/shellUiStore';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';

type FlowTrigger = { appId: string; message: string; dedupeKey?: string };

const SESSION_SHOWN = new Set<string>();

const TRIGGERS: FlowTrigger[] = [
  { appId: 'about', message: 'Nice. When you are ready, open Projects to see work.' },
  { appId: 'folder-projects', message: 'Pick a project to preview, or type projects in the Terminal.' },
  {
    appId: 'resume',
    message: 'Want a quick summary? Check Developer Specs.',
  },
  {
    appId: 'project-showcase',
    message: 'Want to collaborate? Open Contact.exe from the Me folder, or type contact in the Terminal.',
    dedupeKey: 'project-any',
  },
  {
    appId: 'project-lab',
    message: 'Want to collaborate? Open Contact.exe from the Me folder, or type contact in the Terminal.',
    dedupeKey: 'project-any',
  },
];

export class FlowService {
  static onAppOpened(appId: string): void {
    if (!useGuidancePrefsStore.getState().guidedMode) return;
    const hit = TRIGGERS.find((t) => t.appId === appId);
    if (!hit) return;
    const key = hit.dedupeKey ?? hit.appId;
    if (SESSION_SHOWN.has(key)) return;
    SESSION_SHOWN.add(key);
    window.setTimeout(() => useShellUiStore.getState().pushToast(hit.message), 520);
  }
}

