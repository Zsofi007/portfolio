import { RiRestartLine } from 'react-icons/ri';
import { clampInt, formatCounter } from '@/components/apps/minesweeper/minesweeperLogic';

type MinesweeperHeaderProps = {
  mineCounter: number;
  seconds: number;
  bestSeconds: number | null;
  face: string;
  onNewGame: () => void;
  onReset: () => void;
};

export function MinesweeperHeader({
  mineCounter,
  seconds,
  bestSeconds,
  face,
  onNewGame,
  onReset,
}: MinesweeperHeaderProps) {
  return (
    <>
      <div className="mb-2 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-sm border border-neutral-500 bg-white px-2 py-1 font-retro text-base text-retro-ink hover:bg-neutral-50"
        >
          <RiRestartLine aria-hidden className="text-lg leading-none" />
          Reset
        </button>
      </div>

      <div
        className={
          'mb-2 flex items-center justify-between gap-2 rounded-sm border border-neutral-500 p-1 ' +
          '[box-shadow:inset_1px_1px_0_#8b8b8b,inset_-1px_-1px_0_#fff]'
        }
      >
        <div
          className={
            'min-w-[86px] rounded-sm bg-[#1b001b] px-2 py-1 font-pixel text-[14px] tracking-[0.08em] text-red-500 ' +
            'border border-neutral-700 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08)]'
          }
          aria-label={`Mines remaining ${mineCounter}`}
        >
          {formatCounter(mineCounter)}
        </div>

        <button
          type="button"
          onClick={onNewGame}
          className={
            'h-8 w-10 rounded-sm border border-neutral-600 bg-[color:var(--color-xp-panel)] text-xl ' +
            '[box-shadow:inset_1px_1px_0_#fff,inset_-1px_-1px_0_#8b8b8b] active:[box-shadow:inset_1px_1px_0_#8b8b8b,inset_-1px_-1px_0_#fff]'
          }
          aria-label="New game"
        >
          {face}
        </button>

        <div
          className={
            'min-w-[86px] rounded-sm bg-[#1b001b] px-2 py-1 text-right font-pixel text-[14px] tracking-[0.08em] text-red-500 ' +
            'border border-neutral-700 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08)]'
          }
          aria-label={`Time ${seconds} seconds`}
        >
          {String(clampInt(seconds, 0, 999)).padStart(3, '0')}
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between gap-2 px-0.5 text-base text-neutral-700">
        <span>Best: {bestSeconds == null ? '—' : `${bestSeconds}s`}</span>
        <span className="text-neutral-600">Yes, I built this too.</span>
      </div>
    </>
  );
}

