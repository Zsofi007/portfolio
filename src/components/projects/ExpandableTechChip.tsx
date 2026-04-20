import { useMediaQuery } from '@/hooks/useMediaQuery';
import { resolveTheme, useThemeStore } from '@/store/themeStore';
import type { IconName } from 'tech-stack-icons';
import { lazy, useEffect, useMemo, useState } from 'react';

const StackIcon = lazy(() => import('tech-stack-icons'));

export type ExpandableTechChipTheme = 'iframe' | 'systemXp' | 'systemIos';

type ExpandableTechChipProps = {
  label: string;
  iconName?: IconName;
  theme: ExpandableTechChipTheme;
};

const themes: Record<
  ExpandableTechChipTheme,
  { btn: string; btnTextOnly: string; label: string; iconBox: string; fallback: string; iconClass: string }
> = {
  iframe: {
    btn:
      'h-9 min-h-9 min-w-9 max-w-9 rounded-md border bg-[color:var(--ui-glass)] shadow-[var(--ui-shadow-sm)] backdrop-blur-[10px] ' +
      'md:hover:max-w-[min(220px,42vw)] md:hover:gap-2 md:hover:px-2 md:hover:shadow-md ' +
      'md:focus-within:max-w-[min(220px,42vw)] md:focus-within:gap-2 md:focus-within:px-2 md:focus-within:shadow-md',
    btnTextOnly:
      'h-9 min-h-9 min-w-9 max-w-9 rounded-md border bg-[color:var(--ui-glass)] shadow-[var(--ui-shadow-sm)] backdrop-blur-[10px]',
    label: 'font-sans text-[12px] font-medium leading-tight',
    iconBox: 'flex h-7 w-7 shrink-0 items-center justify-center',
    fallback: 'font-sans max-w-[2.2rem] truncate text-center text-[10px] font-semibold leading-tight',
    iconClass: 'h-5 w-5 shrink-0',
  },
  systemXp: {
    btn:
      'h-10 min-h-10 min-w-10 max-w-10 rounded-2xl border bg-[color:var(--ui-glass)] shadow-[var(--ui-shadow-sm)] backdrop-blur-[12px] ' +
      'md:hover:max-w-[min(240px,40vw)] md:hover:gap-2 md:hover:px-2.5 md:hover:shadow-md ' +
      'md:focus-within:max-w-[min(240px,40vw)] md:focus-within:gap-2 md:focus-within:px-2.5 md:focus-within:shadow-md',
    btnTextOnly:
      'h-10 min-h-10 min-w-10 max-w-10 rounded-2xl border bg-[color:var(--ui-glass)] shadow-[var(--ui-shadow-sm)] backdrop-blur-[12px]',
    label: 'font-sans text-[13px] font-medium leading-tight',
    iconBox: 'flex h-8 w-8 shrink-0 items-center justify-center',
    fallback: 'font-pixel max-w-[3rem] truncate text-center text-[0.35rem] leading-tight text-retro-titlebar-mid',
    iconClass: 'h-6 w-6 shrink-0',
  },
  systemIos: {
    btn:
      'h-10 min-h-10 min-w-10 max-w-10 rounded-full border border-black/[0.08] bg-zinc-100 shadow-sm ' +
      'md:hover:max-w-[min(240px,40vw)] md:hover:gap-2 md:hover:px-2.5 md:hover:shadow-md ' +
      'md:focus-within:max-w-[min(240px,40vw)] md:focus-within:gap-2 md:focus-within:px-2.5 md:focus-within:shadow-md',
    btnTextOnly:
      'h-10 min-h-10 min-w-10 max-w-10 rounded-full border border-black/[0.08] bg-zinc-100 shadow-sm',
    label: 'font-sans text-[13px] font-medium leading-tight text-black/85',
    iconBox: 'flex h-8 w-8 shrink-0 items-center justify-center',
    fallback: 'font-sans max-w-[3.5rem] truncate text-center text-[10px] font-semibold leading-tight text-black/70',
    iconClass: 'h-6 w-6 shrink-0',
  },
};

export function ExpandableTechChip({ label, iconName, theme }: ExpandableTechChipProps) {
  const t = themes[theme];
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [open, setOpen] = useState(false);
  const expandedMobile = isMobile && open;
  const themeMode = useThemeStore((s) => s.mode);
  const resolved = useMemo(() => resolveTheme(themeMode), [themeMode]);

  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  const ring =
    theme === 'iframe'
      ? 'focus-visible:ring-[color:var(--ui-focus)]'
      : theme === 'systemIos'
        ? 'focus-visible:ring-[#007aff]'
        : 'focus-visible:ring-retro-titlebar-mid';

  if (!iconName) {
    return (
      <li className="list-none">
        <div
          className={
            'flex cursor-default items-center justify-center overflow-hidden px-1.5 ' + t.btnTextOnly
          }
          style={
            theme === 'systemXp' || theme === 'iframe'
              ? { borderColor: 'var(--ui-border-soft)', color: 'var(--ui-text)', outlineColor: 'var(--ui-focus)' }
              : undefined
          }
          aria-label={label}
        >
          <span className={t.iconBox}>
            <span className={t.fallback} style={theme === 'iframe' ? { color: 'var(--ui-text-muted)' } : undefined}>
              {label}
            </span>
          </span>
        </div>
      </li>
    );
  }

  return (
    <li className="list-none">
      <button
        type="button"
        className={
          'group/chip flex cursor-pointer items-center justify-center overflow-hidden px-1.5 ' +
          'outline-none transition-[max-width,gap,padding,box-shadow] duration-200 ease-out ' +
          'focus-visible:ring-2 focus-visible:ring-offset-1 ' +
          'md:hover:justify-start md:focus-within:justify-start ' +
          ring +
          ' ' +
          t.btn +
          (expandedMobile ? ' max-md:max-w-[min(260px,85vw)] max-md:justify-start max-md:gap-2 max-md:px-2.5' : '')
        }
        style={
          theme === 'systemXp' || theme === 'iframe'
            ? { borderColor: 'var(--ui-border-soft)', color: 'var(--ui-text)', outlineColor: 'var(--ui-focus)' }
            : undefined
        }
        aria-expanded={isMobile ? open : undefined}
        aria-label={label}
        onClick={() => {
          if (!isMobile) return;
          setOpen((v) => !v);
        }}
      >
        <span className={t.iconBox}>
          <StackIcon
            name={iconName}
            variant={resolved === 'dark' ? 'dark' : 'light'}
            className={t.iconClass}
            aria-hidden
          />
        </span>
        <span
          className={
            'max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-200 ease-out ' +
            'md:ml-0 md:group-hover/chip:ml-2 md:group-hover/chip:max-w-[11rem] md:group-hover/chip:opacity-100 ' +
            'md:group-focus-within/chip:ml-2 md:group-focus-within/chip:max-w-[11rem] md:group-focus-within/chip:opacity-100 ' +
            (expandedMobile ? 'ml-2 max-w-[11rem] opacity-100' : 'max-md:ml-0') +
            ' ' +
            t.label
          }
        >
          {label}
        </span>
      </button>
    </li>
  );
}
