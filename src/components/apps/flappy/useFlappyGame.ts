import { readFlappyBest, writeFlappyBest } from '@/components/apps/flappy/flappyStorage';
import type { FlappyPhase, FlappyPipe } from '@/components/apps/flappy/flappyTypes';
import { useEffect, useRef, useState } from 'react';

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function makePipe(x: number, h: number, groundH: number, gapH: number, prevGapY?: number): FlappyPipe {
  const pad = 12;
  const min = pad + gapH / 2;
  const max = h - groundH - pad - gapH / 2;
  const maxDelta = Math.max(70, Math.min(140, gapH * 0.55));

  const lo = prevGapY == null ? min : Math.max(min, prevGapY - maxDelta);
  const hi = prevGapY == null ? max : Math.min(max, prevGapY + maxDelta);
  const gapY = lo + Math.random() * Math.max(0, hi - lo);
  return { x, gapY, passed: false };
}

export type FlappySnapshot = {
  phase: FlappyPhase;
  score: number;
  best: number;
  w: number;
  h: number;
  groundH: number;
  birdX: number;
  birdR: number;
  gapH: number;
  pipeW: number;
  birdY: number;
  pipes: FlappyPipe[];
};

export function useFlappyGame(w: number, h: number) {
  const [phase, setPhase] = useState<FlappyPhase>('ready');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => readFlappyBest());
  const [tick, setTick] = useState(0);

  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const scoreRef = useRef(0);

  const birdYRef = useRef(Math.max(40, h * 0.35));
  const birdVyRef = useRef(0);
  const pipesRef = useRef<FlappyPipe[]>([]);

  const gapH = Math.max(140, Math.min(200, h * 0.32));
  const pipeW = Math.max(46, Math.min(66, w * 0.18));
  const spacing = Math.max(160, Math.min(230, w * 0.62));
  const birdX = Math.max(72, Math.min(120, w * 0.28));
  const birdR = Math.max(12, Math.min(16, w * 0.045));
  const groundH = Math.max(48, Math.min(86, h * 0.12));
  const gravity = 1400;
  const flapVy = -420;
  const speed = 180;

  const reset = () => {
    setPhase('ready');
    setScore(0);
    scoreRef.current = 0;
    birdYRef.current = Math.max(40, h * 0.35);
    birdVyRef.current = 0;
    const p1 = makePipe(w + 40, h, groundH, gapH);
    const p2 = makePipe(w + 40 + spacing, h, groundH, gapH, p1.gapY);
    pipesRef.current = [p1, p2];
    lastRef.current = null;
    setTick((t) => t + 1);
  };

  const flap = () => {
    if (phase === 'ready') setPhase('playing');
    if (phase !== 'playing' && phase !== 'ready') return;
    birdVyRef.current = flapVy;
  };

  useEffect(() => {
    if (pipesRef.current.length) return;
    const p1 = makePipe(w + 40, h, groundH, gapH);
    const p2 = makePipe(w + 40 + spacing, h, groundH, gapH, p1.gapY);
    pipesRef.current = [p1, p2];
  }, [w, h, gapH, groundH, spacing]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (phase !== 'playing') return;

    const step = (ts: number) => {
      const last = lastRef.current ?? ts;
      lastRef.current = ts;
      const dt = clamp((ts - last) / 1000, 0, 0.035);

      birdVyRef.current += gravity * dt;
      birdYRef.current += birdVyRef.current * dt;

      const pipes = pipesRef.current;
      for (const p of pipes) p.x -= speed * dt;
      if (pipes[0] && pipes[0].x < -pipeW - 10) pipes.shift();
      while (pipes.length < 2) {
        const lastX = pipes.length ? pipes[pipes.length - 1].x : w + 40;
        const prevGapY = pipes.length ? pipes[pipes.length - 1].gapY : undefined;
        pipes.push(makePipe(lastX + spacing, h, groundH, gapH, prevGapY));
      }

      let nextScore = scoreRef.current;
      for (const p of pipes) {
        const withinX = birdX + birdR > p.x && birdX - birdR < p.x + pipeW;
        const gapTop = p.gapY - gapH / 2;
        const gapBottom = p.gapY + gapH / 2;

        if (withinX) {
          const hitsTop = birdYRef.current - birdR < gapTop;
          const hitsBottom = birdYRef.current + birdR > gapBottom;
          if (hitsTop || hitsBottom) {
            setPhase('over');
            return;
          }
        }

        const passed = p.x + pipeW < birdX - birdR;
        if (passed && !p.passed) {
          p.passed = true;
          nextScore += 1;
        }
      }

      if (birdYRef.current + birdR > h - groundH) {
        birdYRef.current = h - groundH - birdR;
        setPhase('over');
        return;
      }
      if (birdYRef.current - birdR < 0) {
        birdYRef.current = birdR;
        birdVyRef.current = 0;
      }

      if (nextScore !== scoreRef.current) {
        scoreRef.current = nextScore;
        setScore(nextScore);
      }

      setTick((t) => t + 1);
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [phase, birdR, birdX, gapH, h, pipeW, spacing, w]);

  useEffect(() => {
    if (phase !== 'over') return;
    setBest((b) => {
      const next = Math.max(b, scoreRef.current);
      if (next !== b) writeFlappyBest(next);
      return next;
    });
  }, [phase]);

  const snapshot: FlappySnapshot = {
    phase,
    score,
    best,
    w,
    h,
    groundH,
    birdX,
    birdR,
    gapH,
    pipeW,
    birdY: birdYRef.current,
    pipes: pipesRef.current,
  };

  return { snapshot, reset, flap, tick };
}

