import { DesktopContextMenu } from '@/components/desktop/DesktopContextMenu';
import { DesktopSurface } from '@/components/desktop/DesktopSurface';
import { IconGrid } from '@/components/desktop/IconGrid';
import { TaskbarStub } from '@/components/desktop/TaskbarStub';
import { Wallpaper } from '@/components/desktop/Wallpaper';
import { CommandPalette } from '@/components/system/CommandPalette';
import { FeaturedProject } from '@/components/widgets/FeaturedProject';
import { ToastRegion } from '@/components/ui/ToastRegion';
import { useDesktopGuidanceBoot } from '@/features/guidance/useDesktopGuidanceBoot';
import { useWindowGuidanceSubscriber } from '@/features/guidance/useWindowGuidanceSubscriber';
import { WindowLayer } from '@/features/window-manager/WindowLayer';
import { useIdleHint } from '@/hooks/useIdleHint';
import { useShellUiStore } from '@/store/shellUiStore';

type DesktopViewProps = {
  onReturnHome: () => void;
};

export function DesktopView({ onReturnHome }: DesktopViewProps) {
  useDesktopGuidanceBoot();
  useWindowGuidanceSubscriber();
  useIdleHint({ delayMs: 12000, message: 'Try opening Projects' });

  return (
    <div className="flex h-dvh flex-col bg-xp-panel">
      <DesktopSurface
        onContextMenu={(e) => {
          const el = e.target as HTMLElement;
          if (el.closest('button') || el.closest('[role="dialog"]')) return;
          e.preventDefault();
          useShellUiStore.getState().openContextMenu(e.clientX, e.clientY);
        }}
      >
        <Wallpaper />
        <IconGrid />
        <FeaturedProject />
        <WindowLayer />
        <DesktopContextMenu />
        <ToastRegion />
        <CommandPalette />
      </DesktopSurface>
      <TaskbarStub onReturnHome={onReturnHome} />
    </div>
  );
}
