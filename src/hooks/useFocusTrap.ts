import { FOCUSABLE_SELECTOR } from '@/utils/focusableSelector';
import type { RefObject } from 'react';
import { useEffect } from 'react';

function listFocusables(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1,
  );
}

export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const root = containerRef.current;
    if (!root) return;

    const nodes = listFocusables(root);
    if (nodes.length) nodes[0].focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !root.contains(document.activeElement)) return;
      const list = listFocusables(root);
      if (!list.length) return;
      const i = list.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey) {
        if (i <= 0) {
          e.preventDefault();
          list[list.length - 1].focus();
        }
      } else if (i >= list.length - 1) {
        e.preventDefault();
        list[0].focus();
      }
    };

    root.addEventListener('keydown', onKey);
    return () => {
      root.removeEventListener('keydown', onKey);
    };
  }, [containerRef, enabled]);
}
