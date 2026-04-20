import { useShellUiStore } from '@/store/shellUiStore';

export function ToastRegion() {
  const toasts = useShellUiStore((s) => s.toasts);
  const remove = useShellUiStore((s) => s.removeToast);

  if (!toasts.length) return null;

  return (
    <div
      aria-live="polite"
      aria-relevant="additions"
      className={
        'pointer-events-none fixed z-[250] flex flex-col items-end gap-2 max-md:left-3 max-md:right-3 ' +
        'max-md:top-14 max-md:w-auto max-md:font-sans md:bottom-[4.5rem] md:right-4 md:left-auto ' +
        'md:w-[min(24rem,min(90vw,calc(100vw-2rem)))]'
      }
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={
            'pointer-events-auto px-3 py-2 max-md:rounded-2xl max-md:border max-md:border-black/10 ' +
            'max-md:bg-white/95 max-md:text-sm max-md:font-medium max-md:text-black/85 max-md:shadow-lg ' +
            'md:rounded-2xl md:border md:bg-[color:var(--ui-glass-strong)] md:font-retro md:text-lg ' +
            'md:shadow-[var(--ui-shadow-md)] md:backdrop-blur-[16px]'
          }
          style={{ borderColor: 'var(--ui-border-soft)', color: 'var(--ui-text)' }}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="m-0 flex-1">{t.message}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              className={
                'inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent ' +
                'font-sans text-[22px] leading-none ui-pressable hover:bg-black/[0.08] ' +
                'active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[#007aff] focus-visible:ring-offset-0 ' +
                'md:h-10 md:w-10 md:rounded md:font-pixel md:text-lg md:hover:bg-black/[0.08] ' +
                'md:focus-visible:outline md:focus-visible:outline-2 md:focus-visible:outline-black md:focus-visible:outline-offset-2 ' +
                'md:focus-visible:ring-0'
              }
              style={{ color: 'var(--ui-text)', outlineColor: 'var(--ui-focus)' }}
              onClick={() => remove(t.id)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
