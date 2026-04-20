type PreviewErrorProps = { onRetry: () => void };

export function PreviewError({ onRetry }: PreviewErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-center"
    >
      <p className="m-0 text-sm text-amber-950">Preview could not be loaded (timeout or blocked).</p>
      <button
        type="button"
        className="cursor-pointer rounded-lg border bg-[color:var(--ui-cta-bg)] px-3 py-1.5 text-xs font-semibold ui-pressable hover:bg-[color:var(--ui-cta-bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ui-focus)]"
        style={{ borderColor: 'var(--ui-border-soft)', color: 'var(--ui-cta-text)' }}
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}
