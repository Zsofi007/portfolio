import { AboutTxtApp } from '@/components/apps/about/AboutTxtApp';
import { ContactExeForm } from '@/components/apps/contact/ContactExeForm';
import { FolderWindowBody } from '@/components/apps/folder/FolderWindowBody';
import { ResumeApp } from '@/components/apps/resume/ResumeApp';
import { SiriApp } from '@/components/apps/siri/SiriApp';
import { SystemInfoPanel } from '@/components/apps/system/SystemInfoPanel';
import { TerminalApp } from '@/components/apps/terminal/TerminalApp';
import { MinesweeperApp } from '@/components/apps/minesweeper/MinesweeperApp';
import { FlappyApp } from '@/components/apps/flappy/FlappyApp';
import { MessagesApp } from '@/components/apps/messages/MessagesApp';
import { NotesApp } from '@/components/apps/notes/NotesApp';
import { UsageStatsApp } from '@/components/apps/stats/UsageStatsApp';
import { MusicApp } from '@/components/apps/music/MusicApp';
import { ProjectWindowBody } from '@/components/projects/ProjectWindowBody';
import { getDesktopAppById } from '@/features/desktop-system/desktopApps';
import { getProjectByAppId } from '@/features/projects';
import type { AppChromeVariant } from '@/types/app-chrome';

type WindowContentRouterProps = {
  windowId?: string;
  appId: string;
  /** When true, heavy previews (e.g. iframes) may load. */
  loadPreview: boolean;
  /** Visual chrome: `ios` for the mobile sheet, `xp` for desktop windows. */
  variant?: AppChromeVariant;
};

export function WindowContentRouter({
  windowId,
  appId,
  loadPreview,
  variant = 'xp',
}: WindowContentRouterProps) {
  const app = getDesktopAppById(appId);

  if (!app) {
    return (
      <p
        className={
          variant === 'ios'
            ? 'm-0 p-4 font-sans text-[15px] text-black/70'
            : 'm-0 p-3 font-retro text-lg text-retro-ink'
        }
      >
        Unknown application.
      </p>
    );
  }

  switch (app.kind) {
    case 'project': {
      const project = getProjectByAppId(app.id);
      if (!project) {
        return (
          <p
            className={
              variant === 'ios'
                ? 'm-0 p-4 font-sans text-[15px] text-black/70'
                : 'm-0 p-3 font-retro text-lg text-retro-ink'
            }
          >
            Project not configured.
          </p>
        );
      }
      return <ProjectWindowBody project={project} loadPreview={loadPreview} variant={variant} />;
    }
    case 'about':
      return <AboutTxtApp variant={variant} />;
    case 'contact':
      return <ContactExeForm variant={variant} />;
    case 'resume':
      return <ResumeApp variant={variant} loadPreview={loadPreview} />;
    case 'system':
      return <SystemInfoPanel variant={variant} />;
    case 'terminal':
      return <TerminalApp />;
    case 'siri':
      return <SiriApp />;
    case 'minesweeper':
      return <MinesweeperApp windowId={windowId} />;
    case 'flappy':
      return <FlappyApp />;
    case 'messages':
      return <MessagesApp />;
    case 'notes':
      return <NotesApp />;
    case 'stats':
      return <UsageStatsApp />;
    case 'music':
      return <MusicApp />;
    case 'folder':
      return <FolderWindowBody folderAppId={app.id} childAppIds={app.childAppIds ?? []} variant={variant} />;
    default:
      return null;
  }
}
