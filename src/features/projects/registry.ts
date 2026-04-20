import type { DesktopApp } from '@/types/desktop-app';
import { ProjectService } from '@/services/projectService';
import type { Project } from '@/data/projects';

/** Default “start here” project in the Projects folder (guided mode). */
export const FEATURED_PROJECT_ID = 'project-itinerai';

export const PROJECT_ENTRIES: Project[] = ProjectService.getAllProjects();

export const PROJECT_DESKTOP_APPS: DesktopApp[] = PROJECT_ENTRIES.map((p) => ({
  id: p.id,
  label: p.name,
  kind: 'project',
  icon: p.icon,
}));

const byId: Record<string, Project> = Object.fromEntries(
  PROJECT_ENTRIES.map((p) => [p.id, p]),
);

export function getProjectByAppId(appId: string): Project | undefined {
  return byId[appId];
}
