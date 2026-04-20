import { NextStepLink } from '@/components/guidance/NextStepLink';
import { SystemTechStackChips } from '@/components/apps/system/SystemTechStackChips';
import { AppIconGlyph } from '@/components/icons/AppIconGlyph';
import { getDeveloperName } from '@/config/developerIdentity';
import { openDesktopApp } from '@/features/guidance/openDesktopApp';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import type { AppChromeVariant } from '@/types/app-chrome';

type SystemInfoPanelProps = { variant?: AppChromeVariant };

function getGithubPortfolioUrl(): string {
  const v = import.meta.env.VITE_GITHUB_PORTFOLIO_URL;
  if (typeof v !== 'string') return '';
  return v.trim();
}

export function SystemInfoPanel({ variant = 'xp' }: SystemInfoPanelProps) {
  const ios = variant === 'ios';
  const guided = useGuidancePrefsStore((s) => s.guidedMode);
  const openProjects = () => openDesktopApp('folder-projects');
  const name = getDeveloperName() || 'Unknown user';
  const githubUrl = getGithubPortfolioUrl();

  const LINES = [
    { k: 'Name', v: name },
    { k: 'Role', v: 'Fullstack Software Engineer' },
    { k: 'Experience', v: '3+ years' },
    { k: 'CPU', v: 'caffeine-powered' },
    { k: 'RAM', v: 'depends on sleep' },
    { k: 'Uptime', v: 'depends on deadlines' },
    { k: 'Status', v: 'building things' },
  ] as const;

  if (ios) {
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto bg-white p-4 font-sans text-black">
        <h2 className="m-0 text-lg font-semibold">About this device</h2>
        <dl className="m-0 space-y-0 overflow-hidden rounded-2xl border border-black/[0.08] bg-zinc-50">
          {LINES.map(({ k, v }, i) => (
            <div
              key={k}
              className={
                'grid grid-cols-[7.5rem_1fr] gap-2 px-4 py-3 text-[15px] ' +
                (i > 0 ? 'border-t border-black/[0.06]' : '')
              }
            >
              <dt className="m-0 font-medium text-black/45">{k}</dt>
              <dd className="m-0 text-black/85">{v}</dd>
            </div>
          ))}
          {githubUrl ? (
            <div className={'grid grid-cols-[7.5rem_1fr] gap-2 px-4 py-3 text-[15px] border-t border-black/[0.06]'}>
              <dt className="m-0 font-medium text-black/45">GitHub</dt>
              <dd className="m-0">
                <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2">
                  <span aria-hidden className="mt-[2px] inline-flex h-5 w-5 items-center justify-center">
                    <AppIconGlyph icon="fa:FaGithub" imgClassName="h-4 w-4 object-contain" textClassName="text-sm" />
                  </span>
                  <span className="break-all text-[#007aff] underline underline-offset-2">{githubUrl}</span>
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
        <div>
          <p className="m-0 mb-2 text-[13px] font-semibold uppercase tracking-wide text-black/45">Tech stack</p>
          <SystemTechStackChips variant="ios" />
        </div>
        <NextStepLink
          variant="ios"
          visible={guided}
          ariaLabel="Open Projects folder to see these skills in previews"
          onActivate={openProjects}
        >
          Next: see these skills in action in Projects
        </NextStepLink>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-4 font-sans">
      <dl className="m-0 grid gap-2 text-[15px]" style={{ color: 'var(--ui-text)' }}>
        {LINES.map(({ k, v }) => (
          <div key={k} className="grid grid-cols-[8rem_1fr] gap-2 border-b pb-2" style={{ borderColor: 'var(--ui-border-soft)' }}>
            <dt className="m-0 font-semibold" style={{ color: 'var(--ui-text-muted)' }}>
              {k}
            </dt>
            <dd className="m-0">{v}</dd>
          </div>
        ))}
        {githubUrl ? (
          <div className="grid grid-cols-[8rem_1fr] gap-2 border-b pb-2" style={{ borderColor: 'var(--ui-border-soft)' }}>
            <dt className="m-0 font-semibold" style={{ color: 'var(--ui-text-muted)' }}>
              GitHub
            </dt>
            <dd className="m-0">
              <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2">
                <span aria-hidden className="mt-[2px] inline-flex h-6 w-6 items-center justify-center">
                  <AppIconGlyph icon="fa:FaGithub" imgClassName="h-5 w-5 object-contain" textClassName="text-lg" />
                </span>
                <span className="break-all underline underline-offset-2" style={{ color: 'var(--ui-text)' }}>
                  {githubUrl}
                </span>
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
      <div>
        <p className="m-0 mb-2 text-[13px] font-semibold uppercase tracking-wide" style={{ color: 'var(--ui-text-muted)' }}>
          Tech stack
        </p>
        <SystemTechStackChips variant="xp" />
      </div>
      <NextStepLink
        variant="xp"
        visible={guided}
        ariaLabel="Open Projects folder to see these skills in previews"
        onActivate={openProjects}
      >
        Next: see these skills in action in Projects
      </NextStepLink>
    </div>
  );
}
