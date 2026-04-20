/** localStorage keys for guidance / onboarding (SSR-safe helpers). */

export const GUIDANCE_KEYS = {
  guidedMode: 'portfolio:guidedMode',
  hints: 'portfolio:hints',
  desktopWelcomeSeen: 'portfolio:desktopWelcomeSeen',
  mobileWelcomeSeen: 'portfolio:mobileWelcomeSeen',
} as const;

export function readLocalString(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocalString(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore quota / private mode */
  }
}

export function readLocalJson<T>(key: string): T | null {
  const raw = readLocalString(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeLocalJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}
