import { FLAPPY_BIRD_R } from '@/components/apps/flappy/flappyConstants';
import { useFlappyGame } from '@/components/apps/flappy/useFlappyGame';
import { useEffect, useMemo, useRef, useState } from 'react';

export function FlappyApp() {
  const reducedMotion = useMemo(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
    [],
  );
  const [world, setWorld] = useState<{ w: number; h: number }>({ w: 320, h: 520 });
  const { snapshot, reset, flap } = useFlappyGame(world.w, world.h);
  const { phase, score, best, birdY, pipes, birdX, birdR, gapH, pipeW, h, groundH } = snapshot;
  const boardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      const nextW = Math.max(240, Math.round(r.width));
      const nextH = Math.max(320, Math.round(r.height));
      setWorld((prev) => (prev.w === nextW && prev.h === nextH ? prev : { w: nextW, h: nextH }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const hud = (
    <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 pt-4">
      <div className="rounded-full bg-black/35 px-3 py-1 text-[13px] font-semibold text-white backdrop-blur-md">
        Score: {score}
      </div>
      <div className="rounded-full bg-black/25 px-3 py-1 text-[13px] font-semibold text-white/90 backdrop-blur-md">
        Best: {best}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f2f2f7]">
      <div className="relative min-h-0 flex-1">
        <button
          type="button"
          ref={boardRef}
          aria-label={phase === 'over' ? 'Flappy. Game over. Tap to restart.' : 'Flappy. Tap to flap.'}
          className="relative h-full w-full overflow-hidden rounded-none border-0 bg-gradient-to-b from-[#8dd6ff] via-[#61b8ff] to-[#2a7bd6]"
          onPointerDown={(e) => {
            e.preventDefault();
            if (phase === 'over') reset();
            else flap();
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              if (phase === 'over') reset();
              else flap();
            }
            if (e.key === 'r' || e.key === 'R') {
              e.preventDefault();
              reset();
            }
          }}
        >
          {hud}

          {/* Pipes */}
          {pipes.map((p, idx) => {
            const gapTop = p.gapY - gapH / 2;
            const gapBottom = p.gapY + gapH / 2;
            return (
              <div key={`${idx}-${Math.round(p.x)}`}>
                <div
                  className="absolute top-0 rounded-b-xl bg-emerald-600 shadow-[inset_0_-6px_0_rgb(0_0_0/0.14)]"
                  style={{ left: p.x, width: pipeW, height: gapTop }}
                />
                <div
                  className="absolute rounded-t-xl bg-emerald-600 shadow-[inset_0_6px_0_rgb(0_0_0/0.14)]"
                  style={{ left: p.x, width: pipeW, top: gapBottom, height: h - groundH - gapBottom }}
                />
              </div>
            );
          })}

          {/* Bird */}
          <div
            className="absolute left-0 top-0"
            style={{
              transform: `translate(${birdX - birdR}px, ${birdY - birdR}px)`,
              transition: reducedMotion ? undefined : phase === 'ready' ? 'transform 220ms ease-out' : undefined,
            }}
          >
            <div
              className="relative rounded-full bg-yellow-300 shadow-[0_10px_22px_rgb(0_0_0/0.22)] ring-2 ring-yellow-100"
              style={{ width: FLAPPY_BIRD_R * 2, height: FLAPPY_BIRD_R * 2 }}
            >
              <div className="absolute left-[16px] top-[9px] h-[6px] w-[10px] rounded-full bg-orange-500" />
              <div className="absolute left-[8px] top-[8px] h-[6px] w-[6px] rounded-full bg-black/80" />
            </div>
          </div>

          {/* Overlay */}
          {phase !== 'playing' ? (
            <div className="absolute inset-0 z-30 flex items-center justify-center p-6">
              <div className="w-full max-w-[18rem] rounded-3xl border border-white/25 bg-black/25 p-4 text-center text-white backdrop-blur-xl">
                <p className="m-0 text-[15px] font-semibold">{phase === 'ready' ? 'Tap to start' : 'Game over'}</p>
                <p className="m-0 mt-1 text-[13px] text-white/80">
                  {phase === 'ready' ? 'Tap anywhere to flap.' : 'Tap to try again.'}
                </p>
              </div>
            </div>
          ) : null}

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: groundH }}>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-200 to-amber-400" />
            <div className="absolute top-0 left-0 right-0 h-[10px] bg-gradient-to-b from-black/20 to-transparent" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgb(0 0 0 / 0.18) 0px, rgb(0 0 0 / 0.18) 1px, transparent 1px, transparent 10px)',
              }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}

