/** UUID v4 when available; falls back for non-secure origins or older runtimes. */
export function newId(): string {
  const c = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined;
  if (c?.randomUUID) return c.randomUUID();
  if (c?.getRandomValues) {
    const bytes = new Uint8Array(16);
    c.getRandomValues(bytes);
    bytes[6] = (bytes[6]! & 0x0f) | 0x40;
    bytes[8] = (bytes[8]! & 0x3f) | 0x80;
    const h = (n: number) => n.toString(16).padStart(2, '0');
    let s = '';
    for (let i = 0; i < 16; i++) s += h(bytes[i]!);
    return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`;
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
