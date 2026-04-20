import { create } from 'zustand';

export type WallpaperId = 'default' | 'midnight' | 'retro';

type WallpaperState = {
  id: WallpaperId;
  cycleWallpaper: () => void;
};

const ORDER: WallpaperId[] = ['default', 'midnight', 'retro'];

export const useWallpaperStore = create<WallpaperState>((set, get) => ({
  id: 'default',

  cycleWallpaper: () => {
    const cur = get().id;
    const i = ORDER.indexOf(cur);
    const next = ORDER[(i + 1) % ORDER.length];
    set({ id: next });
  },
}));
