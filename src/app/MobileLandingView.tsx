import { SlideToUnlock } from '@/components/mobile/SlideToUnlock';
import { getLandingComputerTagline } from '@/config/developerIdentity';
import { useLiveClock } from '@/hooks/useLiveClock';

type MobileLandingViewProps = { onEnter: () => void };

export function MobileLandingView({ onEnter }: MobileLandingViewProps) {
  const now = useLiveClock(1000);

  const timeStr = now.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const dateStr = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="flex min-h-dvh flex-col bg-gradient-to-b from-[#1c1c1e] via-black to-black font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-white antialiased"
      style={{ WebkitFontSmoothing: 'antialiased' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgb(80_80_90/0.35),transparent)]"
      />
      <div className="relative z-10 flex flex-1 flex-col px-6 pt-14">
        <time
          dateTime={now.toISOString()}
          className="text-center text-[clamp(2.75rem,12vw,4.25rem)] font-extralight leading-none tracking-[-0.02em] tabular-nums"
        >
          {timeStr}
        </time>
        <p className="mt-3 text-center text-lg font-normal text-white/55">{dateStr}</p>
        <p className="mt-6 text-center text-[15px] font-medium leading-snug text-white/50">
          This is {getLandingComputerTagline()}.
        </p>
        <div className="mt-4 text-center text-[15px] font-medium leading-snug text-white/55">
          Go ahead… snoop around.
        </div>
        <div className="mt-5 flex flex-col items-center gap-1 text-center text-[13px] text-white/45">
          <div>
            <span className="text-white/35">Last login:</span> just now
          </div>
          <div>
            <span className="text-white/35">User:</span> Guest
          </div>
        </div>
      </div>
      <footer className="relative z-10 flex flex-col items-center gap-4 pb-10 pt-4">
        <SlideToUnlock onUnlock={onEnter} />
      </footer>
      <div className="pointer-events-none absolute bottom-3 right-4 text-[12px] text-white/25">
        Some files are more interesting than others.
      </div>
    </div>
  );
}
