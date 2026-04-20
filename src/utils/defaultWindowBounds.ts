import type { WindowBounds } from '@/types/geometry';

const MIN_W = 280;
const MIN_H = 200;
const MARGIN_X = 32;
const MARGIN_Y = 88;
const CASCADE_STEP = 26;
const CASCADE_WRAP = 8;

/** Initial size for a newly opened window: width ≥ 50% viewport (within clamps). */
export function getDefaultWindowBounds(cascadeIndex: number): WindowBounds {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const halfW = Math.floor(vw * 0.5);
  let width = Math.max(halfW, MIN_W);
  width = Math.min(width, Math.max(MIN_W, vw - MARGIN_X));
  let height = Math.max(Math.floor(vh * 0.45), MIN_H);
  height = Math.min(height, Math.max(MIN_H, vh - MARGIN_Y));
  // Default: centered with a small cascade offset.
  const baseX = Math.max(0, Math.floor((vw - width) / 2));
  const baseY = Math.max(0, Math.floor((vh - height) / 2));
  const step = (cascadeIndex % CASCADE_WRAP) * CASCADE_STEP;
  return clampBoundsToViewport({ x: baseX + step, y: baseY + step, width, height });
}

function clampBoundsToViewport(bounds: WindowBounds): WindowBounds {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(bounds.width, Math.max(MIN_W, vw - MARGIN_X));
  const height = Math.min(bounds.height, Math.max(MIN_H, vh - MARGIN_Y));
  const x = clamp(bounds.x, 0, Math.max(0, vw - width));
  const y = clamp(bounds.y, 0, Math.max(0, vh - height));
  return { x, y, width, height };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function getMinesweeperFitBounds(gridW: number, gridH: number, x: number, y: number): WindowBounds {
  const tile = 28;
  const gap = 2;
  const boardPad = 16;
  const boardWidth = gridW * tile + (gridW - 1) * gap + boardPad;
  const boardHeight = gridH * tile + (gridH - 1) * gap + boardPad;

  // Include window chrome (titlebar + borders) and Minesweeper header/footer.
  // Titlebar uses `py-2` plus borders, and the window frame adds borders + inner wrapper.
  const chromeAndPaddingW = 70;
  const chromeAndPaddingH = 330;
  return clampBoundsToViewport({
    x,
    y,
    width: boardWidth + chromeAndPaddingW,
    height: boardHeight + chromeAndPaddingH,
  });
}

/**
 * App-specific initial bounds so smaller apps don't open oversized.
 * Falls back to `getDefaultWindowBounds`.
 */
export function getInitialWindowBoundsForApp(appId: string, cascadeIndex: number): WindowBounds {
  const base = getDefaultWindowBounds(cascadeIndex);
  if (appId !== 'minesweeper') return base;

  return getMinesweeperFitBounds(9, 9, base.x, base.y);
}
