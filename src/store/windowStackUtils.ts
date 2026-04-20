import type { WindowRecord } from '@/types/window';

export function pickActiveFromStack(
  stack: string[],
  windows: Record<string, WindowRecord | undefined>,
): string | null {
  for (let i = stack.length - 1; i >= 0; i--) {
    const w = windows[stack[i]];
    if (w && w.chromeState !== 'minimized') return stack[i];
  }
  return null;
}

export function withoutStackId(stack: string[], id: string): string[] {
  return stack.filter((x) => x !== id);
}
