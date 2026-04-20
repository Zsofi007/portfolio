import type { IconName } from 'tech-stack-icons';

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Maps project tech labels to icon slugs from tech-stack-icons
 * (https://www.tech-stack-icons.com/). Extend when you add stacks.
 */
const BY_LABEL: Partial<Record<string, IconName>> = {
  angular: 'angular',
  react: 'react',
  typescript: 'typescript',
  ts: 'typescript',
  javascript: 'js',
  js: 'js',
  python: 'python',
  i18next: 'i18next',
  atlassian: 'atlassian',
  bitbucket: 'bitbucket',
  jira: 'jira',
  miro: 'miro',
  postman: 'postman',
  express: 'expressjs',
  expressjs: 'expressjs',
  'express.js': 'expressjs',
  flask: 'flask',
  vite: 'vitejs',
  vitejs: 'vitejs',
  tailwind: 'tailwindcss',
  tailwindcss: 'tailwindcss',
  'tailwind css': 'tailwindcss',
  jest: 'jest',
  cypress: 'cypress',
  playwright: 'playwright',
  framer: 'framer',
  'framer motion': 'motion',
  motion: 'motion',
  zustand: 'zustand',
  node: 'nodejs',
  'node.js': 'nodejs',
  nodejs: 'nodejs',
  next: 'nextjs',
  nextjs: 'nextjs',
  'next.js': 'nextjs',
  css: 'css3',
  css3: 'css3',
  html: 'html5',
  html5: 'html5',
  'html/css': 'html5',
  'html / css': 'html5',
  'html/css3': 'html5',
  'html css': 'html5',
  eslint: 'eslint',
  'ci/cd pipelines': 'circleci',
  'ci/cd': 'circleci',
  cicd: 'circleci',
  aws: 'aws',
  'aws s3': 'aws',
  'aws cloudwatch': 'aws',
  'aws ec2': 'ec2',
  ec2: 'ec2',
  'aws dynamodb': 'aws',
  'aws rds': 'aws',
  'design systems': 'figma',
};

export function getTechStackIconName(label: string): IconName | undefined {
  return BY_LABEL[norm(label)];
}
