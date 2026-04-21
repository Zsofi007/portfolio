import { ExpandableTechChip } from '@/components/projects/ExpandableTechChip';
import { getTechStackIconName } from '@/components/projects/techStackIconMap';
import type { AppChromeVariant } from '@/types/app-chrome';
import { Suspense } from 'react';

export const SYSTEM_TECH_GROUPS = [
  { title: 'Frontend', tags: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Vite', 'Framer Motion'] },
  { title: 'Backend', tags: ['Node.js', 'Express.js', 'Python', 'Flask'] },
  { title: 'Testing', tags: ['Playwright', 'Cypress', 'Jest'] },
  {
    title: 'Cloud & DevOps',
    tags: [
      'AWS S3',
      'AWS EC2',
      'AWS DynamoDB',
      'AWS RDS',
      'AWS CloudWatch',
      'Bitbucket',
      'CI/CD Pipelines',
    ],
  },
  {
    title: 'UI & Tooling',
    tags: ['i18next', 'Zustand', 'A11y', 'Design systems', 'Postman', 'Jira', 'Atlassian', 'Miro'],
  },
] as const;

type SystemTechStackChipsProps = { variant: AppChromeVariant };

const ALL_TAGS: string[] = SYSTEM_TECH_GROUPS.flatMap((g) => g.tags);

function ChipsSkeleton({ variant }: SystemTechStackChipsProps) {
  const ios = variant === 'ios';
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Technologies" aria-busy="true">
      {ALL_TAGS.map((t) => (
        <li
          key={t}
          className={
            ios
              ? 'flex h-10 w-10 list-none items-center justify-center rounded-full border border-black/[0.08] bg-zinc-200/80'
              : 'flex h-10 w-10 list-none items-center justify-center rounded border-2 border-black/20 bg-xp-panel/80'
          }
          aria-hidden
        >
          <span className="block h-4 w-4 rounded bg-black/10" />
        </li>
      ))}
    </ul>
  );
}

export function SystemTechStackChips({ variant }: SystemTechStackChipsProps) {
  const theme = variant === 'ios' ? 'systemIos' : 'systemXp';
  const ios = variant === 'ios';
  const sectionTitleClass = ios
    ? 'm-0 mt-3 text-[12px] font-semibold uppercase tracking-wide'
    : 'm-0 mt-3 text-base font-semibold text-black/70';

  return (
    <Suspense fallback={<ChipsSkeleton variant={variant} />}>
      <div aria-label="Technologies">
        {SYSTEM_TECH_GROUPS.map((g) => (
          <div key={g.title} className="first:mt-0">
            <p className={sectionTitleClass} style={ios ? { color: 'var(--ui-text-muted)' } : undefined}>
              {g.title}
            </p>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label={`${g.title} technologies`}>
              {g.tags.map((t) => (
                <ExpandableTechChip
                  key={t}
                  label={t}
                  iconName={getTechStackIconName(t)}
                  theme={theme}
                  forceVariant="light"
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Suspense>
  );
}
