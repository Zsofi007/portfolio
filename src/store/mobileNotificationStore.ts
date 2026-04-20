import { create } from 'zustand';

export type MobileNotificationItem = {
  id: string;
  title: string;
  body: string;
  at: number;
};

type State = {
  items: MobileNotificationItem[];
  seeded: boolean;
  seed: () => void;
  add: (item: Omit<MobileNotificationItem, 'at'> & { at?: number }) => void;
  dismiss: (id: string) => void;
  clearAll: () => void;
};

const initial: MobileNotificationItem[] = [
  {
    id: 'welcome',
    title: 'Portfolio',
    body: 'Tap an app to open it. Swipe down from the bell for notifications.',
    at: Date.now() - 120_000,
  },
  {
    id: 'wallpaper-hint',
    title: 'Wallpaper',
    body: 'Touch and hold the empty area below your apps to cycle the background.',
    at: Date.now() - 60_000,
  },
];

export const useMobileNotificationStore = create<State>((set, get) => ({
  items: [],
  seeded: false,

  seed: () => {
    if (get().seeded) return;
    set({ items: initial, seeded: true });
  },

  add: (item) => {
    const row: MobileNotificationItem = {
      ...item,
      at: item.at ?? Date.now(),
    };
    set((s) => ({ items: [row, ...s.items] }));
  },

  dismiss: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

  clearAll: () => set({ items: [] }),
}));
