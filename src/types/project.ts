/** @deprecated Prefer importing `Project` from `src/data/projects.ts`. */
export type ProjectEntry = {
  id: string;
  label: string;
  icon: string;
  name: string;
  description: string;
  techStack: string[];
  previewUrl: string;
  fullAppUrl: string;
  repoUrl: string;
};
