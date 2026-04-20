import type { WindowBounds } from '@/types/geometry';

export type SnapSide = 'left' | 'right';

const EDGE_THRESHOLD_PX = 24;
const OUTER_MARGIN = 12;
const TASKBAR_GUESS_H = 56;

export function getSnapSide(clientX: number, vw: number): SnapSide | null {
  if (clientX <= EDGE_THRESHOLD_PX) return 'left';
  if (clientX >= vw - EDGE_THRESHOLD_PX) return 'right';
  return null;
}

export function getSnappedBounds(side: SnapSide, vw: number, vh: number, keepYFrom?: WindowBounds): WindowBounds {
  const availW = Math.max(320, vw - OUTER_MARGIN * 2);
  const availH = Math.max(240, vh - OUTER_MARGIN * 2 - TASKBAR_GUESS_H);
  const width = Math.floor(availW / 2);
  const height = availH;
  const x = side === 'left' ? OUTER_MARGIN : OUTER_MARGIN + width;
  const y = keepYFrom ? Math.min(Math.max(keepYFrom.y, OUTER_MARGIN), OUTER_MARGIN) : OUTER_MARGIN;
  return { x, y, width, height };
}

