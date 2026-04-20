import { NextStepLink } from '@/components/guidance/NextStepLink';
import { openDesktopApp } from '@/features/guidance/openDesktopApp';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import type { AppChromeVariant } from '@/types/app-chrome';
import type { Project } from '@/data/projects';

type ProjectMetaPanelProps = { project: Project; variant?: AppChromeVariant };

export function ProjectMetaPanel(props: ProjectMetaPanelProps) {
  const { project, variant = 'xp' } = props;
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
    <header
      className="shrink-0 border-b px-4 pb-3 pt-3"
      style={{ borderColor: 'var(--ui-border-soft)', background: 'var(--ui-glass)' }}
    >
      <div className="space-y-1.5">
        <p className="m-0 font-sans text-[13px] leading-snug" style={{ color: 'var(--ui-text-muted)' }}>
          {project.description}
        </p>
      </div>
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
