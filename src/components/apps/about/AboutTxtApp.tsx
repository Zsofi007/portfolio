import { NextStepLink } from '@/components/guidance/NextStepLink';
import { openDesktopApp } from '@/features/guidance/openDesktopApp';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import type { AppChromeVariant } from '@/types/app-chrome';

const DOC =
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
  'What this project demonstrates:\n' +
  '- UI engineering: component architecture, state management,\n' +
  '  windowing, and persistence.\n' +
  '- Accessibility: keyboard-first navigation, ARIA, focus handling.\n' +
  '- Product polish: micro-interactions, tooltips, and thoughtful UX.\n\n' +
  'Tip: If you get lost, start with Projects.\n';

type AboutTxtAppProps = { variant?: AppChromeVariant };

export function AboutTxtApp({ variant = 'xp' }: AboutTxtAppProps) {
  const ios = variant === 'ios';
  const guided = useGuidancePrefsStore((s) => s.guidedMode);
  const openProjects = () => openDesktopApp('folder-projects');

  if (ios) {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-white font-sans text-[15px] leading-relaxed text-black">
        <div className="shrink-0 border-b border-black/[0.08] bg-zinc-50 px-4 py-2.5 text-[13px] font-medium text-black/55">
          Notes
        </div>
        <pre className="m-0 min-h-0 flex-1 overflow-auto whitespace-pre-wrap p-4">{DOC}</pre>
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
    <div
      className="flex min-h-0 flex-1 flex-col bg-[color:var(--ui-glass)] font-sans"
      style={{ color: 'var(--ui-text)' }}
    >
      <pre className="m-0 min-h-0 flex-1 overflow-auto whitespace-pre-wrap px-4 py-3 font-mono text-[13px] leading-relaxed">
        {DOC}
      </pre>
      <div className="shrink-0 border-t px-4 py-3" style={{ borderColor: 'var(--ui-border-soft)' }}>
        <NextStepLink variant="xp" visible={guided} ariaLabel="Open Projects folder" onActivate={openProjects}>
          Next: explore my Projects
        </NextStepLink>
      </div>
    </div>
  );
}
