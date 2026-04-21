const KEY = 'flappy.best.v1';

export function readFlappyBest(): number {
  if (typeof window === 'undefined') return 0;
  const raw = window.localStorage.getItem(KEY);
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

export function writeFlappyBest(next: number) {
  try {
    window.localStorage.setItem(KEY, String(Math.max(0, Math.floor(next))));
  } catch {
    // ignore
  }
}

