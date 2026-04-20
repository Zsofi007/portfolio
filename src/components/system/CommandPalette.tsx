import { AppIconGlyph } from '@/components/icons/AppIconGlyph';
import { getAllDesktopApps } from '@/features/desktop-system/desktopApps';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useAppStore } from '@/store/appStore';
import { useShellUiStore } from '@/store/shellUiStore';
import { useEffect, useMemo, useRef, useState } from 'react';

type PaletteItem =
  | { kind: 'app'; id: string; label: string; icon: string }
  | { kind: 'action'; id: 'close-all'; label: string; icon: string };

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function CommandPalette() {
  const open = useShellUiStore((s) => s.commandPaletteOpen);
  const openPalette = useShellUiStore((s) => s.openCommandPalette);
  const closePalette = useShellUiStore((s) => s.closeCommandPalette);
  const [q, setQ] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openApp = useAppStore((s) => s.openApp);
  const closeAll = useAppStore((s) => s.closeAllWindows);

  useFocusTrap(rootRef, open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      const mod = navigator.platform.toLowerCase().includes('mac') ? e.metaKey : e.ctrlKey;
      if (mod && isK) {
        e.preventDefault();
        openPalette();
        return;
      }
      if (open && e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closePalette, open, openPalette]);

  useEffect(() => {
    if (!open) return;
    setQ('');
    setActiveIndex(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const items = useMemo<PaletteItem[]>(() => {
    const apps: PaletteItem[] = getAllDesktopApps()
      .filter((a) => a.kind !== 'folder' && a.kind !== 'siri' && a.id !== 'siri')
      .map((a) => ({ kind: 'app', id: a.id, label: a.label, icon: a.icon }));
    const base: PaletteItem[] = [{ kind: 'action', id: 'close-all', label: 'Close all windows', icon: 'ri:RiRestartLine' }];
    return [...apps, ...base];
  }, []);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return items;
    return items.filter((it) => normalize(it.label).includes(nq) || ('id' in it && normalize(it.id).includes(nq)));
  }, [items, q]);

  const act = (it: PaletteItem) => {
    if (it.kind === 'app') openApp(it.id);
    if (it.kind === 'action' && it.id === 'close-all') closeAll();
    closePalette();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(0, filtered.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const it = filtered[activeIndex];
      if (it) act(it);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    }
  };

  if (!open) return null;

  const activeId = filtered[activeIndex] ? `cmdp-${filtered[activeIndex].kind}-${filtered[activeIndex].id}` : undefined;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 pt-24">
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 border-0 bg-black/45"
        onClick={closePalette}
      />
      <div
        ref={rootRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border bg-[color:var(--ui-glass-strong)] shadow-[var(--ui-shadow-lg)] backdrop-blur-[16px]"
        style={{ borderColor: 'var(--ui-border-soft)' }}
      >
        <div className="border-b p-2" style={{ borderColor: 'var(--ui-border-soft)' }}>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            className="w-full rounded-xl border bg-white/70 px-3 py-2 font-retro text-lg outline-none focus-visible:ring-2"
            style={{ borderColor: 'var(--ui-border-soft)', color: 'var(--ui-text)', boxShadow: 'none' }}
            placeholder="Type a command…"
            aria-controls="cmdp-list"
            aria-activedescendant={activeId}
          />
        </div>

        <ul id="cmdp-list" role="listbox" aria-label="Commands" className="m-0 max-h-[50vh] list-none overflow-auto p-1">
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-base text-neutral-600">No matches.</li>
          ) : (
            filtered.map((it, i) => {
              const selected = i === activeIndex;
              const id = `cmdp-${it.kind}-${it.id}`;
              return (
                <li key={id} id={id} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    className={
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left font-retro text-lg outline-none ui-pressable ' +
                      (selected ? 'bg-white/80' : 'hover:bg-white/30')
                    }
                    style={{ color: selected ? 'var(--ui-text)' : 'var(--ui-text)' }}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => act(it)}
                  >
                    <span aria-hidden className="flex h-7 w-7 items-center justify-center">
                      <AppIconGlyph
                        icon={it.icon}
                        imgClassName="h-5 w-5 object-contain"
                        textClassName={selected ? 'text-white' : 'text-retro-ink'}
                      />
                    </span>
                    <span className="min-w-0 flex-1 truncate">{it.label}</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

