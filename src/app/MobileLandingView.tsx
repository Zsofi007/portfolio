import { SlideToUnlock } from '@/components/mobile/SlideToUnlock';
import { getDeveloperName } from '@/config/developerIdentity';
import { useLiveClock } from '@/hooks/useLiveClock';

type MobileLandingViewProps = { onEnter: () => void };

export function MobileLandingView({ onEnter }: MobileLandingViewProps) {
  const now = useLiveClock(1000);
  const devName = getDeveloperName();
  const phoneOwner = devName ? `${devName}'s phone` : "a developer's phone";

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
      className="relative flex min-h-dvh flex-col overflow-hidden font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-white antialiased"
      style={{ WebkitFontSmoothing: 'antialiased' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 140% 90% at 50% -18%, rgb(120 170 255 / 0.36), transparent 55%),
            radial-gradient(ellipse 120% 90% at 12% 20%, rgb(255 140 110 / 0.22), transparent 56%),
            radial-gradient(ellipse 120% 90% at 88% 32%, rgb(120 255 210 / 0.16), transparent 58%),
            linear-gradient(180deg, #0b1020 0%, #020617 52%, #000 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgb(255 255 255 / 0.035) 0px, rgb(255 255 255 / 0.035) 1px, transparent 1px, transparent 3px),
            radial-gradient(ellipse 110% 80% at 50% 20%, rgb(255 255 255 / 0.06), transparent 60%)
          `,
        }}
      />
      <div className="relative z-10 flex flex-1 flex-col px-6 pt-14">
        <time
          dateTime={now.toISOString()}
          className="text-center text-[clamp(2.75rem,12vw,4.25rem)] font-extralight leading-none tracking-[-0.02em] tabular-nums"
        >
          {timeStr}
        </time>
        <p className="mt-3 text-center text-lg font-normal text-white/55">{dateStr}</p>
        <p className="mt-6 text-center text-[15px] font-medium leading-snug text-white/55">
          This is {phoneOwner}.
        </p>
        <p className="mt-3 text-center text-[13px] font-medium leading-snug text-white/45">
          Tap around like you borrowed it for 30 seconds.
        </p>
      </div>
      <footer className="relative z-10 flex flex-col items-center gap-4 pb-10 pt-4">
        <SlideToUnlock onUnlock={onEnter} />
      </footer>
    </div>
  );
}
