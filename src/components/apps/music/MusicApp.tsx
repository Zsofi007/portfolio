import { TRACKS } from '@/components/apps/music/musicData';
import { useFakeProgress } from '@/components/apps/music/useFakeProgress';
import { useMemo, useState } from 'react';

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

export function MusicApp() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const track = TRACKS[idx] ?? TRACKS[0];
  const posMs = useFakeProgress(playing, track.durMs);
  const pct = Math.max(0, Math.min(1, posMs / Math.max(1, track.durMs)));

  const artStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(ellipse 110% 80% at 30% 20%, rgb(255 255 255 / 0.22), transparent 60%),' +
        'radial-gradient(ellipse 120% 90% at 78% 26%, rgb(255 255 255 / 0.14), transparent 55%),' +
        'linear-gradient(145deg, #0ea5e9 0%, #a855f7 55%, #fb7185 100%)',
    }),
    [],
  );

  const prev = () => {
    setPlaying(false);
    setIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  };
  const next = () => {
    setPlaying(false);
    setIdx((i) => (i + 1) % TRACKS.length);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f2f2f7] p-4 font-sans text-black">
      <header className="mb-4">
        <p className="m-0 text-[22px] font-bold tracking-tight">Now Playing</p>
        <p className="m-0 mt-1 text-[13px] font-medium text-black/55">Mini player (totally real)</p>
      </header>

      <div className="rounded-[2rem] border border-black/[0.06] bg-white p-4 shadow-[0_18px_50px_rgb(0_0_0/0.10)]">
        <div className="mx-auto aspect-square w-full max-w-[18.5rem] overflow-hidden rounded-3xl" style={artStyle} />

        <div className="mt-4">
          <p className="m-0 truncate text-[18px] font-bold tracking-tight text-black">{track.title}</p>
          <p className="m-0 mt-1 text-[13px] font-semibold text-black/55">{track.artist}</p>
        </div>

        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-black/[0.06]">
            <div className="h-full rounded-full bg-[#007aff]" style={{ width: `${Math.round(pct * 100)}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-[12px] font-semibold tabular-nums text-black/45">
            <span>{fmt(posMs)}</span>
            <span>{fmt(track.durMs)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            className="h-12 w-12 rounded-full border border-black/[0.08] bg-white text-[18px] text-black/70 shadow-[0_10px_26px_rgb(0_0_0/0.10)] outline-none active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#007aff]"
            onClick={prev}
            aria-label="Previous track"
          >
            ‹‹
          </button>
          <button
            type="button"
            className="h-14 w-14 rounded-full bg-[#007aff] text-[18px] font-bold text-white shadow-[0_18px_40px_rgb(0_122_255/0.28)] outline-none active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#007aff]"
            onClick={() => setPlaying((v) => !v)}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <button
            type="button"
            className="h-12 w-12 rounded-full border border-black/[0.08] bg-white text-[18px] text-black/70 shadow-[0_10px_26px_rgb(0_0_0/0.10)] outline-none active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#007aff]"
            onClick={next}
            aria-label="Next track"
          >
            ››
          </button>
        </div>
      </div>
    </div>
  );
}

