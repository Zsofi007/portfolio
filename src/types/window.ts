import type { WindowBounds } from '@/types/geometry';

export type WindowChromeState = 'normal' | 'minimized' | 'maximized';

export type WindowRecord = {
  id: string;
  appId: string;
  title: string;
  bounds: WindowBounds;
  chromeState: WindowChromeState;
  preMaxBounds?: WindowBounds;
};
