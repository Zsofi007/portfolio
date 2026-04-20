import type { Cell, Difficulty } from '@/components/apps/minesweeper/minesweeperTypes';

export const DIFFICULTIES: Difficulty[] = [
  { id: 'beginner', label: 'Beginner (9×9 · 10 mines)', w: 9, h: 9, mines: 10 },
  { id: 'intermediate', label: 'Intermediate (16×16 · 40 mines)', w: 16, h: 16, mines: 40 },
];

export function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

export function formatCounter(n: number) {
  const v = clampInt(n, -99, 999);
  const sign = v < 0 ? '-' : '';
  const abs = Math.abs(v);
  return sign + String(abs).padStart(3, '0');
}

export function idx(x: number, y: number, w: number) {
  return y * w + x;
}

export function inBounds(x: number, y: number, w: number, h: number) {
  return x >= 0 && x < w && y >= 0 && y < h;
}

export function neighbors(x: number, y: number, w: number, h: number) {
  const out: Array<{ x: number; y: number }> = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (inBounds(nx, ny, w, h)) out.push({ x: nx, y: ny });
    }
  }
  return out;
}

export function makeEmptyBoard(w: number, h: number): Cell[] {
  const cells: Cell[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      cells.push({ x, y, mine: false, revealed: false, flagged: false, adjacent: 0 });
    }
  }
  return cells;
}

export function computeAdjacencies(cells: Cell[], w: number, h: number) {
  for (const c of cells) {
    if (c.mine) {
      c.adjacent = 0;
      continue;
    }
    let n = 0;
    for (const nb of neighbors(c.x, c.y, w, h)) {
      if (cells[idx(nb.x, nb.y, w)].mine) n++;
    }
    c.adjacent = n;
  }
}

export function seedMines(cells: Cell[], w: number, h: number, mineCount: number, safe: { x: number; y: number }) {
  const blocked = new Set<number>();
  blocked.add(idx(safe.x, safe.y, w));
  for (const nb of neighbors(safe.x, safe.y, w, h)) blocked.add(idx(nb.x, nb.y, w));

  const candidates: number[] = [];
  for (let i = 0; i < cells.length; i++) if (!blocked.has(i)) candidates.push(i);

  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  const toPlace = Math.min(mineCount, candidates.length);
  for (let i = 0; i < toPlace; i++) cells[candidates[i]].mine = true;
  computeAdjacencies(cells, w, h);
}

export function floodReveal(
  cells: Cell[],
  w: number,
  h: number,
  start: { x: number; y: number },
): { changed: number; hitMine: boolean; hitIndex: number | null } {
  const q: Array<{ x: number; y: number }> = [start];
  const seen = new Set<number>();
  let changed = 0;

  while (q.length) {
    const cur = q.shift();
    if (!cur) break;
    const i = idx(cur.x, cur.y, w);
    if (seen.has(i)) continue;
    seen.add(i);

    const c = cells[i];
    if (c.flagged || c.revealed) continue;

    c.revealed = true;
    changed++;
    if (c.mine) return { changed, hitMine: true, hitIndex: i };

    if (c.adjacent === 0) {
      for (const nb of neighbors(cur.x, cur.y, w, h)) {
        const ni = idx(nb.x, nb.y, w);
        const nc = cells[ni];
        if (!nc.revealed && !nc.flagged) q.push(nb);
      }
    }
  }

  return { changed, hitMine: false, hitIndex: null };
}

export function countFlagsAround(cells: Cell[], w: number, h: number, x: number, y: number) {
  let n = 0;
  for (const nb of neighbors(x, y, w, h)) if (cells[idx(nb.x, nb.y, w)].flagged) n++;
  return n;
}

export function countRevealedSafe(cells: Cell[]) {
  let n = 0;
  for (const c of cells) if (c.revealed && !c.mine) n++;
  return n;
}

export function totalSafe(w: number, h: number, mines: number) {
  return w * h - mines;
}

export function numberColor(adj: number) {
  switch (adj) {
    case 1:
      return 'text-blue-800';
    case 2:
      return 'text-green-800';
    case 3:
      return 'text-red-700';
    case 4:
      return 'text-indigo-800';
    case 5:
      return 'text-amber-800';
    case 6:
      return 'text-teal-800';
    case 7:
      return 'text-slate-800';
    case 8:
      return 'text-neutral-800';
    default:
      return 'text-neutral-800';
  }
}

