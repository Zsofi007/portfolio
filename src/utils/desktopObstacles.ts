export type Rect = { left: number; top: number; right: number; bottom: number };

export function readDesktopObstacles(): Rect[] {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-desktop-obstacle]'));
  return nodes
    .map((el) => el.getBoundingClientRect())
    .filter((r) => r.width > 0 && r.height > 0)
    .map((r) => ({ left: r.left, top: r.top, right: r.right, bottom: r.bottom }));
}

export function placeRectAvoidingObstacles(
  rect: Rect,
  obstacles: Rect[],
  bounds: Rect,
): { left: number; top: number } {
  let cur = { ...rect };
  const intersects = (a: Rect, b: Rect) =>
    a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

  // Iterate until stable. (Icons can be tightly stacked.)
  for (let iter = 0; iter < 48; iter++) {
    const hits = obstacles.filter((o) => intersects(cur, o));
    if (hits.length === 0) break;
    // Resolve against the "deepest" overlap first for more stable results.
    const hit = hits.sort((a, b) => (a.bottom - a.top) * (a.right - a.left) - (b.bottom - b.top) * (b.right - b.left))[0];

    const moveLeft = hit.left - cur.right;
    const moveRight = hit.right - cur.left;
    const moveUp = hit.top - cur.bottom;
    const moveDown = hit.bottom - cur.top;

    const candidates = [
      { dx: moveLeft, dy: 0 },
      { dx: moveRight, dy: 0 },
      { dx: 0, dy: moveUp },
      { dx: 0, dy: moveDown },
    ].sort((a, b) => Math.abs(a.dx) + Math.abs(a.dy) - (Math.abs(b.dx) + Math.abs(b.dy)));

    const { dx, dy } = candidates[0];
    if (dx === 0 && dy === 0) break;
    cur = {
      left: cur.left + dx,
      right: cur.right + dx,
      top: cur.top + dy,
      bottom: cur.bottom + dy,
    };

    // Clamp to bounds after each resolution step.
    const w = cur.right - cur.left;
    const h = cur.bottom - cur.top;
    const clampedLeft = Math.min(Math.max(cur.left, bounds.left), bounds.right - w);
    const clampedTop = Math.min(Math.max(cur.top, bounds.top), bounds.bottom - h);
    cur = { left: clampedLeft, top: clampedTop, right: clampedLeft + w, bottom: clampedTop + h };
  }

  return { left: cur.left, top: cur.top };
}

