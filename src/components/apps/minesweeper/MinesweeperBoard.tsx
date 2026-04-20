import { FaBomb, FaFlag } from 'react-icons/fa';
import { idx, numberColor } from '@/components/apps/minesweeper/minesweeperLogic';
import type { Cell } from '@/components/apps/minesweeper/minesweeperTypes';

type MinesweeperBoardProps = {
  w: number;
  cells: Cell[];
  hitIndex: number | null;
  onReveal: (x: number, y: number) => void;
  onChord: (x: number, y: number) => void;
  onToggleFlag: (x: number, y: number) => void;
};

export function MinesweeperBoard({
  w,
  cells,
  hitIndex,
  onReveal,
  onChord,
  onToggleFlag,
}: MinesweeperBoardProps) {
  const cellButtonClass =
    'select-none font-retro text-[18px] leading-none ' +
    'h-6 w-6 sm:h-7 sm:w-7 ' +
    'flex items-center justify-center ' +
    'border border-neutral-500 ' +
    'transition-none';

  const unrevealedClass =
    'bg-[color:var(--color-xp-panel)] ' +
    '[box-shadow:inset_1px_1px_0_#fff,inset_-1px_-1px_0_#8b8b8b] ' +
    'active:[box-shadow:inset_1px_1px_0_#8b8b8b,inset_-1px_-1px_0_#fff]';

  const revealedClass = 'bg-neutral-200 [box-shadow:inset_0_0_0_1px_#c5c5c5]';

  return (
    <div
      role="grid"
      tabIndex={0}
      aria-label="Minesweeper board"
      className="w-fit max-w-full overflow-auto rounded-sm border border-neutral-500 bg-neutral-300 p-2"
      style={{ boxShadow: 'inset 1px 1px 0 #8b8b8b, inset -1px -1px 0 #fff' }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` }}>
        {cells.map((c) => {
          const isMine = c.mine;
          const isHit = hitIndex === idx(c.x, c.y, w);
          const base =
            cellButtonClass +
            ' ' +
            (c.revealed ? revealedClass : unrevealedClass) +
            ' ' +
            (isHit ? 'bg-red-200' : '') +
            ' focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-retro-titlebar-mid)]';

          const label = c.revealed
            ? isMine
              ? 'Mine'
              : c.adjacent
                ? `Revealed ${c.adjacent}`
                : 'Revealed empty'
            : c.flagged
              ? 'Flagged'
              : 'Hidden';

          const onClick = () => (c.revealed ? onChord(c.x, c.y) : onReveal(c.x, c.y));
          const onRightClick = (e: React.MouseEvent) => {
            e.preventDefault();
            onToggleFlag(c.x, c.y);
          };

          return (
            <button
              key={`${c.x}-${c.y}`}
              type="button"
              role="gridcell"
              aria-label={`Cell ${c.x + 1}, ${c.y + 1}: ${label}`}
              className={base}
              onClick={onClick}
              onContextMenu={onRightClick}
            >
              {c.revealed && !isMine && c.adjacent > 0 ? (
                <span className={'font-retro text-[18px] ' + numberColor(c.adjacent)}>{String(c.adjacent)}</span>
              ) : c.revealed && isMine ? (
                <FaBomb aria-hidden className="text-[14px] text-neutral-800" />
              ) : !c.revealed && c.flagged ? (
                <FaFlag aria-hidden className="text-[14px] text-red-700" />
              ) : (
                <span aria-hidden className="text-[16px]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

