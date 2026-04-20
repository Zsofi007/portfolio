import { ExpandableTechChip } from '@/components/projects/ExpandableTechChip';
import { getTechStackIconName } from '@/components/projects/techStackIconMap';
import { Suspense } from 'react';

const listClass =
  'pointer-events-auto absolute bottom-2 left-2 z-10 m-0 flex max-w-[55%] list-none flex-wrap gap-1.5 p-0';

type ProjectIframeTechBadgesProps = {
  techStack: string[];
};

function TechBadgesSkeleton({ techStack }: ProjectIframeTechBadgesProps) {
  return (
    <ul className={listClass} aria-label="Tech stack" aria-busy="true">
      {techStack.map((t) => (
        <li
          key={t}
          className="flex h-9 min-w-9 max-w-9 list-none items-center justify-center rounded border bg-[color:var(--ui-glass)] shadow-[var(--ui-shadow-sm)] backdrop-blur-[10px]"
          style={{ borderColor: 'var(--ui-border-soft)' }}
          aria-hidden
        >
          <span className="block h-4 w-4 rounded bg-black/15" />
        </li>
      ))}
    </ul>
  );
}

export function ProjectIframeTechBadges({ techStack }: ProjectIframeTechBadgesProps) {
  return (
    <Suspense fallback={<TechBadgesSkeleton techStack={techStack} />}>
      <ul className={listClass} aria-label="Tech stack">
        {techStack.map((t) => (
          <ExpandableTechChip key={t} label={t} iconName={getTechStackIconName(t)} theme="iframe" />
        ))}
      </ul>
    </Suspense>
  );
}
