import { IframeCornerActions } from '@/components/projects/IframeCornerActions';
import { ProjectIframeTechBadges } from '@/components/projects/ProjectIframeTechBadges';
import { ProjectMetaPanel } from '@/components/projects/ProjectMetaPanel';
import { ProjectPreviewIframe } from '@/components/projects/ProjectPreviewIframe';
import type { AppChromeVariant } from '@/types/app-chrome';
import type { Project } from '@/data/projects';

type ProjectWindowBodyProps = {
  project: Project;
  loadPreview: boolean;
  variant?: AppChromeVariant;
};

export function ProjectWindowBody({ project, loadPreview, variant = 'xp' }: ProjectWindowBodyProps) {
  const ios = variant === 'ios';
  const TechBadges = ProjectIframeTechBadges as unknown as (props: { techStack: string[]; variant?: AppChromeVariant }) => any;

  return (
    <div className={`flex min-h-0 flex-1 flex-col overflow-hidden ${ios ? 'bg-white' : ''}`}>
      <ProjectMetaPanel project={project} variant={variant} />
      <div className={`relative flex min-h-0 flex-1 flex-col ${ios ? 'px-3 pb-4 pt-2' : 'px-3 pb-3 pt-2'}`}>
        <ProjectPreviewIframe
          src={project.previewUrl ?? project.url}
          title={`Preview: ${project.name}`}
          loadEnabled={loadPreview}
          variant={variant}
        />
        <TechBadges techStack={project.techStack ?? []} variant={variant} />
        <IframeCornerActions repoUrl={project.repoUrl ?? 'https://github.com'} fullAppUrl={project.url} variant={variant} />
      </div>
    </div>
  );
}
