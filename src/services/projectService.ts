import { projects, type Project } from '@/data/projects';

export class ProjectService {
  static getAllProjects(): Project[] {
    return projects;
  }

  static getFeaturedProject(): Project | undefined {
    return projects.find((p) => p.featured);
  }

  static getProjectById(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
  }
}

