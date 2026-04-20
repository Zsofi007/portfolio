export type Project = {
  id: string;
  name: string;
  icon: string;
  url: string;
  description: string;
  featured?: boolean;
  /** Optional: used by the embedded preview window. */
  previewUrl?: string;
  /** Optional: shown in project chrome actions. */
  repoUrl?: string;
  /** Optional: shown as badges. */
  techStack?: string[];
};

export const projects: Project[] = [
  {
    id: 'project-itinerai',
    name: 'ItinerAI',
    icon: '/icons/itiner-ai.png',
    url: 'https://itinerai.zsofiakato.com/',
    previewUrl: 'https://itinerai.zsofiakato.com/',
    repoUrl: 'https://github.com/Zsofi007/itiner-ai',
    description: 'AI-powered travel itinerary planner',
    techStack: ['React', 'TypeScript', 'Vite'],
    featured: true,
  },
  {
    id: 'project-saas-dashboard',
    name: 'SaaS Dashboard',
    icon: '/icons/saas-dashboard.png',
    url: 'https://saas-dashboard.zsofiakato.com/',
    previewUrl: 'https://saas-dashboard.zsofiakato.com/',
    repoUrl: 'https://github.com/Zsofi007/saas-dashboard',
    description: 'SaaS Dashboard',
    techStack: ['React', 'TypeScript', 'Vite'],
  },
];

