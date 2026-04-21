import { Button } from '@/components/ui/Button';
import { getLandingComputerTagline } from '@/config/developerIdentity';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type DesktopLandingViewProps = { onEnter: () => void };

export function DesktopLandingView({ onEnter }: DesktopLandingViewProps) {
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [ctaHover, setCtaHover] = useState(false);
  useEffect(() => {
    setCtaHover(false);
    ctaRef.current?.focus();
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-retro-screen px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgb(255 255 255 / 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '3px 3px',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="relative z-10 max-w-lg"
      >
        <h1 className="font-pixel text-lg leading-snug text-[color:var(--ui-focus)] [text-shadow:2px_2px_0_#000]">
          Welcome
        </h1>
        <p className="font-retro mt-3 text-xl leading-snug text-white/80 [text-shadow:1px_1px_0_rgb(0_0_0/0.9)]">
          This is {getLandingComputerTagline()}.
        </p>
        <p className="font-retro mt-4 text-2xl leading-snug text-white/90 [text-shadow:1px_1px_0_rgb(0_0_0/0.9)]">
          Go ahead… snoop around.
        </p>
        <div className="font-retro mt-5 inline-flex flex-col items-center gap-1 rounded-sm border border-white/10 bg-black/20 px-4 py-2 text-left text-lg text-white/70">
          <div>
            <span className="text-white/55">Last login:</span> just now
          </div>
          <div>
            <span className="text-white/55">User:</span> Guest
          </div>
        </div>
        <div className="mt-8">
          <Button
            ref={ctaRef}
            className="min-w-[14rem] cursor-pointer"
            onClick={onEnter}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            onFocus={() => setCtaHover(true)}
            onBlur={() => setCtaHover(false)}
          >
            {ctaHover ? 'You sure?' : 'Start Snooping'}
          </Button>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute bottom-4 right-5 z-10 font-retro text-base text-white/35">
        Some files are more interesting than others.
      </div>
    </div>
  );
}
