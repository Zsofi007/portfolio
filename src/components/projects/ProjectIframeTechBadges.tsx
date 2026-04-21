import { ExpandableTechChip } from '@/components/projects/ExpandableTechChip';
import { getTechStackIconName } from '@/components/projects/techStackIconMap';
import type { AppChromeVariant } from '@/types/app-chrome';
import StackIcon from 'tech-stack-icons';
import { Suspense } from 'react';

const listClassXp = 'pointer-events-auto absolute bottom-2 left-2 z-10 m-0 flex max-w-[55%] list-none flex-wrap gap-1.5 p-0';
const listClassIos =
  'pointer-events-auto absolute bottom-2 left-2 z-10 m-0 flex max-w-[78%] list-none flex-wrap gap-1.5 p-0';

function TechBadgesSkeleton({ techStack, variant = 'xp' }: { techStack: string[]; variant?: AppChromeVariant }) {
  const ios = variant === 'ios';
  return (
    <ul className={ios ? listClassIos : listClassXp} aria-label="Tech stack" aria-busy="true">
      {techStack.map((t) => (
        <li
          key={t}
          className={
            ios
              ? 'flex h-9 min-w-9 max-w-9 list-none items-center justify-center rounded-xl border border-white/18 bg-black/35 backdrop-blur-md'
              : 'flex h-9 min-w-9 max-w-9 list-none items-center justify-center rounded border border-black/25 bg-xp-panel/80'
          }
          aria-hidden
        >
          <span className="block h-4 w-4 rounded bg-black/15" />
        </li>
      ))}
    </ul>
  );
}

export function ProjectIframeTechBadges({ techStack, variant = 'xp' }: { techStack: string[]; variant?: AppChromeVariant }) {
  const ios = variant === 'ios';
  return (
    <Suspense fallback={<TechBadgesSkeleton techStack={techStack} variant={variant} />}>
      <ul className={ios ? listClassIos : listClassXp} aria-label="Tech stack">
        {techStack.map((t) => {
          const iconName = getTechStackIconName(t);
          if (!iconName) return null;
          if (!ios) return <ExpandableTechChip key={t} label={t} iconName={iconName} theme="systemXp" />;
          return (
            <li
              key={t}
              className="flex h-9 min-w-9 max-w-9 list-none items-center justify-center rounded-xl border border-white/18 bg-black/35 px-2 text-white/95 shadow-[0_10px_28px_rgb(0_0_0/0.28)] backdrop-blur-md"
              aria-label={t}
              title={t}
            >
              <StackIcon name={iconName} variant="light" className="h-[18px] w-[18px] drop-shadow-[0_1px_1px_rgb(0_0_0/0.35)]" />
            </li>
          );
        })}
      </ul>
    </Suspense>
  );
}
