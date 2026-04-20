import { create } from 'zustand';
import { GUIDANCE_KEYS, readLocalString, writeLocalString } from './guidanceStorage';

type GuidancePrefsState = {
  guidedMode: boolean;
  hydrated: boolean;
  spotlightAppId: string | null;
  hydrate: () => void;
  setGuidedMode: (next: boolean) => void;
  setSpotlightApp: (appId: string | null) => void;
  clearSpotlight: () => void;
};

function readGuidedModeDefaultTrue(): boolean {
  const v = readLocalString(GUIDANCE_KEYS.guidedMode);
  if (v === null) return true;
  return v === '1' || v === 'true';
}

export const useGuidancePrefsStore = create<GuidancePrefsState>((set) => ({
  guidedMode: true,
  hydrated: false,
  spotlightAppId: null,

  hydrate: () => {
    set({ guidedMode: readGuidedModeDefaultTrue(), hydrated: true });
  },

  setGuidedMode: (guidedMode) => {
    writeLocalString(GUIDANCE_KEYS.guidedMode, guidedMode ? '1' : '0');
    set((s) => ({
      guidedMode,
      spotlightAppId: guidedMode ? s.spotlightAppId : null,
    }));
  },

  setSpotlightApp: (spotlightAppId) => set({ spotlightAppId }),

  clearSpotlight: () => set({ spotlightAppId: null }),
}));
