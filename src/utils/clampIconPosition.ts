import { clampPosToViewport, clampSlotToViewport, posToSlot, slotToPos } from '@/utils/iconGrid';

export function clampIconPosition(
  x: number,
  y: number,
  vw: number,
  vh: number,
): { x: number; y: number } {
  const clamped = clampPosToViewport(x, y, vw, vh);
  const slot = clampSlotToViewport(posToSlot(clamped.x, clamped.y), vw, vh);
  const snapped = slotToPos(slot);
  return clampPosToViewport(snapped.x, snapped.y, vw, vh);
}
