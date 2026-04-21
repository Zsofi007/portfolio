import { create } from 'zustand';

export type MobileUsageSnapshot = {
  sessionStartMs: number | null;
  appOpens: Record<string, number>;
  totalOpens: number;
  firstMessagesNudgeShown: boolean;
  firstStatsNudgeShown: boolean;
};

type Actions = {
  startSession: () => void;
  resetSession: () => void;
  recordOpen: (appId: string) => void;
  markMessagesNudgeShown: () => void;
  markStatsNudgeShown: () => void;
};

export const useMobileUsageStore = create<MobileUsageSnapshot & Actions>((set, get) => ({
  sessionStartMs: null,
  appOpens: {},
  totalOpens: 0,
  firstMessagesNudgeShown: false,
  firstStatsNudgeShown: false,

  startSession: () => {
    if (get().sessionStartMs != null) return;
    set({ sessionStartMs: Date.now(), appOpens: {}, totalOpens: 0, firstMessagesNudgeShown: false, firstStatsNudgeShown: false });
  },

  resetSession: () => set({ sessionStartMs: null, appOpens: {}, totalOpens: 0, firstMessagesNudgeShown: false, firstStatsNudgeShown: false }),

  recordOpen: (appId) =>
    set((s) => {
      const next = { ...s.appOpens, [appId]: (s.appOpens[appId] ?? 0) + 1 };
      return { appOpens: next, totalOpens: s.totalOpens + 1 };
    }),

  markMessagesNudgeShown: () => set({ firstMessagesNudgeShown: true }),
  markStatsNudgeShown: () => set({ firstStatsNudgeShown: true }),
}));

export function formatElapsed(ms: number): { min: number; sec: number } {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return { min, sec };
}

