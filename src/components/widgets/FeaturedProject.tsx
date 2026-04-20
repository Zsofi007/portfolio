import { AppIconGlyph } from '@/components/icons/AppIconGlyph';
import { ProjectService } from '@/services/projectService';
import { useAppStore } from '@/store/appStore';

export function FeaturedProject() {
  const featured = ProjectService.getFeaturedProject();
  const openApp = useAppStore((s) => s.openApp);

  if (!featured) return null;

  return (
    <aside
      data-desktop-obstacle="featured-project"
      className={
        'pointer-events-auto absolute right-4 top-4 w-[22rem] rounded-2xl border bg-[color:var(--ui-glass-strong)] ' +
        'shadow-[var(--ui-shadow-lg)] backdrop-blur-[16px]'
      }
      style={{ borderColor: 'var(--ui-border-soft)', color: 'var(--ui-text)' }}
      aria-label="Featured project"
    >
      <div
        className="flex items-center justify-between gap-2 border-b px-4 py-3"
        style={{ borderColor: 'var(--ui-border-soft)' }}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span aria-hidden className="flex h-8 w-8 items-center justify-center">
            <AppIconGlyph icon={featured.icon} imgClassName="h-7 w-7 object-contain" textClassName="text-xl" />
          </span>
          <div className="min-w-0">
            <div className="truncate font-pixel text-[0.55rem] leading-snug tracking-tight" style={{ color: 'var(--ui-text-muted)' }}>
              Featured
            </div>
            <div className="truncate font-sans text-[15px] font-semibold leading-tight" style={{ color: 'var(--ui-text)' }}>
              {featured.name}
            </div>
          </div>
        </div>
        <span
          aria-label="New"
          className="shrink-0 rounded-full px-2 py-0.5 font-sans text-[12px] font-semibold"
          style={{ background: 'var(--ui-glass-tint)', color: 'var(--ui-text)' }}
        >
          New
        </span>
      </div>

      <div className="px-4 py-3">
        <div className="text-base leading-snug line-clamp-3" style={{ color: 'var(--ui-text-muted)' }}>
          {featured.description}
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            type="button"
            className="cursor-pointer rounded-xl px-3 py-2 font-sans text-[13px] font-semibold ui-pressable ui-cta"
            onClick={() => openApp(featured.id)}
            aria-label={`Open featured project: ${featured.name}`}
          >
            Open
          </button>
        </div>
      </div>

      <div className="h-px w-full" style={{ background: 'var(--ui-border-soft)' }} aria-hidden />
    </aside>
  );
}

