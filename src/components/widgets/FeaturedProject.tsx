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
        'pointer-events-auto absolute right-4 top-4 w-[22rem] rounded-sm border-2 border-black/35 bg-xp-panel/95 ' +
        'shadow-[var(--ui-shadow-lg)] backdrop-blur-[2px]'
      }
      aria-label="Featured project"
    >
      <div className="flex items-center justify-between gap-2 border-b-2 border-black/15 bg-gradient-to-b from-white/80 to-white/35 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span aria-hidden className="flex h-8 w-8 items-center justify-center">
            <AppIconGlyph icon={featured.icon} imgClassName="h-7 w-7 object-contain" textClassName="text-xl" />
          </span>
          <div className="min-w-0">
            <div className="truncate font-retro text-lg leading-tight text-retro-ink">Featured</div>
            <div className="truncate font-retro text-base leading-tight text-neutral-700">{featured.name}</div>
          </div>
        </div>
        <span
          aria-label="New"
          className="shrink-0 rounded-full bg-[#fff7b0] px-2 py-0.5 font-retro text-base font-semibold text-black/75"
        >
          New
        </span>
      </div>

      <div className="px-3 py-3">
        <div className="text-base leading-snug text-neutral-800 line-clamp-3">{featured.description}</div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            type="button"
            className="cursor-pointer border-2 border-black bg-xp-teal px-3 py-1.5 font-retro text-lg text-white ui-pressable hover:bg-xp-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
            onClick={() => openApp(featured.id)}
            aria-label={`Open featured project: ${featured.name}`}
          >
            Open
          </button>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-retro-titlebar-mid/60 via-retro-titlebar-deep/35 to-transparent" aria-hidden />
    </aside>
  );
}

