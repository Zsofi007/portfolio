const btn =
  'flex h-6 w-7 cursor-pointer items-center justify-center border-2 border-white/35 bg-[#1c54b2] font-pixel text-[0.55rem] ui-pressable ' +
  'font-normal leading-none text-white hover:bg-[#2568d4] focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-1 focus-visible:outline-white';

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
      <button type="button" aria-label="Minimize window" className={btn} onClick={onMinimize}>
        _
      </button>
      <button
        type="button"
        aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
        className={btn}
        onClick={isMaximized ? onRestore : onMaximize}
      >
        {isMaximized ? '❐' : '□'}
      </button>
      <button
        type="button"
        aria-label="Close window"
        className={
          'flex h-6 w-7 cursor-pointer items-center justify-center border-2 border-black/40 bg-retro-close ui-pressable ' +
          'font-pixel text-[0.55rem] leading-none text-white hover:bg-retro-close-hover ' +
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white'
        }
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}
