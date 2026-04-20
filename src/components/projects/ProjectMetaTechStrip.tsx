import type { AppChromeVariant } from '@/types/app-chrome';

type ProjectMetaTechStripProps = {
  techStack: string[];
  variant?: AppChromeVariant;
};

export function ProjectMetaTechStrip({ techStack, variant = 'xp' }: ProjectMetaTechStripProps) {
  if (!techStack.length) return null;
  const ios = variant === 'ios';
  const text = techStack.join(' · ');
  if (ios) {
    return <p className="m-0 text-[13px] font-medium text-black/45">{text}</p>;
  }
  return <p className="m-0 font-retro text-base text-black/75">{text}</p>;
}
