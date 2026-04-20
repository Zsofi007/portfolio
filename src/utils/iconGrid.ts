import { DESKTOP_ICON_LAYOUT_H, DESKTOP_ICON_LAYOUT_W } from '@/utils/iconMetrics';

export type GridSlot = { col: number; row: number };
export type IconPosition = { x: number; y: number };
export type Rect = { left: number; top: number; right: number; bottom: number };

export const GRID_BASE_X = 16;
export const GRID_BASE_Y = 16;
export const GRID_STEP_X = 96;
export const GRID_STEP_Y = 108;

export function posToSlot(x: number, y: number): GridSlot {
  return {
    col: Math.max(0, Math.round((x - GRID_BASE_X) / GRID_STEP_X)),
    row: Math.max(0, Math.round((y - GRID_BASE_Y) / GRID_STEP_Y)),
  };
}

export function slotToPos(slot: GridSlot): IconPosition {
  return {
    x: GRID_BASE_X + slot.col * GRID_STEP_X,
    y: GRID_BASE_Y + slot.row * GRID_STEP_Y,
  };
}

export function clampPosToViewport(x: number, y: number, vw: number, vh: number): IconPosition {
  const maxX = Math.max(0, vw - DESKTOP_ICON_LAYOUT_W);
  const maxY = Math.max(0, vh - DESKTOP_ICON_LAYOUT_H);
  return { x: Math.min(Math.max(x, 0), maxX), y: Math.min(Math.max(y, 0), maxY) };
}

export function clampSlotToViewport(slot: GridSlot, vw: number, vh: number): GridSlot {
  const maxCol = Math.max(0, Math.floor((vw - GRID_BASE_X - DESKTOP_ICON_LAYOUT_W) / GRID_STEP_X));
  const maxRow = Math.max(0, Math.floor((vh - GRID_BASE_Y - DESKTOP_ICON_LAYOUT_H) / GRID_STEP_Y));
  return { col: Math.min(Math.max(slot.col, 0), maxCol), row: Math.min(Math.max(slot.row, 0), maxRow) };
}

export function nearestFreeSlot(target: GridSlot, occupied: Set<string>, vw: number, vh: number): GridSlot {
  const t = clampSlotToViewport(target, vw, vh);
  const key = (s: GridSlot) => `${s.col},${s.row}`;
  if (!occupied.has(key(t))) return t;

  // Spiral search around target.
  for (let r = 1; r <= 20; r++) {
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
        const s = clampSlotToViewport({ col: t.col + dx, row: t.row + dy }, vw, vh);
        if (!occupied.has(key(s))) return s;
      }
    }
  }
  return t;
}

function intersects(a: Rect, b: Rect) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export function blockedSlotsForRect(rect: Rect, vw: number, vh: number): GridSlot[] {
  const max = clampSlotToViewport({ col: Number.POSITIVE_INFINITY, row: Number.POSITIVE_INFINITY }, vw, vh);
  const minCol = Math.max(0, Math.floor((rect.left - GRID_BASE_X - DESKTOP_ICON_LAYOUT_W) / GRID_STEP_X));
  const maxCol = Math.min(max.col, Math.ceil((rect.right - GRID_BASE_X) / GRID_STEP_X));
  const minRow = Math.max(0, Math.floor((rect.top - GRID_BASE_Y - DESKTOP_ICON_LAYOUT_H) / GRID_STEP_Y));
  const maxRow = Math.min(max.row, Math.ceil((rect.bottom - GRID_BASE_Y) / GRID_STEP_Y));

  const out: GridSlot[] = [];
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      const p = slotToPos({ col, row });
      const iconRect: Rect = { left: p.x, top: p.y, right: p.x + DESKTOP_ICON_LAYOUT_W, bottom: p.y + DESKTOP_ICON_LAYOUT_H };
      if (intersects(iconRect, rect)) out.push({ col, row });
    }
  }
  return out;
}

