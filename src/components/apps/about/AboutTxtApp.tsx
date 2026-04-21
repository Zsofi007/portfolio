import { NextStepLink } from '@/components/guidance/NextStepLink';
import { getDesktopAppById } from '@/features/desktop-system/desktopApps';
import { openDesktopApp } from '@/features/guidance/openDesktopApp';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import { useMobileSheetNav } from '@/features/mobile/mobileSheetNavContext';
import type { AppChromeVariant } from '@/types/app-chrome';

const DOC_XP =
  'PORTFOLIO — ABOUT.TXT\n' +
  '────────────────────\n\n' +
  'This is a portfolio disguised as a tiny operating system.\n' +
  'It is intentionally built to feel like a real desktop: windows,\n' +
  'apps, shortcuts, and small interactions that reward curiosity.\n\n' +
  'How to use it:\n' +
  '- Open Projects to preview work.\n' +
  '- Press Cmd/Ctrl+K to search (command palette).\n' +
  '- Use the Terminal for quick navigation.\n' +
  '- Right-click the desktop for more actions.\n\n' +
  'Tip: If you get lost, start with Projects.\n';

const DOC_IOS =
  'Notes — About\n\n' +
  "You’re holding my portfolio… as a phone.\n" +
  'Tap around like you borrowed it for 30 seconds.\n\n' +
  'Where to start:\n' +
  '- Projects: live previews + tech used\n' +
  '- Developer Specs: stack + tools\n' +
  '- Contact.exe: send a message\n' +
  '- Flappy Bird clone: a fun game to play\n\n' +
  'Tip: Open Projects and tap into any preview, or play Flappy Bird.\n';

type AboutTxtAppProps = { variant?: AppChromeVariant };

export function AboutTxtApp({ variant = 'xp' }: AboutTxtAppProps) {
  const ios = variant === 'ios';
  const guided = useGuidancePrefsStore((s) => s.guidedMode);
  const sheetNav = useMobileSheetNav();
  const openProjects = () => {
    if (sheetNav) {
      const a = getDesktopAppById('folder-projects');
      if (a) sheetNav.pushChild(a);
      return true;
    }
    return openDesktopApp('folder-projects');
  };

  if (ios) {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-white font-sans text-[15px] leading-relaxed text-black">
        
        <pre className="m-0 min-h-0 flex-1 overflow-auto whitespace-pre-wrap p-4">{DOC_IOS}</pre>
        <div className="shrink-0 border-t border-black/[0.08] bg-zinc-50 px-4 py-3">
          <NextStepLink
            variant="ios"
            visible={guided}
            ariaLabel="Open Projects folder"
            onActivate={openProjects}
          >
            Next: explore my Projects
          </NextStepLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#ffffe8] font-mono text-sm text-black">
      <pre className="m-0 min-h-0 flex-1 overflow-auto whitespace-pre-wrap p-3 leading-relaxed">{DOC_XP}</pre>
      <div className="shrink-0 border-t-2 border-black/15 bg-[#ece9d8] px-3 py-2">
        <NextStepLink variant="xp" visible={guided} ariaLabel="Open Projects folder" onActivate={openProjects}>
          Next: explore my Projects
        </NextStepLink>
      </div>
    </div>
  );
}
