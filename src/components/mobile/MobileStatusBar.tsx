import { MobileLockIcon } from '@/components/mobile/MobileLockIcon';
import { useLiveClock } from '@/hooks/useLiveClock';

type MobileStatusBarProps = {
  notificationCount: number;
  notificationsOpen: boolean;
  onToggleNotifications: () => void;
  onLock: () => void;
};

export function MobileStatusBar({
  notificationCount,
  notificationsOpen,
  onToggleNotifications,
  onLock,
}: MobileStatusBarProps) {
  const now = useLiveClock(60_000);
  const time = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  return (
    <header
      className={
        'relative z-20 flex shrink-0 items-center justify-between gap-2 px-4 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] ' +
        'text-[15px] font-semibold tracking-tight text-white drop-shadow-[0_1px_2px_rgb(0_0_0/0.65)]'
      }
    >
      <time dateTime={now.toISOString()} className="min-w-[4.5rem] tabular-nums">
        {time}
      </time>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-expanded={notificationsOpen}
          aria-label={notificationsOpen ? 'Close notifications' : 'Notifications'}
          className={
            'relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ' +
            'backdrop-blur-md outline-none ring-white/40 hover:bg-white/25 ' +
            'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
          }
          onClick={onToggleNotifications}
        >
          <span aria-hidden className="text-[17px] leading-none">
            🔔
          </span>
          {notificationCount > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          ) : null}
        </button>
        <button
          type="button"
          aria-label="Lock and return to welcome screen"
          className={
            'flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md ' +
            'outline-none hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white ' +
            'focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
          }
          onClick={onLock}
        >
          <MobileLockIcon className="h-[22px] w-[22px] drop-shadow-[0_1px_1px_rgb(0_0_0/0.35)]" />
        </button>
      </div>
    </header>
  );
}
