import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  clampInt,
  countFlagsAround,
  countRevealedSafe,
  floodReveal,
  idx,
  makeEmptyBoard,
  neighbors,
  seedMines,
  totalSafe,
} from '@/components/apps/minesweeper/minesweeperLogic';
import type { Cell, Difficulty, GameStatus } from '@/components/apps/minesweeper/minesweeperTypes';
import { getBestSecondsForDifficulty, maybeRecordBestSeconds } from '@/components/apps/minesweeper/minesweeperHighScore';

export function useMinesweeperGame(difficulty: Difficulty) {
  const [cells, setCells] = useState<Cell[]>(() => makeEmptyBoard(difficulty.w, difficulty.h));
  const [status, setStatus] = useState<GameStatus>('ready');
  const [seeded, setSeeded] = useState(false);
  const [hitIndex, setHitIndex] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [bestSeconds, setBestSeconds] = useState<number | null>(() =>
    getBestSecondsForDifficulty(difficulty.w, difficulty.h, difficulty.mines),
  );

  const startAtMsRef = useRef<number | null>(null);
  const tickTimerRef = useRef<number | null>(null);

  const flagCount = useMemo(() => cells.reduce((n, c) => (c.flagged ? n + 1 : n), 0), [cells]);
  const mineCounter = difficulty.mines - flagCount;

  const stopTimer = useCallback(() => {
    if (tickTimerRef.current) window.clearInterval(tickTimerRef.current);
    tickTimerRef.current = null;
  }, []);

  const reset = useCallback(() => {
    stopTimer();
    startAtMsRef.current = null;
    setSeconds(0);
    setStatus('ready');
    setSeeded(false);
    setHitIndex(null);
    setCells(makeEmptyBoard(difficulty.w, difficulty.h));
  }, [difficulty.h, difficulty.w, stopTimer]);

  useEffect(() => {
    reset();
    setBestSeconds(getBestSecondsForDifficulty(difficulty.w, difficulty.h, difficulty.mines));
  }, [difficulty.w, difficulty.h, difficulty.mines, reset]);

  useEffect(() => {
    if (status !== 'playing') return;
    if (tickTimerRef.current) return;

    startAtMsRef.current = startAtMsRef.current ?? Date.now();
    tickTimerRef.current = window.setInterval(() => {
      const start = startAtMsRef.current;
      if (!start) return;
      const s = clampInt(Math.floor((Date.now() - start) / 1000), 0, 999);
      setSeconds(s);
    }, 250);

    return () => stopTimer();
  }, [status, stopTimer]);

  const maybeWin = (nextCells: Cell[]) => {
    const revealed = countRevealedSafe(nextCells);
    if (revealed >= totalSafe(difficulty.w, difficulty.h, difficulty.mines)) {
      setStatus('won');
      stopTimer();
      if (maybeRecordBestSeconds(difficulty.w, difficulty.h, difficulty.mines, seconds)) {
        setBestSeconds(seconds);
      }
      return true;
    }
    return false;
  };

  const revealAllMines = (nextCells: Cell[]) => {
    for (const c of nextCells) if (c.mine) c.revealed = true;
  };

  const onReveal = (x: number, y: number) => {
    setCells((prev) => {
      if (status === 'lost' || status === 'won') return prev;
      const w = difficulty.w;
      const h = difficulty.h;
      const next = prev.map((c) => ({ ...c }));
      const i = idx(x, y, w);
      const c = next[i];
      if (c.revealed || c.flagged) return prev;

      if (!seeded) {
        seedMines(next, w, h, difficulty.mines, { x, y });
        setSeeded(true);
      }
      if (status === 'ready') setStatus('playing');

      const res = floodReveal(next, w, h, { x, y });
      if (res.hitMine) {
        revealAllMines(next);
        setStatus('lost');
        setHitIndex(i);
        stopTimer();
        return next;
      }
      maybeWin(next);
      return next;
    });
  };

  const onChord = (x: number, y: number) => {
    setCells((prev) => {
      if (status !== 'playing') return prev;
      const w = difficulty.w;
      const h = difficulty.h;
      const next = prev.map((c) => ({ ...c }));
      const c = next[idx(x, y, w)];
      if (!c.revealed || c.mine || c.adjacent <= 0) return prev;

      const flags = countFlagsAround(next, w, h, x, y);
      if (flags !== c.adjacent) return prev;

      for (const nb of neighbors(x, y, w, h)) {
        const ni = idx(nb.x, nb.y, w);
        if (next[ni].flagged || next[ni].revealed) continue;
        const r = floodReveal(next, w, h, nb);
        if (r.hitMine) {
          revealAllMines(next);
          setStatus('lost');
          setHitIndex(r.hitIndex);
          stopTimer();
          return next;
        }
      }

      maybeWin(next);
      return next;
    });
  };

  const onToggleFlag = (x: number, y: number) => {
    setCells((prev) => {
      if (status === 'lost' || status === 'won') return prev;
      const w = difficulty.w;
      const next = prev.map((c) => ({ ...c }));
      const c = next[idx(x, y, w)];
      if (c.revealed) return prev;

      c.flagged = !c.flagged;
      if (status === 'ready') setStatus('playing');
      return next;
    });
  };

  const face = status === 'lost' ? '😵‍💫' : status === 'won' ? '😎' : '🙂';

  return {
    cells,
    status,
    hitIndex,
    seconds,
    bestSeconds,
    mineCounter,
    face,
    reset,
    onReveal,
    onChord,
    onToggleFlag,
  };
}

