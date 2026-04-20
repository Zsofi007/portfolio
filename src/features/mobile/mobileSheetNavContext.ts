import { createContext, useContext } from 'react';
import type { DesktopApp } from '@/types/desktop-app';

export type MobileSheetNavContextValue = {
  pushChild: (child: DesktopApp) => void;
};

const MobileSheetNavContext = createContext<MobileSheetNavContextValue | null>(null);

export const MobileSheetNavProvider = MobileSheetNavContext.Provider;

export function useMobileSheetNav(): MobileSheetNavContextValue | null {
  return useContext(MobileSheetNavContext);
}
