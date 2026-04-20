import { newId } from '@/utils/newId';
import { create } from 'zustand';

export type ToastItem = { id: string; message: string };

type ShellUiState = {
  contextMenu: { x: number; y: number } | null;
  commandPaletteOpen: boolean;
  toasts: ToastItem[];
  soundEnabled: boolean;
  openContextMenu: (x: number, y: number) => void;
  closeContextMenu: () => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  pushToast: (message: string) => void;
  removeToast: (id: string) => void;
  toggleSound: () => void;
};

export const useShellUiStore = create<ShellUiState>((set) => ({
  contextMenu: null,
  commandPaletteOpen: false,
  toasts: [],
  soundEnabled: false,

  openContextMenu: (x, y) => set({ contextMenu: { x, y } }),

  closeContextMenu: () => set({ contextMenu: null }),

  openCommandPalette: () => set({ commandPaletteOpen: true }),

  closeCommandPalette: () => set({ commandPaletteOpen: false }),

  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),

  pushToast: (message) => {
    const id = newId();
    set((s) => ({ toasts: [...s.toasts, { id, message }] }));
  },

  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
}));
