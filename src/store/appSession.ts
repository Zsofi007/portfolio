import { STORAGE_KEY, type PersistedSessionV1 } from '@/store/appStoreTypes';

export function safeParseSession(raw: string | null): PersistedSessionV1 | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as PersistedSessionV1;
    if (!v || v.v !== 1) return null;
    if (!v.windows || typeof v.windows !== 'object') return null;
    if (!Array.isArray(v.stack)) return null;
    if (!Array.isArray(v.recents)) return null;
    return v;
  } catch {
    return null;
  }
}

export function readSession(): PersistedSessionV1 | null {
  return safeParseSession(localStorage.getItem(STORAGE_KEY));
}

export function writeSession(payload: PersistedSessionV1): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function setupAutoPersist(persist: () => void): void {
  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      try {
        persist();
      } catch {
        // ignore storage errors (quota, private mode, etc.)
      }
    });
  };
  window.addEventListener('beforeunload', schedule);
}

