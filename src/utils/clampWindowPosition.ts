import type { WindowBounds } from '@/types/geometry';

export function clampWindowPosition(bounds: WindowBounds, vw: number, vh: number): WindowBounds {
  const { width, height, x, y } = bounds;
  const maxX = Math.max(0, vw - width);
  const maxY = Math.max(0, vh - height);
  return {
    width,
    height,
    x: Math.min(Math.max(x, 0), maxX),
    y: Math.min(Math.max(y, 0), maxY),
  };
}
