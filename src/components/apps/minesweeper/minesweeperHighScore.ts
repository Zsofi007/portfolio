type HighScoreMapV1 = {
  v: 1;
  bestSecondsByKey: Record<string, number>;
};

const KEY = 'minesweeper.highscores.v1';

function difficultyKey(w: number, h: number, mines: number) {
  return `${w}x${h}:${mines}`;
}

function readAll(): HighScoreMapV1 {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { v: 1, bestSecondsByKey: {} };
    const parsed = JSON.parse(raw) as HighScoreMapV1;
    if (!parsed || parsed.v !== 1 || !parsed.bestSecondsByKey) return { v: 1, bestSecondsByKey: {} };
    return parsed;
  } catch {
    return { v: 1, bestSecondsByKey: {} };
  }
}

function writeAll(v: HighScoreMapV1) {
  localStorage.setItem(KEY, JSON.stringify(v));
}

export function getBestSecondsForDifficulty(w: number, h: number, mines: number): number | null {
  const all = readAll();
  const k = difficultyKey(w, h, mines);
  return typeof all.bestSecondsByKey[k] === 'number' ? all.bestSecondsByKey[k] : null;
}

export function maybeRecordBestSeconds(w: number, h: number, mines: number, seconds: number): boolean {
  const all = readAll();
  const k = difficultyKey(w, h, mines);
  const prev = all.bestSecondsByKey[k];
  if (typeof prev === 'number' && prev <= seconds) return false;
  all.bestSecondsByKey[k] = seconds;
  writeAll(all);
  return true;
}

