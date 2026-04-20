import type { ReactNode } from 'react';
import type { AppChromeVariant } from '@/types/app-chrome';

type NextStepLinkProps = {
  children: ReactNode;
  /** Shown to assistive tech (include action + destination). */
  ariaLabel: string;
  onActivate: () => void;
  variant?: AppChromeVariant;
  /** When false, render nothing (guided mode off). */
  visible?: boolean;
};

const xpBtn =
  'mt-2 inline-flex w-full max-w-md items-center justify-center gap-2 border-2 border-black bg-xp-panel ' +
  'cursor-pointer px-3 py-2 text-left font-retro text-lg text-retro-ink outline-none hover:bg-white ' +
  'focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2';

const iosBtn =
  'mt-2 inline-flex w-full max-w-md items-center justify-center rounded-xl border border-black/[0.08] ' +
  'cursor-pointer bg-zinc-50 px-4 py-3 text-left text-[15px] font-medium text-black outline-none hover:bg-zinc-100 ' +
  'focus-visible:ring-2 focus-visible:ring-[#007aff]';

export function NextStepLink({
  children,
  ariaLabel,
  onActivate,
  variant = 'xp',
  visible = true,
}: NextStepLinkProps) {
  if (!visible) return null;
  const ios = variant === 'ios';
  return (
    <button type="button" className={ios ? iosBtn : xpBtn} aria-label={ariaLabel} onClick={onActivate}>
      {children}
    </button>
  );
}
