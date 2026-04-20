import { create } from 'zustand';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

type ThemeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
  getResolvedTheme: () => ResolvedTheme;
};

const KEY = 'ui.theme.mode.v1';

function safeReadMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const v = window.localStorage.getItem(KEY);
  if (v === 'light' || v === 'dark' || v === 'system') return v;
  return 'system';
}

function safeWriteMode(mode: ThemeMode) {
  try {
    window.localStorage.setItem(KEY, mode);
  } catch {
    // ignore storage failures (private mode, etc.)
  }
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'light' || mode === 'dark') return mode;
  const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: safeReadMode(),
  setMode: (mode) => {
    set({ mode });
    if (typeof window !== 'undefined') safeWriteMode(mode);
  },
  cycleMode: () => {
    const cur = get().mode;
    const next: ThemeMode = cur === 'system' ? 'light' : cur === 'light' ? 'dark' : 'system';
    get().setMode(next);
  },
  getResolvedTheme: () => resolveTheme(get().mode),
}));

export function applyResolvedThemeToDocument(theme: ResolvedTheme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  // Keep browser UI hints aligned.
  document.documentElement.style.colorScheme = theme;
}

