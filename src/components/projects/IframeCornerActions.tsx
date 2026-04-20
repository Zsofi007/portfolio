import { FaGithub } from 'react-icons/fa';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import type { AppChromeVariant } from '@/types/app-chrome';

const btnXp =
  'flex h-9 w-9 items-center justify-center border-2 border-black/40 bg-xp-panel text-retro-ink ' +
  'transition hover:bg-white hover:text-retro-titlebar-mid focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-black';

const btnIos =
  'flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white/95 text-black ' +
  'shadow-md backdrop-blur-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-[#007aff]';

type IframeCornerActionsProps = {
  repoUrl: string;
  fullAppUrl: string;
  variant?: AppChromeVariant;
};

export function IframeCornerActions({ repoUrl, fullAppUrl, variant = 'xp' }: IframeCornerActionsProps) {
  const btn = variant === 'ios' ? btnIos : btnXp;

  return (
    <div
      className="pointer-events-auto absolute top-2 left-2 z-10 flex gap-1.5"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <a
        href={repoUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={btn}
        aria-label="View source on GitHub"
      >
        <FaGithub className="h-5 w-5" aria-hidden />
      </a>
      <a
        href={fullAppUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={btn}
        aria-label="Open full app in a new tab"
      >
        <HiArrowTopRightOnSquare className="h-5 w-5" aria-hidden />
      </a>
    </div>
  );
}
