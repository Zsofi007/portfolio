import { NextStepLink } from '@/components/guidance/NextStepLink';
import { openDesktopApp } from '@/features/guidance/openDesktopApp';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import type { AppChromeVariant } from '@/types/app-chrome';
import type { Project } from '@/data/projects';

type ProjectMetaPanelProps = { project: Project; variant?: AppChromeVariant };

export function ProjectMetaPanel(props: ProjectMetaPanelProps) {
  const { variant = 'xp' } = props;
  const ios = variant === 'ios';
  const guided = useGuidancePrefsStore((s) => s.guidedMode);
  const onContact = () => openDesktopApp('contact');

  if (ios) {
    return (
      <header className="shrink-0 space-y-1.5 border-b border-black/[0.08] bg-white px-4 pb-3 pt-3 font-sans">
        {/* <h2 className="m-0 text-lg font-semibold tracking-tight text-black">{project.name}</h2> */}
        {/* <p className="m-0 text-[15px] leading-snug text-black/65">{project.description}</p>
        <ProjectMetaTechStrip techStack={project.techStack} variant="ios" /> */}
        <NextStepLink
          variant="ios"
          visible={guided}
          ariaLabel="Open Contact to send a message"
          onActivate={onContact}
        >
          Next: open Contact.exe (Me folder) to get in touch
        </NextStepLink>
      </header>
    );
  }

  return (
    <header className="shrink-0 space-y-2 border-b-2 border-black/15 bg-xp-panel/95 px-3 pb-3 pt-2">
      {/* <h2 className="font-pixel m-0 text-[0.55rem] text-retro-titlebar-mid">{project.name}</h2> */}
      {/* <p className="m-0 font-retro text-lg leading-snug text-retro-ink">{project.description}</p>
      <ProjectMetaTechStrip techStack={project.techStack} variant="xp" /> */}
      <NextStepLink
        variant="xp"
        visible={guided}
        ariaLabel="Open Contact to send a message"
        onActivate={onContact}
      >
        Next: open Contact.exe (Me folder) to get in touch
      </NextStepLink>
    </header>
  );
}
