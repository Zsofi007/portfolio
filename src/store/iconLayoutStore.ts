import { getDefaultIconPositions } from '@/utils/defaultIconPositions';
import { create } from 'zustand';

type IconLayoutState = {
  positions: Record<string, { x: number; y: number }>;
  isDirty: boolean;
  setPosition: (appId: string, x: number, y: number) => void;
  resetPositions: () => void;
};

type PersistedIconLayoutV1 = { v: 1; positions: Record<string, { x: number; y: number }> };
const ICONS_KEY = 'portfolio.icons.v1';

function readIconLayout(): PersistedIconLayoutV1 | null {
  try {
    const raw = localStorage.getItem(ICONS_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as PersistedIconLayoutV1;
    if (!v || v.v !== 1 || !v.positions || typeof v.positions !== 'object') return null;
    return v;
  } catch {
    return null;
  }
}

function isDifferentFromDefaults(
  positions: Record<string, { x: number; y: number }>,
  defaults: Record<string, { x: number; y: number }>,
): boolean {
  for (const [id, d] of Object.entries(defaults)) {
    const p = positions[id];
    if (!p) continue;
    if (p.x !== d.x || p.y !== d.y) return true;
  }
  return false;
}

const DEFAULTS = getDefaultIconPositions();
const HYDRATED = readIconLayout()?.positions ?? {};
const INITIAL_POSITIONS = { ...DEFAULTS, ...HYDRATED };
const INITIAL_DIRTY = isDifferentFromDefaults(INITIAL_POSITIONS, DEFAULTS);

export const useIconLayoutStore = create<IconLayoutState>((set) => ({
  positions: INITIAL_POSITIONS,
  isDirty: INITIAL_DIRTY,

  setPosition: (appId, x, y) =>
    set((s) => ({
      positions: { ...s.positions, [appId]: { x, y } },
      isDirty: true,
    })),

  resetPositions: () =>
    set({
      positions: { ...DEFAULTS },
      isDirty: false,
    }),
}));

let iconPersistScheduled = false;
useIconLayoutStore.subscribe(() => {
  if (iconPersistScheduled) return;
  iconPersistScheduled = true;
  requestAnimationFrame(() => {
    iconPersistScheduled = false;
    try {
      const state = useIconLayoutStore.getState();
      if (!state.isDirty) {
        localStorage.removeItem(ICONS_KEY);
        return;
      }
      const payload: PersistedIconLayoutV1 = { v: 1, positions: state.positions };
      localStorage.setItem(ICONS_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
  });
});
