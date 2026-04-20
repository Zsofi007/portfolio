const btn =
  'flex h-6 w-7 cursor-pointer items-center justify-center rounded-md border bg-white/35 font-pixel text-[0.55rem] ui-pressable ' +
  'font-normal leading-none hover:bg-white/50 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-1';

type WindowControlsProps = {
  isMaximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onRestore: () => void;
  onClose: () => void;
};

export function WindowControls({
  isMaximized,
  onMinimize,
  onMaximize,
  onRestore,
  onClose,
}: WindowControlsProps) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        aria-label="Minimize window"
        className={btn}
        style={{ borderColor: 'var(--ui-border-soft)', outlineColor: 'var(--ui-focus)', color: 'var(--ui-text)' }}
        onClick={onMinimize}
      >
        _
      </button>
      <button
        type="button"
        aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
        className={btn}
        style={{ borderColor: 'var(--ui-border-soft)', outlineColor: 'var(--ui-focus)', color: 'var(--ui-text)' }}
        onClick={isMaximized ? onRestore : onMaximize}
      >
        {isMaximized ? '❐' : '□'}
      </button>
      <button
        type="button"
        aria-label="Close window"
        className={
          'flex h-6 w-7 cursor-pointer items-center justify-center rounded-md border bg-[#ff4d4d]/80 ui-pressable ' +
          'font-pixel text-[0.55rem] leading-none text-white hover:bg-[#ff4d4d] ' +
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1'
        }
        style={{ borderColor: 'var(--ui-border-hard)', outlineColor: 'var(--ui-focus)' }}
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}
