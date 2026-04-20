import { DesktopIcon, type DesktopIconVisualWeight } from '@/components/icons/DesktopIcon';
import { APP_REGISTRY } from '@/features/desktop-system/appRegistry';
import { useGuidancePrefsStore } from '@/features/guidance/guidancePrefsStore';
import { useIconLayoutStore } from '@/store/iconLayoutStore';

function visualWeightFor(appId: string): DesktopIconVisualWeight {
  if (appId === 'about' || appId === 'folder-projects') return 'primary';
  if (appId === 'folder-system') return 'secondary';
  return 'default';
}

export function IconGrid() {
  const positions = useIconLayoutStore((s) => s.positions);
  const guided = useGuidancePrefsStore((s) => s.guidedMode);
  const spotlightId = useGuidancePrefsStore((s) => s.spotlightAppId);

  return (
    <nav
      aria-label="Desktop applications"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <ul className="m-0 h-full w-full list-none p-0">
        {APP_REGISTRY.map((app) => {
          const pos = positions[app.id];
          if (!pos) return null;
          const spotlight = Boolean(guided && spotlightId === app.id);
          return (
            <li
              key={app.id}
              className="pointer-events-auto absolute list-none"
              style={{ left: pos.x, top: pos.y }}
            >
              <DesktopIcon app={app} visualWeight={visualWeightFor(app.id)} spotlight={spotlight} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
