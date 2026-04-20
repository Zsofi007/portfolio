import { useEffect, useMemo, useState } from 'react';
import { MinesweeperBoard } from '@/components/apps/minesweeper/MinesweeperBoard';
import { MinesweeperHeader } from '@/components/apps/minesweeper/MinesweeperHeader';
import { DIFFICULTIES } from '@/components/apps/minesweeper/minesweeperLogic';
import type { DifficultyId } from '@/components/apps/minesweeper/minesweeperTypes';
import { useMinesweeperGame } from '@/components/apps/minesweeper/useMinesweeperGame';
import { useAppStore } from '@/store/appStore';
import { getMinesweeperFitBounds } from '@/utils/defaultWindowBounds';

type MinesweeperAppProps = {
  windowId?: string;
};

export function MinesweeperApp({ windowId }: MinesweeperAppProps) {
  const [difficultyId, setDifficultyId] = useState<DifficultyId>('beginner');
  const difficulty = useMemo(
    () => DIFFICULTIES.find((d) => d.id === difficultyId) ?? DIFFICULTIES[0],
    [difficultyId],
  );

  const game = useMinesweeperGame(difficulty);
  const chromeState = useAppStore((s) => (windowId ? s.windows[windowId]?.chromeState : undefined));
  const bounds = useAppStore((s) => (windowId ? s.windows[windowId]?.bounds : undefined));
  const moveWindow = useAppStore((s) => s.moveWindow);

  useEffect(() => {
    if (!windowId || !bounds || chromeState !== 'normal') return;
    const next = getMinesweeperFitBounds(difficulty.w, difficulty.h, bounds.x, bounds.y);
    const same =
      next.x === bounds.x &&
      next.y === bounds.y &&
      next.width === bounds.width &&
      next.height === bounds.height;
    if (same) return;
    moveWindow(windowId, next);
  }, [bounds, chromeState, difficulty.h, difficulty.w, moveWindow, windowId]);

  return (
    <div className="h-full p-3">
      <div
        className={
          'w-fit max-w-full rounded-sm border border-neutral-500 bg-[color:var(--color-xp-panel)] p-2 ' +
          '[box-shadow:inset_1px_1px_0_#fff,inset_-1px_-1px_0_#8b8b8b]'
        }
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <label className="flex items-center gap-2 text-base text-retro-ink">
            <span className="text-base">Difficulty</span>
            <select
              className="rounded-sm border border-neutral-500 bg-white px-2 py-1 font-retro text-base"
              value={difficultyId}
              onChange={(e) => setDifficultyId(e.target.value as DifficultyId)}
              aria-label="Difficulty"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <MinesweeperHeader
          mineCounter={game.mineCounter}
          seconds={game.seconds}
          bestSeconds={game.bestSeconds}
          face={game.face}
          onNewGame={game.reset}
          onReset={game.reset}
        />

        <MinesweeperBoard
          w={difficulty.w}
          cells={game.cells}
          hitIndex={game.hitIndex}
          onReveal={game.onReveal}
          onChord={game.onChord}
          onToggleFlag={game.onToggleFlag}
        />

        <div className="mt-2 text-base text-neutral-700">
          Left click to reveal. Right click to flag. Click a revealed number to “chord” when flags match.
        </div>

        {game.status !== 'playing' && game.status !== 'ready' ? (
          <div className="mt-2 rounded-sm border border-neutral-500 bg-white px-2 py-1 text-base text-retro-ink">
            {game.status === 'won' ? 'You cleared the board.' : 'Boom. Try again.'}
          </div>
        ) : null}
      </div>
    </div>
  );
}

